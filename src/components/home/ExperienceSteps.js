'use client';

import ExperienceStep from './ExperienceStep';
import SectionHeader from '../shared/SectionHeader';

export default function ExperienceSteps() {
    const steps = [
        {
            title: 'Explore Galleries',
            desc: 'Navigate through different rooms and discover masterpieces from various eras and styles in stunning detail.',
            icon: '1'
        },
        {
            title: 'Learn Interactively',
            desc: 'Each artifact comes with detailed descriptions, immersive images, and rich audio explanations.',
            icon: '2'
        },
        {
            title: 'Curated Experience',
            desc: 'Enjoy a carefully crafted journey through art history, science, and culture with expert curation.',
            icon: '3'
        },
    ];

    return (
        <section className="py-20 bg-gray-800 relative">
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)',
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader title = 'Experience Art Like Never Before'/>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {steps.map((step, i) => (
                        <ExperienceStep key={i} icon={step.icon} title={step.title} desc={step.desc} />
                    ))}
                </div>
            </div>
        </section>
    );
}
