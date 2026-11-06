import React from 'react';
import { CONTACT_DETAILS } from '../data/mockData';
import { MapPin, Navigation, Share2, ExternalLink } from 'lucide-react';

export const FindUsSection: React.FC = () => {
  const googleMapsUrl = CONTACT_DETAILS.coordinates.googleMapsLink;
  
  const whatsappLocationText = encodeURIComponent(
    `Live location for Ghar by the Mountains, Dharamkot (${CONTACT_DETAILS.coordinates.dms}): ${googleMapsUrl}`
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappLocationText}`;

  return (
    <section id="find-us" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Card Frame (matching the subtle framed layout on page 2) */}
      <div className="rounded-3xl border border-[#DDD6C8] bg-[#F4EFE6] p-6 sm:p-10 md:p-12 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Directions Text & CTA Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <div className="inline-block mb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#78887B] font-semibold">
                DIRECTIONS
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#213024] font-normal tracking-tight mb-4">
              Find us, live
            </h2>

            {/* Description matching the refined design */}
            <p className="text-sm sm:text-base text-[#566558] font-light leading-relaxed mb-8">
              Open our live location in Google Maps, or share it to your phone before you set off on your journey to Upper Dharamkot.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3.5 max-w-md">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#25392B] hover:bg-[#18261C] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 group"
              >
                <Navigation className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-full border border-[#25392B] text-[#25392B] hover:bg-[#25392B] hover:text-white text-xs uppercase tracking-[0.16em] font-medium transition-all flex items-center justify-center gap-2 group bg-white/70"
              >
                <Share2 className="w-4 h-4 text-[#25392B] group-hover:text-white transition-colors" />
                <span>SHARE LIVE LOCATION ON WHATSAPP</span>
              </a>
            </div>

            {/* Arrival & Coordinates Info */}
            <div className="mt-8 pt-6 border-t border-[#DDD6C8] text-xs text-[#68786B] space-y-2 font-light">
              <p>📍 <strong>GPS Coordinates:</strong> <span className="font-mono text-[#25392B] font-medium">{CONTACT_DETAILS.coordinates.dms}</span> ({CONTACT_DETAILS.coordinates.lat}, {CONTACT_DETAILS.coordinates.lng})</p>
              <p>🌲 <strong>Upper Dharamkot:</strong> Along the pine ridge path towards Gallu Devi Temple</p>
              <p>🎒 <strong>Trail Access:</strong> Direct base for Triund trek and Gallu waterfall walk</p>
            </div>
          </div>

          {/* Right Column: Live Google Map Embed with exact user coordinates pin */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#D5CFC3] shadow-inner bg-[#E5DFD4] aspect-4/3 sm:aspect-16/10 w-full">
              
              {/* Google Maps Embed iframe with user's exact coordinates */}
              <iframe
                title="Ghar Dharamkot Exact Live Location"
                src={CONTACT_DETAILS.coordinates.embedUrl}
                className="w-full h-full border-0 filter saturate-90 contrast-95"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Custom Location Badge (as shown in PDF: "Ghar, Dharamkot") */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#D5CFC3] shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#25392B] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#213024]">Ghar, Dharamkot</h4>
                  <p className="text-[10px] text-[#697A6C] font-mono">{CONTACT_DETAILS.coordinates.dms} · Alt: {CONTACT_DETAILS.altitude}</p>
                </div>
              </div>

              {/* Live Pin Marker Indicator overlay */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-full bg-[#25392B]/90 hover:bg-[#25392B] text-white text-xs font-medium flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-transform hover:scale-105"
                >
                  <span>Open Full Screen Map</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
