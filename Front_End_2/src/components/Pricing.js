"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Cơ Bản',
    price: '990.000đ',
    period: '/tháng',
    description: 'Phù hợp cho căn hộ nhỏ và gia đình.',
    features: [
      '1 Camera AI phân tích hình ảnh',
      '2 Cảm biến khói thông minh',
      'Cảnh báo qua ứng dụng di động',
      'Lưu trữ dữ liệu 7 ngày',
    ],
    popular: false,
  },
  {
    name: 'Nâng Cao',
    price: '1.990.000đ',
    period: '/tháng',
    description: 'Bảo vệ toàn diện cho nhà phố, biệt thự.',
    features: [
      '3 Camera AI phân tích hình ảnh',
      '5 Cảm biến khói thông minh',
      'Cảnh báo qua ứng dụng & cuộc gọi tự động',
      'Lưu trữ dữ liệu 30 ngày',
      'Tích hợp còi báo động công suất lớn',
    ],
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="products" className="py-24 bg-background-secondary">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Sản Phẩm
          </h2>
          <p className="text-muted text-lg">
            Đầu tư cho sự an toàn của bạn với chi phí hợp lý nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl bg-white border ${
                plan.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-border'
              } flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Khuyên Dùng
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted text-sm mb-6">{plan.description}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">{plan.price}</span>
                <span className="text-muted font-medium">{plan.period}</span>
              </div>

              <ul className="flex-1 flex flex-col gap-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25'
                    : 'bg-background-tertiary text-primary hover:bg-primary/10'
                }`}
              >
                Chọn Gói Này
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
