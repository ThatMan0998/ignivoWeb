import Image from 'next/image';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';

const TEAM = [
  { id: 'nhuhuynh', name: 'Nguyễn Thị Như Huỳnh', title: 'CEO', role: 'Project Leader', quote: 'Biến công nghệ thành giá trị' },
  { id: 'tiendat', name: 'Võ Tiến Đạt', title: 'CTO', role: 'Frontend & System Integration Lead', quote: 'Kết nối công nghệ, kiến tạo giải pháp' },
  { id: 'quockhanh', name: 'Lê Quốc Khánh', title: 'CAIO', role: 'AI & Data Lead', quote: 'Dữ liệu tạo nên trí tuệ' },
  { id: 'ngocminh', name: 'Lê Ngọc Minh', title: 'CMO', role: 'Marketing & Research', quote: 'Thấu hiểu thị trường, dẫn lối thành công' },
  { id: 'minhtruc', name: 'Võ Minh Trực', title: 'CCO', role: 'Media & Video Lead', quote: 'Sáng tạo để truyền cảm hứng' },
];

export default function Team() {
  return (
    <section id="team" className="bg-background-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-eyebrow">CON NGƯỜI IGNIVO</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Cùng một tầm nhìn.<br />
              <span className="text-muted">Cùng tạo sự an tâm.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted">
            Năm thành viên, những thế mạnh khác nhau. Cùng kết nối công nghệ, dữ liệu và sáng tạo để xây dựng IGNIVO.
          </p>
        </div>

        {/* Grid 3x2 */}
        <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((member) => (
            <article key={member.id} className="group flex w-full max-w-[320px] flex-col items-center text-center">
              {/* Circular photo */}
              <div className="relative mb-5 h-40 w-40 overflow-hidden rounded-full border-[3px] border-border bg-[#121212] shadow-lg shadow-primary/5 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/15 lg:h-48 lg:w-48">
                <Image
                  src={`/team/${member.id}.png`}
                  alt={`Chân dung ${member.name}`}
                  fill
                  sizes="(max-width: 1024px) 160px, 192px"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.06]"
                />
              </div>
              {/* Info */}
              <span className="mb-2 inline-block rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[10px] font-bold tracking-[.18em] text-primary-dark">
                {member.title}
              </span>
              <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-medium leading-5 text-primary-dark">
                {member.role}
              </p>
              <blockquote className="mt-3 text-xs leading-5 text-muted italic">
                &ldquo;{member.quote}&rdquo;
              </blockquote>
            </article>
          ))}

          {/* Slot 6: Đang tuyển dụng */}
          <article className="group flex w-full max-w-[320px] flex-col items-center text-center">
            <Link
              href="#contact"
              className="relative mb-5 flex h-40 w-40 items-center justify-center rounded-full border-[3px] border-dashed border-border bg-background-tertiary transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 lg:h-48 lg:w-48"
            >
              <UserPlus className="h-10 w-10 text-muted transition-colors group-hover:text-primary" />
            </Link>
            <span className="mb-2 inline-block rounded-full border border-border bg-background-tertiary px-3 py-1 text-[10px] font-bold tracking-[.18em] text-muted">
              HIRING
            </span>
            <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground">
              Đang tuyển dụng
            </h3>
            <p className="mt-1 text-xs font-medium leading-5 text-primary-dark">
              Vị trí tiếp theo có thể là bạn!
            </p>
            <Link href="#contact" className="mt-3 text-xs font-semibold text-primary transition-colors hover:text-primary-dark">
              Ứng tuyển ngay →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
