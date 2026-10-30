import React, { useState } from 'react';
import { Destination } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Star, Compass, ArrowUpRight } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSelect?: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  const { navigateTo, isFavoriteDestination, toggleFavoriteDestination } = useApp();
  const [imgError, setImgError] = useState(false);
  const isFav = isFavoriteDestination(destination.id);

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      navigateTo('destination-detail', { destinationId: destination.id });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#0B1320]/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Visual Carrier */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#0B1320]/5">
        {!imgError ? (
          <img
            src={destination.heroImage}
            alt={destination.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-[#0B1320] to-[#1E293B] text-white p-6">
            <Compass className="w-10 h-10 text-[#D8A84E] mb-2" />
            <span className="font-editorial text-lg">{destination.name}</span>
            <span className="text-xs text-white/60">{destination.country}</span>
          </div>
        )}

        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            toggleFavoriteDestination(destination.id);
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B1320] hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#0B1320]'
            }`}
          />
        </button>

        {/* Bottom image overlay details */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
            <span>{destination.country}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-[#D8A84E]">
              <Star className="w-3 h-3 fill-[#D8A84E]" />
              <span className="tabular-nums">{destination.rating.toFixed(1)}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{destination.attractionsCount} places</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold font-editorial text-[#0B1320] group-hover:text-[#D8A84E] transition-colors leading-tight">
              {destination.name}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#0B1320] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </div>

          <p className="mt-2 text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Clean Unboxed Metadata (Zero-pill discipline) */}
        <div className="mt-4 pt-4 border-t border-[#0B1320]/10 flex items-center justify-between text-xs text-[#6B7280]">
          <div>
            <span className="text-[#111827] font-semibold tabular-nums">
              ${destination.budgetRange.min} – ${destination.budgetRange.max}
            </span>
            <span className="text-[#6B7280]"> / trip</span>
          </div>
          <div>
            <span className="text-[#111827] font-medium">{destination.avgTripDays}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
