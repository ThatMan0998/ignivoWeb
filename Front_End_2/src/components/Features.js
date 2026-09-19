import { ScanLine, Radio, Smartphone, Cloud, ArrowUpRight } from 'lucide-react';

export default function Features() {
  return (
    <section id="solutions" className="bg-background-secondary py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="section-eyebrow">02 / CÔNG NGHỆ BẢO VỆ</p><h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Thông minh từ bên trong.</h2></div><p className="max-w-xs text-sm leading-7 text-muted">Mỗi công nghệ một nhiệm vụ.<br />Cùng hướng đến sự an toàn của bạn.</p></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="vision-feature relative overflow-hidden rounded-3xl p-7 text-white md:row-span-2 sm:p-9">
            <ScanLine className="h-7 w-7 text-primary-light" /><p className="mt-7 text-xs tracking-widest text-primary-light">AI VISION</p><h3 className="mt-3 text-3xl font-semibold leading-tight">Không chỉ nhìn.<br />Nhận diện rủi ro.</h3><p className="mt-5 text-sm leading-7 text-white/65">Phân tích hình ảnh từ camera để nhận biết dấu hiệu khói và bất thường trong không gian.</p>
            <div className="lens-visual" aria-hidden="true"><div /><span /><i /></div>
            <span className="relative text-[10px] tracking-[.2em] text-white/50">COMPUTER VISION / IGNIVO</span>
          </article>
          <article className="feature-tile"><Radio className="h-6 w-6 text-primary" /><h3 className="mt-6 text-xl font-semibold">Cảm nhận từng thay đổi.</h3><p className="mt-3 text-sm leading-7 text-muted">Cảm biến IoT bổ sung tín hiệu môi trường, phối hợp cùng hình ảnh camera.</p><div className="sensor-bars mt-7" aria-hidden="true">{[24, 40, 30, 54, 42, 65, 38, 48, 30, 55, 36, 25].map((height, i) => <span key={i} style={{ height }} />)}</div></article>
          <article className="feature-tile"><Cloud className="h-6 w-6 text-primary" /><h3 className="mt-6 text-xl font-semibold">Kết nối thành hệ thống.</h3><p className="mt-3 text-sm leading-7 text-muted">Tập trung tín hiệu từ các thiết bị để theo dõi và quản lý thuận tiện hơn.</p><div className="mt-8 flex items-center gap-2 text-xs font-semibold text-primary-dark"><span className="h-2 w-2 rounded-full bg-primary" /> CAMERA <span className="h-px flex-1 bg-border" /> IoT <span className="h-px flex-1 bg-border" /> APP</div></article>
          <article className="feature-tile flex flex-col justify-between gap-6 sm:flex-row lg:col-span-2"><div className="max-w-md"><Smartphone className="h-6 w-6 text-primary" /><h3 className="mt-5 text-xl font-semibold">Cảnh báo đến nơi bạn đang ở.</h3><p className="mt-3 text-sm leading-7 text-muted">Thông báo qua ứng dụng, cuộc gọi và còi tại chỗ giúp bạn nắm bắt tình huống để kịp thời phản ứng.</p></div><a href="#how-it-works" aria-label="Tìm hiểu quy trình cảnh báo" className="flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-full bg-primary text-white transition hover:bg-primary-dark"><ArrowUpRight className="h-5 w-5" /></a></article>
        </div>
      </div>
    </section>
  );
}
