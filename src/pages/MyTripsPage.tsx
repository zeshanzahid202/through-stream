import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trip } from '../types';
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Share2,
  Trash2,
  Edit3,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const MyTripsPage: React.FC = () => {
  const {
    trips,
    deleteTrip,
    navigateTo,
    setSelectedTripId,
    setCreateTripModalOpen,
    setShareTripModalOpen,
    setTripToShare
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'draft'>('all');

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'all') return true;
    return trip.status === activeTab;
  });

  const handleViewTrip = (trip: Trip) => {
    setSelectedTripId(trip.id);
    navigateTo('trip-planner', { tripId: trip.id });
  };

  const handleEditBudget = (trip: Trip) => {
    setSelectedTripId(trip.id);
    navigateTo('budget-planner', { tripId: trip.id });
  };

  const handleShare = (trip: Trip) => {
    setTripToShare(trip);
    setShareTripModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-24 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D8A84E] block mb-1">
              Travel Portfolio
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight">
              My Trips & Expeditions
            </h1>
            <p className="mt-1 text-xs text-[#6B7280]">
              Manage upcoming itineraries, archived journeys, and draft roadmaps.
            </p>
          </div>

          <button
            onClick={() => setCreateTripModalOpen(true)}
            className="px-5 py-2.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#D8A84E]" />
            <span>Create New Trip</span>
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#0B1320]/10 pb-4 overflow-x-auto">
          {[
            { id: 'all', label: 'All Trips', count: trips.length },
            { id: 'upcoming', label: 'Upcoming', count: trips.filter(t => t.status === 'upcoming').length },
            { id: 'past', label: 'Past Journeys', count: trips.filter(t => t.status === 'past').length },
            { id: 'draft', label: 'Drafts', count: trips.filter(t => t.status === 'draft').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-[#0B1320] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-white/60'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-75 tabular-nums">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Trip Cards Grid */}
        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTrips.map(trip => {
              const totalActivities = trip.days.reduce(
                (acc, d) => acc + d.activities.length,
                0
              );
              const progressPct = Math.min(
                100,
                Math.round((trip.spentBudget / (trip.totalBudget || 1)) * 100)
              );

              return (
                <div
                  key={trip.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#0B1320]/10 hover:border-[#0B1320]/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative aspect-16/10 overflow-hidden bg-[#0B1320]/10">
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20" />

                    {/* Status Pill & Code */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white">
                        {trip.status}
                      </span>
                    </div>

                    <div className="absolute top-3.5 right-3.5">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/90 text-[#0B1320]">
                        {trip.shareableCode}
                      </span>
                    </div>

                    {/* Bottom overlay: Destination & dates */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-xs text-white/90">
                        <MapPin className="w-3.5 h-3.5 text-[#D8A84E]" />
                        <span>{trip.destinationName}, {trip.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold font-editorial text-[#0B1320] group-hover:text-[#D8A84E] transition-colors leading-snug line-clamp-1">
                        {trip.title}
                      </h3>

                      {/* Unboxed Metadata */}
                      <div className="mt-2 flex items-center gap-2 text-xs text-[#6B7280]">
                        <span>{trip.durationDays} Days</span>
                        <span aria-hidden="true">·</span>
                        <span>{totalActivities} Scheduled Places</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums font-semibold text-[#0B1320]">
                          ${trip.totalBudget} Budget
                        </span>
                      </div>

                      {/* Budget Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-[11px] text-[#6B7280] mb-1">
                          <span>Budget Expended</span>
                          <span className="tabular-nums font-medium text-[#0B1320]">
                            ${trip.spentBudget} / ${trip.totalBudget} ({progressPct}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#F5F3EE] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              progressPct > 85 ? 'bg-amber-500' : 'bg-[#0B1320]'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-6 pt-4 border-t border-[#0B1320]/10 flex items-center justify-between">
                      <button
                        onClick={() => handleViewTrip(trip)}
                        className="px-3.5 py-1.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Trip</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D8A84E]" />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditBudget(trip)}
                          title="Budget & Expenses"
                          aria-label="Budget & Expenses"
                          className="p-1.5 text-[#6B7280] hover:text-[#0B1320] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <DollarSign className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(trip)}
                          title="Share Trip"
                          aria-label="Share Trip"
                          className="p-1.5 text-[#6B7280] hover:text-[#0B1320] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTrip(trip.id)}
                          title="Delete Trip"
                          aria-label="Delete Trip"
                          className="p-1.5 text-[#6B7280] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#0B1320]/10 max-w-lg mx-auto">
            <Sparkles className="w-12 h-12 text-[#D8A84E] mx-auto mb-4" />
            <h3 className="font-editorial text-xl font-bold text-[#0B1320]">
              No trips in this category
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-6">
              Create a custom day-by-day itinerary or explore recommended routes.
            </p>
            <button
              onClick={() => setCreateTripModalOpen(true)}
              className="px-6 py-2.5 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Start New Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
