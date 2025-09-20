import React from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-8 left-8 z-30 flex items-center gap-2 py-2 px-4 rounded-full bg-nexa-glass/50 border border-nexa-glass-border backdrop-blur-lg text-green-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, shadow: '0 0 15px rgba(0, 255, 128, 0.2)' }}
      title="System Online - Secure Connection"
    >
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Wifi size={16} />
      </motion.div>
      <span className="font-mono text-xs uppercase tracking-widest">Online</span>
    </motion.div>
  );
};
