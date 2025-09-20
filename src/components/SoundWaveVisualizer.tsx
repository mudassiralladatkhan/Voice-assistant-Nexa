import React from 'react';
import { motion } from 'framer-motion';

interface SoundWaveVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
}

export const SoundWaveVisualizer: React.FC<SoundWaveVisualizerProps> = ({
  isListening,
  isSpeaking,
  isProcessing,
}) => {
  const isActive = isListening || isSpeaking || isProcessing;

  const getWaveColor = () => {
    if (isProcessing) return '#8B5CF6';
    if (isSpeaking) return '#00FFC3';
    if (isListening) return '#00F6FF';
    return '#374151'; // gray-700
  };

  const numBars = 32;

  return (
    <motion.div
      className="flex items-center justify-center space-x-1 h-16"
      animate={{ opacity: isActive ? 1 : 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(numBars)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ backgroundColor: getWaveColor(), width: '3px' }}
          animate={isActive ? {
            height: [
              Math.random() * 5 + 2,
              Math.random() * (isListening ? 50 : 30) + 5,
              Math.random() * 5 + 2,
            ],
          } : { height: 4 }}
          transition={{
            duration: isListening ? 0.4 : 0.8,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.02,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};
