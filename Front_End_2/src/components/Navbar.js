"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Giới thiệu', href: '#about' },
  { name: 'Giải pháp', href: '#solutions' },
  { name: 'Cách hoạt động', href: '#how-it-works' },
  { name: 'Sản phẩm', href: '#products' },
  { name: 'Đội ngũ', href: '#team' },
  { name: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const pendingSection = useRef(null);
  const selectionTimer = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setIsScrolled(window.scrollY > 20);
      if (pendingSection.current) {
        setActiveSection(pendingSection.current);
        return;
      }
      let current = '';
      for (const href of [...NAV_LINKS.map(link => link.href), '#contact']) {
        const section = document.querySelector(href);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = href;
      }
      setActiveSection(current);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const resumeTracking = () => {
      pendingSection.current = null;
      clearTimeout(selectionTimer.current);
      schedule();
    };
    const resumeOnKey = event => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) resumeTracking();
    };
    const closeOnEscape = event => {
      if (event.key === 'Escape') { setMobileMenuOpen(false); if (document.getElementById('mobile-navigation')) toggleRef.current?.focus(); }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenuOpen(false); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('scrollend', resumeTracking);
    window.addEventListener('wheel', resumeTracking, { passive: true });
    window.addEventListener('touchstart', resumeTracking, { passive: true });
    document.addEventListener('keydown', resumeOnKey);
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(selectionTimer.current);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scrollend', resumeTracking);
      window.removeEventListener('wheel', resumeTracking);
      window.removeEventListener('touchstart', resumeTracking);
      document.removeEventListener('keydown', resumeOnKey);
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, []);

  const selectSection = (event, href, moveFocus = false) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setActiveSection(href === '#main-content' ? '' : href);
    pendingSection.current = href === '#main-content' ? '' : href;
    clearTimeout(selectionTimer.current);
    // Keep the clicked destination selected while smooth scrolling passes other sections.
    selectionTimer.current = setTimeout(() => {
      pendingSection.current = null;
      window.dispatchEvent(new Event('scroll'));
    }, 1800);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target && moveFocus) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'border-border/10 bg-white/95 py-3 shadow-sm backdrop-blur-lg' : 'border-transparent bg-white/90 py-5'}`}>
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="#main-content" onClick={event => selectSection(event, '#main-content', true)} aria-label="IGNIVO — Trang chủ" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.jpg" alt="" width={40} height={40} className="rounded-lg object-contain" />
          <span className="text-xl font-black tracking-tight text-primary-dark">IGNIVO</span>
        </Link>
        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={event => selectSection(event, link.href)} aria-current={activeSection === link.href ? 'location' : undefined} className={`relative isolate rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-200 ${activeSection === link.href ? 'text-primary-dark' : 'text-muted hover:bg-background-secondary hover:text-primary-dark'}`}>
              {activeSection === link.href && <motion.span aria-hidden="true" layoutId="desktop-active-menu" initial={false} transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 35 }} className="absolute inset-0 -z-10 rounded-xl bg-primary/10"><span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" /></motion.span>}
              {link.name}
            </Link>
          ))}
        </nav>
        <Link href="#contact" onClick={event => selectSection(event, '#contact')} aria-current={activeSection === '#contact' ? 'location' : undefined} className={`hidden shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-dark lg:inline-flex ${activeSection === '#contact' ? 'ring-4 ring-primary/20 ring-offset-2' : ''}`}>Tư vấn ngay</Link>
        <button ref={toggleRef} type="button" aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen(open => !open)} className="rounded-lg p-3 text-foreground lg:hidden">
          {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav id="mobile-navigation" aria-label="Điều hướng di động" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="absolute inset-x-0 top-full max-h-[calc(100dvh-80px)] overflow-y-auto border-b border-border/10 bg-white px-6 py-4 shadow-lg lg:hidden">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={event => selectSection(event, link.href, true)} aria-current={activeSection === link.href ? 'location' : undefined} className={`relative isolate block rounded-lg px-4 py-3 font-semibold transition-colors ${activeSection === link.href ? 'text-primary-dark' : 'text-foreground hover:bg-background-secondary'}`}>
                {activeSection === link.href && <motion.span aria-hidden="true" layoutId="mobile-active-menu" initial={false} transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }} className="absolute inset-0 -z-10 rounded-lg bg-primary/10"><span className="absolute inset-y-3 left-0 w-1 rounded-full bg-primary" /></motion.span>}
                {link.name}
              </Link>
            ))}
            <Link href="#contact" onClick={event => selectSection(event, '#contact', true)} aria-current={activeSection === '#contact' ? 'location' : undefined} className={`mt-3 block rounded-xl bg-primary px-5 py-3 text-center font-semibold text-white hover:bg-primary-dark ${activeSection === '#contact' ? 'ring-4 ring-primary/20 ring-offset-2' : ''}`}>Tư vấn ngay</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
