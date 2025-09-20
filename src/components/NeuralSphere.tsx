import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Brain, Zap } from 'lucide-react';

interface NeuralSphereProps {
  isListening: boolean;
  isProcessing: boolean;
  onToggleListening: () => void;
  isSupported: boolean;
}

export const NeuralSphere: React.FC<NeuralSphereProps> = ({
  isListening,
  isProcessing,
  onToggleListening,
  isSupported,
}) => {
  const state = isProcessing ? 'processing' : isListening ? 'listening' : 'idle';

  const stateConfig = {
    idle: {
      color: 'nexa-cyan',
      Icon: MicOff,
      iconColor: 'text-gray-400',
      mainGradient: 'from-nexa-glass/30 to-nexa-glass/60',
      borderColor: 'border-nexa-glass-border',
      shadow: 'shadow-xl',
      hoverBorder: 'hover:border-nexa-cyan/70',
      hoverBg: 'hover:bg-nexa-cyan/10',
    },
    listening: {
      color: 'nexa-cyan',
      Icon: Mic,
      iconColor: 'text-nexa-cyan',
      mainGradient: 'from-nexa-cyan/20 to-nexa-teal/20',
      borderColor: 'border-nexa-cyan',
      shadow: 'shadow-nexa-cyan/50',
      hoverBorder: '',
      hoverBg: '',
    },
    processing: {
      color: 'nexa-purple',
      Icon: Brain,
      iconColor: 'text-nexa-purple',
      mainGradient: 'from-nexa-purple/20 to-nexa-pink/20',
      borderColor: 'border-nexa-purple',
      shadow: 'shadow-nexa-purple/40',
      hoverBorder: '',
      hoverBg: '',
    },
  };

  const current = stateConfig[state];
  const Icon = current.Icon;

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Background Glow */}
      <motion.div
        className={`absolute w-full h-full rounded-full blur-3xl ${
          state === 'listening' ? 'bg-nexa-cyan/30' : state === 'processing' ? 'bg-nexa-purple/30' : 'bg-nexa-cyan/10'
        }`}
        animate={{ scale: state === 'idle' ? 1 : [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: state === 'idle' ? 0 : Infinity, ease: 'easeInOut' }}
      />
      
      {/* Outer Rings */}
      {['listening', 'processing'].includes(state) &&
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full border ${state === 'listening' ? 'border-nexa-cyan/30' : 'border-nexa-purple/30'}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.5 + i * 0.2], opacity: [0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 + i, repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
          />
        ))}

      {/* Main Sphere Button */}
      <motion.button
        onClick={onToggleListening}
        disabled={!isSupported || isProcessing}
        className={`relative w-48 h-48 rounded-full border-2 transition-all duration-500 backdrop-blur-xl overflow-hidden flex items-center justify-center ${current.mainGradient} ${current.borderColor} ${current.shadow} ${current.hoverBorder} ${current.hoverBg}`}
        whileHover={state === 'idle' && isSupported ? { scale: 1.05 } : {}}
        whileTap={state === 'idle' && isSupported ? { scale: 0.95 } : {}}
      >
        {/* Inner Wireframe */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: state === 'processing' ? 15 : 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="100%" height="100%" viewBox="0 0 200 200" className="opacity-20">
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx="100"
                cy="100"
                r={20 + i * 10}
                stroke={state === 'listening' ? '#00F6FF' : state === 'processing' ? '#8B5CF6' : '#FFFFFF'}
                strokeWidth="0.5"
                fill="none"
              />
            ))}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 100 * Math.cos(i * 30 * Math.PI / 180)}
                y2={100 + 100 * Math.sin(i * 30 * Math.PI / 180)}
                stroke={state === 'listening' ? '#00FFC3' : state === 'processing' ? '#EC4899' : '#FFFFFF'}
                strokeWidth="0.5"
                fill="none"
              />
            ))}
          </svg>
        </motion.div>

        {/* Central Icon */}
        <motion.div
          className="relative z-10"
          animate={{ scale: state === 'idle' ? 1 : [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: state === 'idle' ? 0 : Infinity }}
        >
          <Icon size={56} className={current.iconColor} />
          {state === 'processing' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Zap size={24} className="text-nexa-pink" />
            </motion.div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};
