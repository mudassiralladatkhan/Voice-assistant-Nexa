import React from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

const statusItems = [
  { icon: Wifi, label: 'CONNECTION', value: 'ONLINE', color: 'text-green-400' },
];

export const SystemStatus: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 12 }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-8 left-8 z-20 w-64 flex flex-col items-start gap-6 pointer-events-none"
    >
      {statusItems.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="w-full flex items-center justify-start gap-4 group"
        >
          <div className={`relative flex items-center justify-center w-10 h-10 ${item.color}`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <item.icon size={22} />
            </div>
            <motion.div 
              className={`absolute inset-0 border rounded-full ${item.color.replace('text-', 'border-')}/30`}
              animate={{ scale: [1, 1.5, 1], opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' }}
            />
          </div>
          <div className="text-left">
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">{item.label}</p>
            <p className={`text-base font-mono font-bold ${item.color}`}>{item.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
