import React from 'react';
import { Room } from '../types';

interface StaySectionProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const StaySection: React.FC<StaySectionProps> = ({ rooms }) => {
  return (
    <section id="stay" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        {/* Botanical / Sun Flourish Tag */}
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <svg className="w-5 h-5 text-[#889B84]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#C59B63" stroke="#C59B63" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
          </svg>
          <span className="text-xs uppercase tracking-[0.25em] text-[#718073] font-medium">
            REST · RETREAT
          </span>
          <svg className="w-5 h-5 text-[#889B84]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#C59B63" stroke="#C59B63" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#213024] font-normal tracking-tight">
          Stay with us
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#606E62] font-light max-w-lg mx-auto">
          Sanctuaries designed for restful mountain sleep, soulful backpacker conversations, and uninterrupted remote work.
        </p>
      </div>

      {/* Two Arched Room Cards Grid (faithfully reproducing the PDF layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 max-w-5xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="group flex flex-col transition-all duration-300"
          >
            {/* Arched Photo Container (matches the rounded arch in design) */}
            <div className="relative aspect-4/5 sm:aspect-1\/1 w-full overflow-hidden rounded-t-[140px] md:rounded-t-[180px] rounded-b-2xl shadow-md border border-[#E3DDD1] bg-[#3B4D3F]">
              <img
                src={room.type === 'private' ? '/assets/private-room.png' : room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-top from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Room Info Text */}
            <div className="pt-6 px-2 flex flex-col grow">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#223125]">
                    {room.name}
                  </h3>
                  <span className="text-xs font-medium text-[#7C8B7E] sm:text-right">
                    {room.type === 'dorm' ? 'Social & Quiet Dorms' : 'Private Ensuite'}
                  </span>
                </div>

                <p className="text-sm md:text-base text-[#566558] font-light leading-relaxed mb-4">
                  {room.type === 'dorm'
                    ? 'Social, comfortable beds, each with a personal locker.'
                    : 'Wake up to the mountains from your own room.'}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
