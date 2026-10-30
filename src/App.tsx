import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StaySection } from './components/StaySection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ExploreSection } from './components/ExploreSection';
import { FindUsSection } from './components/FindUsSection';
import { ReachUsSection } from './components/ReachUsSection';
import { BookingModal } from './components/BookingModal';
import { DashboardView } from './components/DashboardView';
import { INITIAL_ROOMS, INITIAL_BOOKINGS } from './data/mockData';
import { Booking, Room } from './types';

export default function App() {
  // Secret URL Authorization check
  const [isHostMode, setIsHostMode] = useState<boolean>(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const isHostQuery = searchParams.get('host') === 'true' || searchParams.get('admin') === 'true';
      const isHostPath = window.location.pathname.includes('/admin') || window.location.pathname.includes('/host');
      const hasStoredSession = sessionStorage.getItem('ghar_host_session') === 'true';

      if (isHostQuery || isHostPath || hasStoredSession) {
        sessionStorage.setItem('ghar_host_session', 'true');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<'guest' | 'dashboard'>(() => {
    // If arriving via ?host=true or ?admin=true, start directly in the dashboard
    try {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('host') === 'true' || searchParams.get('admin') === 'true') {
        return 'dashboard';
      }
    } catch {}
    return 'guest';
  });

  // Listen to popstate or manual URL changes
  useEffect(() => {
    const checkUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('host') === 'true' || searchParams.get('admin') === 'true') {
        sessionStorage.setItem('ghar_host_session', 'true');
        setIsHostMode(true);
        setActiveTab('dashboard');
      }
    };
    window.addEventListener('popstate', checkUrl);
    return () => window.removeEventListener('popstate', checkUrl);
  }, []);

  const handleExitHostMode = () => {
    try {
      sessionStorage.removeItem('ghar_host_session');
    } catch {}
    setIsHostMode(false);
    setActiveTab('guest');
    // Clean secret query parameters from the browser address bar without refreshing
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('host');
      url.searchParams.delete('admin');
      window.history.replaceState({}, '', url.pathname + (url.search || ''));
    } catch {}
  };

  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  const handleOpenBooking = (room?: Room) => {
    setSelectedRoomForBooking(room || null);
    setIsBookingModalOpen(true);
  };

  const handleScrollToLocation = () => {
    if (activeTab === 'dashboard') {
      setActiveTab('guest');
      setTimeout(() => {
        const el = document.getElementById('find-us');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('find-us');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateRoomPrice = (roomId: string, newPrice: number) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, pricePerNight: newPrice } : r))
    );
  };

  const handleUpdateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  const pendingRequestsCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2820] flex flex-col font-sans selection:bg-[#25392B] selection:text-white">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingRequestsCount={pendingRequestsCount}
        isHostMode={isHostMode}
        onExitHostMode={handleExitHostMode}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* Only render dashboard if user has secret host authorization AND activeTab is dashboard */}
        {isHostMode && activeTab === 'dashboard' ? (
          <DashboardView
            rooms={rooms}
            bookings={bookings}
            onUpdateRoomPrice={handleUpdateRoomPrice}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onBackToLanding={() => setActiveTab('guest')}
            onAddNewBooking={() => handleOpenBooking()}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onScrollToLocation={handleScrollToLocation}
            />

            {/* Stay with us (Dorms & Private Rooms) */}
            <StaySection
              rooms={rooms}
              onSelectRoom={(room) => handleOpenBooking(room)}
            />

            {/* Everything you need (Amenities) */}
            <AmenitiesSection />

            {/* Explore nearby (Polaroid & Trails Showcase) */}
            <ExploreSection />

            {/* Find us, live (Google Map & Directions with exact coordinates) */}
            <FindUsSection />

            {/* Reach us (Verified Contact & Quick Inquiry Form) */}
            <ReachUsSection />
          </>
        )}
      </main>

      {/* Booking Drawer / Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        rooms={rooms}
        initialRoom={selectedRoomForBooking}
        onConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
}
