import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Brain, Sparkles, Zap } from 'lucide-react';

interface VoiceCoreProps {
  isListening: boolean;
  isProcessing: boolean;
  onToggleListening: () => void;
  isSupported: boolean;
  systemStatus: 'initializing' | 'ready' | 'active';
}

export const VoiceCore: React.FC<VoiceCoreProps> = ({
  isListening,
  isProcessing,
  onToggleListening,
  isSupported,
  systemStatus,
}) => {
  const getButtonState = () => {
    if (systemStatus === 'initializing') return 'initializing';
    if (isProcessing) return 'processing';
    if (isListening) return 'listening';
    return 'idle';
  };

  const buttonState = getButtonState();

  return (
    <div className="flex flex-col items-center justify-center relative">
      <motion.div className="relative">
        {/* Outer orbital rings */}
        {(isListening || isProcessing || systemStatus === 'active') && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute inset-0 rounded-full border ${
                  isProcessing ? 'border-nexa-purple/40' : 'border-nexa-cyan/40'
                }`}
                style={{
                  width: `${160 + (i * 40)}px`,
                  height: `${160 + (i * 40)}px`,
                  left: `${-20 - (i * 20)}px`,
                  top: `${-20 - (i * 20)}px`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + (i * 0.5),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}

        {/* Hexagonal energy patterns */}
        {(isListening || isProcessing) && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`hex-${i}`}
                className={`absolute w-2 h-2 rounded-full ${
                  isProcessing ? 'bg-nexa-purple' : 'bg-nexa-cyan'
                }`}
                style={{
                  left: `${80 + Math.cos((i * 60) * Math.PI / 180) * 100}px`,
                  top: `${80 + Math.sin((i * 60) * Math.PI / 180) * 100}px`,
                }}
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </>
        )}

        <motion.button
          onClick={onToggleListening}
          disabled={!isSupported || isProcessing || systemStatus === 'initializing'}
          className={`
            relative w-44 h-44 md:w-52 md:h-52 rounded-full border-2 
            transition-all duration-700 backdrop-blur-xl shadow-2xl overflow-hidden
            ${buttonState === 'initializing'
              ? 'border-gray-500 bg-gradient-to-r from-gray-800/30 to-gray-700/30 shadow-gray-500/20'
              : buttonState === 'processing'
                ? 'border-nexa-purple bg-gradient-to-r from-nexa-purple/25 to-indigo-500/25 shadow-nexa-purple/40'
                : buttonState === 'listening'
                  ? 'border-nexa-cyan bg-gradient-to-r from-nexa-cyan/25 to-nexa-teal/25 shadow-nexa-cyan/60' 
                  : 'border-nexa-glass-border bg-gradient-to-r from-nexa-glass/30 to-nexa-glass/60 hover:border-nexa-cyan/70 hover:bg-nexa-cyan/15 shadow-xl'
            }
            ${(!isSupported || isProcessing || systemStatus === 'initializing') 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95 cursor-pointer'
            }
          `}
          whileHover={isSupported && !isProcessing && systemStatus !== 'initializing' ? { 
            scale: 1.05,
            boxShadow: buttonState === 'listening' 
              ? '0 0 80px rgba(0, 246, 255, 0.7), 0 0 160px rgba(0, 246, 255, 0.4)'
              : '0 0 50px rgba(0, 246, 255, 0.5)'
          } : {}}
          whileTap={isSupported && !isProcessing && systemStatus !== 'initializing' ? { scale: 0.95 } : {}}
          animate={buttonState === 'listening' ? {
            scale: [1, 1.08, 1],
            boxShadow: [
              '0 0 60px rgba(0, 246, 255, 0.5)',
              '0 0 120px rgba(0, 246, 255, 0.9)',
              '0 0 60px rgba(0, 246, 255, 0.5)'
            ]
          } : buttonState === 'processing' ? {
            scale: [1, 1.06, 1],
            boxShadow: [
              '0 0 40px rgba(99, 102, 241, 0.5)',
              '0 0 80px rgba(99, 102, 241, 0.7)',
              '0 0 40px rgba(99, 102, 241, 0.5)'
            ]
          } : buttonState === 'initializing' ? {
            opacity: [0.5, 0.8, 0.5],
          } : {}}
          transition={{ duration: 2.5, repeat: (isListening || isProcessing || systemStatus === 'initializing') ? Infinity : 0 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, ${
                buttonState === 'processing' ? '#6366F1' : '#00F6FF'
              } 0%, transparent 50%), 
              radial-gradient(circle at 80% 80%, ${
                buttonState === 'processing' ? '#8B5CF6' : '#00FFC3'
              } 0%, transparent 50%)`
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Multiple concentric rings */}
          <div className="absolute inset-4 rounded-full border border-white/15 backdrop-blur-xs" />
          <div className="absolute inset-8 rounded-full border border-white/10 backdrop-blur-xs" />
          <div className="absolute inset-12 rounded-full border border-white/8 backdrop-blur-xs" />
          
          {/* Central energy core */}
          <motion.div
            className={`
              absolute inset-10 rounded-full backdrop-blur-md
              ${buttonState === 'initializing'
                ? 'bg-gradient-to-r from-gray-600/20 to-gray-500/20'
                : buttonState === 'processing'
                  ? 'bg-gradient-to-r from-nexa-purple/40 to-indigo-500/40'
                  : buttonState === 'listening'
                    ? 'bg-gradient-to-r from-nexa-cyan/40 to-nexa-teal/40'
                    : 'bg-gradient-to-r from-nexa-glass/30 to-nexa-glass/50'
              }
            `}
            animate={buttonState === 'listening' ? {
              opacity: [0.4, 0.9, 0.4],
              scale: [0.95, 1.05, 0.95],
            } : buttonState === 'processing' ? {
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360],
              scale: [0.95, 1.05, 0.95],
            } : buttonState === 'initializing' ? {
              opacity: [0.2, 0.5, 0.2],
              scale: [0.9, 1.1, 0.9],
            } : {}}
            transition={{ 
              duration: buttonState === 'processing' ? 4 : 2, 
              repeat: (isListening || isProcessing || systemStatus === 'initializing') ? Infinity : 0 
            }}
          />

          {/* Floating sparkles around the button */}
          {(isListening || isProcessing) && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${50 + Math.cos((i * 45) * Math.PI / 180) * 120}%`,
                    top: `${50 + Math.sin((i * 45) * Math.PI / 180) * 120}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          )}
          
          {/* Icon container with enhanced animations */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <motion.div
              animate={buttonState === 'listening' ? {
                scale: [1, 1.4, 1],
                rotate: [0, 5, -5, 0],
              } : buttonState === 'processing' ? {
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              } : buttonState === 'initializing' ? {
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5],
              } : {}}
              transition={{ 
                duration: buttonState === 'processing' ? 3 : buttonState === 'initializing' ? 2 : 1.5, 
                repeat: (isListening || isProcessing || systemStatus === 'initializing') ? Infinity : 0 
              }}
            >
              {buttonState === 'initializing' ? (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-12 h-12 md:w-14 md:h-14 text-gray-400" />
                </div>
              ) : buttonState === 'processing' ? (
                <div className="flex items-center justify-center">
                  <Brain className="w-12 h-12 md:w-14 md:h-14 text-nexa-purple" />
                  <motion.div
                    className="absolute"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-6 h-6 text-nexa-purple/60" />
                  </motion.div>
                </div>
              ) : isListening ? (
                <Mic className="w-12 h-12 md:w-14 md:h-14 text-nexa-cyan" />
              ) : (
                <MicOff className="w-12 h-12 md:w-14 md:h-14 text-gray-400" />
              )}
            </motion.div>
          </div>

          {/* Enhanced energy waves */}
          {isListening && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute inset-0 rounded-full border border-nexa-cyan/20"
                  animate={{
                    scale: [1, 3],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </motion.button>
      </motion.div>
      
      {/* Enhanced status text with better typography */}
      <motion.div
        className="mt-10 text-center max-w-md"
        animate={buttonState === 'listening' || buttonState === 'processing' || buttonState === 'initializing' ? {
          opacity: [0.8, 1, 0.8],
        } : {}}
        transition={{ duration: 2.5, repeat: (isListening || isProcessing || systemStatus === 'initializing') ? Infinity : 0 }}
      >
        <p className={`text-xl font-semibold mb-3 tracking-wide ${
          buttonState === 'initializing' ? 'text-gray-400' :
          buttonState === 'processing' ? 'text-nexa-purple' : 
          buttonState === 'listening' ? 'text-nexa-cyan' : 'text-gray-400'
        }`}>
          {!isSupported 
            ? 'Speech Recognition Unavailable'
            : buttonState === 'initializing'
              ? 'Initializing Nexa Systems...'
              : buttonState === 'processing'
                ? 'Processing Neural Networks...'
                : isListening 
                  ? 'Active - Listening for Commands' 
                  : 'Ready - Tap to Activate Voice Interface'
          }
        </p>
        <p className={`text-sm leading-relaxed ${
          buttonState === 'initializing' ? 'text-gray-600' :
          buttonState === 'processing' ? 'text-nexa-purple/70' :
          buttonState === 'listening' ? 'text-nexa-cyan/70' : 'text-gray-500'
        }`}>
          {!isSupported 
            ? 'Please use a compatible browser such as Chrome, Edge, or Safari for optimal voice interaction capabilities.'
            : buttonState === 'initializing'
              ? 'Loading voice recognition modules and neural language processors...'
              : buttonState === 'processing'
                ? 'Analyzing speech patterns and generating intelligent response using advanced AI models...'
                : isListening
                  ? 'Speak clearly and naturally. I can understand complex queries and conversational speech patterns.'
                  : 'Advanced AI assistant ready for voice commands. Supports natural language processing and contextual understanding.'
          }
        </p>
      </motion.div>
    </div>
  );
};
