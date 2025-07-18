import { HeroSection } from '@/components/landing/hero-section';
import TextInputSection from '@/components/landing/text-input-section';
import Footer from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TextInputSection />
      <Footer />
    </main>
  );
}
