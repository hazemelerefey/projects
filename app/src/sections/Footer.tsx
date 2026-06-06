import RollingText from '@/components/RollingText';

const quickLinks = [
  'عن المتجر',
  'شروط الاستخدام',
  'سياسة الإرجاع',
  'الأسئلة الشائعة',
];

const socialIcons = [
  {
    name: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'Twitter',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'Snapchat',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h-2zm0 6h2v2h-2z',
  },
  {
    name: 'TikTok',
    path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z',
  },
];

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative py-[60px] px-[4vw]"
      style={{ background: '#1A1A1A' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Left - Logo & description */}
          <div className="lg:max-w-[400px]">
            <h3
              className="font-cairo font-bold text-white text-[28px] mb-4"
              style={{ textShadow: '0 0 20px rgba(229, 9, 20, 0.3)' }}
            >
              موضة سلة
            </h3>
            <p className="font-almarai text-sm text-white/50 leading-relaxed">
              وجهتك الأولى للأزياء العصرية في المملكة
            </p>
          </div>

          {/* Right - Quick links */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3">
            {quickLinks.map(link => (
              <button
                key={link}
                onClick={() => alert('سيتم توجيهك لصفحة ' + link)}
                className="text-right font-almarai text-base text-white/70 hover:text-white transition-colors"
              >
                <RollingText text={link} />
              </button>
            ))}
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-6 mb-12">
          {socialIcons.map(icon => (
            <button
              key={icon.name}
              onClick={() => alert(`سيتم فتح حساب ${icon.name}`)}
              className="group p-2"
              aria-label={icon.name}
            >
              <svg
                className="w-5 h-5 text-white/50 group-hover:text-brand-red transition-colors duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={icon.path} />
              </svg>
            </button>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/[0.08] pt-8 text-center">
          <p className="font-almarai text-sm text-white/50 mb-2">
            &copy; 2026 موضة سلة. جميع الحقوق محفوظة.
          </p>
          <p className="font-almarai text-xs text-white/30 tracking-wider uppercase">
            مدعوم بـ منصة سلة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
