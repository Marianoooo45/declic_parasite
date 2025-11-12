"use client";

import { type HTMLAttributes, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type AnimatedSectionProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function AnimatedSection({ children, className, delay = 0, ...props }: AnimatedSectionProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={elementRef}
      style={{ transitionDelay: `${delay}s` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
