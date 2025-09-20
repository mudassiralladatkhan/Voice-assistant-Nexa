import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mic, Volume2, AlertTriangle, Wifi } from 'lucide-react';

interface StatusIndicatorProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  hasError: boolean;
}

const statusIcons = [
  { key: 'listening', icon: Mic, color: 'text-nexa-cyan' },
  { key: 'processing', icon: Brain, color: 'text-nexa-purple' },
  { key: 'speaking', icon: Volume2, color: 'text-nexa-teal' },
  { key: 'error', icon: AlertTriangle, color: 'text-red-500' },
];

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  isListening,
  isProcessing,
  isSpeaking,
  hasError,
}) => {
  const activeStatuses = [
    { key: 'listening', active: isListening },
    { key: 'processing', active: isProcessing },
    { key: 'speaking', active: isSpeaking },
    { key: 'error', active: hasError },
  ];

  return (
    <motion.div
      className="absolute top-24 left-6 md:left-8 z-20 flex items-center gap-2 p-2 rounded-full border border-nexa-glass-border bg-nexa-glass/50 backdrop-blur-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-1 text-green-400" title="Connection Status: Secure">
        <Wifi size={16} />
      </div>
      <div className="w-px h-4 bg-nexa-glass-border/50" />
      <AnimatePresence>
        {activeStatuses.filter(s => s.active).map(status => {
          const IconData = statusIcons.find(i => i.key === status.key);
          if (!IconData) return null;
          const Icon = IconData.icon;
          return (
            <motion.div
              key={status.key}
              initial={{ opacity: 0, scale: 0.5, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.5, width: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center ${IconData.color}`}
              title={status.key.charAt(0).toUpperCase() + status.key.slice(1)}
            >
              <Icon size={16} className="mx-1" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
