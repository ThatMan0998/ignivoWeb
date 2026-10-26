"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Cpu, Video, ShieldCheck, Building2, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    icon: Cpu,
    tag: 'Edge Computing',
    question: 'Hệ thống IGNIVO hoạt động có cần mạng Internet không?',
    answer: 'Các chức năng AI cốt lõi (nhận diện ngọn lửa, người lạ/người quen, phân loại độ tuổi) và còi báo động được xử lý hoàn toàn cục bộ tại biên trên AI Edge Box. Do đó, ngay cả khi mất kết nối Internet, hệ thống vẫn tiếp tục giám sát và hú còi bảo vệ tại chỗ. Kết nối Internet chỉ cần thiết khi gửi thông báo đẩy đến điện thoại hoặc xem trực tiếp từ xa qua WebRTC.',
  },
  {
    icon: Video,
    tag: 'Tương Thích Hạ Tầng',
    question: 'Hệ thống có tương thích với các camera IP tôi đang có sẵn không?',
    answer: 'Có. IGNIVO được thiết kế với triết lý nâng cấp hạ tầng sẵn có, tương thích 100% với các dòng camera IP phổ biến trên thị trường hỗ trợ giao thức RTSP hoặc chuẩn ONVIF (Dahua, Hikvision, Imou, Ezviz,...). Bạn hoàn toàn không cần phải thay mới hay chi thêm tiền lắp đặt lại camera.',
  },
  {
    icon: ShieldCheck,
    tag: 'Bảo Mật Quyền Riêng Tư',
    question: 'Dữ liệu hình ảnh camera của tôi có được bảo mật không?',
    answer: 'Dữ liệu luồng video được xử lý tại biên (Edge Computing) ngay trên phần cứng đặt tại cơ sở của bạn thay vì truyền tải liên tục toàn bộ video lên đám mây máy chủ bên ngoài. Chỉ khi phát hiện sự kiện rủi ro, video clip bằng chứng mới được trích xuất và mã hóa để người dùng xác thực, đảm bảo quyền riêng tư tuyệt đối.',
  },
  {
    icon: Building2,
    tag: 'Hợp Tác Doanh Nghiệp',
    question: 'Doanh nghiệp hoặc đơn vị tích hợp hệ thống có thể hợp tác như thế nào?',
    answer: 'IGNIVO áp dụng mô hình cấp phép khai thác công nghệ không độc quyền (Non-exclusive Technology Licensing). Chúng tôi chuyển giao các module AI/CV, Event Engine và cung cấp tài liệu API/SDK chi tiết để đối tác dễ dàng tích hợp trực tiếp vào hệ sinh thái an ninh, tòa nhà hoặc sản phẩm thương mại của mình.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-transparent scroll-mt-20 lg:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-muted text-base md:text-lg leading-relaxed">
            Mọi thông tin cần thiết về khả năng vận hành, tính tương thích và mô hình hợp tác cùng IGNIVO.
          </p>
        </div>

        {/* Card-based Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary/40 bg-white shadow-xl shadow-primary/5' 
                    : 'border-border bg-white hover:border-primary/30 hover:shadow-md'
                }`}
              >
                <button
                  type="button"
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 focus-visible:outline-primary"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <div className="flex items-start gap-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOpen ? 'bg-primary text-white shadow-md shadow-primary/25' : 'bg-primary/10 text-primary'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                        {faq.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen ? 'rotate-180 border-primary bg-primary/10 text-primary' : 'border-border text-muted'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm leading-relaxed text-muted border-t border-border/40 ml-14 mr-6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/5 via-white to-primary/5 p-6 sm:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold text-foreground">
              Bạn có câu hỏi chuyên sâu hơn về giải pháp kỹ thuật?
            </h4>
            <p className="mt-1 text-sm text-muted">
              Đội ngũ R&D và kỹ sư hệ thống IGNIVO sẵn sàng hỗ trợ kiểm thử PoC và giải đáp chi tiết.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all"
          >
            Liên hệ kỹ sư tư vấn
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
