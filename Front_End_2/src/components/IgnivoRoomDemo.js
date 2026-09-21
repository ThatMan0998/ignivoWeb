"use client";

import { useEffect, useRef, useState } from 'react';
import { Activity, BellRing, Camera, RotateCcw, Move3d, Server, Smartphone } from 'lucide-react';

const DEVICES = [
  { id: 'ignivo', Icon: Camera, label: 'IGNIVO AI + IoT', detail: 'Thiết bị gắn trần: thân cảm biến IoT phía trên, camera vòm phía dưới, chung một vỏ.' },
  { id: 'edge', Icon: Server, label: 'Edge Box AI', detail: 'Raspberry Pi 5 nhận tín hiệu từ bộ IGNIVO, xử lý sự kiện và gửi cảnh báo đến ứng dụng.' },
  { id: 'phone', Icon: Smartphone, label: 'App điện thoại', detail: 'Người dùng cầm điện thoại nhận thông báo cháy từ Edge Box AI qua ứng dụng IGNIVO.' },
];
const STATUS = [
  'Hệ thống sẵn sàng · Chọn thiết bị để khám phá.',
  '01 · Xuất hiện khói/lửa tại bàn làm việc.',
  '02 · Bộ IGNIVO kết hợp tín hiệu camera AI và cảm biến IoT trong cùng thiết bị.',
  '03 · Edge Box AI (Raspberry Pi 5) nhận và xử lý sự kiện cháy.',
  '04 · Edge Box AI gửi cảnh báo đến ứng dụng IGNIVO.',
  '05 · Điện thoại người dùng đã nhận thông báo cháy (mô phỏng).',
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
    <figure className="monitor-shell text-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-5 py-4">
        <span className="flex items-center gap-2 text-sm font-semibold"><Activity className="h-4 w-4 text-primary-light" /> IGNIVO <span className="font-normal text-white/50">/ SPACE</span></span>
        <span className="text-[10px] font-semibold tracking-widest text-primary-light">KHÔNG GIAN 3D · 360°</span>
      </div>
      <div className="relative h-[290px] overflow-hidden bg-[radial-gradient(ellipse_at_center,#16304b_0%,#121212_72%)] sm:h-[340px]">
        <div ref={hostRef} className="absolute inset-0 [&_canvas]:block [&_canvas]:max-w-full [&_canvas]:cursor-grab [&_canvas:active]:cursor-grabbing" />
        {!ready && <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#121212] px-8 text-center" role="status">
          <Move3d className="h-10 w-10 text-primary-light" />
          <p className="max-w-xs text-sm text-white/75">{loadState === 'loading' ? 'Đang dựng không gian 3D…' : 'Không thể hiển thị 3D. Hãy thử lại hoặc mở bằng trình duyệt hỗ trợ WebGL.'}</p>
          {loadState === 'error' && <button type="button" className="rounded-lg border border-white/30 px-5 py-3 text-sm hover:bg-white/10" onClick={() => { setLoadState('loading'); setPhase(0); setAttempt(value => value + 1); }}>Thử lại</button>}
        </div>}
        {ready && <p className="pointer-events-none absolute inset-x-2 bottom-2 text-center text-[11px] text-white/65">Kéo để xoay · Chạm thiết bị để khám phá</p>}
      </div>
      <div className="px-4 pb-4 sm:px-5">
        <div className="grid grid-cols-3 gap-2">
          {DEVICES.map(({ id, Icon, label }) => <button key={id} type="button" disabled={!ready} aria-pressed={selected === id} onClick={() => setSelected(id)} className={`flex min-h-16 flex-col items-center justify-center gap-2 rounded-xl border px-1 py-3 text-[11px] transition disabled:opacity-40 ${selected === id ? 'border-primary-light/50 bg-primary/15 text-primary-light' : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'}`}><Icon className="h-4 w-4" />{label}</button>)}
        </div>
        <p aria-live="polite" className="mt-3 min-h-10 text-xs leading-5 text-white/65"><span className="text-white">{device.label}</span> · {device.detail}</p>
        <label className="mt-1 flex items-center gap-3 text-xs text-white/60">
          <span className="shrink-0">Góc xoay</span>
          <input type="range" min="0" max="360" value={angle} disabled={!ready} aria-label="Góc xoay căn phòng" className="h-8 min-w-0 flex-1 accent-primary-light" onChange={event => { const next = Number(event.target.value); setAngle(next); sceneRef.current?.setAngle(next); }} />
          <span className="w-8 text-right tabular-nums">{angle}°</span>
        </label>
        <label className="flex items-center gap-3 text-xs text-white/60">
          <span className="shrink-0">Thu/phóng</span>
          <input type="range" min="7.5" max="19" step="0.1" value={distance} disabled={!ready} aria-label="Khoảng nhìn căn phòng" className="h-8 min-w-0 flex-1 accent-primary-light" onChange={event => setDistance(Number(event.target.value))} />
          <span className="w-8 text-right tabular-nums">{Math.round(15 / distance * 100)}%</span>
        </label>
        <div role="status" className={`mt-3 flex min-h-16 items-center gap-3 rounded-xl border px-3 py-3 ${phase >= 3 ? 'border-orange-400/40 bg-orange-400/10' : 'border-primary/30 bg-primary/10'}`}>
          <BellRing className={`h-5 w-5 shrink-0 ${phase >= 3 ? 'text-orange-400' : 'text-primary-light'}`} />
          <p className="text-xs leading-5">{STATUS[phase]}</p>
        </div>
        <ol aria-label="Luồng gửi cảnh báo mô phỏng" className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] leading-4">
          {[{ label: 'IGNIVO AI + IoT', step: 2 }, { label: 'Raspberry Pi 5', step: 3 }, { label: 'App điện thoại', step: 5 }].map(({ label, step }, index) => <li key={label} className={`rounded-lg border px-1 py-2 ${phase >= step ? 'border-primary-light/40 bg-primary/15 text-primary-light' : 'border-white/10 text-white/50'}`}><span className="block">{index + 1}. {label}</span><span>{phase >= step ? 'Đã nhận tín hiệu' : 'Chờ tín hiệu'}</span></li>)}
        </ol>
        <div className={`mt-3 flex min-h-24 items-start gap-3 rounded-xl border p-3 ${phase === 5 ? 'border-orange-400/50 bg-orange-400/10' : 'border-white/10 bg-white/5'}`}>
          <Smartphone className={`mt-1 h-6 w-6 shrink-0 ${phase === 5 ? 'text-orange-400' : 'text-white/40'}`} />
          <div className="min-w-0 text-xs leading-5">
            <p className="text-[10px] tracking-wider text-white/50">IGNIVO APP · THÔNG BÁO MÔ PHỎNG</p>
            <p className="font-semibold">{phase === 5 ? 'Cảnh báo cháy · Phòng làm việc' : phase === 4 ? 'Đang nhận cảnh báo từ Edge Box AI…' : 'Chưa có cảnh báo mới'}</p>
            <p className="text-white/60">{phase === 5 ? 'Phát hiện khói/lửa tại bàn làm việc. Nguồn: Raspberry Pi 5.' : 'Bấm mô phỏng để theo dõi tín hiệu từ thiết bị đến điện thoại.'}</p>
          </div>
        </div>
        <button type="button" disabled={!ready} aria-pressed={phase > 0} onClick={() => setPhase(value => value ? 0 : 1)} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-3 text-xs font-semibold text-white transition hover:bg-primary-dark disabled:opacity-40">
          {phase ? <RotateCcw className="h-4 w-4" /> : <Activity className="h-4 w-4" />}{phase ? 'Đặt lại mô phỏng' : 'Mô phỏng phát hiện cháy'}
        </button>
      </div>
      <figcaption className="px-5 pb-4 text-center text-[10px] text-white/50">Thiết kế thiết bị minh họa · Không kết nối thiết bị thực tế</figcaption>
    </figure>
  );
}
