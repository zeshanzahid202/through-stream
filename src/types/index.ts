export type CategoryType = 
  | 'Adventure' 
  | 'Nature' 
  | 'Culture' 
  | 'Food' 
  | 'Beaches' 
  | 'History' 
  | 'Luxury' 
  | 'Hidden Gems';

export type ExpenseCategory = 
  | 'Accommodation' 
  | 'Transport' 
  | 'Food' 
  | 'Activities' 
  | 'Shopping' 
  | 'Other';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  thumbnail: string;
  description: string;
  bestTime: string;
  avgTripDays: string;
  budgetRange: { min: number; max: number };
  attractionsCount: number;
  experiencesCount: number;
  categories: CategoryType[];
  coordinates: { lat: number; lng: number };
  highlights: string[];
  travelTips: string[];
  localFoods: { name: string; description: string; price: string }[];
}

export interface Attraction {
  id: string;
  destinationId: string;
  name: string;
  category: CategoryType;
  durationHours: number;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  openingHours: string;
  tip: string;
}

export interface Experience {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  category: CategoryType;
  durationHours: number;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  locationName: string;
  includes: string[];
}

export interface TripActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  durationMinutes: number;
  cost: number;
  category: ExpenseCategory;
  notes: string;
  coordinates?: { lat: number; lng: number };
}

export interface TripDay {
  dayNumber: number;
  title: string;
  date: string;
  activities: TripActivity[];
}

export interface Trip {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  country: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalBudget: number;
  spentBudget: number;
  status: 'upcoming' | 'past' | 'draft';
  days: TripDay[];
  notes?: string;
  shareableCode?: string;
}

export interface Expense {
  id: string;
  tripId: string;
  category: ExpenseCategory;
  title: string;
  amount: number;
  date: string;
  paymentMethod: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Traveler' | 'Explorer' | 'Admin';
  tripsCompleted: number;
  countriesVisited: number;
  savedPlacesCount: number;
  bio: string;
  travelStyles: string[];
  favoriteDestinations: string[];
  homeAirport: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
