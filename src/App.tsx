/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CircuitBoard } from './components/CircuitBoard';
import { ArrowRight, Terminal, Cpu, Network } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface overflow-hidden font-sans selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-[12px] border-b border-outline-variant/15">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-ambient">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-on-surface">AI Gateway</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[0.875rem] font-medium text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">Features</a>
            <a href="#" className="hover:text-primary transition-colors">Models</a>
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[0.875rem] font-medium text-on-surface-variant hover:text-primary transition-colors">Log in</button>
            <button className="text-[0.875rem] font-medium bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-md hover:bg-surface-container-high transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-8 pt-32 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Copy */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-low text-primary text-[0.6875rem] font-bold uppercase tracking-wider mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                v2.0 is now live
              </div>
              <h1 className="text-[3.5rem] md:text-[4.5rem] font-display font-bold tracking-tight mb-6 leading-[1.05] text-on-surface">
                One API for <br />
                <span className="text-primary">
                  Every LLM.
                </span>
              </h1>
              <p className="text-[0.875rem] md:text-base text-on-surface-variant mb-10 leading-relaxed max-w-xl">
                Route, balance, and monitor your AI traffic through a single, unified gateway. Switch between Gemini, OpenAI, Anthropic, and open-source models with zero code changes.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-br from-primary to-primary-container text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-ambient group">
                  Start Building Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-md bg-transparent text-on-surface font-medium hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Read the Docs
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-[0.6875rem] uppercase tracking-wider font-bold text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-primary" />
                  <span>99.99% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span>50+ Models Supported</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Circuit Board Animation */}
          <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center bg-surface-container-low rounded-xl p-8">
            <CircuitBoard />
          </div>
        </div>
      </main>
    </div>
  );
}
