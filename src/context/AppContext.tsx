import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Destination,
  Attraction,
  Experience,
  Trip,
  TripActivity,
  Expense,
  UserProfile,
  ToastMessage
} from '../types';
import {
  INITIAL_DESTINATIONS,
  INITIAL_ATTRACTIONS,
  INITIAL_EXPERIENCES,
  INITIAL_TRIPS,
  INITIAL_EXPENSES,
  INITIAL_USER
} from '../data/mockData';

export type PageType = 
  | 'home' 
  | 'explore' 
  | 'destination-detail' 
  | 'trip-planner' 
  | 'budget-planner' 
  | 'my-trips' 
  | 'favorites' 
  | 'profile' 
  | 'admin';

interface FavoritesState {
  destinations: string[];
  attractions: string[];
  experiences: string[];
}

interface AppContextType {
  currentPage: PageType;
  navigateTo: (page: PageType, params?: { destinationId?: string; tripId?: string }) => void;
  selectedDestinationId: string;
  setSelectedDestinationId: (id: string) => void;
  selectedTripId: string;
  setSelectedTripId: (id: string) => void;
  destinations: Destination[];
  attractions: Attraction[];
  experiences: Experience[];
  trips: Trip[];
  activeTrip: Trip | undefined;
  expenses: Expense[];
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  favorites: FavoritesState;
  toggleFavoriteDestination: (id: string) => void;
  toggleFavoriteAttraction: (id: string) => void;
  toggleFavoriteExperience: (id: string) => void;
  isFavoriteDestination: (id: string) => boolean;
  isFavoriteAttraction: (id: string) => boolean;
  isFavoriteExperience: (id: string) => boolean;
  addTrip: (tripData: Partial<Trip>) => Trip;
  deleteTrip: (id: string) => void;
  updateTrip: (updatedTrip: Trip) => void;
  addActivityToDay: (tripId: string, dayNumber: number, activity: Omit<TripActivity, 'id'>) => void;
  deleteActivityFromDay: (tripId: string, dayNumber: number, activityId: string) => void;
  reorderActivities: (tripId: string, dayNumber: number, sourceIdx: number, destIdx: number) => void;
  moveActivityBetweenDays: (tripId: string, fromDay: number, toDay: number, activityId: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  addDestination: (dest: Destination) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  isCreateTripModalOpen: boolean;
  setCreateTripModalOpen: (open: boolean) => void;
  isShareTripModalOpen: boolean;
  setShareTripModalOpen: (open: boolean) => void;
  tripToShare: Trip | null;
  setTripToShare: (trip: Trip | null) => void;
  searchFilter: string;
  setSearchFilter: (query: string) => void;
}

function readSaved<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (Array.isArray(fallback)) return Array.isArray(parsed) ? parsed as T : fallback;
    return parsed && typeof parsed === 'object' && Object.keys(fallback as object).every(key => key in parsed) ? parsed : fallback;
  } catch { return fallback; }
}
function saveLocal(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Browsing remains available when storage is disabled or full. */ }
}
const validPages: PageType[] = ['home', 'explore', 'destination-detail', 'trip-planner', 'budget-planner', 'my-trips', 'favorites', 'profile', 'admin'];
function readRoute() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const page = params.get('page') as PageType;
  return { page: validPages.includes(page) ? page : 'home' as PageType, destinationId: params.get('destination'), tripId: params.get('trip') };
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>(() => readRoute().page);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(() => readRoute().destinationId || 'kyoto');
  const [selectedTripId, setSelectedTripId] = useState<string>(() => readRoute().tripId || 'trip-japan-adventure');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Modals
  const [isCreateTripModalOpen, setCreateTripModalOpen] = useState(false);
  const [isShareTripModalOpen, setShareTripModalOpen] = useState(false);
  const [tripToShare, setTripToShare] = useState<Trip | null>(null);

  // Entities with localStorage fallback
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    return readSaved('tv_destinations', INITIAL_DESTINATIONS);
  });

  const [attractions] = useState<Attraction[]>(INITIAL_ATTRACTIONS);
  const [experiences] = useState<Experience[]>(INITIAL_EXPERIENCES);

  const [trips, setTrips] = useState<Trip[]>(() => {
    return readSaved('tv_trips', INITIAL_TRIPS);
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    return readSaved('tv_expenses', INITIAL_EXPENSES);
  });

  const [user, setUser] = useState<UserProfile>(() => readSaved('tv_user', INITIAL_USER));

  const [favorites, setFavorites] = useState<FavoritesState>(() => {
    return readSaved('tv_favorites', {
          destinations: ['kyoto', 'istanbul', 'cappadocia'],
          attractions: ['attr-fushimi-inari', 'attr-hagia-sophia'],
          experiences: ['exp-kyoto-tea', 'exp-cappadocia-balloon']
        });
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => { saveLocal('tv_user', user); }, [user]);
  useEffect(() => {
    const onRoute = () => {
      const route = readRoute();
      setCurrentPage(route.page);
      if (route.destinationId) setSelectedDestinationId(route.destinationId);
      if (route.tripId) setSelectedTripId(route.tripId);
    };
    window.addEventListener('hashchange', onRoute);
    return () => window.removeEventListener('hashchange', onRoute);
  }, []);
  useEffect(() => {
    const encoded = new URLSearchParams(window.location.search).get('share');
    if (!encoded) return;
    try {
      if (encoded.length > 100000) throw new Error('Too large');
      const shared = JSON.parse(decodeURIComponent(atob(encoded))) as Trip;
      if (typeof shared.title !== 'string' || typeof shared.id !== 'string' || !Array.isArray(shared.days) || !shared.days.length || !shared.days.every(day => Array.isArray(day.activities)) || typeof shared.totalBudget !== 'number') throw new Error('Invalid trip');
      shared.id = 'shared-' + crypto.randomUUID();
      setTrips(prev => [shared, ...prev]);
      setSelectedTripId(shared.id);
      setCurrentPage('trip-planner');
      window.history.replaceState(null, '', `${window.location.pathname}#page=trip-planner&trip=${encodeURIComponent(shared.id)}`);
    } catch { window.history.replaceState(null, '', window.location.pathname); }
  }, []);
  // Sync to localStorage
  useEffect(() => {
    saveLocal('tv_trips', trips);
  }, [trips]);

  useEffect(() => {
    saveLocal('tv_expenses', expenses);
  }, [expenses]);

  useEffect(() => {
    saveLocal('tv_favorites', favorites);
  }, [favorites]);

  useEffect(() => {
    saveLocal('tv_destinations', destinations);
  }, [destinations]);

  // Recalculate trip spent budget from expenses whenever expenses change
  useEffect(() => {
    setTrips(prev =>
      prev.map(trip => {
        const tripExpenses = expenses.filter(e => e.tripId === trip.id);
        const spent = tripExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        return { ...trip, spentBudget: spent };
      })
    );
  }, [expenses]);

  const activeTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageType, params?: { destinationId?: string; tripId?: string }) => {
    if (params?.destinationId) setSelectedDestinationId(params.destinationId);
    if (params?.tripId) setSelectedTripId(params.tripId);
    const route = new URLSearchParams({ page });
    if (params?.destinationId) route.set('destination', params.destinationId);
    if (params?.tripId) route.set('trip', params.tripId);
    window.location.hash = route.toString();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Favorites
  const toggleFavoriteDestination = (id: string) => {
    setFavorites(prev => {
      const exists = prev.destinations.includes(id);
      const updated = exists ? prev.destinations.filter(item => item !== id) : [...prev.destinations, id];
      showToast(exists ? 'Removed from saved destinations' : 'Added to saved destinations', 'info');
      return { ...prev, destinations: updated };
    });
  };

  const toggleFavoriteAttraction = (id: string) => {
    setFavorites(prev => {
      const exists = prev.attractions.includes(id);
      const updated = exists ? prev.attractions.filter(item => item !== id) : [...prev.attractions, id];
      showToast(exists ? 'Removed from saved places' : 'Added to saved places', 'info');
      return { ...prev, attractions: updated };
    });
  };

  const toggleFavoriteExperience = (id: string) => {
    setFavorites(prev => {
      const exists = prev.experiences.includes(id);
      const updated = exists ? prev.experiences.filter(item => item !== id) : [...prev.experiences, id];
      showToast(exists ? 'Removed from saved experiences' : 'Added to saved experiences', 'info');
      return { ...prev, experiences: updated };
    });
  };

  const isFavoriteDestination = (id: string) => favorites.destinations.includes(id);
  const isFavoriteAttraction = (id: string) => favorites.attractions.includes(id);
  const isFavoriteExperience = (id: string) => favorites.experiences.includes(id);

  // Trips CRUD
  const addTrip = (tripData: Partial<Trip>): Trip => {
    const id = 'trip-' + Date.now();
    const daysCount = tripData.durationDays || 5;
    const defaultDays = Array.from({ length: daysCount }, (_, i) => ({
      dayNumber: i + 1,
      title: `Day ${i + 1} — Exploration`,
      date: new Date(new Date(tripData.startDate || new Date().toISOString().slice(0, 10)).getTime() + i * 86400000).toISOString().slice(0, 10),
      activities: []
    }));

    const newTrip: Trip = {
      id,
      title: tripData.title || 'New Journey',
      destinationId: tripData.destinationId || 'kyoto',
      destinationName: tripData.destinationName || 'Kyoto',
      country: tripData.country || 'Japan',
      coverImage: tripData.coverImage || '/images/dest_kyoto_japan_1790533976072.jpg',
      startDate: tripData.startDate || new Date().toISOString().split('T')[0],
      endDate: tripData.endDate || new Date(Date.now() + 6 * 86400000).toISOString().split('T')[0],
      durationDays: daysCount,
      totalBudget: tripData.totalBudget ?? 1500,
      spentBudget: 0,
      status: 'upcoming',
      shareableCode: `TV-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      days: defaultDays,
      notes: tripData.notes || ''
    };

    setTrips(prev => [newTrip, ...prev]);
    setSelectedTripId(id);
    showToast(`Trip "${newTrip.title}" created successfully!`, 'success');
    return newTrip;
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(t => t.id !== id));
    setExpenses(prev => prev.filter(e => e.tripId !== id));
    showToast('Trip has been deleted', 'info');
    if (selectedTripId === id) {
      const remaining = trips.filter(t => t.id !== id);
      if (remaining.length > 0) setSelectedTripId(remaining[0].id);
    }
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips(prev => prev.map(t => (t.id === updatedTrip.id ? updatedTrip : t)));
    showToast('Trip itinerary updated', 'success');
  };

  const addActivityToDay = (tripId: string, dayNumber: number, activity: Omit<TripActivity, 'id'>) => {
    const activityId = 'act-' + Date.now();
    const newActivity: TripActivity = { ...activity, id: activityId };

    setTrips(prev =>
      prev.map(trip => {
        if (trip.id !== tripId) return trip;
        const updatedDays = trip.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          return {
            ...d,
            activities: [...d.activities, newActivity]
          };
        });
        return { ...trip, days: updatedDays };
      })
    );
    showToast(`Added "${newActivity.title}" to Day ${dayNumber}`, 'success');
  };

  const deleteActivityFromDay = (tripId: string, dayNumber: number, activityId: string) => {
    setTrips(prev =>
      prev.map(trip => {
        if (trip.id !== tripId) return trip;
        const updatedDays = trip.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          return {
            ...d,
            activities: d.activities.filter(a => a.id !== activityId)
          };
        });
        return { ...trip, days: updatedDays };
      })
    );
    showToast('Activity removed from itinerary', 'info');
  };

  const reorderActivities = (tripId: string, dayNumber: number, sourceIdx: number, destIdx: number) => {
    setTrips(prev =>
      prev.map(trip => {
        if (trip.id !== tripId) return trip;
        const updatedDays = trip.days.map(d => {
          if (d.dayNumber !== dayNumber) return d;
          const reordered = Array.from(d.activities);
          const [moved] = reordered.splice(sourceIdx, 1);
          reordered.splice(destIdx, 0, moved);
          return { ...d, activities: reordered };
        });
        return { ...trip, days: updatedDays };
      })
    );
  };

  const moveActivityBetweenDays = (tripId: string, fromDay: number, toDay: number, activityId: string) => {
    if (fromDay === toDay) return;
    setTrips(prev =>
      prev.map(trip => {
        if (trip.id !== tripId || !trip.days.some(day => day.dayNumber === toDay)) return trip;
        let movedActivity: TripActivity | undefined;

        const updatedDays = trip.days.map(d => {
          if (d.dayNumber === fromDay) {
            movedActivity = d.activities.find(a => a.id === activityId);
            return {
              ...d,
              activities: d.activities.filter(a => a.id !== activityId)
            };
          }
          return d;
        });

        if (movedActivity) {
          const finalDays = updatedDays.map(d => {
            if (d.dayNumber === toDay) {
              return {
                ...d,
                activities: [...d.activities, movedActivity!]
              };
            }
            return d;
          });
          return { ...trip, days: finalDays };
        }

        return trip;
      })
    );
    showToast(`Moved activity to Day ${toDay}`, 'success');
  };

  // Expenses CRUD
  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const id = 'exp-' + Date.now();
    const newExpense: Expense = { ...expense, id };
    setExpenses(prev => [newExpense, ...prev]);
    showToast(`Added expense: $${newExpense.amount} for ${newExpense.title}`, 'success');
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast('Expense record removed', 'info');
  };

  // Admin add destination
  const addDestination = (dest: Destination) => {
    setDestinations(prev => [dest, ...prev]);
    showToast(`Destination "${dest.name}" created!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedDestinationId,
        setSelectedDestinationId,
        selectedTripId,
        setSelectedTripId,
        destinations,
        attractions,
        experiences,
        trips,
        activeTrip,
        expenses,
        user,
        setUser,
        favorites,
        toggleFavoriteDestination,
        toggleFavoriteAttraction,
        toggleFavoriteExperience,
        isFavoriteDestination,
        isFavoriteAttraction,
        isFavoriteExperience,
        addTrip,
        deleteTrip,
        updateTrip,
        addActivityToDay,
        deleteActivityFromDay,
        reorderActivities,
        moveActivityBetweenDays,
        addExpense,
        deleteExpense,
        addDestination,
        toasts,
        showToast,
        removeToast,
        isCreateTripModalOpen,
        setCreateTripModalOpen,
        isShareTripModalOpen,
        setShareTripModalOpen,
        tripToShare,
        setTripToShare,
        searchFilter,
        setSearchFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
