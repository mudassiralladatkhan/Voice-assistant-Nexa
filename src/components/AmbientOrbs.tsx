import React from 'react';
import { motion } from 'framer-motion';

export const AmbientOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Large ambient orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            background: `radial-gradient(circle, ${
              i === 0 ? 'rgba(0, 246, 255, 0.1)' : 
              i === 1 ? 'rgba(99, 102, 241, 0.08)' : 
              'rgba(0, 255, 195, 0.06)'
            } 0%, transparent 70%)`,
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.2, 0.3],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: i % 3 === 0 ? '#00F6FF' : i % 3 === 1 ? '#00FFC3' : '#6366F1',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};
