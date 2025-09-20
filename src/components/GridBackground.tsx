import React from 'react';
import { motion } from 'framer-motion';

export const GridBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        maskImage: 'radial-gradient(ellipse at center, white 10%, transparent 60%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, white 10%, transparent 60%)',
      }}
    >
      <motion.div
        className="w-full h-full opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 246, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 246, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{ backgroundPosition: ['0 0', '40px 40px'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
