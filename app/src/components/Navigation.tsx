import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import RollingText from './RollingText';
import { ShoppingBag, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'عبايات', href: '#products' },
  { label: 'فساتين', href: '#collection' },
  { label: 'قفاطين', href: '#values' },
  { label: 'إكسسوارات', href: '#testimonials' },
  { label: 'تواصل', href: '#footer' },
];

const Navigation = () => {
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/[0.08]'
          : 'bg-transparent'
      }`}
      style={{ height: 72 }}
    >
      <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between px-[4vw]">
        {/* Logo */}
        <a
          href="#"
          className="font-cairo text-2xl font-bold text-white"
          style={{ textShadow: '0 0 20px rgba(229, 9, 20, 0.3)' }}
        >
          موضة سلة
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-almarai text-base text-white/80 hover:text-white transition-colors"
            >
              <RollingText text={link.label} />
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="القائمة"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-[4vw] py-6 space-y-4">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-right font-almarai text-lg text-white/80 hover:text-brand-red transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
