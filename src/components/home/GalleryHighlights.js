'use client';

import GALLERIES from '@/data/galleries';
import SectionHeader from '../shared/SectionHeader';
import GalleryHighlight from './GalleryHighlight';

export default function GalleryHighlights() {
    return (
        <section className="py-20 bg-gray-900 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800" />
            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader title='Gallery Highlights' />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {GALLERIES.map((gallery, index) => (
                        <GalleryHighlight key={gallery._id} gallery={gallery} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}