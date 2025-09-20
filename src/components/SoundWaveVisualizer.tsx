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

  const getWaveConfig = () => {
    if (isProcessing) {
      return {
        color: '#8B5CF6',
        glowColor: 'rgba(139, 92, 246, 0.8)',
        intensity: 'high',
        pattern: 'complex'
      };
    }
    if (isSpeaking) {
      return {
        color: '#00FFC3',
        glowColor: 'rgba(0, 255, 195, 0.8)',
        intensity: 'medium',
        pattern: 'smooth'
      };
    }
    if (isListening) {
      return {
        color: '#00F6FF',
        glowColor: 'rgba(0, 246, 255, 0.8)',
        intensity: 'medium',
        pattern: 'reactive'
      };
    }
    return {
      color: '#374151',
      glowColor: 'rgba(55, 65, 81, 0.3)',
      intensity: 'low',
      pattern: 'minimal'
    };
  };

  const config = getWaveConfig();
  const numBars = 48;

  const getBarHeight = (index: number) => {
    if (!isActive) return 3;
    
    const center = numBars / 2;
    const distance = Math.abs(index - center);
    const normalizedDistance = distance / center;
    
    if (config.pattern === 'complex') {
      return 8 + Math.sin(index * 0.3) * 25 + Math.cos(index * 0.5) * 15;
    }
    if (config.pattern === 'smooth') {
      return 10 + (1 - normalizedDistance) * 30;
    }
    if (config.pattern === 'reactive') {
      return 5 + Math.random() * 40 * (1 - normalizedDistance * 0.5);
    }
    return 3;
  };

  return (
    <motion.div
      className="flex items-end justify-center space-x-1 h-24 relative"
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${config.glowColor} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isActive ? [0.3, 0.8, 0.3] : 0,
          scale: isActive ? [0.8, 1.2, 0.8] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Frequency bars */}
      {[...Array(numBars)].map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full relative"
          style={{ 
            backgroundColor: config.color,
            width: '4px',
            boxShadow: isActive ? `0 0 10px ${config.color}, 0 0 20px ${config.color}` : 'none',
          }}
          animate={isActive ? {
            height: [
              getBarHeight(i) * 0.5,
              getBarHeight(i),
              getBarHeight(i) * 0.7,
              getBarHeight(i) * 1.2,
              getBarHeight(i) * 0.5,
            ],
            opacity: [0.6, 1, 0.8, 1, 0.6],
          } : { 
            height: 3,
            opacity: 0.3 
          }}
          transition={{
            duration: isProcessing ? 0.6 : isListening ? 0.4 : 0.8,
            repeat: isActive ? Infinity : 0,
            delay: i * 0.02,
            ease: "easeInOut",
          }}
        >
          {/* Individual bar glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: config.color,
                filter: 'blur(3px)',
                opacity: 0.5,
              }}
              animate={{
                scale: [0.8, 1.5, 0.8],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.05,
                ease: 'easeInOut',
              }}
            />
          )}
        </motion.div>
      ))}
      
      {/* Additional effects for processing mode */}
      {isProcessing && (
        <>
          {/* Data stream lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`stream-${i}`}
              className="absolute w-px bg-gradient-to-t from-transparent via-nexa-purple to-transparent"
              style={{
                height: '100px',
                left: `${20 + i * 15}%`,
                top: '-20px',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Quantum interference pattern */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 10px,
                rgba(139, 92, 246, 0.1) 10px,
                rgba(139, 92, 246, 0.1) 12px
              )`,
            }}
            animate={{ x: [-50, 50] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}
      
      {/* Listening mode particle effects */}
      {isListening && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-nexa-cyan rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                y: [-20, -60],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};
