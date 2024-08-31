import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "DevXP | Home",
  description: "Home page for technical blog site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/Blogo.png" />
      </head>
      <body>
          <Navbar />
          {children}
      </body>
    </html>
  );
}
