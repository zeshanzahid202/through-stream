import React, { useState } from 'react';
import { Attraction } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, Star, MapPin, Plus, Heart, Check } from 'lucide-react';

interface PlaceCardProps {
  attraction: Attraction;
  onSelectOnMap?: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ attraction, onSelectOnMap }) => {
  const { activeTrip, addActivityToDay, isFavoriteAttraction, toggleFavoriteAttraction, showToast } =
    useApp();
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const isFav = isFavoriteAttraction(attraction.id);

  const handleAddToItinerary = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeTrip) {
      showToast('Please create or select a trip first', 'warning');
      return;
    }
    addActivityToDay(activeTrip.id, 1, {
      time: '11:00',
      title: attraction.name,
      location: attraction.address,
      durationMinutes: Math.round(attraction.durationHours * 60),
      cost: attraction.price,
      category: 'Activities',
      notes: attraction.tip || attraction.description,
      coordinates: attraction.coordinates
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={onSelectOnMap}
      className="group bg-white rounded-2xl overflow-hidden border border-[#0B1320]/10 hover:border-[#0B1320]/25 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-[#0B1320]/5">
        {!imgError ? (
          <img
            src={attraction.image}
            alt={attraction.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-[#0B1320] to-[#1E293B] flex items-center justify-center text-white text-xs p-4 text-center">
            {attraction.name}
          </div>
        )}

        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavoriteAttraction(attraction.id);
          }}
          aria-label="Save place"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center hover:bg-white transition-all cursor-pointer z-10"
        >
          <Heart
            className={`w-4 h-4 ${
              isFav ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#0B1320]'
            }`}
          />
        </button>

        {attraction.price === 0 && (
          <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
            Free Admission
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span className="flex items-center gap-0.5 text-[#D8A84E]">
              <Star className="w-3 h-3 fill-[#D8A84E]" />
              <span className="tabular-nums font-semibold">{attraction.rating.toFixed(2)}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="tabular-nums">{attraction.durationHours}h</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{attraction.category}</span>
          </div>

          <h4 className="mt-1.5 text-base font-bold font-editorial text-[#0B1320] group-hover:text-[#D8A84E] transition-colors leading-tight">
            {attraction.name}
          </h4>

          <p className="mt-1 text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
            {attraction.description}
          </p>

          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#6B7280] truncate">
            <MapPin className="w-3 h-3 text-[#D8A84E] shrink-0" />
            <span className="truncate">{attraction.address}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#0B1320]/10 flex items-center justify-between">
          <div className="text-xs">
            {attraction.price > 0 ? (
              <span className="text-[#0B1320] font-bold tabular-nums">${attraction.price} entry</span>
            ) : (
              <span className="text-emerald-700 font-medium">Free</span>
            )}
          </div>

          <button
            onClick={handleAddToItinerary}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              added ? 'bg-emerald-800 text-white' : 'bg-[#0B1320] text-white hover:bg-[#1E293B]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-[#D8A84E]" />
                <span>Add to Day</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
