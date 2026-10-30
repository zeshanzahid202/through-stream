import React, { useState } from 'react';
import { Attraction } from '../types';
import { MapPin, Navigation, ZoomIn, ZoomOut, RotateCcw, Compass, Star, Clock, Plus, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MapMarker {
  id: string;
  name: string;
  category: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  rating?: number;
  duration?: number;
  price?: number;
  address?: string;
  image?: string;
  attractionRef?: Attraction;
}

interface InteractiveMapProps {
  markers?: MapMarker[];
  activeMarkerId?: string;
  onMarkerSelect?: (markerId: string) => void;
  showRoute?: boolean;
  centerTitle?: string;
  className?: string;
}

// Default Kyoto / Japan coordinates mapped to stylized canvas
const DEFAULT_MARKERS: MapMarker[] = [
  {
    id: 'fushimi',
    name: 'Fushimi Inari Shrine',
    category: 'Culture',
    x: 48,
    y: 72,
    rating: 4.9,
    duration: 2.5,
    price: 0,
    address: 'Fushimi Ward, Kyoto',
    image: '/images/dest_kyoto_japan_1790533976072.jpg'
  },
  {
    id: 'gion',
    name: 'Gion Historic District',
    category: 'Culture',
    x: 52,
    y: 50,
    rating: 4.88,
    duration: 2.0,
    price: 0,
    address: 'Higashiyama Ward, Kyoto',
    image: '/images/dest_kyoto_japan_1790533976072.jpg'
  },
  {
    id: 'kiyomizu',
    name: 'Kiyomizu-dera Temple',
    category: 'History',
    x: 62,
    y: 55,
    rating: 4.92,
    duration: 2.0,
    price: 4,
    address: '1 Chome Kiyomizu, Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'kinkaku',
    name: 'Kinkaku-ji (Golden Pavilion)',
    category: 'History',
    x: 35,
    y: 25,
    rating: 4.84,
    duration: 1.5,
    price: 5,
    address: 'Kita Ward, Kyoto',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'arashiyama',
    name: 'Arashiyama Bamboo Grove',
    category: 'Nature',
    x: 22,
    y: 38,
    rating: 4.85,
    duration: 1.5,
    price: 0,
    address: 'Ukyo Ward, Kyoto',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'daitoku',
    name: 'Daitoku-ji Zen Tea Enclave',
    category: 'Culture',
    x: 42,
    y: 20,
    rating: 4.95,
    duration: 2.5,
    price: 85,
    address: 'Kita Ward, Kyoto',
    image: '/images/dest_kyoto_japan_1790533976072.jpg'
  }
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  markers = DEFAULT_MARKERS,
  activeMarkerId: externalActiveId,
  onMarkerSelect,
  showRoute = true,
  centerTitle = 'Kyoto Valley Projection',
  className = ''
}) => {
  const { activeTrip, addActivityToDay, showToast } = useApp();
  const [internalActiveId, setInternalActiveId] = useState<string>(markers[0]?.id || 'fushimi');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const selectedMarkerId = externalActiveId || internalActiveId;
  const selectedMarker = markers.find(m => m.id === selectedMarkerId) || markers[0];

  const filteredMarkers =
    activeCategory === 'All'
      ? markers
      : markers.filter(m => m.category.toLowerCase() === activeCategory.toLowerCase());

  const handleSelect = (id: string) => {
    setInternalActiveId(id);
    if (onMarkerSelect) onMarkerSelect(id);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(0.8, prev + delta), 2.2));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Generate smooth SVG curve connecting filtered markers
  const routePoints = filteredMarkers.map(m => `${m.x * 8},${m.y * 5}`).join(' ');

  const handleQuickAdd = () => {
    if (!selectedMarker) return;
    if (!activeTrip) {
      showToast('Please select or create a trip first', 'warning');
      return;
    }
    addActivityToDay(activeTrip.id, 1, {
      time: '12:00',
      title: selectedMarker.name,
      location: selectedMarker.address || centerTitle,
      durationMinutes: (selectedMarker.duration || 1.5) * 60,
      cost: selectedMarker.price || 0,
      category: 'Activities',
      notes: `Visited via interactive route discovery. Category: ${selectedMarker.category}`
    });
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-[#0B1320]/15 bg-[#0B1320] text-white shadow-xl select-none flex flex-col ${className}`}
      style={{ minHeight: '440px' }}
    >
      {/* Top Map Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 bg-linear-to-b from-[#0B1320]/90 to-transparent backdrop-blur-xs flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D8A84E] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-white font-editorial">
            {centerTitle}
          </span>
          <span className="text-[10px] text-white/50 hidden sm:inline">
            · 35.0116° N, 135.7681° E
          </span>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md p-1 rounded-lg text-[11px]">
          {['All', 'Culture', 'Nature', 'History'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#D8A84E] text-[#0B1320] font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stylized Vector Map Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing bg-[#0B1320]">
        <div
          className="w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: '50% 50%'
          }}
        >
          <svg
            viewBox="0 0 800 500"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8A84E" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#F5F3EE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D8A84E" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="contourGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1E293B" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0B1320" stopOpacity="1" />
              </radialGradient>
            </defs>

            {/* Background Glow */}
            <rect width="800" height="500" fill="url(#contourGlow)" />

            {/* Coordinate Grid */}
            <rect width="800" height="500" fill="url(#grid)" />

            {/* Stylized River (e.g. Kamo / Hozu River path) */}
            <path
              d="M 120,40 Q 240,180 380,220 T 560,340 T 700,480"
              fill="none"
              stroke="#1E3A8A"
              strokeWidth="12"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
            <path
              d="M 120,40 Q 240,180 380,220 T 560,340 T 700,480"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3"
              strokeOpacity="0.4"
              strokeLinecap="round"
            />

            {/* Topographic Elevation Contours */}
            <path
              d="M 50,80 Q 150,40 300,90 T 520,70 T 750,110"
              fill="none"
              stroke="rgba(216, 168, 78, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 40,160 Q 180,120 340,170 T 580,140 T 770,200"
              fill="none"
              stroke="rgba(216, 168, 78, 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M 60,320 Q 220,280 400,330 T 640,300 T 760,360"
              fill="none"
              stroke="rgba(216, 168, 78, 0.12)"
              strokeWidth="1.5"
            />
            <path
              d="M 30,420 Q 240,380 440,430 T 680,410 T 780,450"
              fill="none"
              stroke="rgba(216, 168, 78, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Mountain Range silhouettes in background */}
            <path
              d="M 600,60 L 650,20 L 700,70 L 740,30 L 790,80"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />

            {/* Route Line connecting points */}
            {showRoute && filteredMarkers.length > 1 && (
              <>
                <polyline
                  points={routePoints}
                  fill="none"
                  stroke="#D8A84E"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  strokeOpacity="0.8"
                />
                {/* Secondary route glow */}
                <polyline
                  points={routePoints}
                  fill="none"
                  stroke="#D8A84E"
                  strokeWidth="8"
                  strokeOpacity="0.15"
                />
              </>
            )}

            {/* Compass rose */}
            <g transform="translate(730, 80) scale(0.6)" opacity="0.4">
              <circle cx="0" cy="0" r="30" fill="none" stroke="#D8A84E" strokeWidth="1" />
              <polygon points="0,-28 6,-6 28,0 6,6 0,28 -6,6 -28,0 -6,-6" fill="#D8A84E" />
              <text x="-4" y="-34" fill="#D8A84E" fontSize="12" fontWeight="bold">
                N
              </text>
            </g>
          </svg>

          {/* Interactive Marker Pins */}
          {filteredMarkers.map((marker, index) => {
            const isSelected = marker.id === selectedMarkerId;
            return (
              <div
                key={marker.id}
                onClick={e => {
                  e.stopPropagation();
                  handleSelect(marker.id);
                }}
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`
                }}
                className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group z-10 transition-transform duration-200 hover:scale-125"
              >
                {/* Marker Pin */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center rounded-full font-bold shadow-lg transition-all ${
                      isSelected
                        ? 'w-8 h-8 bg-[#D8A84E] text-[#0B1320] ring-4 ring-[#D8A84E]/40 scale-115'
                        : 'w-6 h-6 bg-[#0B1320] text-white border-2 border-[#D8A84E] group-hover:bg-[#D8A84E] group-hover:text-[#0B1320]'
                    }`}
                  >
                    <span className="text-[11px] tabular-nums">{index + 1}</span>
                  </div>

                  {/* Marker Pin Needle */}
                  <div
                    className={`w-0.5 h-2 ${isSelected ? 'bg-[#D8A84E]' : 'bg-[#D8A84E]/60'}`}
                  />
                  <div
                    className={`w-2 h-1 rounded-full blur-[1px] ${
                      isSelected ? 'bg-[#D8A84E]' : 'bg-black/60'
                    }`}
                  />

                  {/* Label tooltip */}
                  <div
                    className={`absolute bottom-full mb-1.5 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-semibold transition-all pointer-events-none ${
                      isSelected
                        ? 'bg-[#D8A84E] text-[#0B1320] shadow-md opacity-100'
                        : 'bg-black/80 text-white/90 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {marker.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Selected Place Info Drawer (Bottom Right) */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-white/95 backdrop-blur-md text-[#111827] rounded-xl p-3.5 border border-[#0B1320]/15 shadow-2xl z-20 animate-fadeIn">
          <div className="flex gap-3">
            {selectedMarker.image && (
              <img
                src={selectedMarker.image}
                alt={selectedMarker.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-lg object-cover shrink-0 bg-slate-200"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                <span>{selectedMarker.category}</span>
                {selectedMarker.rating && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-0.5 text-[#D8A84E] font-medium">
                      <Star className="w-2.5 h-2.5 fill-[#D8A84E]" />
                      <span className="tabular-nums">{selectedMarker.rating.toFixed(1)}</span>
                    </span>
                  </>
                )}
                {selectedMarker.duration && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{selectedMarker.duration}h</span>
                  </>
                )}
              </div>

              <h4 className="text-sm font-bold font-editorial text-[#0B1320] truncate">
                {selectedMarker.name}
              </h4>

              <p className="text-[11px] text-[#6B7280] truncate mt-0.5">
                {selectedMarker.address || 'Central Heritage Zone'}
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0B1320]">
              {selectedMarker.price ? `$${selectedMarker.price} admission` : 'Free entry'}
            </span>
            <button
              onClick={handleQuickAdd}
              className="bg-[#0B1320] text-white hover:bg-[#1E293B] px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3 h-3 text-[#D8A84E]" />
              <span>Add to Day</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Left Map Controls */}
      <div className="absolute top-14 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => handleZoom(0.2)}
          aria-label="Zoom in"
          className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.2)}
          aria-label="Zoom out"
          className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          aria-label="Reset map"
          className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-black/90 flex items-center justify-center transition-colors cursor-pointer border border-white/10"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Legend Footer */}
      <div className="px-4 py-2 bg-[#0B1320]/90 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D8A84E]" /> Active Waypoints
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#D8A84E] border-t border-dashed border-[#D8A84E]" /> Itinerary Route
          </span>
        </div>
        <span className="text-[10px] text-[#D8A84E]/80 hidden sm:inline">
          TravelVerse Vector Cartography · Offline Ready
        </span>
      </div>
    </div>
  );
};
