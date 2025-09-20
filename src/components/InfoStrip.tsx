import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Zap, Activity } from 'lucide-react';

interface InfoStripProps {
  systemPower: number;
}

const NexaLogo = () => (
  <motion.div
    className="pointer-events-auto flex items-center gap-4 cursor-pointer group"
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
  >
    <motion.div
      className="w-12 h-12 relative"
      whileHover={{ scale: 1.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Outer Rotation Ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="55"
          stroke="rgba(0, 246, 255, 0.6)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="15 10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Middle Ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="42"
          stroke="rgba(0, 255, 195, 0.8)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 12"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Inner Core Ring */}
        <motion.circle
          cx="60"
          cy="60"
          r="28"
          stroke="rgba(139, 92, 246, 0.7)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 8"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Central Sphere */}
        <motion.circle
          cx="60"
          cy="60"
          r="18"
          fill="rgba(0, 246, 255, 0.1)"
          stroke="rgba(0, 246, 255, 0.9)"
          strokeWidth="1"
        />
        
        {/* Pulsating Core */}
        <motion.circle
          cx="60"
          cy="60"
          r="8"
          fill="#fff"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Energy Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={60 + 35 * Math.cos((i * 60) * Math.PI / 180)}
            cy={60 + 35 * Math.sin((i * 60) * Math.PI / 180)}
            r="3"
            fill="#00F6FF"
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
    
    <div className="flex flex-col">
      <motion.span 
        className="text-3xl font-bold tracking-widest text-white transition-colors duration-300 group-hover:text-nexa-cyan"
        style={{ textShadow: '0 0 10px rgba(0, 246, 255, 0.5)' }}
      >
        NEXA
      </motion.span>
      <motion.span 
        className="text-xs text-nexa-teal tracking-wider opacity-80"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ADVANCED AI SYSTEM
      </motion.span>
    </div>
  </motion.div>
);

const DateTimeDisplay = ({ systemPower }: { systemPower: number }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => 
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date: Date): string => 
    date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return (
    <motion.div
      className="pointer-events-auto flex items-center gap-8 text-gray-300"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
    >
      {/* Date Display */}
      <motion.div 
        className="flex items-center gap-3 hover:text-nexa-teal transition-colors duration-300 cursor-pointer"
        whileHover={{ scale: 1.05, textShadow: '0 0 8px rgba(0, 255, 195, 0.7)' }}
      >
        <Calendar size={18} />
        <span className="font-mono text-sm tracking-wider">{formatDate(currentTime)}</span>
      </motion.div>
      
      {/* Time Display */}
      <motion.div 
        className="flex items-center gap-3 hover:text-nexa-cyan transition-colors duration-300 cursor-pointer"
        whileHover={{ scale: 1.05, textShadow: '0 0 8px rgba(0, 246, 255, 0.7)' }}
      >
        <Clock size={18} />
        <span className="font-mono text-lg font-semibold text-white tracking-wider">
          {formatTime(currentTime)}
        </span>
      </motion.div>
      
      {/* System Power Indicator */}
      <motion.div 
        className="flex items-center gap-3 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        animate={{ 
          color: systemPower > 90 ? '#00F6FF' : systemPower > 75 ? '#00FFC3' : '#EC4899'
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, repeat: Infinity, ease: 'easeInOut' 
          }}
        >
          <Zap size={18} />
        </motion.div>
        <div className="flex flex-col">
          <span className="font-mono text-xs tracking-wider">POWER</span>
          <span className="font-mono text-sm font-bold">{systemPower.toFixed(1)}%</span>
        </div>
      </motion.div>
      
      {/* System Status */}
      <motion.div 
        className="flex items-center gap-3 text-green-400 cursor-pointer"
        whileHover={{ scale: 1.05, textShadow: '0 0 8px rgba(0, 255, 0, 0.5)' }}
      >
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Activity size={18} />
        </motion.div>
        <div className="flex flex-col">
          <span className="font-mono text-xs tracking-wider">STATUS</span>
          <span className="font-mono text-sm font-bold">OPTIMAL</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const InfoStrip: React.FC<InfoStripProps> = ({ systemPower }) => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-20 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <NexaLogo />
      <DateTimeDisplay systemPower={systemPower} />
    </motion.header>
  );
};
