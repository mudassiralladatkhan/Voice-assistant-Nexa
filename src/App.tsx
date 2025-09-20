import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTextToSpeech } from './hooks/useTextToSpeech';

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [aiResponse, setAiResponse] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
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
      }, Math.random() * 1500 + 1200);
    }
  }, [transcript, isListening, lastCommand]);

  const generateAIResponse = (command: string): string => {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
      return "Hello there! I'm Nexa, your advanced AI assistant powered by cutting-edge language models. I'm designed to understand natural speech, process complex requests, and provide intelligent responses. What would you like to explore today?";
    }
    if (lowerCommand.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}. I've also noted this in my temporal context for our conversation. Is there anything else I can help you with regarding time or scheduling?`;
    }
    if (lowerCommand.includes('date')) {
      return `Today is ${new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. It's wonderful to be assisting you on this ${new Date().toLocaleDateString('en-GB', { weekday: 'long' })}! How can I make your day more productive?`;
    }
    if (lowerCommand.includes('weather')) {
      return "I'd be delighted to help you with weather information! In a production environment, I would connect to real-time weather APIs to provide accurate forecasts, alerts, and conditions for any location worldwide. Currently, I'm operating in demonstration mode. Would you like to see other capabilities I can showcase?";
    }
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      return "I'm designed as an advanced AI assistant with comprehensive capabilities! I can engage in natural conversations, answer questions, provide information, assist with tasks, and much more. In a full deployment, I'd connect to various APIs and services for real-time data, weather, news, calculations, and complex workflows. Feel free to test my conversational abilities or ask me anything!";
    }
    if (lowerCommand.includes('clear') || lowerCommand.includes('reset')) {
      setAiResponse('');
      setLastCommand('');
      return "Interface cleared and conversation context reset successfully. All previous exchanges have been cleared from memory. I'm now ready for fresh interactions. How may I assist you with your next request?";
    }
    if (lowerCommand.includes('capabilities') || lowerCommand.includes('features')) {
      return "My core capabilities include advanced natural language processing, real-time speech recognition, intelligent response generation, and contextual understanding. I'm built with enterprise-grade architecture designed for scalability, reliability, and seamless integration with various systems and APIs. This demonstration showcases my foundational voice interaction capabilities.";
    }
    
    const responses = [
      `I've processed your input: "${command}". In a full production environment, I would leverage advanced AI models, contextual memory, and real-time data sources to provide comprehensive, accurate responses tailored to your specific needs and preferences.`,
      `Thank you for your query: "${command}". This demonstrates my speech recognition and natural language understanding capabilities. In deployment, I would access live databases, APIs, and specialized knowledge systems to provide detailed, actionable responses.`,
      `I understand you said: "${command}". While currently in demonstration mode, I'm engineered with sophisticated AI architecture capable of handling complex workflows, multi-step reasoning, and integration with enterprise systems for comprehensive assistance.`
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
      <GridBackground />
      <ConstellationBackground />
      
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `linear-gradient(125deg, rgba(0, 246, 255, 0.1), rgba(99, 102, 241, 0.05), rgba(0, 255, 195, 0.1), rgba(236, 72, 153, 0.05))`,
          backgroundSize: '400% 400%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <InfoStrip />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 pt-40 pb-24">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-4 rounded-lg border border-red-500/40 bg-red-500/15 text-red-300 backdrop-blur-md max-w-md text-center"
          >
            <p className="font-semibold mb-1">System Error</p>
            <p className="text-xs">{error}</p>
          </motion.div>
        )}

        <motion.div
          className="flex flex-col items-center justify-center space-y-12 w-full max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <SoundWaveVisualizer isListening={isListening} isSpeaking={isSpeaking} isProcessing={isProcessing} />
          
          <NeuralSphere
            isListening={isListening}
            isProcessing={isProcessing}
            onToggleListening={handleToggleListening}
            isSupported={isSupported}
          />
          
          <CommandDisplay transcript={transcript} interimTranscript={interimTranscript} isListening={isListening} isProcessing={isProcessing} />
          
          <ResponsePanel response={aiResponse} onSpeak={handleSpeak} isSpeaking={isSpeaking} canSpeak={ttsSupported} isProcessing={isProcessing} />
        </motion.div>
      </main>

      <SystemStatus />
      <HelpToggle />
    </div>
  );
}

export default App;
