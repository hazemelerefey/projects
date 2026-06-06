import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import Hero from '@/sections/Hero';
import ProductsCarousel from '@/sections/ProductsCarousel';
import FeaturedCollection from '@/sections/FeaturedCollection';
import BrandValues from '@/sections/BrandValues';
import Testimonials from '@/sections/Testimonials';
import Footer from '@/sections/Footer';

const Home = () => {
  return (
    <div className="min-h-[100dvh] bg-brand-dark">
      <Navigation />
      <CartDrawer />

      <main>
        <Hero />
        <ProductsCarousel />
        <FeaturedCollection />
        <BrandValues />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
