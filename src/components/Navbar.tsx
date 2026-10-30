import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { LayoutDashboard, Compass, LogOut, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  activeTab: 'guest' | 'dashboard';
  setActiveTab: (tab: 'guest' | 'dashboard') => void;
  pendingRequestsCount: number;
  isHostMode: boolean;
  onExitHostMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  activeTab,
  setActiveTab,
  pendingRequestsCount,
  isHostMode,
  onExitHostMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'STAY', href: '#stay' },
    { name: 'AMENITIES', href: '#amenities' },
    { name: 'EXPLORE', href: '#explore' },
    { name: 'FIND US', href: '#find-us' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-2.5 sm:py-3 border-b border-[#E6E1D8]'
          : 'bg-[#FAF7F2] py-3.5 sm:py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <BrandLogo variant="dark" size="md" />
          </a>

          {/* Unified Navigation & Action Section (Always visible, no hamburger menu) */}
          <div className="flex items-center gap-3 sm:gap-5 md:gap-7 shrink-0">
            {/* Inline Navigation Links */}
            <nav className="flex items-center space-x-2.5 sm:space-x-4 md:space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (activeTab === 'dashboard') setActiveTab('guest');
                  }}
                  className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#556358] hover:text-[#25392B] font-medium transition-colors whitespace-nowrap py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Secret Host Access Controls (Only shown if authorized via secret URL ?host=true) */}
            {isHostMode && (
              <div className="flex items-center gap-1.5 p-1 pl-2 rounded-full bg-[#EAE4D7] border border-[#D5CFC3] shrink-0">
                <div className="hidden md:flex items-center gap-1 text-[9px] uppercase font-mono font-bold text-[#25392B] pr-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>HOST</span>
                </div>

                <button
                  onClick={() => setActiveTab(activeTab === 'guest' ? 'dashboard' : 'guest')}
                  className={`inline-flex items-center justify-center gap-1 h-7 sm:h-8 px-2.5 sm:px-3 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-[#25392B] text-white shadow-xs'
                      : 'bg-white text-[#25392B] hover:bg-[#F3EFE7]'
                  }`}
                  title="Toggle Host Operations Dashboard"
                >
                  {activeTab === 'dashboard' ? (
                    <>
                      <Compass className="w-3 h-3 text-emerald-300" />
                      <span>Guest View</span>
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="w-3 h-3 text-[#425946]" />
                      <span>Dashboard</span>
                      {pendingRequestsCount > 0 && (
                        <span className="w-3.5 h-3.5 bg-[#B87333] text-white rounded-full text-[8px] flex items-center justify-center font-bold font-mono">
                          {pendingRequestsCount}
                        </span>
                      )}
                    </>
                  )}
                </button>

                <button
                  onClick={onExitHostMode}
                  className="p-1 rounded-full hover:bg-stone-300/60 text-[#6B7B6E] hover:text-red-700 transition-colors"
                  title="Exit Host Mode & Hide Dashboard"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* BOOK YOUR STAY Button (Directly inline and elegantly aligned) */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center h-8 sm:h-9 md:h-10 px-3.5 sm:px-5 md:px-6 rounded-full bg-[#25392B] hover:bg-[#18261C] text-[#FAF7F2] text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.16em] font-semibold border border-[#25392B] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-xs hover:shadow-md whitespace-nowrap shrink-0"
            >
              BOOK YOUR STAY
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
