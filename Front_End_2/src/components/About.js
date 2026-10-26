import { ArrowUpRight, Camera, Cpu, Volume2 } from 'lucide-react';
import ProductPreview from './ProductPreview';

const FEATURES = [
  {
    Icon: Camera,
    title: 'Tận dụng camera IP hiện hữu',
    text: 'Kết nối camera IP tương thích để thu nhận hình ảnh phục vụ giám sát và phân tích.',
  },
  {
    Icon: Cpu,
    title: 'Phân tích thông minh tại biên',
    text: 'Ứng dụng AI/CV để phát hiện ngọn lửa, phân tích con người và đối chiếu khuôn mặt với dữ liệu đăng ký.',
  },
  {
    Icon: Volume2,
    title: 'Cảnh báo và quản lý sự kiện',
    text: 'Phát cảnh báo âm thanh tại chỗ, gửi thông báo đến điện thoại và lưu bằng chứng trực quan để hỗ trợ xác minh.',
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4B65E8]">
            01 / HỆ SINH THÁI IGNIVO
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0F1D3D] sm:text-4xl md:text-5xl">
            Camera hiện hữu.<br />
            <span className="text-[#4B65E8]">Giám sát thông minh hơn.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#2D2D2D]/85 md:text-lg">
            IGNIVO bổ sung khả năng phân tích hình ảnh và cảnh báo thông minh cho hệ thống camera IP tương thích, giúp người dùng phát hiện dấu hiệu ngọn lửa, nhận biết sự xuất hiện của con người và xác minh các sự kiện bất thường.
          </p>
          
          <div className="mt-8 divide-y divide-[#E0E9F5] border-y border-[#E0E9F5]">
            {FEATURES.map(({ Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4B65E8]/10 text-[#4B65E8]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#0F1D3D]">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#666666]">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <a 
            href="#solutions" 
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#4B65E8] transition-colors hover:text-[#0F1D3D]"
          >
            Khám phá công nghệ bảo vệ
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Cột phải: Sơ đồ kiến trúc sản phẩm */}
        <div className="w-full">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
