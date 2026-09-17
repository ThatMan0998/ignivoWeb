import { BellRing, Camera, Radio, Smartphone, ArrowDown } from 'lucide-react';

export default function ProductPreview() {
  return (
    <figure className="relative mx-auto mt-14 w-full max-w-3xl text-left">
      <div aria-hidden="true" className="absolute -inset-4 rounded-full bg-primary-light/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-white p-5 shadow-2xl shadow-primary/10 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/10 pb-5">
          <span className="font-bold text-primary-dark">IGNIVO / Hệ sinh thái kết nối</span>
          <span className="rounded-full bg-background-secondary px-3 py-1 text-xs text-muted">Sơ đồ minh họa</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
          {[{ Icon: Radio, label: 'Cảm biến', detail: 'Tín hiệu môi trường' }, { Icon: Camera, label: 'Camera AI', detail: 'Phân tích hình ảnh' }].map(({ Icon, label, detail }) => (
            <div key={label} className="rounded-2xl bg-background-secondary p-4 sm:p-6">
              <Icon aria-hidden="true" className="mb-4 h-8 w-8 text-primary" />
              <p className="font-bold text-foreground">{label}</p>
              <p className="mt-1 text-sm text-muted">{detail}</p>
            </div>
          ))}
        </div>
        <ArrowDown aria-hidden="true" className="mx-auto my-4 text-primary" />
        <div className="rounded-2xl bg-gradient-to-r from-foreground to-primary-dark p-5 text-center text-white">
          <p className="font-bold">Trung tâm xử lý IGNIVO</p>
          <p className="mt-1 text-sm text-background-tertiary">Tiếp nhận tín hiệu · Phân tích · Kích hoạt cảnh báo</p>
        </div>
        <ArrowDown aria-hidden="true" className="mx-auto my-4 text-primary" />
        <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-primary-dark sm:gap-6">
          <div className="flex items-center gap-3 rounded-2xl bg-background-tertiary p-4"><BellRing aria-hidden="true" className="shrink-0" />Còi tại chỗ</div>
          <div className="flex items-center gap-3 rounded-2xl bg-background-tertiary p-4"><Smartphone aria-hidden="true" className="shrink-0" />Ứng dụng</div>
        </div>
      </div>
      <figcaption className="relative mt-4 text-center text-xs leading-relaxed text-muted">Minh họa luồng hoạt động, không phải ảnh thiết bị hoặc giao diện ứng dụng thực tế.</figcaption>
    </figure>
  );
}
