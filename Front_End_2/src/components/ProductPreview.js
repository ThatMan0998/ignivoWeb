import { Camera, Cpu, Volume2, Smartphone, ArrowDown, Flame, Users, ScanFace, Activity } from 'lucide-react';

export default function ProductPreview() {
  return (
    <figure className="relative mx-auto w-full max-w-xl text-left">
      {/* Background ambient light */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#4B65E8]/10 blur-2xl" 
      />

      <div className="relative overflow-hidden rounded-3xl border border-[#E0E9F5] bg-white p-6 shadow-xl shadow-[#0F1D3D]/5 sm:p-7">
        
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0E9F5] pb-4">
          <span className="font-bold text-sm tracking-wide text-[#0F1D3D]">
            IGNIVO / Hệ sinh thái kết nối
          </span>
          <span className="rounded-full bg-[#F4F7FB] border border-[#E0E9F5] px-3 py-1 text-[11px] font-semibold text-[#4B65E8]">
            Sơ đồ minh họa
          </span>
        </div>

        {/* 1. Nguồn đầu vào: Camera IP hiện hữu */}
        <div className="mt-5 rounded-2xl border border-[#E0E9F5] bg-[#F4F7FB]/70 p-4 transition-all hover:border-[#4B65E8]/40 hover:bg-white sm:p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4B65E8]/10 text-[#4B65E8]">
              <Camera className="h-5 w-5" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#0F1D3D]">Camera IP hiện hữu</h4>
                <span className="rounded-full bg-white border border-[#E0E9F5] px-2 py-0.5 text-[10px] font-semibold text-[#666666]">
                  RTSP / ONVIF
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#666666] leading-relaxed">
                Cung cấp luồng hình ảnh từ khu vực giám sát
              </p>
            </div>
          </div>
        </div>

        {/* Flow indicator 1 */}
        <div className="my-2.5 flex items-center justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-[#F4F7FB] border border-[#E0E9F5] px-2.5 py-0.5 text-[10px] font-medium text-[#4B65E8]">
            <ArrowDown className="h-3 w-3 animate-bounce" />
            <span>Luồng hình ảnh RTSP</span>
          </div>
        </div>

        {/* 2. Trung tâm xử lý AI tại biên: AI Edge Box IGNIVO (Dark Navy Core) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F1D3D] to-[#162A5A] p-5 text-white shadow-lg shadow-[#0F1D3D]/20 border border-[#4B65E8]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4B65E8]/30 text-[#00C2FF]">
                <Cpu className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-base font-bold text-white tracking-wide">
                  AI Edge Box IGNIVO
                </h4>
              </div>
            </div>
            <span className="rounded-full bg-white/10 border border-white/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#00C2FF]">
              AI/CV Processing · Event Engine
            </span>
          </div>

          {/* 4 Chức năng phân tích & xử lý cốt lõi */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/5 p-2.5">
              <Flame className="h-4 w-4 shrink-0 text-orange-400" />
              <span className="text-[11px] font-medium text-white/90">Phát hiện ngọn lửa</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/5 p-2.5">
              <Users className="h-4 w-4 shrink-0 text-[#00C2FF]" />
              <span className="text-[11px] font-medium text-white/90">Phân tích con người</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/5 p-2.5">
              <ScanFace className="h-4 w-4 shrink-0 text-primary-light" />
              <span className="text-[11px] font-medium text-white/90">Đối chiếu khuôn mặt</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/5 p-2.5">
              <Activity className="h-4 w-4 shrink-0 text-green-400" />
              <span className="text-[11px] font-medium text-white/90">Quản lý sự kiện</span>
            </div>
          </div>
        </div>

        {/* Flow indicator 2 */}
        <div className="my-2.5 flex items-center justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-[#F4F7FB] border border-[#E0E9F5] px-2.5 py-0.5 text-[10px] font-medium text-[#4B65E8]">
            <ArrowDown className="h-3 w-3" />
            <span>Kích hoạt đa kênh</span>
          </div>
        </div>

        {/* 3. Đầu ra: Loa cảnh báo tại chỗ & Ứng dụng di động */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Loa cảnh báo */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#E0E9F5] bg-[#F4F7FB]/70 p-3.5 transition-all hover:bg-white hover:border-[#4B65E8]/30">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B65E8]/10 text-[#4B65E8]">
              <Volume2 className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-[#0F1D3D]">Loa cảnh báo</p>
              <p className="text-[11px] text-[#666666]">Cảnh báo âm thanh tại chỗ</p>
            </div>
          </div>

          {/* Ứng dụng di động */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#E0E9F5] bg-[#F4F7FB]/70 p-3.5 transition-all hover:bg-white hover:border-[#4B65E8]/30">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#4B65E8]/10 text-[#4B65E8]">
              <Smartphone className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold text-[#0F1D3D]">Ứng dụng di động</p>
              <p className="text-[11px] text-[#666666]">Thông báo · Giám sát · Bằng chứng</p>
            </div>
          </div>

        </div>

      </div>

      {/* Chú thích kỹ thuật & điều kiện vận hành */}
      <figcaption className="relative mt-3.5 text-center text-[11px] leading-relaxed text-[#666666]">
        * Xử lý và cảnh báo cục bộ cần nguồn điện và mạng LAN hoạt động; các chức năng từ xa phụ thuộc kết nối phù hợp.
      </figcaption>
    </figure>
  );
}
