"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroScene from './HeroScene';
import Link from 'next/link';
import HeroPointerGlow from './HeroPointerGlow';
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-background">
      <HeroPointerGlow />
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <HeroScene>
        <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col items-center text-center">


          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background-tertiary border border-primary/10 text-primary text-xs font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              KIẾN TRÚC AN NINH THẾ HỆ MỚI
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Hệ Sinh Thái <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Báo Cháy Thông Minh
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Phát hiện sớm các rủi ro cháy nổ và xâm nhập trái phép bằng sức mạnh của Trí Tuệ Nhân Tạo và IoT.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
          >
            <Link
              href="#contact"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
            >
              Bắt Đầu Ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-center px-8 py-4 rounded-full bg-white text-foreground border border-border font-semibold hover:bg-background-secondary transition-all"
            >
              Tìm Hiểu Thêm
            </Link>
          </motion.div>
        </div>
      </HeroScene>
    </section>
  );
}
