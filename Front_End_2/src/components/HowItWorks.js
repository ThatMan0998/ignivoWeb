"use client";

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Phát Hiện',
    description: 'Cảm biến và Camera AI liên tục giám sát, phân tích môi trường xung quanh.',
  },
  {
    num: '02',
    title: 'Xử Lý',
    description: 'Hệ thống gửi dữ liệu về máy chủ trung tâm để xác minh sự cố trong mili-giây.',
  },
  {
    num: '03',
    title: 'Cảnh Báo',
    description: 'Kích hoạt còi báo động, gửi thông báo khẩn cấp đến ứng dụng và số điện thoại.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Cách Hoạt Động
          </h2>
          <p className="text-background-tertiary text-lg">
            Quy trình phản ứng nhanh chóng và chính xác tuyệt đối.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-white/10" />
          
          {STEPS.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-primary-light mb-6 relative z-10 backdrop-blur-sm">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-background-tertiary leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
