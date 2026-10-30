export interface Room {
  id: string;
  type: 'dorm' | 'private';
  name: string;
  tagline: string;
  pricePerNight: number;
  capacityText: string;
  image: string;
  description: string;
  features: string[];
  specs: {
    beds: string;
    bathroom: string;
    view: string;
    lockers: string;
    wifi: string;
  };
}

export interface Amenity {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tag?: string;
}

export interface ExploreSpot {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  travelTime: string;
  type: 'Trek' | 'Waterfall' | 'Town / Cafe' | 'Viewpoint' | 'Culture' | 'Sports' | 'Nature';
  difficulty?: 'Easy' | 'Moderate' | 'Challenging';
  description: string;
  hostTip: string;
  image: string;
  polaroidRotation?: string;
}

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomType: 'dorm' | 'private';
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

