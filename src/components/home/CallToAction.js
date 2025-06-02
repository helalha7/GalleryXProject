'use client';

import GradientButtonLink from "../shared/buttons/GradientLinkButton";

export default function CallToAction() {
  return (
    <section className="py-20 bg-[#f9fafb] dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-blue-900/20 text-center relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0">
        {/* Visual effects — kept light in both themes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-[#374151] dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Book a ticket now and begin exploring GalleryX's revolutionary virtual museum experience
          </p>
          <GradientButtonLink href="/buy-ticket">
            Book Your Ticket Now
          </GradientButtonLink>
        </div>
      </div>
    </section>
  );
}
