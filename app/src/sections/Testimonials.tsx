import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'أجمل عباية اشتريتها في حياتي، القماش روعة والخياطة ممتازة',
    name: 'نورة العتيبي',
  },
  {
    quote: 'تجربة تسوق سهلة وسلسة، الطلب وصلني خلال يومين',
    name: 'فاطمة الزهراني',
  },
  {
    quote: 'تشكيلة واسعة وأسعار منافسة، أنصح الكل يجرب',
    name: 'سارة القحطاني',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-[120px]"
      style={{ background: '#0A0A0A' }}
    >
      <div className="max-w-[1280px] mx-auto px-[4vw]">
        <h2
          ref={titleRef}
          className="font-cairo font-bold text-white text-center mb-16 opacity-0"
          style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          آراء عملائنا
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="bg-brand-dark-secondary p-10 px-8 rounded-lg border border-white/[0.08] opacity-0 hover:border-brand-red/40 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              <p className="font-almarai text-white/70 text-base leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <span className="font-almarai text-xs font-medium text-white tracking-wider uppercase">
                {testimonial.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
