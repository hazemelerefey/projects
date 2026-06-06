import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { label: 'أقمشة فاخرة', x: 500, y: 250 },
  { label: 'تصاميم عصرية', x: 800, y: 400 },
  { label: 'خياطة يدوية', x: 200, y: 500 },
  { label: 'شحن سريع', x: 500, y: 550 },
  { label: 'إرجاع سهل', x: 700, y: 650 },
  { label: 'دعم 24/7', x: 300, y: 700 },
];

const BrandValues = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Grid animation
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="values"
      className="relative py-[120px]"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1280px] mx-auto px-[4vw] mb-12">
        <div ref={titleRef} className="text-center opacity-0">
          <h2
            className="font-cairo font-bold text-white mb-4"
            style={{
              fontSize: 'clamp(28px, 3vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            قيمنا
          </h2>
          <p className="font-almarai text-sm text-white/50">
            ما يميز موضة سلة عن غيرها
          </p>
        </div>
      </div>

      <div ref={gridRef} className="grid-container opacity-0">
        <svg
          className="grid-svg"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gridGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(229, 9, 20, 0.4)" />
              <stop offset="100%" stopColor="rgba(229, 9, 20, 0.05)" />
            </linearGradient>
          </defs>

          <g className="lines">
            {/* Horizontal curved lines */}
            <path
              className="curved-x"
              d="M0,200 C200,200 300,400 500,400 C700,400 800,200 1000,200"
              fill="none"
              stroke="url(#gridGrad)"
              strokeWidth="0.5"
            />
            <path
              className="curved-x"
              d="M0,400 C300,200 400,600 500,400 C600,200 700,600 1000,400"
              fill="none"
              stroke="url(#gridGrad)"
              strokeWidth="0.5"
              style={{ animationDelay: '1s' }}
            />
            <path
              className="curved-x"
              d="M0,600 C200,500 400,700 500,500 C600,300 800,500 1000,400"
              fill="none"
              stroke="url(#gridGrad)"
              strokeWidth="0.5"
              style={{ animationDelay: '2s' }}
            />

            {/* Vertical curved lines */}
            <path
              className="curved-y"
              d="M200,0 C200,200 400,300 400,500 C400,700 200,800 200,1000"
              fill="none"
              stroke="url(#gridGrad)"
              strokeWidth="0.5"
            />
            <path
              className="curved-y"
              d="M500,0 C300,200 700,300 500,500 C300,700 700,600 500,800"
              fill="none"
              stroke="url(#gridGrad)"
              strokeWidth="0.5"
              style={{ animationDelay: '1.5s' }}
            />
            <path
              className="curved-y"
              d="M800,0 C700,300 600,200 500,400 C400,600 600,700 800,800"
              fill="none"
              stroke="url(#gridGrad)"
              strokeWidth="0.5"
              style={{ animationDelay: '3s' }}
            />
          </g>

          {/* Nodes */}
          {values.map((value, i) => (
            <g key={i} className="node" style={{ animationDelay: `${i * 0.5}s` }}>
              <circle cx={value.x} cy={value.y} r="6" fill="#fff" />
              <text
                x={value.x}
                y={value.y + 22}
                fill="#fff"
                fontSize="14"
                fontFamily="Almarai"
                textAnchor="middle"
                fontWeight="500"
              >
                {value.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
};

export default BrandValues;
