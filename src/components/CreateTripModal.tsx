import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, DollarSign, MapPin, Sparkles } from 'lucide-react';

export const CreateTripModal: React.FC = () => {
  const {
    isCreateTripModalOpen,
    setCreateTripModalOpen,
    destinations,
    addTrip,
    navigateTo
  } = useApp();

  const [selectedDestId, setSelectedDestId] = useState(destinations[0]?.id || 'kyoto');
  const [tripTitle, setTripTitle] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toLocaleDateString('en-CA'));
  const [durationDays, setDurationDays] = useState(7);
  const [totalBudget, setTotalBudget] = useState(1400);

  if (!isCreateTripModalOpen) return null;

  const currentDest = destinations.find(d => d.id === selectedDestId) || destinations[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = tripTitle.trim() || `${currentDest.name} — Unforgettable Journey`;
    
    // Calculate end date
    const start = new Date(startDate);
    const end = new Date(start.getTime() + (durationDays - 1) * 86400000);
    const endDateStr = end.toISOString().split('T')[0];

    const newTrip = addTrip({
      title,
      destinationId: currentDest.id,
      destinationName: currentDest.name,
      country: currentDest.country,
      coverImage: currentDest.heroImage,
      startDate,
      endDate: endDateStr,
      durationDays,
      totalBudget,
      notes: `Curated itinerary for ${currentDest.name}, ${currentDest.country}.`
    });

    setCreateTripModalOpen(false);
    navigateTo('trip-planner', { tripId: newTrip.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#0B1320]/15 shadow-2xl animate-scaleUp">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#0B1320]/10 flex items-center justify-between bg-[#F5F3EE]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D8A84E]" />
            <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
              Create New Journey
            </h3>
          </div>
          <button
            onClick={() => setCreateTripModalOpen(false)}
            aria-label="Close"
            className="p-1 text-[#6B7280] hover:text-[#0B1320] rounded-lg hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Destination Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Select Primary Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
              <select
                value={selectedDestId}
                onChange={e => {
                  setSelectedDestId(e.target.value);
                  const d = destinations.find(dest => dest.id === e.target.value);
                  if (d && !tripTitle) {
                    setTripTitle(`${d.name} Exploration`);
                  }
                }}
                className="w-full text-xs pl-9 pr-4 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              >
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}, {dest.country} ({dest.avgTripDays})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Trip Title */}
          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Trip Title
            </label>
            <input
              type="text"
              value={tripTitle}
              onChange={e => setTripTitle(e.target.value)}
              placeholder={`e.g. ${currentDest.name} — Temples, Traditions & Sights`}
              className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
            />
          </div>

          {/* Grid: Start Date & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Departure Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Duration (Days)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={durationDays}
                onChange={e => setDurationDays(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                required
              />
            </div>
          </div>

          {/* Budget Limit */}
          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Target Budget (USD)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
              <input
                type="number"
                min={100}
                step={50}
                value={totalBudget}
                onChange={e => setTotalBudget(Number(e.target.value))}
                className="w-full text-xs pl-9 pr-4 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                required
              />
            </div>
            <p className="mt-1 text-[11px] text-[#6B7280]">
              Recommended for {currentDest.name}: ${currentDest.budgetRange.min} – ${currentDest.budgetRange.max}
            </p>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#0B1320]/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreateTripModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-[#6B7280] hover:text-[#0B1320] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Build Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
