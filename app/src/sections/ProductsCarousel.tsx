import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '@/hooks/useCart';
import RollingText from '@/components/RollingText';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  alt: string;
}

const products: Product[] = [
  { id: 1, title: 'Arwa Abaya', price: 450, image: '/product-1.jpg', alt: 'عباية أروى السوداء المطرزة' },
  { id: 2, title: 'Viscose Prayer Set', price: 280, image: '/product-2.jpg', alt: 'طقم صلاة فيسكوز أخضر' },
  { id: 3, title: 'Wide Pants', price: 320, image: '/product-3.jpg', alt: 'بنطال واسع كريمي' },
  { id: 4, title: 'Beige Abaya', price: 520, image: '/product-4.jpg', alt: 'عباية بيج مفتوحة' },
];

// Double the products for seamless infinite loop
const doubledProducts = [...products, ...products];

const ProductsCarousel = () => {
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rotatorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef(0);
  const dragScrollRef = useRef(0);
  const animRef = useRef<number>(0);

  // GSAP scroll-triggered fade in
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Carousel positioning loop
  const placeItems = useCallback(() => {
    const rotator = rotatorRef.current;
    if (!rotator) return;

    const items = rotator.querySelectorAll<HTMLDivElement>('.carousel-card');
    const count = products.length;
    const radius = Math.min(window.innerWidth, 1500) / 2.5;
    const spacing = 180 / count;
    const currentScroll = scrollOffsetRef.current;

    items.forEach((el, i) => {
      const angle = (i * spacing - currentScroll) * Math.PI / 180;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const rotY = -i * spacing + currentScroll;
      el.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg)`;
    });
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!isDraggingRef.current) {
        scrollOffsetRef.current += 0.3;
        const count = products.length;
        const spacing = 180 / count;
        if (scrollOffsetRef.current > count * spacing) {
          scrollOffsetRef.current -= count * spacing;
        }
      }
      placeItems();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [placeItems]);

  // Drag interaction
  useEffect(() => {
    const rotator = rotatorRef.current;
    if (!rotator) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = e.clientX;
      dragScrollRef.current = scrollOffsetRef.current;
      rotator.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = (e.clientX - dragStartRef.current) * 0.3;
      scrollOffsetRef.current = dragScrollRef.current + delta;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      rotator.style.cursor = 'grab';
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      dragStartRef.current = e.touches[0].clientX;
      dragScrollRef.current = scrollOffsetRef.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const delta = (e.touches[0].clientX - dragStartRef.current) * 0.3;
      scrollOffsetRef.current = dragScrollRef.current + delta;
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    rotator.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    rotator.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      rotator.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      rotator.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-[120px] overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #0A0A0A, #141414 20%)',
      }}
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
          منتجاتنا المميزة
        </h2>
      </div>

      {/* 3D Carousel */}
      <div ref={stageRef} className="carousel-stage">
        <div ref={rotatorRef} className="carousel-rotator">
          {doubledProducts.map((product, i) => (
            <div key={`${product.id}-${i}`} className="carousel-card">
              <div className="relative h-[75%] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <div className="h-[25%] p-4 flex flex-col justify-between">
                <h3 className="font-cairo font-bold text-white text-lg">
                  {product.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-almarai font-medium text-brand-red">
                    {product.price.toLocaleString('ar-SA')} ر.س
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-brand-red rounded-md transition-all duration-300 text-white text-sm font-almarai"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    أضف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View all link */}
      <div className="text-center mt-12">
        <button
          onClick={() => alert('سيتم عرض جميع المنتجات قريباً')}
          className="inline-flex items-center gap-2 text-brand-red hover:text-brand-red-hover font-almarai text-base transition-colors"
        >
          <RollingText text="شاهدي الكل" />
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ProductsCarousel;
