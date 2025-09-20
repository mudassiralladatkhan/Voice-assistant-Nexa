import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const QuantumField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      energy: number;
      phase: number;
      size: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize quantum particles
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          energy: Math.random(),
          phase: Math.random() * Math.PI * 2,
          size: Math.random() * 2 + 0.5,
        });
      }
    };

    const drawQuantumField = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        particle.phase += 0.02;
        
        // Quantum fluctuation
        particle.energy = 0.5 + 0.5 * Math.sin(time * 0.001 + particle.phase);
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;
        
        // Calculate depth-based properties
        const depth = 1 - particle.z / 1000;
        const alpha = depth * particle.energy * 0.8;
        const size = particle.size * depth;
        
        // Draw particle with quantum glow
        if (alpha > 0.1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          
          // Create quantum energy color
          const hue = (particle.energy * 60 + 180) % 360;
          const saturation = 80 + particle.energy * 20;
          const lightness = 50 + particle.energy * 30;
          
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
          ctx.fill();
          
          // Add energy field
          if (particle.energy > 0.7) {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${alpha * 0.2})`;
            ctx.fill();
          }
        }
        
        // Draw quantum entanglement lines
        particles.forEach((otherParticle, otherIndex) => {
          if (index >= otherIndex) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dz = particle.z - otherParticle.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < 120 && Math.abs(particle.energy - otherParticle.energy) < 0.3) {
            const lineAlpha = (1 - distance / 120) * 0.3 * Math.min(particle.energy, otherParticle.energy);
            
            if (lineAlpha > 0.05) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                otherParticle.x, otherParticle.y
              );
              gradient.addColorStop(0, `rgba(0, 246, 255, ${lineAlpha})`);
              gradient.addColorStop(0.5, `rgba(99, 102, 241, ${lineAlpha * 1.5})`);
              gradient.addColorStop(1, `rgba(0, 255, 195, ${lineAlpha})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });
      
      animationId = requestAnimationFrame(drawQuantumField);
    };

    resizeCanvas();
    drawQuantumField(0);
    
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />
      
      {/* Quantum field overlay effects */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(0, 246, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 195, 0.06) 0%, transparent 70%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Energy distortion waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: `conic-gradient(from ${i * 120}deg, transparent 0deg, rgba(0, 246, 255, 0.05) 30deg, transparent 60deg)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 25 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
};
