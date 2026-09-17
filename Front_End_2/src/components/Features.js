"use client";

import { motion } from 'framer-motion';
import { Shield, Zap, Bell, Cpu, Cloud, Smartphone } from 'lucide-react';

const FEATURES = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: 'Bảo Vệ Toàn Diện',
    description: 'Hệ thống hoạt động 24/7, phát hiện sớm các dấu hiệu bất thường để bảo vệ tài sản và tính mạng.',
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: 'Phản Hồi Tức Thì',
    description: 'Cảnh báo ngay lập tức qua ứng dụng di động và cuộc gọi tự động khi có sự cố.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: 'Trí Tuệ Nhân Tạo',
    description: 'Sử dụng AI để phân tích hình ảnh từ camera, loại bỏ báo động giả và tăng độ chính xác.',
  },
  {
    icon: <Cloud className="w-6 h-6 text-primary" />,
    title: 'Lưu Trữ Đám Mây',
    description: 'Dữ liệu được mã hóa và lưu trữ an toàn trên nền tảng cloud, có thể truy xuất mọi lúc.',
  },
  {
    icon: <Bell className="w-6 h-6 text-primary" />,
    title: 'Còi Báo Động Thông Minh',
    description: 'Âm thanh cảnh báo đa tầng, phân biệt rõ các loại rủi ro khác nhau.',
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: 'Quản Lý Qua App',
    description: 'Giao diện trực quan, dễ dàng theo dõi và điều khiển toàn bộ hệ thống từ xa.',
  },
];

export default function Features() {
  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Lõi Công Nghệ
          </h2>
          <p className="text-text-secondary text-lg">
            IGNIVO mang đến hệ sinh thái an ninh toàn diện, kết hợp giữa phần cứng bền bỉ và phần mềm thông minh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-border hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-background-tertiary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
