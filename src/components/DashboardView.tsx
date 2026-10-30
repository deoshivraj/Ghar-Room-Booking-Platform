import React, { useState } from 'react';
import { Booking, Room } from '../types';
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Plus, 
  ArrowLeft, 
  Edit3, 
  Save, 
  Mountain, 
  Sparkles
} from 'lucide-react';

interface DashboardViewProps {
  rooms: Room[];
  bookings: Booking[];
  onUpdateRoomPrice: (roomId: string, newPrice: number) => void;
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onBackToLanding: () => void;
  onAddNewBooking: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  rooms,
  bookings,
  onUpdateRoomPrice,
  onUpdateBookingStatus,
  onBackToLanding,
  onAddNewBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'pricing' | 'trails'>('overview');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [triundTrailOpen, setTriundTrailOpen] = useState(true);

  // Derived metrics
  const totalBookingsCount = bookings.length;
  const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalAmount, 0);

  const handleStartEditPrice = (room: Room) => {
    setEditingPriceId(room.id);
    setTempPrice(room.pricePerNight);
  };

  const handleSavePrice = (roomId: string) => {
    if (tempPrice > 0) {
      onUpdateRoomPrice(roomId, tempPrice);
    }
    setEditingPriceId(null);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#DDD6C8]">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl border border-[#D5CFC3] bg-white hover:bg-[#EAE4D7] text-[#25392B] transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest text-[#78887B] font-mono">
                  MANAGEMENT PORTAL
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  LIVE
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#213024] font-normal">
                Property & Bookings Dashboard
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAddNewBooking}
            className="px-4 py-2.5 rounded-full bg-[#25392B] hover:bg-[#18261C] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Reservation</span>
          </button>
          <button
            onClick={onBackToLanding}
            className="px-4 py-2.5 rounded-full border border-[#D5CFC3] bg-white hover:bg-[#F3EFE7] text-[#334235] text-xs uppercase tracking-wider font-medium"
          >
            View Public Site
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-[#E3DDD1]">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'bookings', label: `Reservations (${bookings.length})`, icon: Calendar },
          { id: 'pricing', label: 'Room Rates & Inventory', icon: Bed },
          { id: 'trails', label: 'Trail Advisory & Weather', icon: Mountain },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#25392B] text-white shadow-xs'
                  : 'bg-[#EFECE3] text-[#4E5B50] hover:bg-[#DDD7C8]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#25392B] text-white shadow-md border border-[#3A503F]">
              <div className="flex items-center justify-between text-emerald-200 text-xs mb-2">
                <span>Occupancy Rate</span>
                <Users className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="font-serif text-3xl font-bold">82%</div>
              <p className="text-[11px] text-stone-300 mt-1">14 of 16 dorm beds booked</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
                <span>Total Active Bookings</span>
                <Calendar className="w-4 h-4 text-[#C59B63]" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#213024]">{totalBookingsCount}</div>
              <p className="text-[11px] text-[#69796C] mt-1">Direct reservations registered</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
                <span>Location Pin</span>
                <Mountain className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-mono text-sm font-bold text-[#213024] mt-1">32.251642, 76.329190</div>
              <p className="text-[11px] text-[#69796C] mt-1">Upper Dharamkot (2,180m)</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center justify-between text-[#6F7F72] text-xs mb-2">
                <span>Estimated Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#213024]">₹{totalRevenue}</div>
              <p className="text-[11px] text-[#69796C] mt-1">Direct website reservations</p>
            </div>
          </div>

          {/* Quick Action Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recent Reservations Table Preview */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#DDD6C8] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-bold text-[#213024]">
                  Recent Guest Reservations
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-[#25392B] font-semibold underline"
                >
                  View All ({bookings.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF7F2] text-[#6B7C6E] uppercase tracking-wider font-mono text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Guest</th>
                      <th className="py-2.5 px-3">Room</th>
                      <th className="py-2.5 px-3">Dates</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE3]">
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.id} className="hover:bg-[#FAF7F2]">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-[#25392B]">{b.guestName}</div>
                          <div className="text-[10px] text-[#718173] font-mono">{b.phone}</div>
                        </td>
                        <td className="py-3 px-3 text-[#39483C]">{b.roomName}</td>
                        <td className="py-3 px-3 font-mono text-[11px] text-[#556357]">
                          {b.checkIn} to {b.checkOut}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-[#25392B]">
                          ₹{b.totalAmount}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : b.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(b.guestName)},%20Ghar%20Dharamkot%20team%20here!`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md hover:bg-emerald-100 text-emerald-700 inline-block"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Upper Dharamkot Weather & Trail Quick Card */}
            <div className="lg:col-span-4 bg-[#F5F1E8] rounded-3xl p-6 border border-[#DDD6C8] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#78887B] mb-2">
                  <Mountain className="w-4 h-4 text-[#C59B63]" />
                  <span>UPPER DHARAMKOT</span>
                </div>
                <h3 className="font-serif text-2xl text-[#213024] font-medium mb-1">
                  Triund Ridge Status
                </h3>
                <div className="flex items-center gap-2 my-3">
                  <span className={`w-3 h-3 rounded-full ${triundTrailOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#25392B]">
                    {triundTrailOpen ? 'Trail Open & Clear' : 'Caution / High Wind Advisory'}
                  </span>
                </div>
                <p className="text-xs text-[#556357] leading-relaxed mb-4 font-light">
                  Snowline currently at 3,100m. Trek path starting right above our gate toward Gallu Devi Temple is dry and walkable.
                </p>

                <div className="p-3 rounded-xl bg-white border border-[#DDD6C8] text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span>GPS Coordinates:</span>
                    <span className="font-bold text-[10px]">32.251642, 76.329190</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Altitude:</span>
                    <span className="font-bold">2,180 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Day Temperature:</span>
                    <span className="font-bold text-emerald-800">17°C (Pleasant)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Night Temperature:</span>
                    <span className="font-bold text-blue-800">7°C (Chilly)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDD6C8] mt-4 flex items-center justify-between">
                <span className="text-[11px] text-[#6E7E71]">Update status for guests:</span>
                <button
                  onClick={() => setTriundTrailOpen(!triundTrailOpen)}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-[#25392B] text-[#25392B] hover:bg-[#25392B] hover:text-white transition-colors"
                >
                  Toggle Trail State
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Reservations Management */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDD6C8] shadow-xs animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl text-[#213024]">All Reservations</h2>
              <p className="text-xs text-[#6B7B6E]">Manage guest check-ins, payments and room assignments</p>
            </div>
            <button
              onClick={onAddNewBooking}
              className="px-4 py-2 rounded-full bg-[#25392B] text-white text-xs uppercase tracking-wider font-semibold self-start sm:self-auto"
            >
              + Add Walk-In Guest
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF7F2] text-[#6B7C6E] uppercase tracking-wider font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-3">Booking ID</th>
                  <th className="py-3 px-3">Guest Details</th>
                  <th className="py-3 px-3">Room Type</th>
                  <th className="py-3 px-3">Stay Dates</th>
                  <th className="py-3 px-3">Guests</th>
                  <th className="py-3 px-3">Total (₹)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE3]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF7F2]">
                    <td className="py-3 px-3 font-mono font-bold text-[#25392B]">{b.id}</td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-[#213024]">{b.guestName}</div>
                      <div className="text-[10px] text-[#78887B] font-mono">{b.email}</div>
                      <div className="text-[10px] text-[#78887B] font-mono">{b.phone}</div>
                    </td>
                    <td className="py-3 px-3 text-[#334235]">{b.roomName}</td>
                    <td className="py-3 px-3 font-mono text-[11px]">
                      <div>In: {b.checkIn}</div>
                      <div>Out: {b.checkOut} ({b.nights}n)</div>
                    </td>
                    <td className="py-3 px-3">{b.guests}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#25392B]">₹{b.totalAmount}</td>
                    <td className="py-3 px-3">
                      <select
                        value={b.status}
                        onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as any)}
                        className="text-[11px] px-2 py-1 rounded-md border border-[#D5CFC3] bg-white font-medium"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(b.guestName)},%20confirming%20your%20stay%20at%20Ghar%20by%20the%20Mountains!`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-medium"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Room Rates & Inventory */}
      {activeTab === 'pricing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDD6C8] shadow-xs animate-fadeIn max-w-4xl">
          <div className="mb-6">
            <h2 className="font-serif text-2xl text-[#213024]">Live Room Pricing & Rates</h2>
            <p className="text-xs text-[#6B7B6E]">
              Adjust the base prices for dorms and private rooms. Changes apply immediately to the website and booking calculations.
            </p>
          </div>

          <div className="space-y-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="p-5 rounded-2xl border border-[#DDD6C8] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#D5CFC3]"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#213024]">{room.name}</h3>
                    <p className="text-xs text-[#657668]">{room.capacityText}</p>
                    <div className="text-[11px] text-[#8A9A8C] font-mono mt-0.5">
                      Type: {room.type === 'dorm' ? 'Per Bed / Night' : 'Entire Room / Night'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {editingPriceId === room.id ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#25392B]">₹</span>
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(Number(e.target.value))}
                        className="w-24 px-3 py-1.5 rounded-lg border border-[#25392B] bg-white font-mono text-sm text-[#25392B]"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSavePrice(room.id)}
                        className="p-2 rounded-lg bg-[#25392B] text-white hover:bg-[#18261C]"
                        title="Save Price"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-[#25392B]">
                          ₹{room.pricePerNight}
                        </span>
                        <div className="text-[10px] text-[#718173]">per night</div>
                      </div>
                      <button
                        onClick={() => handleStartEditPrice(room)}
                        className="p-2 rounded-lg border border-[#D5CFC3] hover:border-[#25392B] text-[#334235] hover:text-[#25392B]"
                        title="Change Price"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Trails & Weather Status */}
      {activeTab === 'trails' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDD6C8] shadow-xs animate-fadeIn max-w-4xl space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-[#213024]">Trail & Weather Dispatch</h2>
            <p className="text-xs text-[#6B7B6E]">
              Keep guests informed about trek safety, permits, snow conditions, and trail access
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#F6F2E9] border border-[#DDD6C8]">
              <h3 className="font-serif text-lg font-bold text-[#213024] mb-2">Triund Ridge Trek</h3>
              <p className="text-xs text-[#526054] mb-3">
                Current status: <strong>{triundTrailOpen ? 'Clear & Accessible' : 'Restricted (High Wind)'}</strong>
              </p>
              <button
                onClick={() => setTriundTrailOpen(!triundTrailOpen)}
                className="px-4 py-2 rounded-full border border-[#25392B] text-xs uppercase tracking-wider font-semibold hover:bg-[#25392B] hover:text-white transition-colors"
              >
                Switch to {triundTrailOpen ? 'Advisory Caution' : 'Clear & Open'}
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F2E9] border border-[#DDD6C8]">
              <h3 className="font-serif text-lg font-bold text-[#213024] mb-2">Gallu Waterfall Trail</h3>
              <p className="text-xs text-[#526054] mb-3">
                Water flow: Normal • Cafe open • Forest trail dry
              </p>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                Safe for all travelers
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
