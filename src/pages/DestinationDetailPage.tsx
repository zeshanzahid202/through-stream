import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlaceCard } from '../components/PlaceCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { InteractiveMap } from '../components/InteractiveMap';
import {
  Heart,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Compass,
  Plus,
  Share2,
  ChevronLeft,
  CheckCircle2,
  Lightbulb,
  Utensils
} from 'lucide-react';

export const DestinationDetailPage: React.FC = () => {
  const {
    selectedDestinationId,
    destinations,
    attractions,
    experiences,
    navigateTo,
    isFavoriteDestination,
    toggleFavoriteDestination,
    setCreateTripModalOpen,
    setShareTripModalOpen,
    setTripToShare,
    activeTrip,
    showToast
  } = useApp();

  const destination =
    destinations.find(d => d.id === selectedDestinationId) || destinations[0];

  const destinationAttractions = attractions.filter(
    a => a.destinationId === destination.id
  );

  const destinationExperiences = experiences.filter(
    e => e.destinationId === destination.id
  );

  const [activeTab, setActiveTab] = useState<'attractions' | 'experiences' | 'food' | 'tips'>(
    'attractions'
  );

  const isFav = isFavoriteDestination(destination.id);

  // Map markers for this destination
  const destinationMapMarkers = destinationAttractions.map((attr, idx) => ({
    id: attr.id,
    name: attr.name,
    category: attr.category,
    x: 20 + (idx * 16) % 65,
    y: 25 + (idx * 19) % 55,
    rating: attr.rating,
    duration: attr.durationHours,
    price: attr.price,
    address: attr.address,
    image: attr.image
  }));

  const handleAddDestinationToTrip = () => {
    setCreateTripModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-20 pb-20 text-[#111827]">
      {/* 1. CINEMATIC DESTINATION HERO */}
      <div className="relative min-h-[500px] md:min-h-[580px] w-full flex items-end overflow-hidden">
        {/* Hero image */}
        <div className="absolute inset-0 z-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90 scale-102"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0B1320] via-[#0B1320]/40 to-transparent" />
        </div>

        {/* Back button and quick actions */}
        <div className="absolute top-6 left-4 sm:left-8 right-4 sm:right-8 z-10 flex items-center justify-between">
          <button
            onClick={() => navigateTo('explore')}
            className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Destinations</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteDestination(destination.id)}
              aria-label="Save destination"
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-[#0B1320] flex items-center justify-center transition-all cursor-pointer border border-white/20"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav ? 'fill-[#E11D48] text-[#E11D48]' : 'text-current'
                }`}
              />
            </button>
            <button
              onClick={() => {
                if (activeTrip) {
                  setTripToShare(activeTrip);
                  setShareTripModalOpen(true);
                } else {
                  showToast('Create a trip to generate a share link', 'info');
                }
              }}
              aria-label="Share"
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white backdrop-blur-md text-white hover:text-[#0B1320] flex items-center justify-center transition-all cursor-pointer border border-white/20"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full text-white">
          <div className="max-w-3xl">
            {/* Unboxed breadcrumb metadata */}
            <div className="flex items-center gap-2 text-xs text-white/80 font-medium mb-2">
              <span>{destination.region}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#D8A84E]">{destination.country}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#D8A84E] text-[#D8A84E]" />
                <span className="tabular-nums font-bold">{destination.rating.toFixed(2)}</span>
                <span className="opacity-80">({destination.reviewsCount} reviews)</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-editorial text-white tracking-tight leading-none">
              {destination.name}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed font-light text-balance">
              {destination.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
                <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                  Best Time to Visit
                </span>
                <span className="text-white font-semibold mt-0.5 block">
                  {destination.bestTime}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
                <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                  Average Length
                </span>
                <span className="text-white font-semibold mt-0.5 block">
                  {destination.avgTripDays}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 col-span-2 sm:col-span-1">
                <span className="text-white/60 block text-[10px] uppercase tracking-wider">
                  Estimated Budget
                </span>
                <span className="text-[#D8A84E] font-semibold mt-0.5 block tabular-nums">
                  ${destination.budgetRange.min} – ${destination.budgetRange.max} USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Sticky Sub-navigation */}
        <div className="flex items-center justify-between border-b border-[#0B1320]/10 pb-4 mb-8 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('attractions')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'attractions'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320]'
              }`}
            >
              Top Attractions ({destinationAttractions.length})
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'experiences'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320]'
              }`}
            >
              Curated Experiences ({destinationExperiences.length})
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'food'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320]'
              }`}
            >
              Local Food ({destination.localFoods.length})
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                activeTab === 'tips'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320]'
              }`}
            >
              Travel Tips & Logistics
            </button>
          </div>

          <button
            onClick={handleAddDestinationToTrip}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#D8A84E] hover:bg-[#e2b55b] text-[#0B1320] rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Destination to Trip</span>
          </button>
        </div>

        {/* Tab 1: Top Attractions */}
        {activeTab === 'attractions' && (
          <div className="space-y-12">
            <div>
              <div className="max-w-2xl mb-6">
                <h3 className="text-2xl font-bold font-editorial text-[#0B1320]">
                  Must-See Attractions in {destination.name}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1">
                  Centuries of heritage preserved in temples, historic districts, and natural wonders.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinationAttractions.map(attr => (
                  <PlaceCard key={attr.id} attraction={attr} />
                ))}
              </div>
            </div>

            {/* Interactive Map of Destination */}
            <div className="pt-8">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-1">
                  Spatial Overview
                </span>
                <h3 className="text-xl font-bold font-editorial text-[#0B1320]">
                  {destination.name} Attraction Map
                </h3>
              </div>
              <InteractiveMap
                markers={destinationMapMarkers}
                centerTitle={`${destination.name} Regional Projection`}
                showRoute={true}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Experiences */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            <div className="max-w-2xl mb-6">
              <h3 className="text-2xl font-bold font-editorial text-[#0B1320]">
                Curated Cultural Experiences
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Private masterclasses, culinary expeditions, and dawn hikes led by certified local masters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destinationExperiences.length > 0 ? (
                destinationExperiences.map(exp => (
                  <ExperienceCard key={exp.id} experience={exp} layout="horizontal" />
                ))
              ) : (
                experiences.slice(0, 4).map(exp => (
                  <ExperienceCard key={exp.id} experience={exp} layout="horizontal" />
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Local Food */}
        {activeTab === 'food' && (
          <div className="space-y-6">
            <div className="max-w-2xl mb-6">
              <h3 className="text-2xl font-bold font-editorial text-[#0B1320]">
                Gastronomy & Culinary Traditions
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Authentic flavors and seasonal preparations that define {destination.name}’s food identity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {destination.localFoods.map((food, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-[#0B1320]/10 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold font-editorial text-[#0B1320]">
                        {food.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#D8A84E] tabular-nums">
                        {food.price}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#6B7280] leading-relaxed">
                      {food.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#0B1320]/5 flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                    <Utensils className="w-3.5 h-3.5 text-[#D8A84E]" />
                    <span>Recommended at neighborhood specialty stalls & ryokans</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Travel Tips */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div className="max-w-2xl mb-6">
              <h3 className="text-2xl font-bold font-editorial text-[#0B1320]">
                Essential Field Notes & Etiquette
              </h3>
              <p className="text-xs text-[#6B7280] mt-1">
                Practical advice to travel respectfully and navigate transit smoothly.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl">
              {destination.travelTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#0B1320]/10 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0B1320] text-[#D8A84E] flex items-center justify-center font-bold text-xs shrink-0 tabular-nums">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-[#111827] leading-relaxed">
                      {tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Mobile CTA */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
          <button
            onClick={handleAddDestinationToTrip}
            className="w-full py-3 bg-[#0B1320] text-white rounded-xl text-xs font-semibold shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#D8A84E]" />
            <span>Add Destination to Trip</span>
          </button>
        </div>
      </div>
    </div>
  );
};
