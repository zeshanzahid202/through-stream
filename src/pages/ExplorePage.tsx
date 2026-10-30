import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DestinationCard } from '../components/DestinationCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { InteractiveMap } from '../components/InteractiveMap';
import { CategoryType } from '../types';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  DollarSign,
  Calendar,
  Grid,
  List,
  RotateCcw
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { destinations, experiences, searchFilter, setSearchFilter, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'destinations' | 'experiences'>('destinations');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBudget, setSelectedBudget] = useState<number>(3000);
  const [minRating, setMinRating] = useState<number>(4.5);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'rating' | 'budget'>('recommended');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [selectedMapPinId, setSelectedMapPinId] = useState<string>('kyoto');

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter(dest => {
        // Search query
        if (
          searchFilter &&
          !dest.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
          !dest.country.toLowerCase().includes(searchFilter.toLowerCase()) &&
          !dest.description.toLowerCase().includes(searchFilter.toLowerCase())
        ) {
          return false;
        }

        // Category
        if (selectedCategory !== 'All') {
          if (!dest.categories.includes(selectedCategory as CategoryType)) return false;
        }

        // Budget
        if (dest.budgetRange.min > selectedBudget) return false;

        // Rating
        if (dest.rating < minRating) return false;

        // Duration filter
        if (selectedDuration === 'short' && !dest.avgTripDays.includes('3–4') && !dest.avgTripDays.includes('4–6')) {
          return false;
        }
        if (selectedDuration === 'medium' && !dest.avgTripDays.includes('5–7') && !dest.avgTripDays.includes('5–8')) {
          return false;
        }
        if (selectedDuration === 'long' && !dest.avgTripDays.includes('7–10') && !dest.avgTripDays.includes('6–9')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'budget') return a.budgetRange.min - b.budgetRange.min;
        return 0; // recommended default
      });
  }, [destinations, searchFilter, selectedCategory, selectedBudget, minRating, selectedDuration, sortBy]);

  // Filter experiences
  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      if (
        searchFilter &&
        !exp.title.toLowerCase().includes(searchFilter.toLowerCase()) &&
        !exp.destinationName.toLowerCase().includes(searchFilter.toLowerCase())
      ) {
        return false;
      }
      if (selectedCategory !== 'All' && exp.category !== selectedCategory) return false;
      if (exp.price > selectedBudget) return false;
      if (exp.rating < minRating) return false;
      return true;
    });
  }, [experiences, searchFilter, selectedCategory, selectedBudget, minRating]);

  // Map markers from destinations
  const mapMarkers = useMemo(() => {
    return filteredDestinations.map((d, index) => {
      // Map global coordinates into relative 0-100 canvas space
      const x = ((d.coordinates.lng + 180) / 360) * 100;
      const y = ((90 - d.coordinates.lat) / 180) * 100;
      return {
        id: d.id,
        name: `${d.name}, ${d.country}`,
        category: d.categories[0] || 'Culture',
        x: Math.min(Math.max(x, 10), 90),
        y: Math.min(Math.max(y, 10), 90),
        rating: d.rating,
        price: d.budgetRange.min,
        address: `${d.region} · ${d.avgTripDays}`,
        image: d.thumbnail
      };
    });
  }, [filteredDestinations]);

  const handleResetFilters = () => {
    setSearchFilter('');
    setSelectedCategory('All');
    setSelectedBudget(3000);
    setMinRating(4.5);
    setSelectedDuration('all');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-2">
            Curated World Atlas
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-editorial text-[#0B1320] tracking-tight text-balance">
            Explore the World
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Search by region, budget, season, or cultural immersion style to discover your next voyage.
          </p>
        </div>

        {/* Search Bar & Global Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#0B1320]/10 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Where do you want to go? (e.g. Kyoto, Bali, Paris, Turkey...)"
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/10 rounded-xl text-[#0B1320] placeholder-[#6B7280] focus:outline-hidden focus:border-[#0B1320]"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280] whitespace-nowrap hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl px-3 py-2.5 text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              >
                <option value="recommended">Recommended</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated (★)</option>
                <option value="budget">Budget Friendly ($)</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="md:hidden flex items-center gap-1.5 px-3 py-2.5 bg-[#0B1320] text-white rounded-xl text-xs font-medium cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D8A84E]" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Expanded Filter Panel */}
          <div className={`mt-4 pt-4 border-t border-[#0B1320]/10 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-1.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full text-xs bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl px-3 py-2 text-[#0B1320] focus:outline-hidden"
                >
                  <option value="All">All Categories</option>
                  <option value="Culture">Culture</option>
                  <option value="Nature">Nature</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Food">Food & Wine</option>
                  <option value="Beaches">Beaches & Coast</option>
                  <option value="History">Ancient History</option>
                  <option value="Luxury">Luxury Escapes</option>
                  <option value="Hidden Gems">Hidden Gems</option>
                </select>
              </div>

              {/* Max Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Max Budget
                  </label>
                  <span className="text-xs font-semibold text-[#0B1320] tabular-nums">
                    Up to ${selectedBudget}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={3000}
                  step={100}
                  value={selectedBudget}
                  onChange={e => setSelectedBudget(Number(e.target.value))}
                  className="w-full accent-[#0B1320] cursor-pointer"
                />
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-1.5">
                  Minimum Rating
                </label>
                <select
                  value={minRating}
                  onChange={e => setMinRating(Number(e.target.value))}
                  className="w-full text-xs bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl px-3 py-2 text-[#0B1320] focus:outline-hidden"
                >
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.8}>4.8+ Stars (Superb)</option>
                  <option value={4.9}>4.9+ Stars (Exceptional)</option>
                </select>
              </div>

              {/* Duration filter */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-1.5">
                  Ideal Trip Length
                </label>
                <select
                  value={selectedDuration}
                  onChange={e => setSelectedDuration(e.target.value)}
                  className="w-full text-xs bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl px-3 py-2 text-[#0B1320] focus:outline-hidden"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">Short Getaway (3–5 Days)</option>
                  <option value="medium">Standard Voyage (5–7 Days)</option>
                  <option value="long">Deep Exploration (7+ Days)</option>
                </select>
              </div>
            </div>

            {/* Filter Reset Button */}
            <div className="mt-3 pt-2 flex items-center justify-end">
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#6B7280] hover:text-[#0B1320] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Switcher: Destinations vs Experiences */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 p-1 bg-white border border-[#0B1320]/10 rounded-xl">
            <button
              onClick={() => setActiveTab('destinations')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'destinations'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320]'
              }`}
            >
              Destinations ({filteredDestinations.length})
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'experiences'
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320]'
              }`}
            >
              Experiences ({filteredExperiences.length})
            </button>
          </div>

          <span className="text-xs text-[#6B7280]">
            Showing {activeTab === 'destinations' ? filteredDestinations.length : filteredExperiences.length} verified results
          </span>
        </div>

        {/* Split Layout: Results on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Results List */}
          <div className="lg:col-span-7 space-y-6">
            {activeTab === 'destinations' ? (
              filteredDestinations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredDestinations.map(dest => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onSelect={() => navigateTo('destination-detail', { destinationId: dest.id })}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#0B1320]/10">
                  <MapPin className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
                  <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                    No destinations match these criteria
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 mb-4">
                    Try broadening your budget filter or switching categories.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Reset Search Filters
                  </button>
                </div>
              )
            ) : filteredExperiences.length > 0 ? (
              <div className="space-y-4">
                {filteredExperiences.map(exp => (
                  <ExperienceCard key={exp.id} experience={exp} layout="horizontal" />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#0B1320]/10">
                <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                  No experiences found
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 mb-4">
                  Adjust your search parameters to discover other activities.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Interactive Map Panel */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <InteractiveMap
              markers={mapMarkers}
              activeMarkerId={selectedMapPinId}
              onMarkerSelect={id => {
                setSelectedMapPinId(id);
                // Also optionally navigate or highlight
              }}
              centerTitle="Global Destination Projection"
              showRoute={true}
              className="h-[580px]"
            />
            <div className="bg-white rounded-xl p-3 border border-[#0B1320]/10 flex items-center justify-between text-xs text-[#6B7280]">
              <span>Click any coordinate pin to view place card and add to your active trip.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
