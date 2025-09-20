import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto px-4 h-32">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative p-6 rounded-2xl border bg-nexa-glass backdrop-blur-xl shadow-2xl h-full flex flex-col justify-center"
          >
            <motion.div 
              className="absolute inset-0 rounded-2xl border-nexa-cyan/30"
              initial={{
                maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
              }}
              animate={{ 
                maskImage: ['linear-gradient(to right, transparent, white 20%, white 80%, transparent)', 'linear-gradient(to right, white, transparent 20%, transparent 80%, white)'],
                WebkitMaskImage: ['linear-gradient(to right, transparent, white 20%, white 80%, transparent)', 'linear-gradient(to right, white, transparent 20%, transparent 80%, white)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-nexa-cyan" />
              <span className="text-nexa-cyan font-mono text-sm uppercase tracking-wider font-bold">
                Voice Input
              </span>
            </div>
            
            <div className="min-h-[2rem] flex items-center">
              {displayText ? (
                <p className="text-white text-lg md:text-xl leading-relaxed font-light">
                  <span className="text-gray-200">{transcript}</span>
                  <span className="text-nexa-cyan/80 italic">{interimTranscript}</span>
                </p>
              ) : isProcessing ? (
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-nexa-purple" />
                  <span className="text-nexa-purple text-lg italic">Processing command...</span>
                </div>
              ) : isListening ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-lg italic">Listening...</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-nexa-cyan text-xl font-bold"
                  >|</motion.span>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
