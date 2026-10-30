import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/DestinationCard';
import { PlaceCard } from '../components/PlaceCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { Heart, Compass, ArrowRight } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const {
    favorites,
    destinations,
    attractions,
    experiences,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'destinations' | 'places' | 'experiences'>(
    'destinations'
  );

  const savedDestinations = destinations.filter(d =>
    favorites.destinations.includes(d.id)
  );

  const savedPlaces = attractions.filter(a =>
    favorites.attractions.includes(a.id)
  );

  const savedExperiences = experiences.filter(e =>
    favorites.experiences.includes(e.id)
  );

  const totalCount =
    favorites.destinations.length + favorites.attractions.length + favorites.experiences.length;

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-24 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#D8A84E] mb-1">
            <Heart className="w-3.5 h-3.5 fill-[#D8A84E]" />
            <span>Saved Collections</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight">
            Your Saved Escapes
          </h1>
          <p className="mt-1 text-xs text-[#6B7280]">
            Review your shortlisted destinations, historical landmarks, and curated activities.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#0B1320]/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'destinations'
                ? 'bg-[#0B1320] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-white/60'
            }`}
          >
            <span>Destinations</span>
            <span className="text-[10px] opacity-75 tabular-nums">
              ({savedDestinations.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('places')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'places'
                ? 'bg-[#0B1320] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-white/60'
            }`}
          >
            <span>Places & Sights</span>
            <span className="text-[10px] opacity-75 tabular-nums">
              ({savedPlaces.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'experiences'
                ? 'bg-[#0B1320] text-white shadow-xs'
                : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-white/60'
            }`}
          >
            <span>Experiences</span>
            <span className="text-[10px] opacity-75 tabular-nums">
              ({savedExperiences.length})
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'destinations' && (
          savedDestinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {savedDestinations.map(destination => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <EmptyFavoritesState
              title="No saved destinations yet"
              description="Heart any destination while exploring to assemble your travel shortlist."
              onAction={() => navigateTo('explore')}
            />
          )
        )}

        {activeTab === 'places' && (
          savedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPlaces.map(attraction => (
                <PlaceCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          ) : (
            <EmptyFavoritesState
              title="No saved places or sights yet"
              description="Save temples, viewpoints, and landmarks to quickly import them into your day-by-day itineraries."
              onAction={() => navigateTo('explore')}
            />
          )
        )}

        {activeTab === 'experiences' && (
          savedExperiences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedExperiences.map(experience => (
                <ExperienceCard key={experience.id} experience={experience} layout="horizontal" />
              ))}
            </div>
          ) : (
            <EmptyFavoritesState
              title="No saved experiences yet"
              description="Shortlist tea ceremonies, sunrise treks, and yacht cruises for upcoming adventures."
              onAction={() => navigateTo('explore')}
            />
          )
        )}
      </div>
    </div>
  );
};

const EmptyFavoritesState: React.FC<{
  title: string;
  description: string;
  onAction: () => void;
}> = ({ title, description, onAction }) => {
  return (
    <div className="bg-white rounded-3xl p-16 text-center border border-[#0B1320]/10 max-w-md mx-auto">
      <Compass className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
      <h3 className="font-editorial text-lg font-bold text-[#0B1320]">{title}</h3>
      <p className="text-xs text-[#6B7280] mt-1 mb-6 leading-relaxed">{description}</p>
      <button
        onClick={onAction}
        className="px-5 py-2.5 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
      >
        Discover Places Now
      </button>
    </div>
  );
};
