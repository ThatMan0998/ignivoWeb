"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'Hệ thống IGNIVO hoạt động có cần mạng Internet không?',
    answer: 'Hệ thống cần kết nối Internet để gửi cảnh báo đến điện thoại. Tuy nhiên, trong trường hợp mất mạng, còi báo động tại chỗ vẫn hoạt động bình thường nhờ kết nối nội bộ.',
  },
  {
    question: 'Bao lâu thì cần thay pin cho cảm biến?',
    answer: 'Các cảm biến khói của IGNIVO được tối ưu năng lượng cực tốt, pin có thể sử dụng lên đến 3-5 năm mới cần thay mới.',
  },
  {
    question: 'Dữ liệu camera có bị xem trộm không?',
    answer: 'Dữ liệu hình ảnh được mã hóa đầu cuối chuẩn AES-256. Chỉ có bạn và những người được bạn cấp quyền mới có thể xem được hình ảnh từ camera.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-transparent">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-text-secondary text-lg">
            Giải đáp mọi thắc mắc của bạn về nền tảng IGNIVO.
          </p>
        </div>

        <div className="border-t border-border">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border-b border-border overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between focus-visible:outline-primary"
                aria-expanded={openIndex === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-bold text-foreground">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-5 text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
