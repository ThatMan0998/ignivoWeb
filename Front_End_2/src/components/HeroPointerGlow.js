"use client";

import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function HeroPointerGlow() {
    const glowRef = useRef(null);
    const x = useSpring(0, { stiffness: 160, damping: 28, mass: 0.6 });
    const y = useSpring(0, { stiffness: 160, damping: 28, mass: 0.6 });
    const opacity = useSpring(0, { stiffness: 180, damping: 30 });

    useEffect(() => {
        const section = glowRef.current?.closest('section');
        if (!section) return;

        const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        let tracking = false;
        const hide = () => { tracking = false; opacity.set(0); };
        const move = event => {
            if (!enabled.matches || event.pointerType !== 'mouse') { hide(); return; }
            const bounds = section.getBoundingClientRect();
            const nextX = event.clientX - bounds.left;
            const nextY = event.clientY - bounds.top;
            // Start at the entry point rather than flying in from the previous position.
            if (!tracking) { x.jump(nextX); y.jump(nextY); }
            else { x.set(nextX); y.set(nextY); }
            tracking = true;
            opacity.set(1);
        };

        section.addEventListener('pointermove', move, { passive: true });
        section.addEventListener('pointerleave', hide);
        section.addEventListener('pointercancel', hide);
        window.addEventListener('scroll', hide, { passive: true });
        window.addEventListener('blur', hide);
        enabled.addEventListener('change', hide);
        return () => {
            section.removeEventListener('pointermove', move);
            section.removeEventListener('pointerleave', hide);
            section.removeEventListener('pointercancel', hide);
            window.removeEventListener('scroll', hide);
            window.removeEventListener('blur', hide);
            enabled.removeEventListener('change', hide);
        };
    }, [x, y, opacity]);

    return <motion.div ref={glowRef} aria-hidden="true" className="hero-pointer-glow" style={{ x, y, opacity }} />;
}