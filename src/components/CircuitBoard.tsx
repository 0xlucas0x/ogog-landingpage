import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Terminal, Sparkles, Aperture, Hexagon, Zap, Network, Layers } from 'lucide-react';

const MODELS = [
  { id: 'gemini', name: 'Gemini 3.1', color: '#4f46e5', x: 15, y: 15, Icon: Sparkles },
  { id: 'gpt', name: 'GPT 5.4', color: '#00a67e', x: 15, y: 50, Icon: Aperture },
  { id: 'grok', name: 'Grok4', color: '#0f172a', x: 15, y: 85, Icon: Zap },
  { id: 'claude', name: 'Claude 4.6', color: '#cc785c', x: 35, y: 25, Icon: Hexagon },
  { id: 'glm', name: 'GLM 5', color: '#0284c7', x: 35, y: 75, Icon: Network },
  { id: 'minimax', name: 'Minimax 2.5', color: '#e11d48', x: 55, y: 15, Icon: Layers },
];

const getPath = (model: typeof MODELS[0]) => {
  if (model.x === 15 && model.y === 15) return `M 15 15 L 45 15 L 45 50 L 55 50 L 90 50`;
  if (model.x === 15 && model.y === 50) return `M 15 50 L 55 50 L 90 50`;
  if (model.x === 15 && model.y === 85) return `M 15 85 L 45 85 L 45 50 L 55 50 L 90 50`;
  if (model.x === 35 && model.y === 25) return `M 35 25 L 55 25 L 55 50 L 90 50`;
  if (model.x === 35 && model.y === 75) return `M 35 75 L 55 75 L 55 50 L 90 50`;
  if (model.x === 55 && model.y === 15) return `M 55 15 L 55 50 L 90 50`;
  return `M ${model.x} ${model.y} L 55 ${model.y} L 55 50 L 90 50`;
};

export function CircuitBoard() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % MODELS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {MODELS.map((model, index) => {
          const isActive = activeNode === index;
          const path = getPath(model);
          
          return (
            <g key={model.id}>
              {/* Base Line */}
              <path
                d={path}
                fill="none"
                stroke="var(--color-outline-variant)"
                strokeOpacity="0.4"
                strokeWidth="0.4"
                strokeLinejoin="round"
                strokeDasharray="1 1"
              />
              {/* Animated Pulse */}
              <motion.path
                d={path}
                fill="none"
                stroke={model.color}
                strokeWidth="0.8"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isActive ? [0, 1] : 0,
                  opacity: isActive ? [0, 0.8, 0] : 0
                }}
                transition={{ 
                  duration: 3, 
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              />
              {/* Data Packet Dot */}
              {isActive && (
                <motion.circle
                  r="1.2"
                  fill={model.color}
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    ease: "linear",
                    times: [0, 0.1, 0.9, 1]
                  }}
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="1"
                    path={path}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </motion.circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Nodes */}
      {MODELS.map((model, index) => {
        const isActive = activeNode === index;
        return (
          <div
            key={model.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            style={{ left: `${model.x}%`, top: `${model.y}%` }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-ambient relative z-10 overflow-hidden"
              animate={{
                scale: isActive ? 1.05 : 1,
                boxShadow: isActive ? `0 12px 32px -4px ${model.color}30` : '0 12px 32px -4px rgba(11, 28, 48, 0.08)'
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
                animate={{ backgroundColor: isActive ? `${model.color}08` : 'transparent' }}
                transition={{ duration: 0.4 }}
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
            boxShadow: [
              `0 12px 32px -4px rgba(11, 28, 48, 0.08)`, 
              `0 12px 32px -4px ${MODELS[activeNode].color}40`, 
              `0 12px 32px -4px rgba(11, 28, 48, 0.08)`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ghost border */}
          <div className="absolute inset-0 rounded-2xl border border-outline-variant opacity-15 pointer-events-none" />

          {/* Inner chip details */}
          <motion.div 
            className="absolute inset-3 rounded-xl border border-outline-variant/10 bg-surface/50 backdrop-blur-sm"
            animate={{ backgroundColor: `${MODELS[activeNode].color}05` }}
            transition={{ duration: 0.5 }}
          />
          <motion.div 
            className="absolute inset-5 rounded-lg flex items-center justify-center border border-outline-variant/20 bg-surface-container-lowest"
            animate={{ 
              borderColor: `${MODELS[activeNode].color}30`,
              backgroundColor: `${MODELS[activeNode].color}0a`
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.span 
              className="font-display font-bold text-[0.6875rem] tracking-widest uppercase"
              animate={{ color: MODELS[activeNode].color }}
              transition={{ duration: 0.5 }}
            >
              GATEWAY
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
            boxShadow: `0 12px 32px -4px ${MODELS[activeNode].color}20`
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Ghost border */}
          <div className="absolute inset-0 rounded-xl border border-outline-variant opacity-15 pointer-events-none" />

          {/* Screen */}
          <div className="w-16 h-12 bg-surface rounded-md border border-outline-variant/20 flex items-center justify-center relative overflow-hidden shadow-inner">
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{ backgroundColor: MODELS[activeNode].color }}
              transition={{ duration: 0.5 }}
            />
            <Terminal className="w-5 h-5 text-on-surface-variant/50 relative z-10" />
            
            {/* Code lines animation */}
            <div className="absolute top-2 left-2 right-2 flex flex-col gap-1.5">
              <motion.div 
                className="h-0.5 bg-primary/30 rounded-full w-3/4"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="h-0.5 bg-primary/30 rounded-full w-1/2"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div 
                className="h-0.5 bg-primary/30 rounded-full w-full"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
          </div>
          
          {/* Base */}
          <div className="w-8 h-1.5 bg-surface-container-low mt-1.5 rounded-t-sm border border-outline-variant/20 border-b-0" />
          <div className="w-14 h-1.5 bg-outline-variant/20 rounded-sm" />
        </motion.div>
        
        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[0.6875rem] font-sans font-semibold uppercase tracking-wider text-on-surface-variant">
          Client
        </span>
      </div>
    </div>
  );
}
