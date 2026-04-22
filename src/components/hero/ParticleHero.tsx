"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

/**
 * ParticleHero — synthwave-style animated backdrop.
 *
 * Draws:
 *   - a perspective grid receding to a horizon, drifting toward the viewer
 *   - a field of glowing particles above the grid with additive blending,
 *     subtle parallax and horizon-wrapping
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
      pointer: { x: 0, y: 0, active: false },
      isDark: resolvedTheme !== "light",
    };

    // --- Particle & grid configuration -----------------------------------
    type Particle = {
      x: number;
      y: number;
      z: number; // depth 0..1 (0 = far)
      r: number; // radius
      speed: number;
      hue: number; // 0 = brand-from tone, 1 = brand-to tone
      twinkle: number;
    };

    const PARTICLE_COUNT = 180;
    const particles: Particle[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const seedParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random(),
          y: Math.random(),
          z: Math.random(),
          r: rand(0.4, 1.8),
          speed: rand(0.015, 0.06),
          hue: Math.random(),
          twinkle: rand(0, Math.PI * 2),
        });
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
      // Brand from #6FE7D2 → to #2BB6A8, with theme-aware opacity ceilings.
      const dark = state.isDark;
      return {
        bgGradientFrom: dark ? "rgba(5, 7, 10, 0)" : "rgba(255, 255, 255, 0)",
        bgGradientTo: dark ? "rgba(5, 7, 10, 1)" : "rgba(255, 255, 255, 1)",
        grid: dark ? "rgba(62, 214, 194, 0.42)" : "rgba(43, 182, 168, 0.28)",
        gridFar: dark ? "rgba(62, 214, 194, 0.05)" : "rgba(43, 182, 168, 0.04)",
        horizonGlow: dark ? "rgba(111, 231, 210, 0.25)" : "rgba(111, 231, 210, 0.18)",
        particleCoreFrom: "rgba(111, 231, 210, 1)",
        particleCoreTo: "rgba(43, 182, 168, 1)",
        particleGlowAlpha: dark ? 0.85 : 0.55,
      };
    };

    // --- Drawing ---------------------------------------------------------
    const drawBackdrop = () => {
      const p = palette();
      const { width, height } = state;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Soft radial vignette toward horizon for depth.
      const horizonY = height * 0.58;
      const radial = ctx.createRadialGradient(
        width / 2,
        horizonY,
        Math.min(width, height) * 0.05,
        width / 2,
        horizonY,
        Math.max(width, height) * 0.85
      );
      radial.addColorStop(0, p.horizonGlow);
      radial.addColorStop(1, p.bgGradientFrom);
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);
    };

    const drawGrid = () => {
      const p = palette();
      const { width, height, t } = state;

      const horizonY = height * 0.58;
      const vanishX = width / 2;
      const gridDepthRows = 20;
      const gridCols = 26;
      const rowSpacing = (height - horizonY) / gridDepthRows;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Animated forward-drift: shift pattern toward viewer over time.
      const drift = (t * 0.06) % 1;

      // Horizontal scan lines (receding toward horizon)
      for (let i = 0; i <= gridDepthRows; i++) {
        const progress = (i + drift) / gridDepthRows;
        if (progress <= 0 || progress >= 1) continue;

        // Perspective: rows near viewer are farther apart than rows near horizon.
        const eased = Math.pow(progress, 2.2);
        const y = horizonY + eased * (height - horizonY);

        const alpha = Math.min(1, Math.max(0, progress));
        ctx.strokeStyle = mixStroke(p.gridFar, p.grid, alpha);
        ctx.lineWidth = 1 + alpha * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical perspective lines
      for (let i = -gridCols; i <= gridCols; i++) {
        const xBase = vanishX + ((i + drift * 2) / gridCols) * (width * 0.9);
        ctx.strokeStyle = p.grid;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(xBase, height);
        ctx.stroke();
      }

      // Horizon line (bright)
      const horizonGrad = ctx.createLinearGradient(0, 0, width, 0);
      horizonGrad.addColorStop(0, "rgba(111, 231, 210, 0)");
      horizonGrad.addColorStop(0.5, state.isDark ? "rgba(111, 231, 210, 0.9)" : "rgba(43, 182, 168, 0.7)");
      horizonGrad.addColorStop(1, "rgba(111, 231, 210, 0)");
      ctx.strokeStyle = horizonGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // Horizon glow (soft bloom above)
      const bloom = ctx.createLinearGradient(0, horizonY - 80, 0, horizonY);
      bloom.addColorStop(0, "rgba(111, 231, 210, 0)");
      bloom.addColorStop(1, state.isDark ? "rgba(111, 231, 210, 0.22)" : "rgba(43, 182, 168, 0.15)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, horizonY - 80, width, 80);

      ctx.restore();
    };

    const drawParticles = () => {
      const p = palette();
      const { width, height, t, pointer } = state;
      const horizonY = height * 0.58;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (const particle of particles) {
        particle.z += particle.speed * 0.01;
        if (particle.z > 1) particle.z -= 1;

        // Parallax: particles at higher z shift more with pointer.
        const px = pointer.active ? (pointer.x - 0.5) * 40 * particle.z : 0;
        const py = pointer.active ? (pointer.y - 0.5) * 20 * particle.z : 0;

        const x = particle.x * width + px;
        // Particles float in upper band (sky), gently bobbing.
        const baseY = particle.y * horizonY;
        const y = baseY + Math.sin(t * 0.6 + particle.twinkle) * 1.4 + py;

        const twinkle = 0.65 + Math.sin(t * 1.5 + particle.twinkle) * 0.35;
        const radius = particle.r * (0.8 + particle.z * 0.8);
        const glowRadius = radius * 6;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        const colorMix = lerpColor(
          [111, 231, 210],
          [43, 182, 168],
          particle.hue
        );
        glow.addColorStop(
          0,
          `rgba(${colorMix[0]}, ${colorMix[1]}, ${colorMix[2]}, ${
            p.particleGlowAlpha * twinkle
          })`
        );
        glow.addColorStop(
          0.4,
          `rgba(${colorMix[0]}, ${colorMix[1]}, ${colorMix[2]}, ${
            p.particleGlowAlpha * 0.25 * twinkle
          })`
        );
        glow.addColorStop(1, "rgba(43, 182, 168, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${colorMix[0]}, ${colorMix[1]}, ${colorMix[2]}, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      drawBackdrop();
      drawGrid();
      drawParticles();
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
    const onReduceMotionChange = () => {
      if (reduceMotion.matches) {
        state.running = false;
        stop();
        render();
      } else {
        state.running = true;
        start();
      }
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

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.pointer.x = (e.clientX - rect.left) / rect.width;
      state.pointer.y = (e.clientY - rect.top) / rect.height;
      state.pointer.active = true;
    };
    const onPointerLeave = () => {
      state.pointer.active = false;
    };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      resize();
    };
    window.addEventListener("resize", onResize);

    // --- Kick off --------------------------------------------------------
    resize();
    seedParticles();

    if (reduceMotion.matches) {
      state.running = false;
      render();
    } else {
      start();
    }

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener?.("change", onReduceMotionChange);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
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

/**
 * Returns an rgba string mixing two CSS rgba strings by alpha only.
 * Used to ease grid line visibility as rows approach the viewer.
 */
function mixStroke(from: string, to: string, t: number): string {
  const parse = (s: string) => {
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0, 1] as [number, number, number, number];
    const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
    return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, parts[3] ?? 1] as [
      number,
      number,
      number,
      number,
    ];
  };
  const [fr, fg, fb, fa] = parse(from);
  const [tr, tg, tb, ta] = parse(to);
  const r = Math.round(fr + (tr - fr) * t);
  const g = Math.round(fg + (tg - fg) * t);
  const b = Math.round(fb + (tb - fb) * t);
  const a = fa + (ta - fa) * t;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
