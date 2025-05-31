import Header from '@/components/shared/Header';
import HeroSection from '@/components/home/HeroSection';
import ExperienceSteps from '@/components/home/ExperienceSteps';
import GalleryHighlights from '@/components/home/GalleryHighlights';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ExperienceSteps />
        <GalleryHighlights />
        <CallToAction />
      </main>
    </>
  );
}
