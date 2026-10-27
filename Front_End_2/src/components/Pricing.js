"use client";

import { motion } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Building2, 
  Home, 
  Sparkles 
} from 'lucide-react';
import Link from 'next/link';
import { useConsultation } from './LandingExperience';

export default function Pricing() {
  const consultation = useConsultation();

  return (
    <section id="products" className="py-24 lg:py-32 bg-transparent scroll-mt-20 lg:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header mục Sản Phẩm & Thương Mại Hóa */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            MÔ HÌNH TRIỂN KHAI & THƯƠNG MẠI HÓA
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            Giải pháp linh hoạt theo <span className="text-primary">nhu cầu thực tế</span>
          </h2>
          <p className="mt-4 text-muted text-base md:text-lg leading-relaxed">
            Dù bạn là hộ gia đình muốn nâng cấp an toàn cho camera sẵn có, hay doanh nghiệp giải pháp muốn tích hợp năng lực AIoT vào hệ thống — IGNIVO đều có phương án hợp tác tối ưu.
          </p>
        </div>

        {/* 2 Mô hình Giải pháp & Thương mại hóa (B2B2C) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Dành cho Hộ gia đình & Hộ kinh doanh (B2C Package) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-background-secondary border border-border px-3.5 py-1 text-xs font-bold text-foreground">
                  <Home className="w-3.5 h-3.5 text-primary" />
                  B2C · GIẢI PHÁP TRỌN BỘ
                </span>
                <span className="text-xs font-semibold text-muted">Hộ gia đình & Kinh doanh</span>
              </div>

              <h3 className="text-2xl font-bold text-foreground">
                Gói Thiết Bị AI Edge Box
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Trọn bộ thiết bị phần cứng AI Edge Box kết nối trực tiếp với hệ thống camera IP có sẵn tại gia đình, nhà ở kết hợp kinh doanh hoặc cửa hàng quy mô nhỏ.
              </p>

              <div className="mt-6 rounded-2xl bg-background-secondary p-5 border border-border/80">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Giá trị cốt lõi mang lại</p>
                <p className="text-base font-bold text-primary mt-1">Nâng cấp thông minh – Giữ nguyên camera cũ</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Không phải bỏ thêm chi phí lớn để thay mới camera hay thi công lại đường dây mạng.
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  'Tương thích hầu hết các dòng Camera IP chuẩn ONVIF / RTSP hiện hành',
                  'Tích hợp đầy đủ mô hình AI: phát hiện lửa, người lạ, phân loại người lớn/trẻ em',
                  'Còi / loa báo động cục bộ kích hoạt tức thì khi xác định có rủi ro',
                  'Xử lý độc lập tại biên: Mất Internet vẫn giám sát an toàn tại chỗ',
                  'Ứng dụng di động IGNIVO App xem camera trực tiếp và nhận cảnh báo 24/7'
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href="#contact"
                onClick={() => {
                  consultation?.setSelectedPackage({
                    type: 'individual',
                    title: 'Gói Thiết Bị AI Edge Box (B2C)',
                    hint: 'Tôi muốn tư vấn giải pháp thiết bị AI Edge Box để kết nối trực tiếp với hệ thống camera IP có sẵn.'
                  });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-background-secondary border border-border py-4 text-sm font-bold text-primary hover:bg-primary/5 hover:border-primary/40 transition-all"
              >
                Đăng ký tư vấn giải pháp
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Dành cho Doanh nghiệp & Đối tác B2B (Technology Licensing - Recommended) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col justify-between rounded-3xl border-2 border-primary bg-gradient-to-b from-primary/5 via-white to-white p-8 shadow-xl shadow-primary/10"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3.5 py-1 text-xs font-bold text-primary-dark">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  B2B · TECHNOLOGY LICENSING
                </span>
                <span className="text-xs font-semibold text-primary font-mono">Non-exclusive</span>
              </div>

              <h3 className="text-2xl font-bold text-foreground">
                Cấp Phép Khai Thác Công Nghệ
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Dành cho nhà sản xuất camera, đơn vị tích hợp hệ thống (System Integrators), nhà thầu M&E / PCCC, hoặc các doanh nghiệp muốn tích hợp năng lực AIoT của IGNIVO vào sản phẩm.
              </p>

              <div className="mt-6 rounded-2xl bg-primary/10 p-5 border border-primary/20">
                <p className="text-xs font-bold uppercase tracking-wider text-primary-dark">Phương thức hợp tác thương mại</p>
                <p className="text-base font-bold text-foreground mt-1">Cấp phép không độc quyền (Non-exclusive)</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Tùy biến theo phạm vi dự án, số lượng thiết bị triển khai và mô hình chia sẻ doanh thu bền vững.
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  'Chuyển giao và tích hợp mô hình AI/CV (Phát hiện lửa, con người, đối chiếu khuôn mặt)',
                  'Cung cấp bộ xử lý logic Event Engine, kiến trúc Edge Computing và giao tiếp WebRTC',
                  'Cung cấp tài liệu API, SDK hoàn chỉnh và hướng dẫn tích hợp vào hệ thống hiện tại',
                  'Hỗ trợ kỹ thuật chuyên sâu từ đội ngũ R&D và đồng hành chạy thử nghiệm PoC thực tế',
                  'Linh hoạt mở rộng tính năng và nâng cấp mô hình AI định kỳ theo thỏa thuận'
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-primary/20">
              <Link
                href="#contact"
                onClick={() => {
                  consultation?.setSelectedPackage({
                    type: 'company',
                    title: 'Cấp Phép Khai Thác Công Nghệ (B2B)',
                    hint: 'Chúng tôi muốn tìm hiểu điều kiện và quy trình cấp phép công nghệ (Licensing) các mô hình AI/CV và Event Engine của IGNIVO.'
                  });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-bold text-white shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 transition-all active:scale-[0.99]"
              >
                Trao đổi hợp tác cấp phép công nghệ
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer minh bạch */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted max-w-3xl mx-auto leading-relaxed border-t border-border pt-6">
            <strong>* Định vị pháp lý & kỹ thuật:</strong> IGNIVO được nghiên cứu và phát triển như một giải pháp công nghệ thông minh hỗ trợ giám sát an toàn và an ninh trên hạ tầng camera IP hiện hữu. Sản phẩm không thay thế các thiết bị báo cháy hoặc hệ thống PCCC chuyên dụng bắt buộc theo quy chuẩn của cơ quan chức năng.
          </p>
        </div>

      </div>
    </section>
  );
}
