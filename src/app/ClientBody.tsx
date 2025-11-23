"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";

type ClientBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ClientBody({ children, className }: ClientBodyProps) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.classList.add("antialiased");

    return () => {
      document.body.classList.remove("antialiased");
    };
  }, []);

  return (
    <body
      className={cn("antialiased", className)}
      suppressHydrationWarning
    >
      {children}
    </body>
  );
}
