import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Database, Activity } from 'lucide-react';

export const SystemDiagnostics: React.FC = () => {
  const [systemData, setSystemData] = useState({
    uptime: '00:00:00',
    connections: 1247,
    latency: 12,
    throughput: 89.7,
    security: 'OPTIMAL',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemData(prev => ({
        ...prev,
        connections: prev.connections + Math.floor(Math.random() * 10 - 5),
        latency: Math.max(8, prev.latency + Math.floor(Math.random() * 6 - 3)),
        throughput: Math.max(75, Math.min(95, prev.throughput + (Math.random() - 0.5) * 3)),
      }));
    }, 2000);

    const startTime = Date.now();
    const uptimeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const hours = String(Math.floor((elapsed / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((elapsed / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((elapsed / 1000) % 60)).padStart(2, '0');
        setSystemData(prev => ({ ...prev, uptime: `${hours}:${minutes}:${seconds}` }));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const diagnosticsItems = [
    { icon: Activity, label: 'UPTIME', value: systemData.uptime, color: 'text-green-400' },
    { icon: Globe, label: 'CONNECTIONS', value: systemData.connections.toLocaleString(), color: 'text-nexa-teal' },
    { icon: Zap, label: 'LATENCY', value: `${systemData.latency}ms`, color: 'text-yellow-400' },
    { icon: Database, label: 'THROUGHPUT', value: `${systemData.throughput.toFixed(1)}%`, color: 'text-nexa-purple' },
    { icon: Shield, label: 'SECURITY', value: systemData.security, color: 'text-green-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 1.5,
        },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 12 }
    },
  };

  return (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-40 right-8 z-20 w-64 flex flex-col items-end gap-6 pointer-events-none"
    >
        {diagnosticsItems.map((item, index) => (
            <motion.div
                key={index}
                variants={itemVariants}
                className="w-full flex items-center justify-end gap-4 group"
            >
                <div className="text-right">
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className={`text-base font-mono font-bold ${item.color}`}>{item.value}</p>
                </div>
                <div className={`relative flex items-center justify-center w-10 h-10 ${item.color}`}>
                    <motion.div 
                        className="absolute inset-0" 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 8 + index * 2, repeat: Infinity, ease: 'linear' }}
                    >
                        <item.icon size={22} />
                    </motion.div>
                    <motion.div 
                        className={`absolute inset-0 border rounded-full ${item.color.replace('text-', 'border-')}/30`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3, ease: 'easeInOut' }}
                    />
                </div>
            </motion.div>
        ))}
    </motion.div>
  );
};
