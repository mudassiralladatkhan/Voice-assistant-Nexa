import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeuralSphere } from './components/NeuralSphere';
import { CommandDisplay } from './components/CommandDisplay';
import { ResponsePanel } from './components/ResponsePanel';
import { InfoStrip } from './components/InfoStrip';
import { ConstellationBackground } from './components/ConstellationBackground';
import { SystemStatus } from './components/SystemStatus';
import { SoundWaveVisualizer } from './components/SoundWaveVisualizer';
import { GridBackground } from './components/GridBackground';
import { BootSequence } from './components/BootSequence';
import { HelpToggle } from './components/HelpToggle';
import { HolographicDisplay } from './components/HolographicDisplay';
import { SystemDiagnostics } from './components/SystemDiagnostics';
import { QuantumField } from './components/QuantumField';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTextToSpeech } from './hooks/useTextToSpeech';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [aiResponse, setAiResponse] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemPower, setSystemPower] = useState(85);
  
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const {
    speak,
    isSpeaking,
    isSupported: ttsSupported,
    stop: stopSpeaking,
  } = useTextToSpeech();

  useEffect(() => {
    if (transcript && transcript !== lastCommand && !isListening) {
      setLastCommand(transcript);
      setIsProcessing(true);
      setAiResponse('');
      
      setTimeout(() => {
        const response = generateAIResponse(transcript);
        setAiResponse(response);
        setIsProcessing(false);
        setSystemPower(prev => Math.min(prev + 2, 100));
      }, Math.random() * 1500 + 1200);
    }
  }, [transcript, isListening, lastCommand]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemPower(prev => Math.max(prev - 0.1, 75));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateAIResponse = (command: string): string => {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      return "Good day, sir. I am NEXA, your advanced artificial intelligence assistant. My systems are operating at optimal parameters and I am fully prepared to assist you with any computational, analytical, or informational requirements you may have.";
    }
    if (lowerCommand.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}. I have synchronized this information with global atomic time standards and adjusted for your local time zone. Is there anything else regarding temporal coordination you require?`;
    }
    if (lowerCommand.includes('date')) {
      return `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. I have cross-referenced this with multiple calendar systems and astronomical data to ensure absolute accuracy. How may I further assist you on this ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}?`;
    }
    if (lowerCommand.includes('weather')) {
      return "I would be pleased to provide comprehensive meteorological analysis. In a fully operational deployment, I would access real-time atmospheric data from multiple satellite networks, ground stations, and weather monitoring systems to deliver precise forecasts with probability matrices. Currently operating in demonstration mode with limited external connectivity.";
    }
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      return "I am engineered as a comprehensive artificial intelligence platform with advanced natural language processing, contextual understanding, and multi-modal interaction capabilities. In full deployment, I interface with global information networks, perform complex analytical computations, and provide strategic decision support across multiple domains. My current demonstration showcases core voice interaction protocols.";
    }
    if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      setAiResponse('');
      setLastCommand('');
      return "Interface cleared and neural pathways reset. All conversation history has been purged from active memory buffers. System diagnostics confirm optimal operational status. Ready to receive new directives, sir.";
    }
    if (lowerCommand.includes('capabilities') || lowerCommand.includes('features')) {
      return "My core architecture integrates quantum-enhanced processing units, advanced neural networks, and real-time data fusion capabilities. I am designed for enterprise-grade computational intelligence, strategic analysis, and seamless human-AI collaboration. This demonstration represents a fraction of my full operational capacity.";
    }
    
    const responses = [
      `Command acknowledged: "${command}". In full operational capacity, I would process this request through my advanced AI matrix, accessing real-time global databases and applying sophisticated analytical algorithms to provide comprehensive, actionable intelligence tailored to your specific requirements.`,
      `Processing directive: "${command}". My neural pathways have analyzed your request and would typically interface with external systems, perform multi-dimensional analysis, and deliver precise solutions with supporting data visualizations and probability assessments.`,
      `Request received: "${command}". In a production environment, I would leverage my quantum processing capabilities, access classified databases, and employ predictive modeling to generate strategic recommendations with complete situational awareness integration.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      if (isSpeaking) stopSpeaking();
      startListening();
    }
  };

  const handleSpeak = () => {
    if (aiResponse) {
      if (isSpeaking) stopSpeaking();
      else speak(aiResponse);
    }
  };

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nexa-darker via-nexa-dark to-black text-white overflow-hidden relative font-mono">
      <QuantumField />
      <GridBackground />
      <ConstellationBackground />
      
      {/* Enhanced ambient glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 246, 255, 0.15), transparent 70%), 
                      radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1), transparent 60%),
                      radial-gradient(circle at 80% 20%, rgba(0, 255, 195, 0.12), transparent 65%),
                      radial-gradient(circle at 60% 90%, rgba(236, 72, 153, 0.08), transparent 55%)`,
        }}
        animate={{ 
          background: [
            `radial-gradient(circle at 50% 50%, rgba(0, 246, 255, 0.15), transparent 70%), 
             radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1), transparent 60%),
             radial-gradient(circle at 80% 20%, rgba(0, 255, 195, 0.12), transparent 65%),
             radial-gradient(circle at 60% 90%, rgba(236, 72, 153, 0.08), transparent 55%)`,
            `radial-gradient(circle at 30% 40%, rgba(0, 246, 255, 0.18), transparent 75%), 
             radial-gradient(circle at 70% 60%, rgba(99, 102, 241, 0.12), transparent 65%),
             radial-gradient(circle at 40% 80%, rgba(0, 255, 195, 0.15), transparent 70%),
             radial-gradient(circle at 90% 30%, rgba(236, 72, 153, 0.1), transparent 60%)`,
            `radial-gradient(circle at 50% 50%, rgba(0, 246, 255, 0.15), transparent 70%), 
             radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1), transparent 60%),
             radial-gradient(circle at 80% 20%, rgba(0, 255, 195, 0.12), transparent 65%),
             radial-gradient(circle at 60% 90%, rgba(236, 72, 153, 0.08), transparent 55%)`
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <InfoStrip systemPower={systemPower} />
      <SystemDiagnostics />
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-32 left-1/2 transform -translate-x-1/2 z-30 p-6 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-900/30 to-red-800/20 text-red-300 backdrop-blur-md max-w-md text-center shadow-2xl"
        >
          <motion.div
            className="absolute inset-0 rounded-xl border border-red-400/30"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="font-semibold mb-2 text-red-200">System Alert</p>
          <p className="text-sm">{error}</p>
        </motion.div>
      )}

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 pt-40 pb-24">
        <motion.div
          className="flex flex-col items-center justify-center space-y-16 w-full max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        >
          <SoundWaveVisualizer 
            isListening={isListening} 
            isSpeaking={isSpeaking} 
            isProcessing={isProcessing} 
          />
          
          <div className="relative">
            <NeuralSphere
              isListening={isListening}
              isProcessing={isProcessing}
              onToggleListening={handleToggleListening}
              isSupported={isSupported}
            />
            
            <HolographicDisplay 
              isActive={isListening || isProcessing}
              mode={isProcessing ? 'processing' : isListening ? 'listening' : 'idle'}
            />
          </div>
          
          <CommandDisplay 
            transcript={transcript} 
            interimTranscript={interimTranscript} 
            isListening={isListening} 
            isProcessing={isProcessing} 
          />
          
          <ResponsePanel 
            response={aiResponse} 
            onSpeak={handleSpeak} 
            isSpeaking={isSpeaking} 
            canSpeak={ttsSupported} 
            isProcessing={isProcessing} 
          />
        </motion.div>
      </main>

      <SystemStatus />
      <HelpToggle />
      
      {/* Floating data streams */}
      <AnimatePresence>
        {(isListening || isProcessing) && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`data-stream-${i}`}
                className="fixed w-px bg-gradient-to-t from-transparent via-nexa-cyan/60 to-transparent"
                style={{
                  left: `${10 + i * 15}%`,
                  height: '100vh',
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scaleY: [0, 1, 0],
                  y: [100, -100]
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
