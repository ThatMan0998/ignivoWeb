import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, ShieldCheck } from 'lucide-react';
import Footer from '@/components/Footer';

import styles from '@/app/chinh-sach-bao-mat/privacy.module.css';


// Render the supplied document as text and semantic elements, never raw HTML.
function InlineText({ text }) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <span key={index}>{part.slice(1, -1)}</span>;
    return part;
  });
}

function DocumentBlocks({ text }) {
  return text.trim().split(/\n\s*\n/).map((block, index) => {
    if (block.startsWith('### ')) return <h3 key={index}>{block.slice(4)}</h3>;
    if (block.startsWith('* ')) return <ul key={index}>{block.split('\n').map((line, item) => <li key={item}><InlineText text={line.replace(/^\* /, '')} /></li>)}</ul>;
    return <p key={index}><InlineText text={block} /></p>;
  });
}

function Contents({ sections }) {
  return <ol className={styles.contents}>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>;
}

export default function LegalDocument({ markdown, title, eyebrow }) {
const [introduction, ...parts] = markdown.replace(/\r\n/g, '\n').split(/^## /m);
const dates = introduction.split('\n').filter(line => line.startsWith('**'));
const sections = parts.map((part, index) => {
  const boundary = part.indexOf('\n');
  return { id: `muc-${index + 1}`, title: part.slice(0, boundary), text: part.slice(boundary + 1) };
});


  return (
    <>
      <a href="#policy-content" className="skip-link">Đến nội dung chính</a>
      <header className="border-b border-border bg-white">
        <nav aria-label="Điều hướng tài liệu" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <Link href="/" aria-label="IGNIVO — Trang chủ" className="flex items-center gap-2"><Image src="/logo.jpg" alt="" width={40} height={40} /><span className="text-xl font-black tracking-tight text-primary-dark">IGNIVO</span></Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-primary-dark"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Trang chủ</Link>
        </nav>
      </header>
      <main id="policy-content" tabIndex={-1}>
        <div id="policy-top" className={`mission-hero ${styles.hero}`}>
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <p className="mb-5 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary-light"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> IGNIVO / {eyebrow}</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">{title}</h1>
            <div className="mt-7 flex flex-col gap-3 text-sm text-white/75 md:flex-row md:gap-8">{dates.map(date => <p key={date}><InlineText text={date} /></p>)}</div>
          </div>
        </div>
        <div className={`mx-auto max-w-6xl px-6 py-12 md:py-16 ${styles.layout}`}>
          <aside className={styles.sidebar} aria-label={`Mục lục ${title}`}>
            <div className={styles.desktopContents}><p className={styles.contentsHeading}>MỤC LỤC</p><Contents sections={sections} /></div>
            <details className={styles.mobileContents}><summary>Mục lục · {sections.length} mục</summary><Contents sections={sections} /></details>
          </aside>
          <article aria-label={title} className={styles.article}>
            {sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2><DocumentBlocks text={section.text} /></section>)}
            <a href="#policy-top" className={styles.backToTop}>Về đầu trang <ArrowUp className="h-4 w-4" aria-hidden="true" /></a>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
