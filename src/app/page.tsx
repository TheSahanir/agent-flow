import { HeroSection } from '@/components/landing/hero-section';
import Footer from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <HeroSection />
      <Footer />
    </div>
  );
}
