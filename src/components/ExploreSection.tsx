import React, { useState } from 'react';
import { EXPLORE_SPOTS, CONTACT_DETAILS } from '../data/mockData';
import { ExploreSpot } from '../types';
import { MapPin, Clock, Footprints, Info, Sparkles, Compass, ExternalLink } from 'lucide-react';

export const ExploreSection: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<ExploreSpot | null>(null);
  const [viewMode, setViewMode] = useState<'interactive' | 'poster'>('interactive');
  const [filter, setFilter] = useState<'All' | 'Trek' | 'Waterfall' | 'Town / Cafe' | 'Viewpoint' | 'Culture'>('All');

  const filteredSpots = filter === 'All' 
    ? EXPLORE_SPOTS 
    : EXPLORE_SPOTS.filter(s => s.type === filter);

  return (
    <section id="explore" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        {/* Botanical / Sun Flourish Tag */}
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <svg className="w-5 h-5 text-[#889B84]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#C59B63" stroke="#C59B63" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
          </svg>
          <span className="text-xs uppercase tracking-[0.25em] text-[#718073] font-medium">
            WANDER
          </span>
          <svg className="w-5 h-5 text-[#889B84]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#C59B63" stroke="#C59B63" strokeWidth="1" />
            <circle cx="12" cy="10" r="1.5" fill="#FAF7F2" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#213024] font-normal tracking-tight">
          Explore nearby
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#606E62] font-light italic">
          Your hostel, the perfect base for unforgettable experiences
        </p>
      </div>

      {/* View Switcher & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#E3DDD1]">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {(['All', 'Trek', 'Waterfall', 'Town / Cafe', 'Viewpoint', 'Culture'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setViewMode('interactive');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                filter === cat && viewMode === 'interactive'
                  ? 'bg-[#25392B] text-white shadow-xs'
                  : 'bg-[#ECE7DC] text-[#4E5C50] hover:bg-[#DDD7C8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 bg-[#EFECE3] p-1 rounded-full border border-[#D5CFC3] text-xs shrink-0">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              viewMode === 'interactive'
                ? 'bg-[#25392B] text-white shadow-xs'
                : 'text-[#4E5C50] hover:text-[#25392B]'
            }`}
          >
            Interactive Cards
          </button>
          <button
            onClick={() => setViewMode('poster')}
            className={`px-3 py-1 rounded-full font-medium transition-all ${
              viewMode === 'poster'
                ? 'bg-[#25392B] text-white shadow-xs'
                : 'text-[#4E5C50] hover:text-[#25392B]'
            }`}
          >
            Original Poster View
          </button>
        </div>
      </div>

      {/* Poster Mode: Shows the authentic uploaded collage */}
      {viewMode === 'poster' ? (
        <div className="relative rounded-3xl overflow-hidden border border-[#D5CFC3] bg-[#EFECE3] shadow-lg max-w-5xl mx-auto p-4 sm:p-6 text-center">
          <img
            src="/assets/aistudio/Explore_Nearby_Dharamshala_aditya_project_84408900.png"
            alt="Explore Nearby Dharamshala Collage"
            className="w-full h-auto rounded-2xl shadow-xs mx-auto"
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-[#526054]">
            <span>📸 Featuring 9 iconic spots around Ghar</span>
            <span>•</span>
            <button
              onClick={() => setViewMode('interactive')}
              className="text-[#25392B] font-semibold underline underline-offset-4"
            >
              Switch to Interactive Guide to read distance & hiking tips →
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Grid of Polaroid Cards (Styled like the user's design) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className={`group cursor-pointer bg-white p-3.5 pb-6 rounded-lg shadow-md hover:shadow-xl border border-[#E0D9CC] transition-all duration-300 transform hover:-translate-y-1.5 ${
                spot.polaroidRotation || ''
              }`}
            >
              {/* Photo Frame */}
              <div className="aspect-4/3 w-full overflow-hidden rounded bg-[#2D3F32] relative mb-4">
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                {/* Micro Tag */}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-xs text-[10px] text-white uppercase tracking-wider font-mono">
                  {spot.type}
                </span>

                {/* Distance Badge */}
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-sm bg-white/90 backdrop-blur-xs text-[10px] text-[#25392B] font-semibold flex items-center gap-1 shadow-xs">
                  <Footprints className="w-3 h-3 text-[#25392B]" />
                  {spot.distance}
                </span>
              </div>

              {/* Polaroid Handwritten-feel Label banner (just like in the original graphic) */}
              <div className="text-center px-1">
                <div className="inline-block px-4 py-1.5 bg-[#FAF6EE] border border-[#DDD5C5] rounded shadow-2xs group-hover:bg-[#F3EDE0] transition-colors">
                  <h3 className="font-handwriting text-xl sm:text-2xl text-[#212E23] font-bold tracking-wide">
                    {spot.title}
                  </h3>
                </div>

                <p className="mt-2 text-xs text-[#6B796D] line-clamp-2 font-light">
                  {spot.subtitle}
                </p>

                <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-[#556357] font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#B08044]" />
                    {spot.travelTime}
                  </span>
                  <span>•</span>
                  <span className="text-[#25392B] font-semibold underline underline-offset-2">
                    Host Tips & Info
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Spot Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#DDD6C8] shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#EAE5D9] text-[#25392B] hover:bg-[#DDD7C8] transition-colors"
            >
              ✕
            </button>

            <div className="aspect-16/10 w-full rounded-2xl overflow-hidden mb-5 border border-[#DDD6C8]">
              <img
                src={selectedSpot.image}
                alt={selectedSpot.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#E6E1D4] text-[#425244] text-[11px] font-mono">
                {selectedSpot.type}
              </span>
              {selectedSpot.difficulty && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2E9] text-emerald-800 text-[11px] font-mono">
                  Difficulty: {selectedSpot.difficulty}
                </span>
              )}
            </div>

            <h3 className="font-serif text-3xl text-[#213024] font-normal mb-1">
              {selectedSpot.title}
            </h3>
            <p className="text-xs text-[#718173] font-mono mb-4">
              Distance: {selectedSpot.distance} • Time: {selectedSpot.travelTime}
            </p>

            <p className="text-sm text-[#4E5B50] leading-relaxed mb-5 font-light">
              {selectedSpot.description}
            </p>

            {/* Host Mountain Tip Box */}
            <div className="p-4 rounded-2xl bg-[#EFECE3] border border-[#DDD6C8] mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#25392B] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B08044]" />
                <span>Host's Local Tip from Ghar</span>
              </div>
              <p className="text-xs text-[#48564B] leading-relaxed italic">
                "{selectedSpot.hostTip}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#DDD6C8]">
              <button
                onClick={() => setSelectedSpot(null)}
                className="px-5 py-2 rounded-full border border-[#D5CFC3] text-xs text-[#4E5B50]"
              >
                Close
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&origin=${CONTACT_DETAILS.coordinates.lat},${CONTACT_DETAILS.coordinates.lng}&destination=${encodeURIComponent(
                  `${selectedSpot.title} Dharamkot Dharamshala`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-full bg-[#25392B] text-white text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 hover:bg-[#18261C]"
              >
                <span>Trail Route from Ghar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
