"use client";

import { useState } from 'react';
import { Camera, Radio, BellRing, Activity, ShieldCheck, RotateCcw } from 'lucide-react';

export default function MonitoringDemo() {
  const [alert, setAlert] = useState(false);
  return (
    <figure className="monitor-shell">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <span className="flex items-center gap-2 text-sm font-bold"><Activity className="h-4 w-4 text-primary-light" /> IGNIVO <span className="font-normal text-white/50">/ VISION</span></span>
        <span className="text-[10px] font-semibold tracking-widest text-primary-light">DEMO TƯƠNG TÁC</span>
      </div>
      <div className="p-3 sm:p-5">
        <div className={`camera-scene ${alert ? 'is-alert' : ''}`}>
          <div className="absolute inset-x-4 top-4 z-10 flex justify-between text-[10px] tracking-widest text-white/80"><span>CAM 01 · KHÔNG GIAN BẾP</span><span>AI VISION</span></div>
          <svg viewBox="0 0 560 330" className="h-full w-full" aria-hidden="true">
            <defs><linearGradient id="room-wall" x2="0" y2="1"><stop stopColor="#333333" /><stop offset="1" stopColor="#121212" /></linearGradient></defs>
            <path fill="url(#room-wall)" d="M0 0h560v330H0z" />
            <path fill="#2D2D2D" d="M0 260l130-60h300l130 60v70H0z" />
            <g stroke="#E0E9F5" strokeOpacity=".15" fill="none"><path d="M0 40l100 35v180L0 305M560 40l-95 35v180l95 50M100 75h365M100 255h365M100 75v180M465 75v180" /><path d="M0 305h560M80 330l90-75m300 75l-70-75" /></g>
            <g fill="#333333" stroke="#E0E9F5" strokeOpacity=".2"><rect x="126" y="96" width="84" height="65" rx="3" /><rect x="216" y="96" width="84" height="65" rx="3" /><rect x="306" y="96" width="130" height="65" rx="3" /><path d="M116 208h330v63H116z" /></g>
            <path d="M113 204h336v9H113z" fill="#666666" /><g fill="none" stroke="#E0E9F5" strokeOpacity=".25"><path d="M200 215v55m85-55v55m80-55v55" /><ellipse cx="345" cy="203" rx="34" ry="7" /><path d="M320 199v-23h49v23" /></g>
            <path d="M347 177c-30-25 25-27-1-48s16-27 1-45" className="demo-smoke" fill="none" stroke="#E0E9F5" strokeWidth="16" strokeLinecap="round" />
            <circle cx="420" cy="65" r="7" fill="#00C2FF" /><circle cx="420" cy="65" r="15" stroke="#00C2FF" strokeOpacity=".3" fill="none" />
          </svg>
          <div className="scan-line" aria-hidden="true" />
          <div className="detection-frame" aria-hidden="true"><span>PHÁT HIỆN KHÓI</span></div>
          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[10px] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-primary-light" />{alert ? 'Đã xác định vùng bất thường' : 'Đang phân tích không gian'}</div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[{ Icon: Camera, label: 'Camera AI', value: alert ? 'Có dấu hiệu khói' : 'Đang giám sát' }, { Icon: Radio, label: 'Cảm biến', value: alert ? 'Có tín hiệu' : 'Đã kết nối' }, { Icon: ShieldCheck, label: 'Hệ thống', value: alert ? 'Đã cảnh báo' : 'Sẵn sàng' }].map(({ Icon, label, value }) => <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3"><Icon className="mb-3 h-4 w-4 text-primary-light" /><p className="text-[11px] text-white/50">{label}</p><p className="mt-1 text-xs font-medium">{value}</p></div>)}
        </div>
        <div role="status" aria-live="polite" className="mt-3 flex min-h-16 items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
          <BellRing className="h-5 w-5 shrink-0 text-primary-light" /><div><p className="text-xs font-semibold">{alert ? 'Thông báo mô phỏng: phát hiện khói tại bếp' : 'Một kết nối. Nhiều lớp bảo vệ.'}</p><p className="mt-1 text-[11px] text-white/60">{alert ? 'Minh họa cảnh báo tới điện thoại và còi tại chỗ.' : 'Thử tình huống để xem hệ thống phản hồi.'}</p></div>
        </div>
        <button type="button" aria-pressed={alert} onClick={() => setAlert(value => !value)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-xs font-bold text-primary-dark transition hover:bg-background-tertiary">{alert ? <RotateCcw className="h-4 w-4" /> : <Activity className="h-4 w-4" />}{alert ? 'Đặt lại mô phỏng' : 'Mô phỏng phát hiện khói'}</button>
      </div>
      <figcaption className="px-5 pb-4 text-center text-[10px] text-white/50">Giao diện minh họa · Không kết nối thiết bị thực tế</figcaption>
    </figure>
  );
}
