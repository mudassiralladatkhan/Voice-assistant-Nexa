import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';

const NexaLogo = () => (
  <motion.div
    className="pointer-events-auto flex items-center gap-4 cursor-pointer group"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
  >
    <motion.div
      className="w-10 h-10 relative"
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(0, 246, 255, 0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="10 15"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        {/* Middle Ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="rgba(0, 255, 195, 0.7)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 10"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner Core */}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="rgba(0, 246, 255, 0.1)"
          stroke="rgba(0, 246, 255, 0.8)"
          strokeWidth="0.5"
        />
        {/* Pulsating Center */}
        <motion.circle
          cx="50"
          cy="50"
          r="5"
          fill="#fff"
          animate={{
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 5px #fff',
              '0 0 15px #fff',
              '0 0 5px #fff',
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.svg>
    </motion.div>
    <span className="text-2xl font-bold tracking-widest text-white transition-colors duration-300 group-hover:text-nexa-cyan">NEXA</span>
  </motion.div>
);

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date: Date): string => date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <motion.div
      className="pointer-events-auto hidden md:flex items-center gap-6 text-gray-400"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-2.5 hover:text-nexa-teal transition-colors duration-300 cursor-pointer">
        <Calendar size={16} />
        <span className="font-mono text-sm tracking-wider">{formatDate(currentTime)}</span>
      </div>
      <div className="flex items-center gap-2.5 hover:text-nexa-cyan transition-colors duration-300 cursor-pointer">
        <Clock size={16} />
        <span className="font-mono text-sm font-semibold text-white tracking-wider">{formatTime(currentTime)}</span>
      </div>
    </motion.div>
  );
}

export const InfoStrip: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-center z-20">
      <NexaLogo />
      <DateTimeDisplay />
    </header>
  );
};
