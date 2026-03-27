import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, Aperture, Hexagon, Zap, Network, Layers } from 'lucide-react';

const MODELS = [
  { id: 'gemini', name: 'Gemini 3.1', color: '#4f46e5', x: 15, y: 15, Icon: Sparkles },
  { id: 'gpt', name: 'GPT 5.4', color: '#00a67e', x: 15, y: 50, Icon: Aperture },
  { id: 'grok', name: 'Grok4', color: '#0f172a', x: 15, y: 85, Icon: Zap },
  { id: 'claude', name: 'Claude 4.6', color: '#cc785c', x: 35, y: 25, Icon: Hexagon },
  { id: 'glm', name: 'GLM 5', color: '#0284c7', x: 35, y: 75, Icon: Network },
  { id: 'minimax', name: 'Minimax 2.5', color: '#e11d48', x: 55, y: 15, Icon: Layers },
];

const getPath = (model: typeof MODELS[0]) => {
  const endX = 82;
  
  if (model.id === 'gemini') return `M 19 15 L 44 15 L 44 44 L 55 44 L 55 50 L ${endX} 50`;
  if (model.id === 'gpt') return `M 19 50 L ${endX} 50`;
  if (model.id === 'grok') return `M 19 85 L 44 85 L 44 56 L 55 56 L 55 50 L ${endX} 50`;
  if (model.id === 'claude') return `M 39 25 L 41 25 L 41 47 L 55 47 L 55 50 L ${endX} 50`;
  if (model.id === 'glm') return `M 39 75 L 41 75 L 41 53 L 55 53 L 55 50 L ${endX} 50`;
  if (model.id === 'minimax') return `M 55 20 L 55 50 L ${endX} 50`;
  
  return `M ${model.x + 4} ${model.y} L 55 ${model.y} L 55 50 L ${endX} 50`;
};

interface Pulse {
  id: number;
  modelIndex: number;
  duration: number;
}

export function CircuitBoard() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    let pulseId = 0;
    // Fire a new pulse every 800ms
    const interval = setInterval(() => {
      // 30% chance to fire 2 models at the same time
      const numPulses = Math.random() > 0.7 ? 2 : 1;
      
      const newPulses: Pulse[] = [];
      for (let i = 0; i < numPulses; i++) {
        const modelIndex = Math.floor(Math.random() * MODELS.length);
        // Random duration between 2.0s and 4.5s for variable speed
        const duration = 2.0 + Math.random() * 2.5;
        const id = pulseId++;
        newPulses.push({ id, modelIndex, duration });
        
        // Remove this specific pulse after its animation completes
        setTimeout(() => {
          setPulses(prev => prev.filter(p => p.id !== id));
        }, duration * 1000);
      }
      
      setPulses(prev => [...prev, ...newPulses]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const activeModelIndices = Array.from(new Set(pulses.map(p => p.modelIndex)));
  const activeColors = activeModelIndices.map(i => MODELS[i].color);
  const latestColor = activeColors.length > 0 ? activeColors[activeColors.length - 1] : 'var(--color-outline-variant)';

  const combinedShadow = activeColors.length > 0
    ? activeColors.map(c => `0 12px 32px -4px ${c}50`).join(', ')
    : `0 12px 32px -4px rgba(11, 28, 48, 0.08)`;

  return (
    <div className="relative w-full h-full max-w-[600px] max-h-[500px] rounded-xl overflow-hidden bg-surface-container-low">
      {/* Schematic Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-on-surface) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <filter id="glow" filterUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="140">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Base Lines */}
        {MODELS.map((model) => (
          <path
            key={`base-${model.id}`}
            d={getPath(model)}
            fill="none"
            stroke="var(--color-outline-variant)"
            strokeOpacity="0.4"
            strokeWidth="0.2"
            strokeLinejoin="round"
            strokeDasharray="1 1"
          />
        ))}

        {/* Animated Pulses */}
        <AnimatePresence>
          {pulses.map((pulse) => {
            const model = MODELS[pulse.modelIndex];
            const path = getPath(model);
            return (
              <g key={`pulse-${pulse.id}`}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke={model.color}
                  strokeWidth="0.4"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1],
                    opacity: [0, 0.8, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: pulse.duration, 
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                />
                <motion.circle
                  r="0.8"
                  fill={model.color}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: pulse.duration,
                    ease: "linear",
                    times: [0, 0.1, 0.9, 1]
                  }}
                >
                  <animateMotion
                    dur={`${pulse.duration}s`}
                    repeatCount="1"
                    path={path}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </motion.circle>
              </g>
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Nodes */}
      {MODELS.map((model, index) => {
        const isActive = activeModelIndices.includes(index);
        return (
          <div
            key={model.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            style={{ left: `${model.x}%`, top: `${model.y}%` }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-ambient relative z-10 overflow-hidden"
              animate={{
                scale: isActive ? 1.15 : 1,
                boxShadow: isActive ? `0 12px 32px -4px ${model.color}60` : '0 12px 32px -4px rgba(11, 28, 48, 0.08)',
                opacity: isActive ? [1, 0.6, 1] : 1
              }}
              transition={{ 
                scale: { duration: 0.2, ease: "easeOut" },
                boxShadow: { duration: 0.2, ease: "easeOut" },
                opacity: { duration: 2, ease: "easeInOut", repeat: isActive ? Infinity : 0 }
              }}
            >
              {/* Ghost border fallback */}
              <div className="absolute inset-0 rounded-xl border border-outline-variant opacity-15 pointer-events-none" />
              
              <model.Icon 
                className="w-6 h-6 relative z-10 transition-colors duration-300" 
                style={{ color: isActive ? model.color : 'var(--color-on-surface-variant)' }} 
              />
              
              {/* Active overlay wash */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundColor: isActive ? `${model.color}15` : 'transparent' }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <span className="text-[0.6875rem] font-sans font-semibold uppercase tracking-wider text-on-surface-variant">
              {model.name}
            </span>
          </div>
        );
      })}

      {/* Central Gateway Node */}
      <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: '55%' }}>
        <motion.div 
          className="w-28 h-28 rounded-2xl bg-surface-container-lowest flex items-center justify-center relative shadow-ambient overflow-hidden"
          animate={{
            boxShadow: combinedShadow
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Ghost border */}
          <div className="absolute inset-0 rounded-2xl border border-outline-variant opacity-15 pointer-events-none" />

          {/* Inner chip details */}
          <motion.div 
            className="absolute inset-3 rounded-xl border border-outline-variant/10 bg-surface/50 backdrop-blur-sm"
            animate={{ backgroundColor: activeColors.length > 0 ? `${latestColor}05` : 'transparent' }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute inset-5 rounded-lg flex items-center justify-center border border-outline-variant/20 bg-surface-container-lowest"
            animate={{ 
              borderColor: activeColors.length > 0 ? `${latestColor}30` : 'var(--color-outline-variant)',
              backgroundColor: activeColors.length > 0 ? `${latestColor}0a` : 'transparent'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="font-display font-bold text-[0.6875rem] tracking-widest uppercase"
              animate={{ color: activeColors.length > 0 ? latestColor : 'var(--color-on-surface-variant)' }}
              transition={{ duration: 0.3 }}
            >
              OGOG.AI
            </motion.span>
          </motion.div>
          
          {/* Pins */}
          <div className="absolute -left-1.5 top-6 bottom-6 w-1.5 flex flex-col justify-between py-1">
            {[1,2,3,4].map(i => <div key={i} className="w-full h-1 bg-outline-variant/30 rounded-l-sm" />)}
          </div>
          <div className="absolute -right-1.5 top-6 bottom-6 w-1.5 flex flex-col justify-between py-1">
            {[1,2,3,4].map(i => <div key={i} className="w-full h-1 bg-outline-variant/30 rounded-r-sm" />)}
          </div>
          <div className="absolute -top-1.5 left-6 right-6 h-1.5 flex justify-between px-1">
            {[1,2,3,4].map(i => <div key={i} className="w-1 h-full bg-outline-variant/30 rounded-t-sm" />)}
          </div>
          <div className="absolute -bottom-1.5 left-6 right-6 h-1.5 flex justify-between px-1">
            {[1,2,3,4].map(i => <div key={i} className="w-1 h-full bg-outline-variant/30 rounded-b-sm" />)}
          </div>
        </motion.div>
      </div>

      {/* Terminal / Client Node */}
      <div className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: '90%' }}>
        <motion.div 
          className="w-24 h-24 rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center relative shadow-ambient"
          animate={{
            boxShadow: combinedShadow
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Ghost border */}
          <div className="absolute inset-0 rounded-xl border border-outline-variant opacity-15 pointer-events-none" />

          {/* Screen */}
          <div className="w-16 h-12 bg-surface rounded-md border border-outline-variant/20 flex items-center justify-center relative overflow-hidden shadow-inner">
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{ backgroundColor: activeColors.length > 0 ? latestColor : 'transparent' }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Code lines animation */}
            <div className="absolute top-2 left-2 right-2 flex flex-col gap-1.5">
              <motion.div 
                className="h-0.5 rounded-full w-3/4"
                animate={{ 
                  opacity: activeColors.length > 0 ? [0.4, 1, 0.4] : 0.2,
                  backgroundColor: activeColors.length > 0 ? latestColor : 'var(--color-primary)'
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="h-0.5 rounded-full w-1/2"
                animate={{ 
                  opacity: activeColors.length > 0 ? [0.4, 1, 0.4] : 0.2,
                  backgroundColor: activeColors.length > 0 ? latestColor : 'var(--color-primary)'
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="h-0.5 rounded-full w-full"
                animate={{ 
                  opacity: activeColors.length > 0 ? [0.4, 1, 0.4] : 0.2,
                  backgroundColor: activeColors.length > 0 ? latestColor : 'var(--color-primary)'
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>
          
          {/* Base */}
          <div className="w-8 h-1.5 bg-surface-container-low mt-1.5 rounded-t-sm border border-outline-variant/20 border-b-0" />
          <div className="w-14 h-1.5 bg-outline-variant/20 rounded-sm" />
        </motion.div>
      </div>
    </div>
  );
}
