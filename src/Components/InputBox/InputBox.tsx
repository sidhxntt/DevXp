// InputBox.tsx
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useRecoilState } from 'recoil';
import { emailsent } from "../../lib/atoms";
import { useForm } from "react-hook-form";
import isEmail from 'is-email';

interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (value: string) => void;
}

export function PlaceholdersAndVanishInput({
  placeholders,
  onChange,
  onSubmit,
}: PlaceholdersAndVanishInputProps) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<Array<{x: number; y: number; r: number; color: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useRecoilState(emailsent);
  const [error, setError] = useState("");

  const {
    register,
    formState: { errors }
  } = useForm();

  const validateEmail = useCallback((email: string) => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!isEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  }, []);

  const startAnimation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  }, [placeholders.length]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  }, [startAnimation]);

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startAnimation, handleVisibilityChange]);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);
 
    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);
 
    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];
 
    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }
 
    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);
 
  useEffect(() => {
    draw();
  }, [value, draw]);
 
  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };
 

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!animating && value) {
      if (!validateEmail(value)) {
        return;
      }
      setAnimating(true);
      draw();
      setDone(true);
      onSubmit?.(value);
      
      const maxX = Math.max(...newDataRef.current.map(p => p.x));
      animate(maxX);
    }
  }, [animate, animating, draw, onSubmit, setDone, value, validateEmail]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        className={cn(
          "w-full relative bg-transparent h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
          value && "bg-transparent"
        )}
        onSubmit={handleSubmit}
      >
        <canvas
          className={cn(
            "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
            animating ? "opacity-100" : "opacity-0"
          )}
          ref={canvasRef}
        />
        <input
          {...register("input", { required: true })}
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              setError("");
              onChange?.(e);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !animating && value) {
              handleSubmit(e as any);
            }
          }}
          ref={inputRef}
          value={value}
          type="email"
          placeholder={placeholders[currentPlaceholder]}
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border bg-transparent text-white h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
            animating && "text-transparent dark:text-transparent",
            error && "border-red-500"
          )}
        />
        <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
          <AnimatePresence mode="wait">
            {!value && (
              <motion.p
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
      {error && (
        <div className="mt-2 text-red-500 text-sm pl-4">
          {error}
        </div>
      )}
      {done && (
        <div className="mt-2 text-green-500 text-sm pl-4">
          Email Registered.
        </div>
      )}
    </div>
  );
}