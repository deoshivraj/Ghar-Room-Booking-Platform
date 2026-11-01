import React from 'react';
import { AMENITIES } from '../data/mockData';

export const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        {/* Botanical Flourish */}
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <svg className="w-5 h-5 text-[#889B84]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#C59B63" stroke="#C59B63" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
          </svg>
          <span className="text-xs uppercase tracking-[0.25em] text-[#718073] font-medium">
            COMFORTS
          </span>
          <svg className="w-5 h-5 text-[#889B84]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#C59B63" stroke="#C59B63" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#213024] font-normal tracking-tight">
          Everything you need
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#606E62] font-light max-w-lg mx-auto">
          Thoughtful mountain essentials and modern conveniences to make your Dharamkot journey effortless.
        </p>
      </div>

      {/* Grid of Amenity Cards (matching page 1 layout: 4 columns on large screens, 2 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
        {AMENITIES.map((amenity) => (
          <div
            key={amenity.id}
            className="group relative p-5 sm:p-6 rounded-2xl bg-[#F6F3EC] hover:bg-white border border-[#E3DDD1] hover:border-[#25392B]/40 transition-all duration-300 shadow-xs hover:shadow-md flex items-start gap-3.5"
          >
            {/* Sparkle Diamond Icon (matched to the design's icon) */}
            <div className="shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-[#8C9E89] group-hover:text-[#25392B] transition-colors" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h3 className="font-serif text-lg text-[#25392B] font-medium leading-snug group-hover:text-[#18261C] transition-colors">
                {amenity.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
