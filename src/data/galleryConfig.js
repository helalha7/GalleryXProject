// /data/galleryConfig.ts
import RomanGallery from '@/components/gallery/RomanGallery';
import MonaLisaGallery from '@/components/gallery/MonaLisaGallery';
import AncientEgyptianGallery from '@/components/gallery/AncientEgyptianGallery';

export const galleryMap = {
  'roman-gallery': {
    title: 'Roman Gallery',
    description: 'Explore classical Roman sculptures from antiquity.',
    component: <RomanGallery />,
  },
  'mona-lisa-gallery': {
    title: 'Mona Lisa Gallery',
    description: "Discover the secrets behind da Vinci's masterpiece.",
    component: <MonaLisaGallery />,
  },
  'egyptian-gallery': {
    title: 'Ancient Egyptian Gallery',
    description: 'Ancient Egyptian artifacts dating back thousands of years.',
    component: <AncientEgyptianGallery/>
  },
};
