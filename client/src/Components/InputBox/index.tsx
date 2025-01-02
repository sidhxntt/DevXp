"use client";

import { PlaceholdersAndVanishInput } from "./InputBox";
import { useRecoilState } from 'recoil';
import { emailsent, emailnotsent } from "../../lib/atoms";
import { useEffect, useCallback } from "react";

export function PlaceholdersAndVanishInputDemo() {
  const [done, setDone] = useRecoilState(emailsent);
  const [_, setServerError] = useRecoilState(emailnotsent);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => setDone(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [done, setDone]);

  const placeholders = [
    "Enter your Email",
    "Be a part of our community",
    "Stay Updated on the Latest Blogs",
    "Stay Relevant",
    "Keep Learning & Upskilling",
  ];

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (email: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email Already Registered");
      }

      const result = await response.json();
      console.log("Response from server:", result);
      setDone(true);
    } catch (error: any) {
      console.error("Error sending data:", error);
      setServerError(error.message || "Email Already Registered");
      throw error; // Re-throw to trigger error handling in child component
    }
  }, [setDone, setServerError]);

  return (
    <div className="pt-48">
      <h2 className="mb-10 sm:mb-9 text-xl text-center sm:text-5xl dark:text-white text-white font-">
        Subscribe to our Newsletter 
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}