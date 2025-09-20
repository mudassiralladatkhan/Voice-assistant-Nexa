import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap, Activity, Brain } from 'lucide-react';

interface CommandDisplayProps {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  isProcessing: boolean;
}

export const CommandDisplay: React.FC<CommandDisplayProps> = ({
  transcript,
  interimTranscript,
  isListening,
  isProcessing,
}) => {
  const displayText = transcript + interimTranscript;
  const showPanel = isListening || displayText || isProcessing;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 h-40">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative p-8 rounded-2xl border bg-gradient-to-br from-nexa-glass/30 to-nexa-glass/10 backdrop-blur-2xl shadow-2xl h-full flex flex-col justify-center"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
            }}
          >
            {/* Animated border */}
            <motion.div 
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${isProcessing ? 'rgba(139, 92, 246, 0.4)' : 'rgba(0, 246, 255, 0.4)'}, 
                  transparent)`,
                clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
              }}
              animate={{ 
                x: [-100, 400, -100],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Header with enhanced animations */}
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <MessageCircle className="w-6 h-6 text-nexa-cyan" />
              </motion.div>
              <div>
                <motion.span 
                  className="text-nexa-cyan font-mono text-sm uppercase tracking-wider font-bold"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(0, 246, 255, 0.5)',
                      '0 0 15px rgba(0, 246, 255, 0.8)',
                      '0 0 5px rgba(0, 246, 255, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Voice Input Interface
                </motion.span>
                <motion.p 
                  className="text-xs text-gray-500 mt-1"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Real-time speech recognition • Neural processing
                </motion.p>
              </div>
            </motion.div>
            
            {/* Content area with enhanced styling */}
            <div className="min-h-[3rem] flex items-center relative">
              {displayText ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full"
                >
                  <p className="text-white text-xl md:text-2xl leading-relaxed font-light tracking-wide">
                    <span className="text-gray-200">{transcript}</span>
                    <motion.span 
                      className="text-nexa-cyan/90 italic"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {interimTranscript}
                    </motion.span>
                  </p>
                  
                  {/* Word confidence indicators */}
                  <motion.div
                    className="mt-4 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {transcript.split(' ').slice(-5).map((word, index) => (
                      <motion.span
                        key={`${word}-${index}`}
                        className="text-xs px-2 py-1 rounded-full bg-nexa-cyan/20 text-nexa-cyan border border-nexa-cyan/30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              ) : isProcessing ? (
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  >
                    <Brain className="w-8 h-8 text-nexa-purple" />
                  </motion.div>
                  <div>
                    <motion.span 
                      className="text-nexa-purple text-xl font-medium"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Neural Processing Active
                    </motion.span>
                    <motion.p 
                      className="text-gray-400 text-sm"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Analyzing speech patterns • Generating response matrix
                    </motion.p>
                  </div>
                </motion.div>
              ) : isListening ? (
                <motion.div 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Activity className="w-8 h-8 text-nexa-cyan" />
                  </motion.div>
                  <div>
                    <motion.span 
                      className="text-gray-300 text-xl italic"
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Listening for command...
                    </motion.span>
                    <motion.p 
                      className="text-gray-500 text-sm"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      Speak clearly • Advanced AI listening
                    </motion.p>
                  </div>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-nexa-cyan text-3xl font-bold ml-2"
                  >|</motion.span>
                </motion.div>
              ) : null}
              
              {/* Tech grid overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 246, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 246, 255, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                }}
                animate={{ backgroundPosition: ['0 0', '20px 20px'] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            
            {/* Progress indicator */}
            {(isListening || isProcessing) && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-nexa-cyan via-nexa-teal to-nexa-cyan"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
