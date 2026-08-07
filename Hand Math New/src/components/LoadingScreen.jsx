import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Logo Animation */}
          <div className="relative w-24 h-24">
            <motion.div
              animate={{
                rotate: 360,
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 border-4 border-electric shadow-[0_0_20px_rgba(0,212,255,0.5)]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-heading font-bold text-electric">HM</span>
            </div>
          </div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1 bg-electric shadow-[0_0_10px_rgba(0,212,255,0.8)] rounded-full"
          />
          
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-electric font-heading tracking-widest text-sm uppercase"
          >
            Initializing Innovation
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
