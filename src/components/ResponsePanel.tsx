import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Loader2 } from 'lucide-react';
import { useTypingEffect } from '../hooks/useTypingEffect';

interface ResponsePanelProps {
  response: string;
  onSpeak: () => void;
  isSpeaking: boolean;
  canSpeak: boolean;
  isProcessing: boolean;
}

export const ResponsePanel: React.FC<ResponsePanelProps> = ({
  response,
  onSpeak,
  isSpeaking,
  canSpeak,
  isProcessing,
}) => {
  const displayedText = useTypingEffect(response, 25);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <AnimatePresence>
        {(response || isProcessing) && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative p-8 md:p-10 rounded-2xl border border-nexa-glass-border bg-gradient-to-br from-nexa-glass/50 to-nexa-glass/20 backdrop-blur-2xl shadow-2xl min-h-[200px]"
          >
             <motion.div 
              className="absolute inset-0 rounded-2xl border-nexa-teal/30 pointer-events-none"
              animate={{ 
                maskImage: ['linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)', 'linear-gradient(to bottom, white, transparent 20%, transparent 80%, white)'],
                WebkitMaskImage: ['linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)', 'linear-gradient(to bottom, white, transparent 20%, transparent 80%, white)'],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Sparkles className="w-6 h-6 text-nexa-teal" />
                <div>
                  <h3 className="text-nexa-teal font-mono text-sm uppercase tracking-wider font-bold">Nexa Response</h3>
                  <p className="text-xs text-gray-500">AI Language Model</p>
                </div>
              </div>
              
              {canSpeak && !isProcessing && response && (
                <motion.button
                  onClick={onSpeak}
                  className={`p-2 rounded-full transition-colors duration-300 ${isSpeaking ? 'text-nexa-teal' : 'text-gray-400 hover:text-nexa-cyan'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isSpeaking ? <Volume2 size={22} /> : <VolumeX size={22} />}
                </motion.button>
              )}
            </div>
            
            <div className="relative">
              {isProcessing ? (
                <div className="flex items-center gap-4 py-8">
                  <Loader2 className="w-8 h-8 text-nexa-purple animate-spin" />
                  <div>
                    <p className="text-nexa-purple text-lg font-medium">Generating response...</p>
                    <p className="text-gray-400 text-sm">Analyzing neural pathways.</p>
                  </div>
                </div>
              ) : (
                <p className="text-white text-lg md:text-xl leading-relaxed font-light tracking-wide">
                  {displayedText}
                  <motion.span
                    className="inline-block w-0.5 h-6 bg-nexa-cyan ml-1"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    style={{ verticalAlign: 'text-bottom' }}
                  />
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
