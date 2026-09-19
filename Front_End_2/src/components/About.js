import { ArrowUpRight, Camera, Radio, BellRing } from 'lucide-react';
import ProductPreview from './ProductPreview';

export default function About() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="section-eyebrow">01 / HỆ SINH THÁI IGNIVO</p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Từng thiết bị.<br /><span className="text-muted">Một lớp an tâm.</span></h2>
          <p className="mt-6 max-w-md leading-8 text-text-secondary">Camera nhìn thấy. Cảm biến ghi nhận. IGNIVO kết nối các tín hiệu để giúp bạn chủ động bảo vệ gia đình và công trình.</p>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {[{ Icon: Camera, title: 'Camera AI', text: 'Phân tích hình ảnh và dấu hiệu bất thường' }, { Icon: Radio, title: 'Cảm biến IoT', text: 'Theo dõi những thay đổi của môi trường' }, { Icon: BellRing, title: 'Cảnh báo đa kênh', text: 'Kết nối còi tại chỗ và ứng dụng di động' }].map(({ Icon, title, text }) => <div key={title} className="flex items-center gap-4 py-5"><Icon className="h-5 w-5 shrink-0 text-primary" /><div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-sm text-muted">{text}</p></div></div>)}
          </div>
          <a href="#solutions" className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-primary-dark">Khám phá công nghệ <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="hardware-stage"><ProductPreview /></div>
      </div>
    </section>
  );
}
