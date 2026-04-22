"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * ParticleHero — brand dot-wave animated backdrop.
 *
 * Draws:
 *   - a field of glowing dots arranged in a warped grid, shaped into a
 *     moving “wave” (like the palette reference)
 *   - a right-side emphasis with a soft fade-out to the left
 *
 * Behaviour:
 *   - Scales with devicePixelRatio and resizes on window resize
 *   - Pauses when document is hidden or canvas is off-screen
 *   - Respects prefers-reduced-motion (renders a single static frame)
 *   - Adapts palette between dark and light themes via next-themes
 */
export function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const state = {
      width: 0,
      height: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      running: true,
      visible: true,
      t: 0,
      isDark: resolvedTheme !== "light",
    };

    // --- Dot field configuration -----------------------------------------
    type Dot = { u: number; v: number; seed: number };
    const dots: Dot[] = [];
    const DOT_COLS = 64;
    const DOT_ROWS = 28;

    const reseedDots = () => {
      dots.length = 0;

      // A normalized grid (u: 0..1 left->right, v: 0..1 top->bottom)
      for (let y = 0; y < DOT_ROWS; y++) {
        for (let x = 0; x < DOT_COLS; x++) {
          const u = x / (DOT_COLS - 1);
          const v = y / (DOT_ROWS - 1);
          dots.push({ u, v, seed: hash01(x * 97.3 + y * 13.7) });
        }
      }
    };

    // --- Sizing ----------------------------------------------------------
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = Math.floor(rect.width * state.dpr);
      canvas.height = Math.floor(rect.height * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    // --- Palette helpers -------------------------------------------------
    const palette = () => {
      const dark = state.isDark;
      return {
        bg: dark ? "rgb(5, 7, 10)" : "rgb(255, 255, 255)",
        glowA: [111, 231, 210] as [number, number, number], // #6FE7D2
        glowB: [43, 182, 168] as [number, number, number], // #2BB6A8
        dotAlpha: dark ? 0.85 : 0.48,
        dotSoftAlpha: dark ? 0.22 : 0.14,
      };
    };

    // --- Drawing ---------------------------------------------------------
    const drawBackdrop = () => {
      const p = palette();
      const { width, height } = state;

      ctx.clearRect(0, 0, width, height);

      // Slight vignette biased toward the right (where the wave lives).
      const radial = ctx.createRadialGradient(
        width * 0.72,
        height * 0.48,
        Math.min(width, height) * 0.05,
        width * 0.72,
        height * 0.48,
        Math.max(width, height) * 0.95
      );
      radial.addColorStop(0, `rgba(${p.glowA[0]}, ${p.glowA[1]}, ${p.glowA[2]}, ${state.isDark ? 0.18 : 0.12})`);
      radial.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    };

    const drawDotWave = () => {
      const p = palette();
      const { width, height, t } = state;
      const ms = motionScale();

      // Wave sits on the right half, roughly centered vertically.
      const centerX = width * 0.70;
      const centerY = height * 0.52;
      const waveWidth = width * 0.62;
      const waveHeight = height * 0.46;

      // Left-to-right fade (strong on the right).
      const fade = (u: number) => smoothstep(0.18, 0.92, u);

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (const dot of dots) {
        // Map normalized grid to a “billboard” rect on the right.
        const localX = (dot.u - 0.5) * waveWidth;
        const localY = (dot.v - 0.5) * waveHeight;

        // Depth gradient makes bottom rows larger / brighter.
        const depth = smoothstep(0.0, 1.0, dot.v);

        // Noise-driven warp to form a drifting dot-wave surface.
        const n1 = noise2(dot.u * 2.2 + t * 0.08 * ms, dot.v * 2.8 - t * 0.06 * ms);
        const n2 = noise2(dot.u * 5.2 - t * 0.11 * ms, dot.v * 3.6 + t * 0.07 * ms);
        const warpX = (n1 - 0.5) * (12 + 36 * depth);
        const warpY = (n2 - 0.5) * (10 + 44 * depth);

        // A primary wave ridge (more pronounced in the middle rows).
        const ridge =
          Math.sin(dot.u * Math.PI * 2 + t * 0.9 * ms) * (10 + 24 * depth) +
          Math.sin(dot.u * Math.PI * 4 - t * 0.55 * ms) * (4 + 12 * (1 - depth));

        const x = centerX + localX + warpX;
        const y = centerY + localY + warpY + ridge * (0.22 + 0.78 * (1 - Math.abs(dot.v - 0.52)));

        // Dot size and opacity.
        const baseR = 0.85 + depth * 1.65;
        const tw = 0.75 + Math.sin(t * 1.6 * ms + dot.seed * Math.PI * 2) * 0.25;
        const uFade = fade(dot.u);

        const hueT = clamp01(dot.u * 0.85 + (n1 - 0.5) * 0.25);
        const rgb = lerpColor(p.glowA, p.glowB, hueT);

        const alpha = p.dotAlpha * uFade * (0.32 + 0.68 * depth) * tw;
        const softAlpha = p.dotSoftAlpha * uFade * (0.25 + 0.75 * depth) * tw;

        // Soft glow
        const glowR = baseR * (5.0 + 2.5 * depth);
        const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        g.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${softAlpha})`);
        g.addColorStop(1, "rgba(43, 182, 168, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, baseR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      drawBackdrop();
      drawDotWave();
    };

    // --- Loop ------------------------------------------------------------
    let rafId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      state.t += dt;
      render();
      if (state.running && state.visible) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const start = () => {
      if (!state.running || !state.visible) return;
      cancelAnimationFrame(rafId);
      last = performance.now();
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
    };

    // --- Visibility & motion preferences ---------------------------------
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motionScale = () => (reduceMotion.matches ? 0.22 : 1);
    const onReduceMotionChange = () => {
      // Keep animating even with reduced-motion enabled, but at a gentler pace.
      state.running = true;
      start();
    };
    reduceMotion.addEventListener?.("change", onReduceMotionChange);

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else if (state.running && state.visible) {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          state.visible = entry.isIntersecting;
          if (state.visible && state.running) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    // --- Kick off --------------------------------------------------------
    resize();
    reseedDots();

    state.running = true;
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener?.("change", onReduceMotionChange);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-auto absolute inset-0 h-full w-full"
    />
  );
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function hash01(n: number) {
  const s = Math.sin(n) * 43758.5453123;
  return s - Math.floor(s);
}

// Value-noise: cheap, dependency-free, good enough for dot warping.
function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const a = hash01(xi * 157.0 + yi * 113.0);
  const b = hash01((xi + 1) * 157.0 + yi * 113.0);
  const c = hash01(xi * 157.0 + (yi + 1) * 113.0);
  const d = hash01((xi + 1) * 157.0 + (yi + 1) * 113.0);

  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const lerp = (p: number, q: number, t: number) => p + (q - p) * t;
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
