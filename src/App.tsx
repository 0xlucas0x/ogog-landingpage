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
            <span className="text-xl font-display font-bold tracking-tight text-on-surface">OGOG.AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[0.875rem] font-medium text-on-surface-variant">
            <a href="#" className="hover:text-primary transition-colors">功能</a>
            <a href="#" className="hover:text-primary transition-colors">模型</a>
            <a href="#" className="hover:text-primary transition-colors">文档</a>
            <a href="#" className="hover:text-primary transition-colors">定价</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-[0.875rem] font-medium text-on-surface-variant hover:text-primary transition-colors">登录</button>
            <button className="text-[0.875rem] font-medium bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-md hover:bg-surface-container-high transition-colors">
              开始使用
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
                v2.0 现已发布
              </div>
              <h1 className="text-[3.5rem] md:text-[4.5rem] font-display font-bold tracking-tight mb-6 leading-[1.05] text-on-surface">
                一个 API，<br />
                <span className="text-primary">
                  连接所有大模型。
                </span>
              </h1>
              <p className="text-[0.875rem] md:text-base text-on-surface-variant mb-10 leading-relaxed max-w-xl">
                通过单一、统一的网关路由、负载均衡和监控您的 AI 流量。在 Gemini、OpenAI、Anthropic 和开源模型之间无缝切换，无需更改任何代码。
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-br from-primary to-primary-container text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-ambient group">
                  免费开始构建
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-md bg-transparent text-on-surface font-medium hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" />
                  阅读文档
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-8 text-[0.6875rem] uppercase tracking-wider font-bold text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-primary" />
                  <span>99.99% 正常运行时间</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  <span>支持 50+ 种模型</span>
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
