import React, { useState } from 'react';
import { Experience } from '../types';
import { useApp } from '../context/AppContext';
import { Clock, Star, Plus, Heart, Check } from 'lucide-react';

interface ExperienceCardProps {
  experience: Experience;
  layout?: 'vertical' | 'horizontal';
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  layout = 'horizontal'
}) => {
  const {
    activeTrip,
    addActivityToDay,
    isFavoriteExperience,
    toggleFavoriteExperience,
    showToast
  } = useApp();

  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);
  const isFav = isFavoriteExperience(experience.id);

  const handleAddToTrip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeTrip) {
      showToast('Please create or select a trip first', 'warning');
      return;
    }
    addActivityToDay(activeTrip.id, 1, {
      time: '14:00',
      title: experience.title,
      location: experience.locationName,
      durationMinutes: Math.round(experience.durationHours * 60),
      cost: experience.price,
      category: 'Activities',
      notes: experience.description
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  if (layout === 'horizontal') {
    return (
      <div className="group bg-white rounded-2xl p-3 sm:p-4 border border-[#0B1320]/10 hover:border-[#0B1320]/25 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-4">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-[#0B1320]/5 shrink-0">
          {!imgError ? (
            <img
              src={experience.image}
              alt={experience.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#0B1320] to-[#1E293B] flex items-center justify-center text-white text-xs p-2 text-center">
              {experience.title}
            </div>
          )}
          <button
            onClick={e => {
              e.stopPropagation();
              toggleFavoriteExperience(experience.id);
            }}
            aria-label="Save experience"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center hover:bg-white transition-all cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isFav ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#0B1320]'
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            {/* Unboxed metadata */}
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="font-medium text-[#0B1320]">{experience.destinationName}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="tabular-nums">{experience.durationHours} hrs</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-0.5 text-[#D8A84E]">
                <Star className="w-3 h-3 fill-[#D8A84E]" />
                <span className="tabular-nums font-semibold">{experience.rating.toFixed(2)}</span>
              </span>
            </div>

            <h4 className="mt-1 text-base font-bold font-editorial text-[#0B1320] group-hover:text-[#D8A84E] transition-colors leading-snug">
              {experience.title}
            </h4>

            <p className="mt-1.5 text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
              {experience.description}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-[#0B1320]/5 flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-[#0B1320] tabular-nums">
                ${experience.price}
              </span>
              <span className="text-xs text-[#6B7280]">/ person</span>
            </div>

            <button
              onClick={handleAddToTrip}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                added
                  ? 'bg-emerald-800 text-white'
                  : 'bg-[#0B1320] text-white hover:bg-[#1E293B]'
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
                  <span>Add to Trip</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vertical layout
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#0B1320]/10 hover:border-[#0B1320]/25 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative aspect-16/10 overflow-hidden bg-[#0B1320]/5">
        {!imgError ? (
          <img
            src={experience.image}
            alt={experience.title}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-[#0B1320] to-[#1E293B] flex items-center justify-center text-white text-xs p-4 text-center">
            {experience.title}
          </div>
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFavoriteExperience(experience.id);
          }}
          aria-label="Save experience"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center hover:bg-white transition-all cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFav ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#0B1320]'
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280]">
            <span>{experience.destinationName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="tabular-nums">{experience.durationHours}h</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-[#D8A84E]">
              <Star className="w-3 h-3 fill-[#D8A84E]" />
              <span className="tabular-nums">{experience.rating.toFixed(1)}</span>
            </span>
          </div>

          <h4 className="mt-1.5 text-base font-bold font-editorial text-[#0B1320] group-hover:text-[#D8A84E] transition-colors line-clamp-1">
            {experience.title}
          </h4>

          <p className="mt-1 text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
            {experience.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#0B1320]/10 flex items-center justify-between">
          <div className="text-sm font-bold text-[#0B1320] tabular-nums">
            ${experience.price} <span className="text-xs font-normal text-[#6B7280]">/ guest</span>
          </div>

          <button
            onClick={handleAddToTrip}
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
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
