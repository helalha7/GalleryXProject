import Header from '@/components/shared/Header';
import HeroSection from '@/components/home/HeroSection';
import ExperienceSteps from '@/components/home/ExperienceSteps';
import GalleryHighlights from '@/components/home/GalleryHighlights';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ExperienceSteps />
        <GalleryHighlights />
        <CallToAction />
      </main>
    </div>
  );
}
