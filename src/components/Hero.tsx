import React, { useEffect, useState } from 'react';
import { Compass, CalendarCheck, MapPin, Sparkles, Mountain, ArrowUpRight } from 'lucide-react';
import { CONTACT_DETAILS } from '../data/mockData';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToLocation: () => void;
}

interface CurrentWeather {
  temperature: number;
  summary: string;
}

const getWeatherSummary = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code === 1) return 'Mostly clear';
  if (code === 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Conditions unavailable';
};

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onScrollToLocation }) => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${CONTACT_DETAILS.coordinates.lat}&longitude=${CONTACT_DETAILS.coordinates.lng}&current=temperature_2m,weather_code&timezone=auto`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Weather request failed with status ${response.status}`);
        }

        const data: { current?: { temperature_2m?: number; weather_code?: number } } =
          await response.json();
        const temperature = data.current?.temperature_2m;
        const code = data.current?.weather_code;
        if (typeof temperature !== 'number' || typeof code !== 'number') {
          throw new Error('Weather response did not contain current conditions');
        }

        setWeather({ temperature: Math.round(temperature), summary: getWeatherSummary(code) });
        setIsWeatherLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Unable to load current weather for Dharamkot:', error);
          setWeather(null);
          setIsWeatherLoading(false);
        }
      }
    };

    void fetchWeather();
    const refreshInterval = window.setInterval(() => void fetchWeather(), 15 * 60 * 1000);
    return () => {
      controller.abort();
      window.clearInterval(refreshInterval);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dark Forest Green Hero Container matching the design */}
      <div className="relative rounded-3xl md:rounded-[36px] bg-[#25392B] text-white overflow-hidden shadow-2xl border border-[#3A503F] min-h-[500px] md:min-h-[580px] flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20">
        
        {/* Subtle Himalayan Mountain Silhouette & Texture Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=70')`,
          }}
        />
        
        {/* Subtle gradient vignette */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#25392B]/40 to-[#18261C]/90 pointer-events-none" />

        {/* Decorative Himalayan Prayer Bunting Flags Garland (matching the top of page 1) */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none overflow-hidden select-none">
          <svg className="w-full max-w-2xl h-10 md:h-14" viewBox="0 0 600 45" fill="none">
            {/* String curve */}
            <path d="M 0,10 Q 300,32 600,10" stroke="#E6DFD1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            
            {/* Flags in Himalayan colors: Blue, White, Red, Green, Yellow */}
            <polygon points="50,12 70,14 60,32" fill="#3B82F6" opacity="0.85" />
            <polygon points="100,16 120,18 110,38" fill="#F8FAFC" opacity="0.85" />
            <polygon points="150,20 170,22 160,42" fill="#EF4444" opacity="0.85" />
            <polygon points="200,23 220,24 210,44" fill="#22C55E" opacity="0.85" />
            <polygon points="250,25 270,25 260,45" fill="#EAB308" opacity="0.85" />
            <polygon points="300,25 320,25 310,45" fill="#3B82F6" opacity="0.85" />
            <polygon points="350,24 370,23 360,44" fill="#F8FAFC" opacity="0.85" />
            <polygon points="400,22 420,20 410,41" fill="#EF4444" opacity="0.85" />
            <polygon points="450,18 470,16 460,37" fill="#22C55E" opacity="0.85" />
            <polygon points="500,14 520,12 510,32" fill="#EAB308" opacity="0.85" />
          </svg>
        </div>

        {/* Top Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 md:pt-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] md:text-xs tracking-wider text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open & Welcoming Trekkers & Nomads</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-300 font-mono">
            <span className="flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-emerald-300" /> 2,150m Alt
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Triund Trail Base</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-300 font-sans">
              {weather
                ? `${weather.temperature}°C ${weather.summary}`
                : isWeatherLoading
                  ? 'Loading weather…'
                  : 'Weather unavailable'}
            </span>
          </div>
        </div>

        {/* Hero Content (Centered, matched to PDF) */}
        <div className="relative z-10 my-auto text-center max-w-3xl mx-auto py-10 md:py-16">
          {/* Subtitle */}
          <div className="inline-block mb-4 md:mb-5">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#D0DEC9] font-medium">
              DHARAMKOT · HIMACHAL PRADESH
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#FAF7F2] leading-[1.08] mb-6">
            Your home in the <br className="hidden sm:inline" />
            <span className="font-normal italic">mountains</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-[#D6DFD5] max-w-2xl mx-auto font-light leading-relaxed mb-10">
            A hostel and cafe with mountain views, dorms, private rooms and a base for every trail nearby.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#25392B] hover:bg-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <CalendarCheck className="w-4 h-4 text-[#25392B]" />
              <span>BOOK YOUR STAY</span>
            </button>

            <button
              onClick={onScrollToLocation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#FAF7F2]/70 text-[#FAF7F2] hover:bg-white/10 hover:border-white text-xs sm:text-sm uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 group backdrop-blur-xs"
            >
              <MapPin className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span>SEE LIVE LOCATION</span>
            </button>
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs text-stone-300 font-light">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Cozy Alpine Pine Wood Dorms And Private Rooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Dhauladhar Mountain Views</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Direct Triund & Gallu Trail Base</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>High-Speed Remote Work Wi-Fi</span>
          </div>
        </div>
      </div>
    </section>
  );
};
