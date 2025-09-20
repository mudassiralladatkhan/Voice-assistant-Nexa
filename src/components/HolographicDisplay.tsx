import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, Brain, Cpu, Database, Wifi } from 'lucide-react';

interface HolographicDisplayProps {
  isActive: boolean;
  mode: 'idle' | 'listening' | 'processing';
}

export const HolographicDisplay: React.FC<HolographicDisplayProps> = ({
  isActive,
  mode,
}) => {
  const getMetrics = () => {
    const base = {
      listening: { cpu: 45, memory: 62, neural: 78, bandwidth: 89 },
      processing: { cpu: 85, memory: 91, neural: 96, bandwidth: 94 },
      idle: { cpu: 12, memory: 28, neural: 35, bandwidth: 45 },
    };
    return base[mode];
  };

  const metrics = getMetrics();

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Left HUD Panel */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45 }}
            animate={{ 
              opacity: 1, 
              x: -350, 
              rotateY: 0,
              y: [-10, 10, -10],
            }}
            exit={{ opacity: 0, x: -100, rotateY: -45 }}
            transition={{ 
              duration: 0.8,
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute top-0 left-0 w-72 h-80 pointer-events-none"
          >
            <div className="relative w-full h-full">
              {/* Holographic frame */}
              <motion.div
                className="absolute inset-0 border border-nexa-cyan/40 bg-gradient-to-br from-nexa-cyan/5 to-transparent backdrop-blur-md"
                style={{
                  clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)',
                }}
                animate={{
                  borderColor: ['rgba(0, 246, 255, 0.4)', 'rgba(0, 246, 255, 0.8)', 'rgba(0, 246, 255, 0.4)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Content */}
              <div className="p-6 relative z-10">
                <motion.h3 
                  className="text-nexa-cyan text-sm font-bold mb-4 tracking-wider"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  SYSTEM DIAGNOSTICS
                </motion.h3>
                
                <div className="space-y-4">
                  {[
                    { icon: Cpu, label: 'CPU LOAD', value: metrics.cpu, color: 'nexa-cyan' },
                    { icon: Database, label: 'MEMORY', value: metrics.memory, color: 'nexa-teal' },
                    { icon: Brain, label: 'NEURAL NET', value: metrics.neural, color: 'nexa-purple' },
                    { icon: Wifi, label: 'BANDWIDTH', value: metrics.bandwidth, color: 'nexa-pink' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div>
                        <item.icon size={16} className={`text-${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-300">{item.label}</span>
                          <span className="text-xs text-white font-mono">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-800/50 rounded-full h-1">
                          <motion.div
                            className={`bg-${item.color} h-1 rounded-full`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Holographic scanlines */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 246, 255, 0.03) 2px, rgba(0, 246, 255, 0.03) 4px)',
                }}
                animate={{ x: [-100, 100] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Right HUD Panel */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={{ 
              opacity: 1, 
              x: 350, 
              rotateY: 0,
              y: [10, -10, 10],
            }}
            exit={{ opacity: 0, x: 100, rotateY: 45 }}
            transition={{ 
              duration: 0.8,
              y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute top-0 right-0 w-72 h-80 pointer-events-none"
          >
            <div className="relative w-full h-full">
              {/* Holographic frame */}
              <motion.div
                className="absolute inset-0 border border-nexa-teal/40 bg-gradient-to-bl from-nexa-teal/5 to-transparent backdrop-blur-md"
                style={{
                  clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)',
                }}
                animate={{
                  borderColor: ['rgba(0, 255, 195, 0.4)', 'rgba(0, 255, 195, 0.8)', 'rgba(0, 255, 195, 0.4)'],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              
              {/* Content */}
              <div className="p-6 relative z-10">
                <motion.h3 
                  className="text-nexa-teal text-sm font-bold mb-4 tracking-wider"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  NEURAL ANALYSIS
                </motion.h3>
                
                <div className="space-y-3">
                  <motion.div
                    className="text-center"
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-2xl font-mono text-nexa-cyan mb-1">
                      {mode === 'processing' ? '96.7%' : mode === 'listening' ? '78.3%' : '35.2%'}
                    </div>
                    <div className="text-xs text-gray-400">CONFIDENCE LEVEL</div>
                  </motion.div>
                  
                  <div className="relative h-32 w-full">
                    {/* Neural network visualization */}
                    <svg className="w-full h-full" viewBox="0 0 200 120">
                      {/* Nodes */}
                      {[...Array(12)].map((_, i) => {
                        const x = 30 + (i % 4) * 40;
                        const y = 20 + Math.floor(i / 4) * 30;
                        return (
                          <motion.circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="#00F6FF"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              r: [2, 4, 2],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        );
                      })}
                      
                      {/* Connections */}
                      {[...Array(8)].map((_, i) => (
                        <motion.line
                          key={`line-${i}`}
                          x1={30 + (i % 4) * 40}
                          y1={20 + Math.floor(i / 4) * 30}
                          x2={30 + ((i + 1) % 4) * 40}
                          y2={20 + Math.floor((i + 1) / 4) * 30}
                          stroke="#00FFC3"
                          strokeWidth="1"
                          animate={{
                            opacity: [0.2, 0.8, 0.2],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </svg>
                  </div>
                  
                  <div className="text-center">
                    <motion.div
                      className="text-xs text-gray-400 uppercase tracking-wider"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      {mode === 'processing' ? 'DEEP LEARNING ACTIVE' :
                       mode === 'listening' ? 'PATTERN RECOGNITION' :
                       'STANDBY MODE'}
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Data stream effect */}
              <motion.div
                className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-transparent via-nexa-teal/50 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Top status bar */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: -200 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-16 pointer-events-none"
          >
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0 border border-nexa-purple/40 bg-gradient-to-r from-nexa-purple/5 via-nexa-pink/5 to-nexa-purple/5 backdrop-blur-md"
                style={{
                  clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)',
                }}
                animate={{
                  borderColor: ['rgba(139, 92, 246, 0.4)', 'rgba(139, 92, 246, 0.8)', 'rgba(139, 92, 246, 0.4)'],
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              
              <div className="flex items-center justify-center h-full px-6">
                <motion.div
                  className="flex items-center gap-3"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Activity className="w-5 h-5 text-nexa-purple" />
                  <span className="text-nexa-purple text-sm font-mono tracking-wider">
                    {mode === 'processing' ? 'NEURAL PROCESSING' :
                     mode === 'listening' ? 'VOICE ANALYSIS' :
                     'SYSTEM READY'}
                  </span>
                  <motion.div
                    className="w-2 h-2 bg-nexa-purple rounded-full"
                    animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
