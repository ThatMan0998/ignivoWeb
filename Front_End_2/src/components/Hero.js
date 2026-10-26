"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import IgnivoRoomDemo from './IgnivoRoomDemo';

export default function Hero() {
  return (
    <section id="hero" className="mission-hero relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20">
      <div className="mission-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-primary-light">
              <span className="h-px w-8 bg-primary-light" /> IGNIVO / INTELLIGENT SAFETY
            </p>
            <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-semibold leading-[1.12] tracking-[-0.055em]">
              Phát hiện thông minh.<br />
              <span className="mission-gradient-text">Cảnh báo kịp thời.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-white/70">
              Nâng cấp camera IP hiện hữu bằng AI và điện toán biên. IGNIVO hỗ trợ phát hiện ngọn lửa, phân tích con người và cung cấp cảnh báo kèm bằng chứng trực quan, giúp người dùng chủ động nắm bắt tình huống.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="#solutions" 
                className="inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-1 hover:bg-primary-dark"
              >
                Trải nghiệm demo 
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="#solutions" 
                className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-white/80 hover:text-primary-light transition-colors"
              >
                Khám phá công nghệ 
                <ArrowDown className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2.5 text-xs font-semibold tracking-wider text-primary-light/80">
              <Sparkles className="h-3.5 w-3.5 text-primary-light" />
              <span>AI/CV · EDGE COMPUTING · INTELLIGENT ALERTS</span>
            </div>
          </motion.div>
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <IgnivoRoomDemo />
          </motion.div>
        </div>
        
        {/* 3 thông điệp dưới Hero */}
        <div className="mt-14 grid grid-cols-1 gap-6 border-t border-white/15 pt-7 text-sm sm:grid-cols-3">
          <div>
            <span className="flex items-center gap-2 font-semibold text-white">
              <b className="text-primary-light">01</b> Phát hiện bằng AI/CV
            </span>
            <p className="mt-1 text-xs text-white/55">Phân tích lửa và con người</p>
          </div>
          <div>
            <span className="flex items-center gap-2 font-semibold text-white">
              <b className="text-primary-light">02</b> Xử lý tại biên
            </span>
            <p className="mt-1 text-xs text-white/55">Phân tích và quản lý sự kiện</p>
          </div>
          <div>
            <span className="flex items-center gap-2 font-semibold text-white">
              <b className="text-primary-light">03</b> Cảnh báo thông minh
            </span>
            <p className="mt-1 text-xs text-white/55">Tại chỗ và từ xa</p>
          </div>
        </div>
      </div>
    </section>
  );
}
