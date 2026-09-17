"use client";

import { motion } from 'framer-motion';

const TEAM = [
  { name: 'Nguyễn Văn A', role: 'Giám Đốc Kỹ Thuật (CTO)' },
  { name: 'Trần Thị B', role: 'Trưởng Phòng AI' },
  { name: 'Lê Văn C', role: 'Chuyên Gia IoT' },
];

export default function Team() {
  return (
    <section id="team" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Đội Ngũ
          </h2>
          <p className="text-muted text-lg">
            Những chuyên gia hàng đầu đứng sau giải pháp IGNIVO.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center p-8 rounded-3xl bg-background border border-border hover:shadow-lg transition-all"
            >
              <div className="w-32 h-32 rounded-full bg-background-tertiary mb-6 overflow-hidden flex items-center justify-center text-primary font-bold text-3xl">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
