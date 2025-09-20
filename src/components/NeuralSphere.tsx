import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Brain, Zap, Activity, Cpu } from 'lucide-react';

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
      Icon: MicOff,
      iconColor: 'text-gray-400',
      mainGradient: 'from-nexa-glass/30 to-nexa-glass/60',
      borderColor: 'border-nexa-glass-border',
      glowColor: 'rgba(0, 246, 255, 0.2)',
      particleColor: '#6B7280',
    },
    listening: {
      Icon: Mic,
      iconColor: 'text-nexa-cyan',
      mainGradient: 'from-nexa-cyan/25 to-nexa-teal/25',
      borderColor: 'border-nexa-cyan',
      glowColor: 'rgba(0, 246, 255, 0.8)',
      particleColor: '#00F6FF',
    },
    processing: {
      Icon: Brain,
      iconColor: 'text-nexa-purple',
      mainGradient: 'from-nexa-purple/25 to-nexa-pink/25',
      borderColor: 'border-nexa-purple',
      glowColor: 'rgba(139, 92, 246, 0.8)',
      particleColor: '#8B5CF6',
    },
  };

  const current = stateConfig[state];
  const Icon = current.Icon;

  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      {/* Enhanced Quantum Field Background */}
      <motion.div
        className="absolute w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, ${current.glowColor} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
        animate={{ 
          scale: state === 'idle' ? [1, 1.1, 1] : [1, 1.3, 1],
          opacity: state === 'idle' ? [0.3, 0.5, 0.3] : [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbital Rings System */}
      <AnimatePresence>
        {['listening', 'processing'].includes(state) && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className={`absolute rounded-full border opacity-40`}
                style={{
                  width: `${220 + i * 60}px`,
                  height: `${220 + i * 60}px`,
                  borderColor: current.particleColor,
                  borderWidth: '1px',
                }}
                initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0, 0.6, 0],
                  rotate: state === 'processing' ? [0, 360] : [0, 180, 0],
                }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ 
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Energy Particles */}
      <AnimatePresence>
        {['listening', 'processing'].includes(state) && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: current.particleColor,
                  left: `${50 + Math.cos((i * 30) * Math.PI / 180) * 160}%`,
                  top: `${50 + Math.sin((i * 30) * Math.PI / 180) * 160}%`,
                  boxShadow: `0 0 10px ${current.particleColor}`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Data Stream Lines */}
      <AnimatePresence>
        {state === 'processing' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`dataline-${i}`}
                className="absolute w-px bg-gradient-to-t from-transparent via-nexa-purple to-transparent"
                style={{
                  height: '300px',
                  left: `${50 + Math.cos((i * 45) * Math.PI / 180) * 100}%`,
                  top: `${50 + Math.sin((i * 45) * Math.PI / 180) * 100}%`,
                  transformOrigin: 'center bottom',
                  transform: `rotate(${i * 45}deg)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main Sphere Button */}
      <motion.button
        onClick={onToggleListening}
        disabled={!isSupported || isProcessing}
        className={`relative w-64 h-64 rounded-full border-2 transition-all duration-700 backdrop-blur-xl overflow-hidden flex items-center justify-center ${current.mainGradient} ${current.borderColor} shadow-2xl`}
        whileHover={state === 'idle' && isSupported ? { 
          scale: 1.05,
          boxShadow: `0 0 80px ${current.glowColor}`,
        } : {}}
        whileTap={state === 'idle' && isSupported ? { scale: 0.95 } : {}}
        animate={{
          scale: state === 'listening' ? [1, 1.02, 1] : state === 'processing' ? [1, 1.03, 1] : 1,
          boxShadow: state === 'listening' 
            ? [`0 0 60px ${current.glowColor}`, `0 0 120px ${current.glowColor}`, `0 0 60px ${current.glowColor}`]
            : state === 'processing'
            ? [`0 0 40px ${current.glowColor}`, `0 0 100px ${current.glowColor}`, `0 0 40px ${current.glowColor}`]
            : `0 0 20px rgba(255, 255, 255, 0.1)`,
        }}
        transition={{ 
          duration: 2.5, 
          repeat: ['listening', 'processing'].includes(state) ? Infinity : 0,
          ease: 'easeInOut'
        }}
      >
        {/* Advanced Wireframe Pattern */}
        <motion.div
          className="absolute w-full h-full opacity-20"
          animate={{ rotate: state === 'processing' ? 360 : 180 }}
          transition={{ 
            duration: state === 'processing' ? 20 : 40, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 256 256" className="w-full h-full">
            {/* Hexagonal Grid */}
            {[...Array(6)].map((_, i) => (
              <polygon
                key={`hex-${i}`}
                points="128,20 190,60 190,140 128,180 66,140 66,60"
                stroke={current.particleColor}
                strokeWidth="0.5"
                fill="none"
                style={{ 
                  transform: `scale(${0.3 + i * 0.15})`,
                  transformOrigin: 'center',
                }}
              />
            ))}
            
            {/* Radial Lines */}
            {[...Array(12)].map((_, i) => (
              <line
                key={`radial-${i}`}
                x1="128"
                y1="128"
                x2={128 + 100 * Math.cos(i * 30 * Math.PI / 180)}
                y2={128 + 100 * Math.sin(i * 30 * Math.PI / 180)}
                stroke={current.particleColor}
                strokeWidth="0.3"
                opacity="0.6"
              />
            ))}
            
            {/* Concentric Circles */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={`circle-${i}`}
                cx="128"
                cy="128"
                r={15 + i * 12}
                stroke={current.particleColor}
                strokeWidth="0.4"
                fill="none"
                opacity="0.4"
              />
            ))}
          </svg>
        </motion.div>

        {/* Energy Core */}
        <motion.div
          className={`absolute inset-16 rounded-full backdrop-blur-md ${current.mainGradient} border ${current.borderColor}`}
          animate={{
            opacity: state === 'listening' ? [0.4, 0.9, 0.4] : state === 'processing' ? [0.3, 0.8, 0.3] : 0.6,
            scale: state === 'listening' ? [0.95, 1.05, 0.95] : state === 'processing' ? [0.9, 1.1, 0.9] : 1,
          }}
          transition={{ 
            duration: state === 'processing' ? 6 : 3, 
            repeat: ['listening', 'processing'].includes(state) ? Infinity : 0,
            ease: 'easeInOut'
          }}
        />

        {/* Floating Tech Elements */}
        <AnimatePresence>
          {state === 'processing' && (
            <>
              {[Cpu, Activity, Zap].map((TechIcon, i) => (
                <motion.div
                  key={`tech-${i}`}
                  className="absolute"
                  style={{
                    left: `${50 + Math.cos((i * 120) * Math.PI / 180) * 80}%`,
                    top: `${50 + Math.sin((i * 120) * Math.PI / 180) * 80}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  <TechIcon size={20} className="text-nexa-purple" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Central Icon with Enhanced Animations */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          animate={{
            scale: state === 'listening' ? [1, 1.1, 1] : state === 'processing' ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2.5,
            repeat: ['listening', 'processing'].includes(state) ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {/* Sound capture visualization */}
          {state === 'listening' && (
            <div className="absolute w-full h-full">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`mic-wave-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full bg-nexa-cyan"
                  style={{
                    left: '50%',
                    top: '50%',
                    x: '-50%',
                    y: '-50%',
                    transform: `rotate(${i * 60}deg) translateX(60px)`,
                  }}
                  animate={{
                    scale: [1, 2 + Math.random() * 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'backInOut',
                  }}
                />
              ))}
            </div>
          )}

          <motion.div
            animate={{
              filter:
                state === 'listening'
                  ? [
                      'drop-shadow(0 0 4px rgba(0, 246, 255, 0.6))',
                      'drop-shadow(0 0 16px rgba(0, 246, 255, 1))',
                      'drop-shadow(0 0 4px rgba(0, 246, 255, 0.6))',
                    ]
                  : 'none',
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon size={72} className={current.iconColor} />
          </motion.div>

          {/* Processing overlay effects */}
          {state === 'processing' && (
            <div
              className="absolute inset-0 flex items-center justify-center"
            >
              <Zap size={32} className="text-nexa-pink opacity-60" />
            </div>
          )}
        </motion.div>

        {/* Pulse Waves */}
        <AnimatePresence>
          {state === 'listening' && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`pulse-${i}`}
                  className="absolute inset-0 rounded-full border-2 border-nexa-cyan/30"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.8, 0],
                  }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Holographic Scan Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
          style={{
            background: state !== 'idle' 
              ? 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255, 255, 255, 0.02) 3px, rgba(255, 255, 255, 0.02) 6px)'
              : 'none',
          }}
          animate={state !== 'idle' ? { y: [-100, 100] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.button>
    </div>
  );
};
