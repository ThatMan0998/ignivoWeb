import { Camera, Cpu, BellRing, ArrowRight } from 'lucide-react';

const STEPS = [
  { Icon: Camera, num: '01', title: 'Nhận diện', description: 'Camera và cảm biến ghi nhận dấu hiệu bất thường trong không gian.' },
  { Icon: Cpu, num: '02', title: 'Phân tích', description: 'Tín hiệu được chuyển đến trung tâm xử lý để phân tích tình huống.' },
  { Icon: BellRing, num: '03', title: 'Cảnh báo', description: 'Thông báo tới ứng dụng và kích hoạt các kênh cảnh báo được cấu hình.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="brand-dark relative overflow-hidden py-24 lg:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="section-eyebrow !text-primary-light">03 / TỪ TÍN HIỆU ĐẾN HÀNH ĐỘNG</p>
        <div className="mt-4 mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Một quy trình liền mạch.<br /><span className="text-white/45">Ba bước bảo vệ.</span></h2><a href="#hero" className="inline-flex items-center gap-3 text-sm text-primary-light">Trải nghiệm mô phỏng <ArrowRight className="h-4 w-4" /></a></div>
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-14">
          <div className="signal-track" aria-hidden="true"><span /></div>
          {STEPS.map(({ Icon, num, title, description }) => <article key={num} className="relative"><div className="relative mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/50 bg-[#121212] shadow-lg shadow-primary/10"><Icon className="h-7 w-7 text-primary-light" /></div><p className="mb-3 text-xs tracking-widest text-white/40">BƯỚC {num}</p><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-4 max-w-xs text-sm leading-7 text-white/60">{description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
