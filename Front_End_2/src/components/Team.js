"use client";

import Image from 'next/image';
import { UserPlus, Linkedin, Mail, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useConsultation } from './LandingExperience';

const TEAM = [
  { 
    id: 'nhuhuynh', 
    name: 'Nguyễn Thị Như Huỳnh', 
    title: 'CEO', 
    role: 'Project Leader', 
    quote: 'Biến công nghệ thành giá trị', 
    objectPosition: 'center 40%',
    skills: 'Quản trị dự án · Chiến lược thương mại',
    email: 'huynh.ntn@ignivo.vn'
  },
  { 
    id: 'tiendat', 
    name: 'Võ Tiến Đạt', 
    title: 'CTO', 
    role: 'Frontend & System Integration Lead', 
    quote: 'Kết nối công nghệ, kiến tạo giải pháp', 
    objectPosition: 'center 25%',
    skills: 'Kiến trúc hệ thống · WebRTC · Edge App',
    email: 'dat.vt@ignivo.vn'
  },
  { 
    id: 'quockhanh', 
    name: 'Lê Quốc Khánh', 
    title: 'CAIO', 
    role: 'AI & Data Lead', 
    quote: 'Dữ liệu tạo nên trí tuệ', 
    objectPosition: 'center 40%',
    skills: 'Computer Vision · RK3576 NPU · Deep Learning',
    email: 'khanh.lq@ignivo.vn'
  },
  { 
    id: 'ngocminh', 
    name: 'Lê Ngọc Minh', 
    title: 'CMO', 
    role: 'Marketing & Research', 
    quote: 'Thấu hiểu thị trường, dẫn lối thành công', 
    objectPosition: 'center 40%',
    skills: 'Nghiên cứu thị trường · Định vị B2B2C',
    email: 'minh.ln@ignivo.vn'
  },
  { 
    id: 'minhtruc', 
    name: 'Võ Minh Trực', 
    title: 'CCO', 
    role: 'Media & Video Lead', 
    quote: 'Sáng tạo để truyền cảm hứng', 
    objectPosition: 'center 40%',
    skills: 'Sản xuất truyền thông · Trực quan hóa sản phẩm',
    email: 'truc.vm@ignivo.vn'
  },
];

export default function Team() {
  const consultation = useConsultation();

  return (
    <section id="team" className="bg-background-secondary py-20 lg:py-28 scroll-mt-20 lg:scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              ĐỘI NGŨ SÁNG LẬP & R&D
            </span>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl text-foreground">
              Cùng một tầm nhìn.<br />
              <span className="text-muted">Cùng tạo sự an tâm.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Năm thành viên từ FPT University với các thế mạnh chuyên sâu về AI, Edge Computing, Hệ thống và Phát triển sản phẩm thương mại.
          </p>
        </div>

        {/* Grid 3x2 Members */}
        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {TEAM.map((member) => (
            <article 
              key={member.id} 
              className="group relative flex w-full max-w-[340px] flex-col items-center rounded-3xl border border-border bg-white p-7 text-center shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Circular photo with glow border */}
              <div className="relative mb-5 h-40 w-40 overflow-hidden rounded-full border-[3px] border-border bg-background-tertiary shadow-lg shadow-primary/5 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/20 lg:h-44 lg:w-44">
                <Image
                  src={member.image || `/team/${member.id}.png`}
                  alt={`Chân dung ${member.name}`}
                  fill
                  sizes="(max-width: 1024px) 160px, 176px"
                  style={{ objectPosition: member.objectPosition || 'center 18%' }}
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Title & Role */}
              <span className="mb-2 inline-block rounded-full border border-primary/15 bg-primary/5 px-3 py-0.5 text-[10px] font-bold tracking-[.18em] text-primary-dark">
                {member.title}
              </span>
              
              <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
                {member.name}
              </h3>
              
              <p className="mt-1 text-xs font-semibold leading-5 text-primary">
                {member.role}
              </p>

              <p className="mt-1 text-[11px] text-muted">
                {member.skills}
              </p>

              <blockquote className="mt-3 text-xs leading-5 text-muted/90 italic border-t border-border/60 pt-3 w-full">
                &ldquo;{member.quote}&rdquo;
              </blockquote>

              {/* Quick Connect Link */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <Link
                  href="#contact"
                  onClick={() => {
                    consultation?.setSelectedPackage({
                      type: 'company',
                      title: `Liên hệ trao đổi với ${member.name} (${member.title})`,
                      hint: `Tôi muốn kết nối và trao đổi chuyên môn/hợp tác với ${member.name} (${member.title} - ${member.role}).`
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  Kết nối trực tiếp
                </Link>
              </div>
            </article>
          ))}

          {/* Slot 6: Đang tuyển dụng R&D */}
          <article className="group relative flex w-full max-w-[340px] flex-col items-center justify-between rounded-3xl border border-dashed border-border bg-white/70 p-7 text-center shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-white hover:shadow-xl hover:shadow-primary/5">
            <div className="flex flex-col items-center">
              <Link
                href="#contact"
                onClick={() => {
                  consultation?.setSelectedPackage({
                    type: 'individual',
                    title: 'Gia nhập đội ngũ R&D IGNIVO',
                    hint: 'Tôi quan tâm và muốn tìm hiểu cơ hội tham gia nghiên cứu, phát triển AI / IoT / WebRTC cùng đội ngũ IGNIVO.'
                  });
                }}
                className="relative mb-5 flex h-40 w-40 items-center justify-center rounded-full border-[3px] border-dashed border-border bg-background-tertiary transition-all duration-500 hover:border-primary hover:bg-primary/5 lg:h-44 lg:w-44"
              >
                <UserPlus className="h-10 w-10 text-muted transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
              </Link>
              
              <span className="mb-2 inline-block rounded-full border border-border bg-background-tertiary px-3 py-0.5 text-[10px] font-bold tracking-[.18em] text-muted">
                JOIN THE TEAM
              </span>
              
              <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
                Gia nhập IGNIVO
              </h3>
              
              <p className="mt-1 text-xs font-semibold leading-5 text-primary">
                Kỹ sư AI / IoT & R&D Intern
              </p>
              
              <p className="mt-1 text-[11px] text-muted">
                Cùng nghiên cứu các bài toán Computer Vision và giải pháp an toàn biên
              </p>
            </div>

            <Link
              href="#contact"
              onClick={() => {
                consultation?.setSelectedPackage({
                  type: 'individual',
                  title: 'Gia nhập đội ngũ R&D IGNIVO',
                  hint: 'Tôi quan tâm và muốn tìm hiểu cơ hội tham gia nghiên cứu, phát triển AI / IoT / WebRTC cùng đội ngũ IGNIVO.'
                });
              }}
              className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-background-secondary border border-border px-5 py-2.5 text-xs font-bold text-primary hover:bg-primary/5 hover:border-primary/40 transition-all w-full justify-center"
            >
              Ứng tuyển / Gửi hồ sơ →
            </Link>
          </article>
        </div>

      </div>
    </section>
  );
}
