"use client";

import { useEffect, useRef, useState } from 'react';
import { Activity, Camera, RotateCcw, Move3d, Server, Smartphone, ArrowRight, ShieldAlert } from 'lucide-react';

const DEVICES = [
  { 
    id: 'ignivo', 
    Icon: Camera, 
    label: 'Camera IP hiện hữu', 
    detail: 'Camera IP hiện hữu lắp đặt tại khu vực giám sát, liên tục truyền luồng hình ảnh về AI Edge Box.' 
  },
  { 
    id: 'edge', 
    Icon: Server, 
    label: 'AI Edge Box IGNIVO', 
    detail: 'Bộ não xử lý tại biên tích hợp mô hình AI/CV và Event Engine, phân tích dấu hiệu ngọn lửa và con người.' 
  },
  { 
    id: 'phone', 
    Icon: Smartphone, 
    label: 'Ứng dụng IGNIVO', 
    detail: 'Giao diện giám sát từ xa, tiếp nhận thông báo đẩy tức thì kèm hình ảnh bằng chứng trực quan.' 
  },
];

const STATUS = [
  'Hệ thống sẵn sàng · Chọn thiết bị để khám phá.',
  '01 · Xuất hiện dấu hiệu ngọn lửa tại khu vực giám sát.',
  '02 · Camera IP ghi nhận và truyền luồng video về AI Edge Box.',
  '03 · AI Edge Box phân tích hình ảnh bằng AI/CV và nhận diện sự kiện.',
  '04 · Kích hoạt loa cảnh báo tại chỗ và gửi thông báo khẩn cấp.',
  '05 · Ứng dụng IGNIVO tiếp nhận thông báo kèm video bằng chứng trực quan.',
];

export default function IgnivoRoomDemo() {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const [selected, setSelected] = useState('ignivo');
  const [phase, setPhase] = useState(0);
  const [angle, setAngle] = useState(35);
  const [distance, setDistance] = useState(15);
  const [loadState, setLoadState] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let scene;
    import('../lib/createIgnivoRoom').then(({ createIgnivoRoom }) => {
      if (cancelled) return;
      scene = createIgnivoRoom(hostRef.current, {
        onSelect: setSelected,
        onAngle: setAngle,
        onContextLost: () => setLoadState('error'),
      });
      sceneRef.current = scene;
      setLoadState('ready');
    }).catch(() => { if (!cancelled) setLoadState('error'); });
    return () => {
      cancelled = true;
      sceneRef.current = null;
      scene?.dispose();
    };
  }, [attempt]);

  useEffect(() => { sceneRef.current?.select(selected); }, [selected, loadState]);
  useEffect(() => { sceneRef.current?.setPhase(phase); }, [phase, loadState]);
  useEffect(() => { sceneRef.current?.setDistance(distance); }, [distance, loadState]);
  useEffect(() => {
    if (phase === 0 || phase === STATUS.length - 1 || loadState !== 'ready') return;
    const timer = setTimeout(() => setPhase(value => value + 1), 1500);
    return () => clearTimeout(timer);
  }, [phase, loadState]);

  const ready = loadState === 'ready';
  const device = DEVICES.find(item => item.id === selected) || DEVICES[0];

  return (
    <figure className="monitor-shell text-white border border-white/15 bg-[#12141A]/95 shadow-2xl rounded-3xl overflow-hidden">
      
      {/* Header card 3D */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-3.5 bg-white/[0.02]">
        <span className="flex items-center gap-2 text-xs font-bold tracking-wide">
          <Activity className="h-4 w-4 text-primary-light" /> 
          IGNIVO <span className="font-normal text-white/50">/ Không gian giám sát thông minh</span>
        </span>
        <span className="text-[10px] font-bold tracking-widest text-primary-light uppercase">
          MÔ HÌNH 3D · 360°
        </span>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative h-[250px] overflow-hidden bg-[radial-gradient(ellipse_at_center,#142844_0%,#0C1017_75%)] sm:h-[270px]">
        <div ref={hostRef} className="absolute inset-0 [&_canvas]:block [&_canvas]:max-w-full [&_canvas]:cursor-grab [&_canvas:active]:cursor-grabbing" />
        
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0C1017] px-6 text-center" role="status">
            <Move3d className="h-8 w-8 text-primary-light animate-pulse" />
            <p className="max-w-xs text-xs text-white/75">
              {loadState === 'loading' ? 'Đang dựng không gian 3D…' : 'Không thể hiển thị 3D. Hãy thử lại hoặc mở bằng trình duyệt hỗ trợ WebGL.'}
            </p>
            {loadState === 'error' && (
              <button 
                type="button" 
                className="rounded-lg border border-white/30 px-4 py-2 text-xs hover:bg-white/10" 
                onClick={() => { setLoadState('loading'); setPhase(0); setAttempt(value => value + 1); }}
              >
                Thử lại
              </button>
            )}
          </div>
        )}

        {ready && (
          <p className="pointer-events-none absolute inset-x-2 bottom-2 text-center text-[10px] text-white/60">
            Kéo để xoay · Chạm thiết bị để khám phá
          </p>
        )}
      </div>

      {/* Control & Device Info Bar */}
      <div className="p-4 sm:p-5 space-y-3.5">
        
        {/* Device Selection Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {DEVICES.map(({ id, Icon, label }) => (
            <button 
              key={id} 
              type="button" 
              disabled={!ready} 
              aria-pressed={selected === id} 
              onClick={() => setSelected(id)} 
              className={`flex min-h-10 items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-[11px] font-medium transition-all disabled:opacity-40 ${
                selected === id 
                  ? 'border-primary-light bg-primary/20 text-white font-bold shadow-sm shadow-primary/25' 
                  : 'border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary-light" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Detail Text (Concise 1-2 lines) */}
        <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
          <p aria-live="polite" className="text-xs leading-relaxed text-white/75">
            <span className="font-bold text-white">{device.label}:</span> {device.detail}
          </p>
        </div>

        {/* View Controls Collapse */}
        <details className="border-t border-white/10 pt-2 text-xs">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-[11px] text-white/50 hover:text-white [&::-webkit-details-marker]:hidden">
            <Move3d className="h-3.5 w-3.5 text-primary-light" />
            Điều chỉnh góc nhìn căn phòng
          </summary>
          <div className="mt-2 space-y-1.5 pl-5">
            <label className="flex items-center gap-3 text-[11px] text-white/60">
              <span className="w-16 shrink-0">Góc xoay</span>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={angle} 
                disabled={!ready} 
                aria-label="Góc xoay căn phòng" 
                className="h-6 min-w-0 flex-1 accent-primary-light" 
                onChange={event => { const next = Number(event.target.value); setAngle(next); sceneRef.current?.setAngle(next); }} 
              />
              <span className="w-8 text-right tabular-nums">{angle}°</span>
            </label>
            <label className="flex items-center gap-3 text-[11px] text-white/60">
              <span className="w-16 shrink-0">Thu/phóng</span>
              <input 
                type="range" 
                min="7.5" 
                max="19" 
                step="0.1" 
                value={distance} 
                disabled={!ready} 
                aria-label="Khoảng nhìn căn phòng" 
                className="h-6 min-w-0 flex-1 accent-primary-light" 
                onChange={event => setDistance(Number(event.target.value))} 
              />
              <span className="w-8 text-right tabular-nums">{Math.round(15 / distance * 100)}%</span>
            </label>
          </div>
        </details>

        {/* Simulation Progression Flow: Camera IP → Edge Box → Cảnh báo */}
        <div className="border-t border-white/10 pt-3" role="status" aria-live="polite">
          <ol aria-label="Luồng gửi cảnh báo mô phỏng" className="flex items-center justify-center gap-2 text-[11px]">
            {[
              { label: 'Camera IP', step: 2 }, 
              { label: 'Edge Box', step: 3 }, 
              { label: 'Cảnh báo', step: 5 }
            ].map(({ label, step }, index) => (
              <li key={label} className="flex items-center gap-2">
                {index > 0 && <ArrowRight aria-hidden="true" className="h-3 w-3 shrink-0 text-white/30" />}
                <span className={phase >= step ? 'font-bold text-primary-light' : 'text-white/40'}>
                  {phase >= step && <span aria-hidden="true">✓ </span>}
                  {label}
                </span>
              </li>
            ))}
          </ol>
          <p className={`mt-2 text-center text-xs leading-relaxed font-medium ${phase >= 3 ? 'text-amber-300' : 'text-white/60'}`}>
            {STATUS[phase]}
          </p>
        </div>

        {/* Phase 5 Interactive Notification Card */}
        {phase === 5 && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-400/40 bg-amber-400/10 p-3 animate-fade-in">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="min-w-0 text-xs leading-relaxed">
              <p className="text-[10px] font-bold tracking-wider text-amber-300/80 uppercase">IGNIVO APP · THÔNG BÁO MÔ PHỎNG</p>
              <p className="font-bold text-white">Cảnh báo phát hiện lửa · Phòng làm việc</p>
              <p className="text-white/70 text-[11px]">Nhận diện dấu hiệu ngọn lửa tại bàn làm việc · Nguồn: AI Edge Box IGNIVO</p>
            </div>
          </div>
        )}

        {/* Simulation Trigger Button */}
        <button 
          type="button" 
          disabled={!ready} 
          aria-pressed={phase > 0} 
          onClick={() => setPhase(value => value ? 0 : 1)} 
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-40 active:scale-[0.99]"
        >
          {phase ? <RotateCcw className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
          {phase ? 'Đặt lại quy trình mô phỏng' : 'Mô phỏng phát hiện cháy'}
        </button>

      </div>

      {/* Technical Disclaimer Footer */}
      <figcaption className="px-5 pb-4 text-center text-[10px] text-white/45">
        * Mô hình hệ thống minh họa trên website · Không thay thế kết nối thiết bị thực tế
      </figcaption>
    </figure>
  );
}
