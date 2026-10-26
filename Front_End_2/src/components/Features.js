import { 
  ScanLine, 
  Cpu, 
  Workflow, 
  BellRing, 
  ArrowUpRight, 
  Flame, 
  User, 
  Volume2, 
  Smartphone, 
  History 
} from 'lucide-react';

export default function Features() {
  return (
    <section id="solutions" className="bg-background-secondary py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-eyebrow">02 / CÔNG NGHỆ CỐT LÕI</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl text-foreground">
              Thông minh từ bên trong.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Bốn thành phần công nghệ.<br />
            Một hệ thống giám sát và cảnh báo thống nhất.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 01 — AI Vision (Large card, left, spans 2 rows) */}
          <article className="vision-feature relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 text-white md:row-span-2 sm:p-9 shadow-xl border border-white/10">
            <div>
              <div className="flex items-center justify-between">
                <ScanLine className="h-7 w-7 text-cyan-400" />
                <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-widest text-cyan-300 border border-cyan-400/20">
                  AI / COMPUTER VISION
                </span>
              </div>
              <h3 className="mt-6 text-3xl font-semibold leading-tight text-white">
                Không chỉ ghi hình.<br />
                Nhận biết sự kiện.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Phân tích hình ảnh từ camera IP để phát hiện dấu hiệu ngọn lửa, nhận biết con người và hỗ trợ đối chiếu khuôn mặt với dữ liệu đăng ký.
              </p>

              {/* Realistic AI CV Viewfinder Frame Graphic */}
              <div className="relative my-7 overflow-hidden rounded-2xl border border-white/15 bg-[#080D1A] p-3 shadow-2xl">
                {/* HUD Top Bar */}
                <div className="mb-2 flex items-center justify-between text-[10px] font-mono text-white/60">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white/90">CAM-01 · LIVE FEED</span>
                  </div>
                  <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] text-cyan-300 border border-cyan-500/30">
                    AI INFERENCE
                  </span>
                </div>

                {/* Viewport with Bounding Boxes */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#0F172A] to-[#060A14] border border-white/10">
                  {/* Subtle Grid and Center Reticle */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="h-20 w-20 rounded-full border border-dashed border-cyan-400" />
                  </div>

                  {/* Bounding Box 1: Flame Detection */}
                  <div className="absolute top-3 left-3 w-32 h-20 rounded border border-amber-400/90 bg-amber-500/15 p-1.5 shadow-[0_0_16px_rgba(251,191,36,0.25)]">
                    <div className="flex items-center gap-1 rounded bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold text-slate-950 w-max shadow-sm">
                      <Flame className="h-2.5 w-2.5 fill-current" />
                      <span>FLAME · 98.4%</span>
                    </div>
                    <div className="mt-1 text-[8px] text-amber-200 font-mono">Zone: Kitchen A1</div>
                    <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 border-t-2 border-l-2 border-amber-300" />
                    <span className="absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 border-b-2 border-r-2 border-amber-300" />
                  </div>

                  {/* Bounding Box 2: Human Analysis & Face Match */}
                  <div className="absolute bottom-3 right-3 w-36 h-24 rounded border border-cyan-400/90 bg-cyan-500/15 p-1.5 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                    <div className="flex items-center gap-1 rounded bg-cyan-400 px-1.5 py-0.5 text-[8px] font-bold text-slate-950 w-max shadow-sm">
                      <User className="h-2.5 w-2.5" />
                      <span>HUMAN · 99.1%</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[8px] font-mono text-cyan-200">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>FACE: REGISTERED</span>
                    </div>
                    <div className="mt-0.5 text-[8px] font-mono text-white/50">Tracking: #H-042</div>
                    <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 border-t-2 border-r-2 border-cyan-300" />
                    <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 border-b-2 border-l-2 border-cyan-300" />
                  </div>
                </div>

                {/* HUD Footer */}
                <div className="mt-2 flex items-center justify-between text-[9px] text-white/50 font-mono">
                  <span>RES: 1080P · 30 FPS</span>
                  <span className="text-emerald-400">LATENCY: 12ms</span>
                </div>
              </div>
            </div>

            {/* Sub-tag footer */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-[10px] font-mono font-semibold tracking-wider text-cyan-300/80">
                FLAME DETECTION · HUMAN ANALYSIS · FACE MATCHING
              </p>
            </div>
          </article>

          {/* Card 02 — Edge Computing (Top, middle) */}
          <article className="feature-tile flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Cpu className="h-6 w-6 text-primary" />
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider text-primary-dark">
                  EDGE COMPUTING
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                Xử lý ngay tại biên.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                AI Edge Box phân tích hình ảnh và xử lý các chức năng cốt lõi tại mạng nội bộ, giảm sự phụ thuộc vào kết nối Internet.
              </p>
            </div>

            {/* Visual: Edge NPU Chip & Specs */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-blue-50/40 p-4">
              <div className="relative mx-auto flex h-24 w-full max-w-[210px] items-center justify-center rounded-xl border border-blue-950/20 bg-gradient-to-br from-[#0F1D3D] via-[#152347] to-[#1E293B] shadow-md text-white">
                {/* Microchip pins */}
                <div className="absolute -top-1.5 inset-x-6 flex justify-around">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="h-1.5 w-1 bg-amber-400/80 rounded-t-sm shadow-xs" />
                  ))}
                </div>
                <div className="absolute -bottom-1.5 inset-x-6 flex justify-around">
                  {[...Array(6)].map((_, i) => (
                    <span key={i} className="h-1.5 w-1 bg-amber-400/80 rounded-b-sm shadow-xs" />
                  ))}
                </div>
                
                <div className="text-center px-2">
                  <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono tracking-wider text-cyan-300">
                    <Cpu className="h-3 w-3" />
                    <span>ROCKCHIP RK3576</span>
                  </div>
                  <div className="text-base font-bold tracking-tight text-white mt-1">
                    6.0 TOPS NPU
                  </div>
                  <div className="text-[9px] text-white/60 font-mono mt-0.5">
                    LOCAL AI ACCELERATOR
                  </div>
                </div>
              </div>

              {/* Hardware advantages */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="rounded-lg bg-white p-2 border border-slate-200/70 shadow-2xs">
                  <div className="font-semibold text-slate-800">Mạng nội bộ LAN</div>
                  <div className="text-[9px] text-emerald-600 font-medium">Không gián đoạn</div>
                </div>
                <div className="rounded-lg bg-white p-2 border border-slate-200/70 shadow-2xs">
                  <div className="font-semibold text-slate-800">&lt; 15ms Latency</div>
                  <div className="text-[9px] text-blue-600 font-medium">Phản xạ tức thì</div>
                </div>
              </div>
            </div>
          </article>

          {/* Card 03 — Event Engine (Top, right) */}
          <article className="feature-tile flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Workflow className="h-6 w-6 text-primary" />
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider text-primary-dark">
                  EVENT INTELLIGENCE
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                Từ phát hiện đến sự kiện.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Event Engine tiếp nhận kết quả AI/CV, quản lý sự kiện, ghi nhận bằng chứng trực quan và kích hoạt cảnh báo theo điều kiện được cấu hình.
              </p>
            </div>

            {/* Visual: Micro Pipeline Flow (AI/CV -> Event Engine -> Cảnh báo) */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-blue-50/40 p-3.5">
              <div className="flex flex-col gap-2">
                {/* Step 1: AI/CV */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-primary">
                      <ScanLine className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-800">1. AI / CV Ingestion</div>
                      <div className="text-[9px] text-slate-500">Phát hiện lửa & con người</div>
                    </div>
                  </div>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[8px] font-mono font-semibold text-slate-600">INPUT</span>
                </div>

                {/* Arrow */}
                <div className="text-center text-[10px] text-primary/70 font-mono -my-1">↓</div>

                {/* Step 2: Event Engine */}
                <div className="flex items-center justify-between rounded-lg border border-blue-300 bg-blue-50/80 px-3 py-2 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white shadow-2xs">
                      <Workflow className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-primary-dark">2. Event Engine</div>
                      <div className="text-[9px] text-blue-700">Lọc quy tắc · Chụp snapshot bằng chứng</div>
                    </div>
                  </div>
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[8px] font-mono font-bold text-white">CORE</span>
                </div>

                {/* Arrow */}
                <div className="text-center text-[10px] text-primary/70 font-mono -my-1">↓</div>

                {/* Step 3: Cảnh báo */}
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                      <BellRing className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-slate-800">3. Kích hoạt cảnh báo</div>
                      <div className="text-[9px] text-slate-500">Loa tại chỗ & Ứng dụng di động</div>
                    </div>
                  </div>
                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[8px] font-mono font-semibold text-amber-800">ALERT</span>
                </div>
              </div>
            </div>
          </article>

          {/* Card 04 — Intelligent Alerts (Bottom spanning card) */}
          <article className="feature-tile flex flex-col justify-between gap-6 lg:col-span-2">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <BellRing className="h-6 w-6 text-primary" />
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider text-primary-dark">
                    INTELLIGENT ALERTS
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  Cảnh báo tại chỗ. Theo dõi từ xa.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  IGNIVO phát cảnh báo âm thanh tại chỗ, gửi thông báo đến ứng dụng di động khi có kết nối và lưu trữ bằng chứng hình ảnh để hỗ trợ người dùng xác minh tình huống.
                </p>

                {/* 3 Micro capabilities pills */}
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 font-medium border border-slate-200/70">
                    <Volume2 className="h-3.5 w-3.5 text-primary" />
                    <span>Loa cảnh báo tại chỗ</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 font-medium border border-slate-200/70">
                    <Smartphone className="h-3.5 w-3.5 text-primary" />
                    <span>Thông báo ứng dụng</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 font-medium border border-slate-200/70">
                    <History className="h-3.5 w-3.5 text-primary" />
                    <span>Lưu trữ bằng chứng</span>
                  </div>
                </div>
              </div>

              {/* Realistic Mobile Alert Notification Mockup */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-full sm:w-[320px] rounded-2xl border border-blue-200/80 bg-white p-4 shadow-md">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-[9px] font-bold">i</span>
                      <span className="font-semibold text-slate-800 tracking-wide">IGNIVO ALERT</span>
                    </div>
                    <span className="font-mono text-slate-400">Vừa xong</span>
                  </div>
                  <div className="mt-2.5 text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <span className="text-red-700 font-semibold">Cảnh báo: Phát hiện ngọn lửa</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600 leading-snug">
                    Khu vực Bếp A1 · Độ tin cậy 98.4% · Đã phát loa cảnh báo & lưu snapshot.
                  </p>
                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100 text-[10px]">
                    <span className="rounded bg-blue-50 px-2 py-0.5 font-semibold text-primary">Xem snapshot</span>
                    <span className="text-slate-400 font-mono">WebRTC Live Stream</span>
                  </div>
                </div>

                {/* Arrow link button */}
                <a 
                  href="#how-it-works" 
                  aria-label="Tìm hiểu quy trình cảnh báo" 
                  className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark shadow-md"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

