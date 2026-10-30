import React, { useState } from 'react';
import { Room } from '../types';
import { Shield, Wifi, Coffee, Sparkles, Check, ArrowRight, Eye, BedDouble, Bath, Lock } from 'lucide-react';

interface StaySectionProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

export const StaySection: React.FC<StaySectionProps> = ({ rooms, onSelectRoom }) => {
  const [selectedModalRoom, setSelectedModalRoom] = useState<Room | null>(null);

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
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-top from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Quick Preview trigger */}
              <button
                onClick={() => setSelectedModalRoom(room)}
                className="absolute bottom-5 right-5 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#25392B] shadow-md transition-all hover:scale-110"
                title="View Room Details & Gallery"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Room Info Text */}
            <div className="pt-6 px-2 flex flex-col justify-between grow">
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#223125]">
                    {room.name}
                  </h3>
                  <span className="text-xs font-medium text-[#7C8B7E]">
                    {room.type === 'dorm' ? 'Social & Quiet Dorms' : 'Private Ensuite'}
                  </span>
                </div>

                <p className="text-sm md:text-base text-[#566558] font-light leading-relaxed mb-4">
                  {room.type === 'dorm'
                    ? 'Social, comfortable beds, each with a personal locker.'
                    : 'Wake up to the mountains from your own room.'}
                </p>

                {/* Micro Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.features.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs text-[#48574B] bg-[#EFECE3] px-2.5 py-1 rounded-full border border-[#DCD6C8]"
                    >
                      <Sparkles className="w-3 h-3 text-[#B08044]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectRoom(room)}
                  className="grow py-3 px-5 rounded-full bg-[#25392B] hover:bg-[#18261C] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                >
                  <span>Book {room.type === 'dorm' ? 'a Bed' : 'This Room'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedModalRoom(room)}
                  className="py-3 px-4 rounded-full border border-[#D5CFC3] hover:border-[#25392B] text-[#3E4E41] hover:text-[#25392B] text-xs uppercase tracking-wider font-medium transition-all"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Details Modal */}
      {selectedModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#DDD6C8] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedModalRoom(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#EAE5D9] text-[#25392B] hover:bg-[#DDD7C8] transition-colors"
            >
              ✕
            </button>

            <div className="aspect-16\/9 w-full rounded-2xl overflow-hidden mb-6 border border-[#DDD6C8]">
              <img
                src={selectedModalRoom.image}
                alt={selectedModalRoom.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#7C8B7E] font-medium">
                  {selectedModalRoom.type === 'dorm' ? 'Shared Mountain Accommodation' : 'Private Alpine Room'}
                </span>
                <h3 className="font-serif text-3xl text-[#223125] font-normal">
                  {selectedModalRoom.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#4E5B50] leading-relaxed mb-6 font-light">
              {selectedModalRoom.description}
            </p>

            {/* Room Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-[#EFECE3] border border-[#DDD6C8] text-xs">
              <div>
                <span className="text-[#78887A] block font-mono">Beds</span>
                <span className="font-medium text-[#25392B]">{selectedModalRoom.specs.beds}</span>
              </div>
              <div>
                <span className="text-[#78887A] block font-mono">Bathroom</span>
                <span className="font-medium text-[#25392B]">{selectedModalRoom.specs.bathroom}</span>
              </div>
              <div>
                <span className="text-[#78887A] block font-mono">Mountain View</span>
                <span className="font-medium text-[#25392B]">{selectedModalRoom.specs.view}</span>
              </div>
              <div>
                <span className="text-[#78887A] block font-mono">Storage</span>
                <span className="font-medium text-[#25392B]">{selectedModalRoom.specs.lockers}</span>
              </div>
              <div>
                <span className="text-[#78887A] block font-mono">Wi-Fi</span>
                <span className="font-medium text-[#25392B]">{selectedModalRoom.specs.wifi}</span>
              </div>
              <div>
                <span className="text-[#78887A] block font-mono">Power</span>
                <span className="font-medium text-[#25392B]">Backup Inverter</span>
              </div>
            </div>

            {/* Highlights list */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#637265] font-semibold mb-3">
                Key Amenities Included
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3E4C41]">
                {selectedModalRoom.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#DDD6C8] flex justify-end gap-3">
              <button
                onClick={() => setSelectedModalRoom(null)}
                className="px-5 py-2.5 rounded-full border border-[#D5CFC3] text-xs uppercase tracking-wider text-[#4E5B50]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const r = selectedModalRoom;
                  setSelectedModalRoom(null);
                  onSelectRoom(r);
                }}
                className="px-6 py-2.5 rounded-full bg-[#25392B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#18261C] transition-colors"
              >
                Proceed to Book
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
