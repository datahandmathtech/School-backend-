"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  openItem: string | null;
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export const Accordion = ({ 
  children, 
  className, 
  type = "single", 
  collapsible = true 
}: { 
  children: React.ReactNode; 
  className?: string; 
  type?: "single" | "multiple"; 
  collapsible?: boolean;
}) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const toggleItem = (value: string) => {
    setOpenItem(prev => prev === value ? (collapsible ? null : value) : value);
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn("w-full space-y-4", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = React.createContext<{ value: string } | null>(null);

export const AccordionItem = ({ 
  children, 
  className, 
  value 
}: { 
  children: React.ReactNode; 
  className?: string; 
  value: string;
}) => {
  const context = React.useContext(AccordionContext);
  const isOpen = context?.openItem === value;

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div 
        className={cn("border-b border-slate-100", className)}
        data-state={isOpen ? "open" : "closed"}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);
  
  if (!context || !itemContext) return null;

  const { openItem, toggleItem } = context;
  const { value } = itemContext;
  const isOpen = openItem === value;

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-left text-lg font-bold text-navy-900 transition-all hover:text-gold-600 group w-full outline-none",
        className
      )}
    >
      {children}
      <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 group-hover:text-gold-600", isOpen && "rotate-180")} />
    </button>
  );
};

export const AccordionContent = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);
  
  if (!context || !itemContext) return null;

  const { openItem } = context;
  const { value } = itemContext;
  const isOpen = openItem === value;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
          data-state={isOpen ? "open" : "closed"}
        >
          <div className={cn("pb-6 pt-0 text-slate-500 leading-relaxed", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
