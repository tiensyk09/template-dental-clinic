import HeroBanner from '@/components/HeroBanner';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import NewsSection from '@/components/NewsSection';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroBanner />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <NewsSection />
    </div>
  );
}
