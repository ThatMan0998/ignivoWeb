"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
              Về IGNIVO
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              IGNIVO là đơn vị tiên phong trong lĩnh vực ứng dụng Trí Tuệ Nhân Tạo (AI) và Internet Vạn Vật (IoT) vào hệ thống cảnh báo và phòng cháy chữa cháy tại Việt Nam.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Sứ mệnh của chúng tôi là mang đến sự an tâm tuyệt đối cho mọi gia đình và doanh nghiệp thông qua các giải pháp công nghệ đột phá, phát hiện sớm rủi ro và phản ứng tức thì.
            </p>
            <div className="pt-4 flex gap-8">
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">99%</h4>
                <p className="text-sm font-medium text-foreground">Độ chính xác</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">0.2s</h4>
                <p className="text-sm font-medium text-foreground">Thời gian phản hồi</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">24/7</h4>
                <p className="text-sm font-medium text-foreground">Giám sát liên tục</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square md:aspect-video lg:aspect-square bg-background-tertiary rounded-3xl overflow-hidden border border-primary/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
              {/* Optional: Add an image here if available */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/logo.jpg" alt="IGNIVO Logo Large" width={200} height={200} className="opacity-100 transition-transform duration-500 hover:scale-105" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
