"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Camera, Radio, BellRing } from 'lucide-react';
import IgnivoRoomDemo from './IgnivoRoomDemo';

export default function Hero() {
  return (
    <section id="hero" className="mission-hero relative overflow-hidden pt-36 pb-10 lg:pt-44">
      <div className="mission-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-7 flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-primary-light"><span className="h-px w-8 bg-primary-light" /> IGNIVO / INTELLIGENT SAFETY</p>
            <h1 className="text-[clamp(2.8rem,5.4vw,4.6rem)] font-semibold leading-[1.12] tracking-[-0.055em]">Phát hiện sớm.<br /><span className="mission-gradient-text">Bảo vệ kịp thời.</span></h1>
            <p className="mt-7 max-w-md text-base leading-8 text-white/65">Biến camera và cảm biến thành một hệ thống bảo vệ chủ động. Nhìn thấy rủi ro, kết nối thông tin, cảnh báo đúng lúc.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="#contact" className="inline-flex items-center gap-4 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-1 hover:bg-primary-dark">Nhận tư vấn giải pháp <ArrowRight className="h-4 w-4" /></Link>
              <Link href="#how-it-works" className="inline-flex items-center gap-2 px-2 py-4 text-sm font-medium text-white/80 hover:text-primary-light">Cách hoạt động <ArrowDown className="h-4 w-4" /></Link>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs text-white/50"><span className="flex -space-x-2">{[Camera, Radio, BellRing].map((Icon, i) => <span key={i} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#121212]"><Icon className="h-4 w-4 text-primary-light" /></span>)}</span>Camera AI + IoT + Cảnh báo đa kênh</div>
          </motion.div>
          <motion.div className="min-w-0" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}><IgnivoRoomDemo /></motion.div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-5 border-t border-white/15 pt-7 text-sm text-white/60 sm:grid-cols-3"><span><b className="mr-3 text-primary-light">01</b> Nhìn thấy dấu hiệu bất thường</span><span><b className="mr-3 text-primary-light">02</b> Kết nối mọi tín hiệu</span><span><b className="mr-3 text-primary-light">03</b> Chủ động thông báo</span></div>
      </div>
    </section>
  );
}
