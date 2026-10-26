import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="IGNIVO Logo"
                width={40}
                height={40}
                className="rounded-lg object-contain"
              />
              <span className="font-black text-xl tracking-tight text-foreground">IGNIVO</span>
            </Link>
            <p className="text-muted leading-relaxed max-w-sm">
              Hệ thống an ninh và an toàn phòng cháy chữa cháy ứng dụng thị giác máy tính và IoT
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Liên Kết</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/#about" className="text-muted hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link href="/#solutions" className="text-muted hover:text-primary transition-colors">Giải pháp</Link></li>
              <li><Link href="/#products" className="text-muted hover:text-primary transition-colors">Sản phẩm</Link></li>
              <li><Link href="/#team" className="text-muted hover:text-primary transition-colors">Đội ngũ</Link></li>
              <li><Link href="/#faq" className="text-muted hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Liên Hệ</h4>
            <ul className="flex flex-col gap-2 text-muted">
              <li>
                <a href="mailto:contact@ignivo.vn" className="hover:text-primary transition-colors">
                  Email: contact@ignivo.vn
                </a>
              </li>
              <li>
                <a href="tel:19009999" className="hover:text-primary transition-colors">
                  Hotline: 1900 9999
                </a>
              </li>
              <li>Địa chỉ: Khu Công nghệ cao Hòa Lạc, Hà Nội</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} IGNIVO. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/chinh-sach-bao-mat" className="text-muted hover:text-primary transition-colors text-sm">Chính sách bảo mật</Link>
            <Link href="/dieu-khoan-su-dung" className="text-muted hover:text-primary transition-colors text-sm">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
