import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Command, Mic } from 'lucide-react';

const commands = [
  { command: "Hello / Hi", description: "Initiate a greeting with Nexa." },
  { command: "What time is it?", description: "Get the current time." },
  { command: "What's the date?", description: "Get the current date." },
  { command: "Help / What can you do?", description: "Display this help panel." },
  { command: "Capabilities / Features", description: "Learn about Nexa's core functions." },
  { command: "Clear / Reset", description: "Clear the interface and conversation." },
];

export const HelpToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-30 w-16 h-16 rounded-full bg-nexa-glass/50 border border-nexa-glass-border backdrop-blur-lg flex items-center justify-center text-gray-400 hover:text-nexa-cyan hover:border-nexa-cyan/50 transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle help panel"
      >
        <HelpCircle size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-nexa-dark/90 border border-nexa-glass-border rounded-2xl p-8 shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Command className="w-7 h-7 text-nexa-cyan" />
                  <h2 className="text-2xl font-bold text-white">Voice Commands</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-gray-500 hover:bg-nexa-glass hover:text-white transition-colors"
                  aria-label="Close help panel"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-3">
                {commands.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-3 bg-nexa-glass rounded-lg border border-nexa-glass-border/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Mic className="w-5 h-5 text-nexa-teal mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-nexa-teal">{`"${item.command}"`}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
