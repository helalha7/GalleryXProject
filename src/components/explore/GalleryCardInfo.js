// src/components/explore/GalleryCardInfo.tsx
'use client';

import GradientCard from '@/components/shared/GradientCard';
import TextButton from '../shared/buttons/TextButton';

export default function GalleryCardInfo({ gallery, hasTicket, onSelect }) {
    return (
        <GradientCard className="p-6">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 shadow-lg">
                    {gallery.position}
                </div>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {gallery.name}
                </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
                {gallery.description}
            </p>
            {
                hasTicket && (
                    <TextButton onClick={() => onSelect(gallery)}>
                        Enter Gallery →
                    </TextButton>
                )
            }
        </GradientCard>
    );
}