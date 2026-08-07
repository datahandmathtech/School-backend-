"use client";

import { useState, useEffect } from "react";
import { Settings, X, RotateCcw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PRESET_COLORS = [
  { name: "Orange", primary: "#f97316", secondary: "#ea580c" },
  { name: "Blue", primary: "#3b82f6", secondary: "#2563eb" },
  { name: "Green", primary: "#10b981", secondary: "#059669" },
  { name: "Sky", primary: "#0ea5e9", secondary: "#0284c7" },
  { name: "Rose", primary: "#f43f5e", secondary: "#e11d48" },
  { name: "Violet", primary: "#8b5cf6", secondary: "#7c3aed" },
  { name: "Amber", primary: "#f59e0b", secondary: "#d97706" },
  { name: "Teal", primary: "#14b8a6", secondary: "#0d9488" },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#f97316");
  const [secondaryColor, setSecondaryColor] = useState("#ea580c");

  useEffect(() => {
    // Load saved colors
    const savedPrimary = localStorage.getItem("theme-primary");
    const savedSecondary = localStorage.getItem("theme-secondary");
    if (savedPrimary) setPrimaryColor(savedPrimary);
    if (savedSecondary) setSecondaryColor(savedSecondary);
  }, []);

  useEffect(() => {
    // Apply colors to CSS variables
    document.documentElement.style.setProperty("--primary", primaryColor);
    // Also update orange-500 related things if they are hardcoded in some places
    // but better to use the variable everywhere.
    localStorage.setItem("theme-primary", primaryColor);
    localStorage.setItem("theme-secondary", secondaryColor);
  }, [primaryColor, secondaryColor]);

  const handleReset = () => {
    setPrimaryColor("#f97316");
    setSecondaryColor("#ea580c");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[150] bg-white text-slate-900 p-3 rounded-r-2xl shadow-2xl border border-slate-200 border-l-0 hover:bg-primary hover:text-white transition-all group hidden md:flex items-center justify-center"
      >
        <Settings className="w-5 h-5 animate-spin-slow group-hover:animate-spin" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200]"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-[210] flex flex-col border-r border-slate-100"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Select Style</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Reset All */}
                <button 
                  onClick={handleReset}
                  className="w-full py-3.5 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> All Reset
                </button>

                {/* Preset Colors */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-200">
                    <div className="flex-1 h-px bg-current" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Presets</span>
                    <div className="flex-1 h-px bg-current" />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setPrimaryColor(color.primary);
                          setSecondaryColor(color.secondary);
                        }}
                        style={{ backgroundColor: color.primary }}
                        className="aspect-square rounded-lg shadow-sm border-2 border-transparent hover:scale-110 transition-transform relative flex items-center justify-center"
                      >
                        {primaryColor === color.primary && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-200">
                    <div className="flex-1 h-px bg-current" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Custom</span>
                    <div className="flex-1 h-px bg-current" />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border border-slate-100 p-0.5 bg-white cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={primaryColor.toUpperCase()}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1 border border-slate-100 rounded-lg px-3 font-mono text-xs text-slate-600 bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secondary</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-10 h-10 rounded-lg border border-slate-100 p-0.5 bg-white cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={secondaryColor.toUpperCase()}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1 border border-slate-100 rounded-lg px-3 font-mono text-xs text-slate-600 bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100">
                <button 
                  onClick={handleReset}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all duration-300"
                >
                  Reset Default
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
