// Demo.tsx
"use client";

import { PlaceholdersAndVanishInput } from "./InputBox";
import { useRecoilState } from 'recoil';
import { emailsent } from "../../lib/atoms";
import { useEffect, useCallback } from "react";

export function PlaceholdersAndVanishInputDemo() {
  const [done, setDone] = useRecoilState(emailsent);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => setDone(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [done, setDone]);

  const placeholders = [
  ""
  ];

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

  const handleSubmit = useCallback((value: string) => {
    console.log("submitted:", value);
  }, []);

  return (
    <div className="relative top-0 mt-7 h-screen pt-48">
     <h2 className="mb-10 sm:mb-9 text-xl text-center sm:text-5xl dark:text-white text-white font-">
        Stay Updated on the Latest Blogs
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}