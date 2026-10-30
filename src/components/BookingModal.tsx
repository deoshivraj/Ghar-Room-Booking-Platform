import React, { useState } from 'react';
import { Room, Booking } from '../types';
import { CONTACT_DETAILS } from '../data/mockData';
import { CheckCircle2, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  initialRoom?: Room | null;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  initialRoom,
  onConfirmBooking,
}) => {
  if (!isOpen) return null;

  const defaultRoom = initialRoom || rooms[0];
  const [selectedRoomId, setSelectedRoomId] = useState(defaultRoom.id);
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('2026-11-05');
  const [checkOut, setCheckOut] = useState('2026-11-08');
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(d2.getTime() - d1.getTime(), 86400000);
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = selectedRoom.pricePerNight * nights * (selectedRoom.type === 'dorm' ? guests : 1);
  const totalAmount = basePrice;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: Booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      email,
      phone,
      roomType: selectedRoom.type,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      guests,
      nights,
      totalAmount,
      status: 'confirmed',
      specialRequests,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onConfirmBooking(newBooking);
    setConfirmedBooking(newBooking);
  };

  const getWhatsAppMessageUrl = (b: Booking) => {
    const text = `*New Reservation Request - Ghar by the Mountains*%0A` +
      `Booking ID: ${b.id}%0A` +
      `Guest Name: ${b.guestName}%0A` +
      `Room: ${b.roomName}%0A` +
      `Check-In: ${b.checkIn}%0A` +
      `Check-Out: ${b.checkOut} (${b.nights} nights)%0A` +
      `Guests: ${b.guests}%0A` +
      `Total Estimated: ₹${b.totalAmount}%0A` +
      `Special Requests: ${b.specialRequests || 'None'}`;
    return `https://wa.me/${CONTACT_DETAILS.whatsappNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-[#DDD6C8] shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EAE5D9] text-[#25392B] hover:bg-[#DDD7C8] transition-colors"
        >
          ✕
        </button>

        {confirmedBooking ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest text-emerald-800 font-mono">
              Reservation Confirmed · ID: {confirmedBooking.id}
            </span>
            <h3 className="font-serif text-3xl text-[#213024] font-normal mt-1 mb-3">
              We look forward to welcoming you!
            </h3>
            <p className="text-xs sm:text-sm text-[#5A685C] leading-relaxed max-w-md mx-auto mb-6">
              Thank you, <strong>{confirmedBooking.guestName}</strong>. Your stay for{' '}
              <strong>{confirmedBooking.nights} nights</strong> in{' '}
              <strong>{confirmedBooking.roomName}</strong> from{' '}
              <strong>{confirmedBooking.checkIn}</strong> to{' '}
              <strong>{confirmedBooking.checkOut}</strong> has been registered.
            </p>

            <div className="bg-[#EFECE3] border border-[#DDD6C8] rounded-2xl p-4 text-left text-xs mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#6D7D6F]">Total Amount:</span>
                <span className="font-bold text-[#25392B] font-mono">₹{confirmedBooking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D7D6F]">Payment Method:</span>
                <span className="text-[#25392B]">Pay at Hostel (UPI / Cash / Card)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppMessageUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full border border-[#D5CFC3] text-xs uppercase tracking-wider text-[#4A594D] hover:bg-[#EAE4D7]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#78887B] font-semibold">
                RESERVE YOUR STAY
              </span>
              <h3 className="font-serif text-3xl text-[#213024] font-normal mt-0.5">
                Book at Ghar Dharamkot
              </h3>
              <p className="text-xs text-[#5E6D60] font-light">
                Direct booking with free cancellation up to 48 hours before check-in.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              {/* Room Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#556358] font-semibold mb-2">
                  Select Room / Bed Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        selectedRoomId === room.id
                          ? 'border-[#25392B] bg-[#25392B] text-white shadow-xs'
                          : 'border-[#DDD6C8] bg-white text-[#213024] hover:bg-[#F3EFE7]'
                      }`}
                    >
                      <div className="font-serif text-base font-semibold">{room.name}</div>
                      <div className={`text-xs mt-0.5 ${selectedRoomId === room.id ? 'text-emerald-200' : 'text-[#69796C]'}`}>
                        ₹{room.pricePerNight} / night
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                  />
                </div>
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                  Number of {selectedRoom.type === 'dorm' ? 'Beds' : 'Guests'}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                >
                  <option value={1}>1 {selectedRoom.type === 'dorm' ? 'Bed' : 'Guest'}</option>
                  <option value={2}>2 {selectedRoom.type === 'dorm' ? 'Beds' : 'Guests'}</option>
                  <option value={3}>3 {selectedRoom.type === 'dorm' ? 'Beds' : 'Guests'}</option>
                  <option value={4}>4 {selectedRoom.type === 'dorm' ? 'Beds' : 'Guests'}</option>
                </select>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Verma"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                    />
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                  Special Notes / Arrival Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Arriving on morning bus, early luggage drop, quiet workspace"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024]"
                />
              </div>

              {/* Pricing Breakdown Summary */}
              <div className="p-4 rounded-2xl bg-white border border-[#DDD6C8] space-y-1.5">
                <div className="flex justify-between text-[#68786B]">
                  <span>{selectedRoom.name} ({nights} {nights === 1 ? 'night' : 'nights'})</span>
                  <span className="font-mono">₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#25392B] pt-2 border-t border-[#EAE5D9]">
                  <span>Total Payable:</span>
                  <span className="font-mono text-base">₹{totalAmount}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#25392B] hover:bg-[#18261C] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md"
              >
                Complete Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
