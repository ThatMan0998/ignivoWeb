"use client";

import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

// Original decorative geometry; no logo or artwork from the reference site.
const POINTS = [[4, 14], [12, 8], [18, 25], [7, 39], [24, 44], [14, 64], [3, 77], [25, 88], [38, 9], [46, 25], [59, 7], [68, 22], [82, 8], [95, 19], [88, 37], [74, 48], [96, 61], [82, 73], [66, 87], [94, 92]];
const EDGES = POINTS.flatMap((point, index) => POINTS.slice(index + 1).map((other, offset) => ({ a: point, b: other, key: `${index}-${index + offset + 1}` })).filter(({ a, b }) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 25));
const SPRING = { stiffness: 100, damping: 24, mass: 0.7 };

export default function HeroScene({ children }) {
    const sceneRef = useRef(null);
    const rotateX = useSpring(0, SPRING);
    const rotateY = useSpring(0, SPRING);
    const backgroundX = useSpring(0, SPRING);
    const backgroundY = useSpring(0, SPRING);

    useEffect(() => {
        const section = sceneRef.current?.closest('section');
        if (!section) return;
        const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        const reset = () => {
            rotateX.set(0); rotateY.set(0);
            backgroundX.set(0); backgroundY.set(0);
        };
        const move = event => {
            if (!enabled.matches || event.pointerType !== 'mouse') { reset(); return; }
            const bounds = section.getBoundingClientRect();
            const nx = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / Math.max(bounds.width, 1) * 2 - 1));
            const ny = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / Math.max(bounds.height, 1) * 2 - 1));
            rotateX.set(-ny * 4);
            rotateY.set(nx * 4);
            backgroundX.set(-nx * 18);
            backgroundY.set(-ny * 18);
        };
        section.addEventListener('pointermove', move, { passive: true });
        section.addEventListener('pointerleave', reset);
        section.addEventListener('pointercancel', reset);
        section.addEventListener('focusin', reset);
        window.addEventListener('scroll', reset, { passive: true });
        window.addEventListener('blur', reset);
        enabled.addEventListener('change', reset);
        return () => {
            section.removeEventListener('pointermove', move);
            section.removeEventListener('pointerleave', reset);
            section.removeEventListener('pointercancel', reset);
            section.removeEventListener('focusin', reset);
            window.removeEventListener('scroll', reset);
            window.removeEventListener('blur', reset);
            enabled.removeEventListener('change', reset);
        };
    }, [rotateX, rotateY, backgroundX, backgroundY]);

    return (
        <div ref={sceneRef} className="hero-scene relative w-full">
            <motion.div aria-hidden="true" className="hero-scene-background pointer-events-none absolute -inset-16" style={{ x: backgroundX, y: backgroundY }}>
                <div className="hero-scene-grid absolute inset-0" />
                <svg className="absolute inset-0 h-full w-full text-primary" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
                    {EDGES.map(({ a, b, key }) => <line key={key} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="currentColor" strokeWidth="0.08" opacity="0.13" />)}
                    {POINTS.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="0.2" fill="currentColor" opacity="0.25" />)}
                </svg>
            </motion.div>
            <motion.div className="hero-scene-content relative" style={{ transformPerspective: 1400, rotateX, rotateY }}>
                <div aria-hidden="true" className="hero-scene-corners pointer-events-none absolute inset-x-6 -inset-y-5 mx-auto max-w-5xl">
                    <span className="absolute left-0 top-0 h-12 w-12 rounded-tl-3xl border-l-2 border-t-2 border-primary/20" />
                    <span className="absolute right-0 top-0 h-12 w-12 rounded-tr-3xl border-r-2 border-t-2 border-primary/20" />
                    <span className="absolute bottom-0 left-0 h-12 w-12 rounded-bl-3xl border-b-2 border-l-2 border-primary-light/30" />
                    <span className="absolute bottom-0 right-0 h-12 w-12 rounded-br-3xl border-b-2 border-r-2 border-primary-light/30" />
                </div>
                {children}
            </motion.div>
        </div>
    );
}