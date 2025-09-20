import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootSteps = [
  "Initializing NEXA Core...",
  "Calibrating neural pathways...",
  "Loading language models...",
  "Establishing secure connection...",
  "All systems operational.",
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStep((prev) => (prev < bootSteps.length - 1 ? prev + 1 : prev));
    }, 800);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepTimer);
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 font-mono"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative flex items-center justify-center w-32 h-32 mb-8"
      >
        <motion.div
          className="absolute inset-0 border-2 border-nexa-cyan/50 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Cpu className="w-20 h-20 text-nexa-cyan" />
      </motion.div>
      
      <div className="w-full max-w-md text-center">
        <div className="h-8 mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              className="text-nexa-teal text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {bootSteps[step]}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <div className="w-full bg-nexa-glass-border rounded-full h-1.5">
          <motion.div
            className="bg-nexa-cyan h-1.5 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
        <p className="text-nexa-cyan mt-2 text-sm">{progress}%</p>
      </div>
    </motion.div>
  );
};
