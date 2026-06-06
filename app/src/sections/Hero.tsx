import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import RollingText from '@/components/RollingText';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated mesh gradient background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.005;
      const w = canvas.width;
      const h = canvas.height;

      // Clear with dark base
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, w, h);

      // Create flowing fabric-like gradient
      const gradient = ctx.createRadialGradient(
        w * (0.3 + Math.sin(time) * 0.2),
        h * (0.4 + Math.cos(time * 0.7) * 0.2),
        0,
        w * 0.5,
        h * 0.5,
        w * 0.8
      );
      gradient.addColorStop(0, 'rgba(229, 9, 20, 0.25)');
      gradient.addColorStop(0.3, 'rgba(229, 9, 20, 0.08)');
      gradient.addColorStop(0.6, 'rgba(229, 100, 10, 0.03)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Second flowing blob
      const gradient2 = ctx.createRadialGradient(
        w * (0.7 + Math.cos(time * 0.8) * 0.2),
        h * (0.6 + Math.sin(time * 0.5) * 0.2),
        0,
        w * 0.5,
        h * 0.5,
        w * 0.6
      );
      gradient2.addColorStop(0, 'rgba(229, 9, 20, 0.12)');
      gradient2.addColorStop(0.5, 'rgba(200, 50, 20, 0.04)');
      gradient2.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, w, h);

      // Gold accent blob
      const gradient3 = ctx.createRadialGradient(
        w * (0.5 + Math.sin(time * 0.3) * 0.1),
        h * (0.3 + Math.cos(time * 0.4) * 0.1),
        0,
        w * 0.5,
        h * 0.3,
        w * 0.3
      );
      gradient3.addColorStop(0, 'rgba(229, 160, 13, 0.06)');
      gradient3.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, w, h);

      // Subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Text entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(
        headlineRef.current?.querySelectorAll('.word') || [],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        },
        '-=0.4'
      )
      .to(
        sublineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const headlineWords = ['أناقة', 'لا', 'تُضاهى'];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-[4vw] pb-[15vh]">
        <span
          ref={labelRef}
          className="inline-block font-almarai text-xs font-medium text-white/50 uppercase tracking-[0.1em] mb-6 opacity-0 translate-y-4"
        >
          مجموعة رمضان 2026
        </span>

        <h1
          ref={headlineRef}
          className="font-cairo font-extrabold text-white mb-6"
          style={{
            fontSize: 'clamp(56px, 8vw, 140px)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
          }}
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="word inline-block mr-4 opacity-0 translate-y-8">
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={sublineRef}
          className="font-almarai text-lg text-white/70 max-w-[480px] mb-8 opacity-0 translate-y-4 leading-relaxed"
        >
          تشكيلة حصرية من العبايات والفساتين بأجود الأقمشة
        </p>

        <button
          ref={ctaRef}
          onClick={() => {
            const el = document.querySelector('#products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-cairo font-bold text-base px-10 py-4 rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105 active:scale-[0.98] opacity-0 translate-y-4"
        >
          <RollingText text="تسوقي الآن" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="scroll-indicator-line" />
        <span className="font-almarai text-xs text-white/50 tracking-wider">
          اسحبي للأسفل
        </span>
      </div>
    </section>
  );
};

export default Hero;
