import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE, CATEGORIES_LIST } from '../data/mockData';
import { DestinationCard } from '../components/DestinationCard';
import { ExperienceCard } from '../components/ExperienceCard';
import { InteractiveMap } from '../components/InteractiveMap';
import { CategoryType } from '../types';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    destinations,
    experiences,
    navigateTo,
    setCreateTripModalOpen
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Culture');

  // Filtered experiences based on interactive category selection
  const filteredExperiences = experiences.filter(
    exp => exp.category === selectedCategory || selectedCategory === 'Adventure'
  );

  // Trending top 6 destinations
  const trendingDestinations = destinations.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#111827]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Misty Kyoto Pagoda at Golden Dawn"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 animate-subtleZoom filter brightness-90"
          />
          {/* Gradients ensuring WCAG text legibility */}
          <div className="absolute inset-0 bg-linear-to-b from-[#0B1320]/75 via-[#0B1320]/60 to-[#F5F3EE]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,19,32,0.6)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-0">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D8A84E]" />
            <span>The Premier Modern Travel Planning Atelier</span>
          </div>

          {/* Headline (No orphan words, balanced) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-editorial text-white tracking-tight leading-[1.08] text-balance">
            Plan Less.
            <br />
            <span className="text-[#D8A84E] italic font-normal">Experience More.</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed text-balance font-light">
            Discover remarkable places, build unforgettable itineraries, and plan every detail of your journey in one beautiful space.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCreateTripModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#D8A84E] hover:bg-[#e2b55b] text-[#0B1320] font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('explore')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl backdrop-blur-md border border-white/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#D8A84E]" />
              <span>Explore Destinations</span>
            </button>
          </div>

          {/* Floating Hero Metric Cards (Subtle motion) */}
          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto">
            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-white text-center hover:bg-white/20 transition-all">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-[#D8A84E] tabular-nums">
                12
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 uppercase tracking-wider font-medium">
                Places
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-white text-center hover:bg-white/20 transition-all">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-white tabular-nums">
                7
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 uppercase tracking-wider font-medium">
                Days
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-white text-center hover:bg-white/20 transition-all">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-[#D8A84E] tabular-nums">
                $1,240
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 uppercase tracking-wider font-medium">
                Estimated
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING DESTINATIONS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#D8A84E] mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Worldwide Selections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight">
              Trending Destinations
            </h2>
            <p className="mt-2 text-sm text-[#6B7280] max-w-lg">
              Hand-picked ancient enclaves, coastal sanctuaries, and cultural capitals curated for the thoughtful traveler.
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1320] hover:text-[#D8A84E] transition-colors cursor-pointer group shrink-0"
          >
            <span>View All Destinations</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trendingDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* 3. DISCOVER SECTION: "Find Your Next Experience" */}
      <section className="py-20 bg-[#0B1320] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-2">
              Personalized Exploration
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-white tracking-tight">
              Find Your Next Experience
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Select your travel passion to explore masterclasses, mountain ascents, and heritage workshops.
            </p>
          </div>

          {/* Interactive Category Tabs (Clickable buttons with active state) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {CATEGORIES_LIST.map(cat => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name as CategoryType)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#D8A84E] text-[#0B1320] font-semibold shadow-md scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75 tabular-nums">({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Featured Experiences Grid for Selected Category */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExperiences.slice(0, 4).map(experience => (
              <ExperienceCard key={experience.id} experience={experience} layout="horizontal" />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigateTo('explore')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D8A84E] hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore All 200+ Curated Experiences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. TRIP BUILDER PREVIEW: "Your Journey, Beautifully Organized" */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Storytelling & Value Prop */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-2">
                Frictionless Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight leading-tight">
                Your Journey,
                <br />
                Beautifully Organized
              </h2>
            </div>

            <p className="text-sm text-[#6B7280] leading-relaxed">
              No more messy spreadsheets or disjointed notes. Drag and drop activities across days, track travel durations between temple gates and bistros, and manage your budget seamlessly.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D8A84E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1320]">Intuitive Day-by-Day Scheduling</h4>
                  <p className="text-xs text-[#6B7280]">Effortlessly reorder morning walks, museum visits, and reservations.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D8A84E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1320]">Real-Time Budget Velocity</h4>
                  <p className="text-xs text-[#6B7280]">Categorize accommodation, transit, and gastronomy with instant budget alerts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D8A84E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1320]">Offline Cartography & Export</h4>
                  <p className="text-xs text-[#6B7280]">Share interactive travel dossiers with travel companions in a single click.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('trip-planner')}
                className="px-6 py-3 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Launch Interactive Planner</span>
                <ArrowRight className="w-4 h-4 text-[#D8A84E]" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Vertical Timeline Sample */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1320]/10 shadow-xl">
            {/* Header info */}
            <div className="flex items-center justify-between pb-6 border-b border-[#0B1320]/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D8A84E]">
                  Sample Itinerary
                </span>
                <h3 className="text-xl font-bold font-editorial text-[#0B1320]">
                  DAY 01 — Arrival & Old City Kyoto
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#0B1320] block tabular-nums">4 Activities</span>
                <span className="text-[11px] text-[#6B7280]">Estimated $219</span>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative mt-6 pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#D8A84E]/40">
              {/* Item 1 */}
              <div className="relative group">
                <div className="absolute -left-6 sm:-left-8 top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#0B1320] border-2 border-[#D8A84E] group-hover:scale-125 transition-transform" />
                <div className="bg-[#F5F3EE] rounded-xl p-4 border border-[#0B1320]/5 hover:border-[#0B1320]/20 transition-all">
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#0B1320] tabular-nums">09:00</span>
                    <span>1 hour · $180</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold font-editorial text-[#0B1320]">
                    Hotel Check-in & Ryokan Welcome
                  </h4>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Leave luggage with concierge, enjoy seasonal matcha welcome and receive regional maps.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative group">
                <div className="absolute -left-6 sm:-left-8 top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#0B1320] border-2 border-[#D8A84E] group-hover:scale-125 transition-transform" />
                <div className="bg-[#F5F3EE] rounded-xl p-4 border border-[#0B1320]/5 hover:border-[#0B1320]/20 transition-all">
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#0B1320] tabular-nums">11:00</span>
                    <span>2 hours · Free</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold font-editorial text-[#0B1320]">
                    Historic Higashiyama Stroll
                  </h4>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Walk the pedestrian stone slopes of Ninenzaka and Sannenzaka past preserved machiya buildings.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative group">
                <div className="absolute -left-6 sm:-left-8 top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#0B1320] border-2 border-[#D8A84E] group-hover:scale-125 transition-transform" />
                <div className="bg-[#F5F3EE] rounded-xl p-4 border border-[#0B1320]/5 hover:border-[#0B1320]/20 transition-all">
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#0B1320] tabular-nums">14:00</span>
                    <span>1.5 hours · $35</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold font-editorial text-[#0B1320]">
                    Local Food Tasting at Nishiki Market
                  </h4>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Sample skewered quail egg octopus, soy milk donuts, and pickled heirloom Kyoto turnip.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="relative group">
                <div className="absolute -left-6 sm:-left-8 top-1 w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-[#0B1320] border-2 border-[#D8A84E] group-hover:scale-125 transition-transform" />
                <div className="bg-[#F5F3EE] rounded-xl p-4 border border-[#0B1320]/5 hover:border-[#0B1320]/20 transition-all">
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span className="font-semibold text-[#0B1320] tabular-nums">18:30</span>
                    <span>1.5 hours · $4</span>
                  </div>
                  <h4 className="mt-1 text-sm font-bold font-editorial text-[#0B1320]">
                    Sunset Viewpoint at Kiyomizu-dera
                  </h4>
                  <p className="mt-1 text-xs text-[#6B7280]">
                    Watch twilight descend over Kyoto from the 13-meter nail-less wooden cantilevered stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE MAP PREVIEW SECTION */}
      <section className="py-20 bg-[#F5F3EE] border-t border-[#0B1320]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-2">
                Cartographic Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight">
                Trace Every Mile of Your Journey
              </h2>
              <p className="mt-2 text-sm text-[#6B7280]">
                Explore high-resolution spatial projections with plotted attractions, walking paths, and estimated commute buffers.
              </p>
            </div>

            <button
              onClick={() => navigateTo('explore')}
              className="px-5 py-2.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold cursor-pointer transition-colors shrink-0"
            >
              Open Full Map Explorer
            </button>
          </div>

          {/* Interactive Map Component */}
          <InteractiveMap centerTitle="Kyoto Valley & Higashiyama Projection" showRoute={true} />
        </div>
      </section>
    </div>
  );
};
