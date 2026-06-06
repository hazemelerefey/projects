import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollectionItem {
  id: number;
  title: string;
  price: number;
  image: string;
  align: 'left' | 'right';
}

const collectionItems: CollectionItem[] = [
  { id: 1, title: 'عباية أروى', price: 450, image: '/collection-1.jpg', align: 'left' },
  { id: 2, title: 'طقم صلاة فيسكوز', price: 280, image: '/collection-2.jpg', align: 'right' },
  { id: 3, title: 'بنطال واسع', price: 320, image: '/collection-3.jpg', align: 'left' },
  { id: 4, title: 'عباية بيج مفتوحة', price: 520, image: '/collection-4.jpg', align: 'right' },
];

const FeaturedCollection = () => {
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

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

      // Tile animations
      tilesRef.current.forEach((tile, i) => {
        if (!tile) return;

        const title = tile.querySelector('.tile-title');
        const isLeft = collectionItems[i].align === 'left';

        // Tile slide in
        gsap.fromTo(
          tile,
          { xPercent: isLeft ? -100 : 100 },
          {
            xPercent: 0,
            ease: 'power2.out',
            duration: 1.25,
            scrollTrigger: {
              trigger: tile,
              scrub: true,
              start: 'top 90%',
              end: 'top 50%',
            },
          }
        );

        // Title 3D rotation
        if (title) {
          gsap.fromTo(
            title,
            {
              x: isLeft ? '-100%' : '100%',
              rotateY: isLeft ? 40 : -40,
              scale: 1.2,
              filter: 'brightness(200%)',
            },
            {
              x: '0%',
              rotateY: 0,
              scale: 1,
              filter: 'brightness(100%)',
              ease: 'power2.out',
              duration: 1.25,
              scrollTrigger: {
                trigger: tile,
                scrub: true,
                start: 'top 90%',
                end: 'top 40%',
              },
            }
          );
        }

        // CTA button fade in
        const cta = tile.querySelector('.tile-cta');
        if (cta) {
          gsap.fromTo(
            cta,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: tile,
                scrub: true,
                start: 'top 60%',
                end: 'top 30%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = (item: CollectionItem) => {
    addItem({
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative py-[120px]"
      style={{ background: '#141414' }}
    >
      <div className="max-w-[1280px] mx-auto px-[4vw] mb-16">
        <h2
          ref={titleRef}
          className="font-cairo font-bold text-white text-center opacity-0"
          style={{
            fontSize: 'clamp(28px, 3vw, 48px)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          تشكيلتنا الحصرية
        </h2>
      </div>

      <div className="gallery-container">
        {collectionItems.map((item, i) => (
          <div
            key={item.id}
            ref={el => { tilesRef.current[i] = el; }}
            className={`tile ${item.align === 'right' ? 'right' : ''}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="tile-image"
              loading="lazy"
            />
            <div className="tile-overlay" />
            <div className="absolute bottom-[5%] right-[5%] z-[3] direction-rtl">
              <h3
                className="tile-title"
                style={{
                  fontFamily: "'Cairo', sans-serif",
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
                  position: 'relative',
                }}
              >
                {item.title}
              </h3>
              <p className="font-almarai text-brand-red text-base font-medium mt-2 mr-1">
                {item.price.toLocaleString('ar-SA')} ر.س
              </p>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="tile-cta absolute bottom-[5%] left-[5%] z-[3] flex items-center gap-2 px-5 py-3 bg-brand-red hover:bg-brand-red-hover text-white font-cairo font-bold rounded-lg transition-all duration-300 hover:shadow-glow opacity-0"
            >
              <ShoppingCart className="w-4 h-4" />
              أضف للسلة
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollection;
