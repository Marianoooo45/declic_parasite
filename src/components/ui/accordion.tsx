"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openItem: string | null;
  setOpenItem: (value: string | null) => void;
  collapsible: boolean;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single";
  collapsible?: boolean;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, collapsible = false, type: _type, ...props }, ref) => {
    const [openItem, setOpenItem] = React.useState<string | null>(null);

    const contextValue = React.useMemo(
      () => ({ openItem, setOpenItem, collapsible }),
      [openItem, collapsible],
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const accordion = React.useContext(AccordionContext);

    if (!accordion) {
      throw new Error("Accordion components must be used within <Accordion>");
    }

    const isOpen = accordion.openItem === value;

    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn("rounded-lg border border-border", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const accordion = React.useContext(AccordionContext);
    const item = React.useContext(AccordionItemContext);

    if (!accordion || !item) {
      throw new Error("AccordionTrigger must be used within <AccordionItem>");
    }

    const isOpen = accordion.openItem === item.value;
    const contentId = `${item.value}-content`;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex w-full items-center justify-between gap-4 rounded-lg px-4 py-4 text-left text-sm font-semibold transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          className,
        )}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => {
          if (isOpen) {
            accordion.setOpenItem(accordion.collapsible ? null : item.value);
          } else {
            accordion.setOpenItem(item.value);
          }
        }}
        {...props}
      >
        <span className="flex-1">{children}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
    );
  },
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const accordion = React.useContext(AccordionContext);
    const item = React.useContext(AccordionItemContext);

    if (!accordion || !item) {
      throw new Error("AccordionContent must be used within <AccordionItem>");
    }

    const isOpen = accordion.openItem === item.value;
    const contentId = `${item.value}-content`;

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-hidden={!isOpen}
        className={cn(
          "grid overflow-hidden text-sm transition-all",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          className,
        )}
        {...props}
      >
        <div className="overflow-hidden px-4 pb-4 pt-0 text-muted-foreground">{children}</div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
