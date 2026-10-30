import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TripActivity } from '../types';
import { AddActivityModal } from '../components/AddActivityModal';
import { InteractiveMap } from '../components/InteractiveMap';
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Share2,
  Map as MapIcon,
  Tag,
  ArrowRight,
  MoveHorizontal,
  Sparkles
} from 'lucide-react';

export const TripPlannerPage: React.FC = () => {
  const {
    trips,
    updateTrip,
    selectedTripId,
    setSelectedTripId,
    activeTrip,
    deleteActivityFromDay,
    reorderActivities,
    moveActivityBetweenDays,
    setShareTripModalOpen,
    setTripToShare,
    setCreateTripModalOpen,
    navigateTo,
    showToast
  } = useApp();

  const currentTrip = activeTrip || trips[0];
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<TripActivity | null>(null);
  const [showDayMap, setShowDayMap] = useState(false);
  const [draggedActivityIdx, setDraggedActivityIdx] = useState<number | null>(null);

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] pt-32 pb-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-[#0B1320]/10 max-w-md text-center">
          <h2 className="text-xl font-bold font-editorial text-[#0B1320]">No Trips Found</h2>
          <p className="text-xs text-[#6B7280] mt-2 mb-6">Create your first personalized travel itinerary.</p>
          <button
            onClick={() => setCreateTripModalOpen(true)}
            className="px-5 py-2.5 bg-[#0B1320] text-white rounded-xl text-xs font-semibold"
          >
            Create New Trip
          </button>
        </div>
      </div>
    );
  }

  // Active day object
  const currentDay =
    currentTrip.days.find(d => d.dayNumber === selectedDayNumber) || currentTrip.days[0];

  // Total places count across all days
  const totalActivitiesCount = currentTrip.days.reduce(
    (acc, day) => acc + day.activities.length,
    0
  );

  // Day calculations
  const dayTotalCost = currentDay?.activities.reduce((acc, curr) => acc + curr.cost, 0) || 0;
  const dayTotalDurationMins =
    currentDay?.activities.reduce((acc, curr) => acc + curr.durationMinutes, 0) || 0;
  const dayHours = Math.floor(dayTotalDurationMins / 60);
  const dayMins = dayTotalDurationMins % 60;

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedActivityIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedActivityIdx === null || draggedActivityIdx === targetIndex) return;
    reorderActivities(currentTrip.id, selectedDayNumber, draggedActivityIdx, targetIndex);
    setDraggedActivityIdx(null);
    showToast('Activity order updated', 'info');
  };

  // Accessible move handlers
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    reorderActivities(currentTrip.id, selectedDayNumber, index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (!currentDay || index === currentDay.activities.length - 1) return;
    reorderActivities(currentTrip.id, selectedDayNumber, index, index + 1);
  };

  // Convert day's activities to map markers
  const dayMapMarkers = (currentDay?.activities || []).map((act, idx) => ({
    id: act.id,
    name: act.title,
    category: act.category,
    x: 25 + (idx * 18) % 60,
    y: 30 + (idx * 16) % 50,
    duration: Math.round(act.durationMinutes / 60),
    price: act.cost,
    address: act.location
  }));

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-24 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. TOP HEADER & TRIP SUMMARY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1320]/10 shadow-xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                {/* Trip selector */}
                <select
                  value={selectedTripId}
                  onChange={e => {
                    setSelectedTripId(e.target.value);
                    setSelectedDayNumber(1);
                  }}
                  className="text-xs font-semibold text-[#0B1320] bg-[#F5F3EE] border border-[#0B1320]/15 rounded-lg px-2.5 py-1 focus:outline-hidden"
                >
                  {trips.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setCreateTripModalOpen(true)}
                  className="text-xs text-[#D8A84E] hover:underline font-semibold cursor-pointer"
                >
                  + New Trip
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-[#0B1320] tracking-tight">
                {currentTrip.title}
              </h1>

              {/* Unboxed Trip Summary: 7 Days · 6 Nights · 8 Places · Estimated Budget: $1,420 */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7280]">
                <span className="font-semibold text-[#0B1320]">{currentTrip.durationDays} Days</span>
                <span aria-hidden="true">·</span>
                <span>{Math.max(1, currentTrip.durationDays - 1)} Nights</span>
                <span aria-hidden="true">·</span>
                <span>{totalActivitiesCount} Places</span>
                <span aria-hidden="true">·</span>
                <span>
                  Budget:{' '}
                  <strong className="text-[#0B1320] tabular-nums">${currentTrip.totalBudget}</strong>{' '}
                  (Spent: ${currentTrip.spentBudget})
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#D8A84E] font-medium">{currentTrip.destinationName}, {currentTrip.country}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => navigateTo('budget-planner', { tripId: currentTrip.id })}
                className="px-4 py-2 border border-[#0B1320]/20 hover:bg-[#0B1320]/5 text-[#0B1320] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Budget Dashboard
              </button>

              <button
                onClick={() => {
                  setTripToShare(currentTrip);
                  setShareTripModalOpen(true);
                }}
                className="px-4 py-2 bg-[#0B1320] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D8A84E]" />
                <span>Share Trip</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. DAY-BY-DAY TABS BAR */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2">
            {currentTrip.days.map(day => {
              const isSelected = day.dayNumber === selectedDayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayNumber(day.dayNumber)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex flex-col items-start ${
                    isSelected
                      ? 'bg-[#0B1320] text-white shadow-md'
                      : 'bg-white text-[#6B7280] hover:text-[#0B1320] border border-[#0B1320]/10 hover:border-[#0B1320]/20'
                  }`}
                >
                  <span className={isSelected ? 'text-[#D8A84E]' : 'text-[#6B7280]'}>
                    DAY {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
                  </span>
                  <span className="text-[11px] font-normal truncate max-w-[120px]">
                    {day.title.replace(/^Day \d+ — /, '')}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowDayMap(!showDayMap)}
            className={`hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shrink-0 ml-4 ${
              showDayMap
                ? 'bg-[#D8A84E] text-[#0B1320] border-[#D8A84E]'
                : 'bg-white text-[#0B1320] border-[#0B1320]/15 hover:bg-slate-50'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{showDayMap ? 'Hide Day Route' : 'Show Day Route'}</span>
          </button>
        </div>

        {/* 3. OPTIONAL DAY ROUTE MAP */}
        {showDayMap && (
          <div className="mb-8 animate-fadeIn">
            <InteractiveMap
              markers={dayMapMarkers}
              centerTitle={`${currentTrip.destinationName} — Day ${selectedDayNumber} Route`}
              showRoute={true}
              className="h-[380px]"
            />
          </div>
        )}

        {/* 4. DAY CONTENT CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Activity Timeline Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Day Header Bar */}
            <div className="bg-white rounded-2xl p-5 border border-[#0B1320]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D8A84E]">
                  Day {selectedDayNumber} Schedule
                </span>
                <h2 className="text-xl font-bold font-editorial text-[#0B1320]">
                  {currentDay?.title || `Day ${selectedDayNumber}`}
                </h2>
                <div className="mt-1 flex items-center gap-2 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span className="tabular-nums">
                      {dayHours > 0 ? `${dayHours}h ` : ''}
                      {dayMins}m scheduled
                    </span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    <span className="tabular-nums font-semibold text-[#0B1320]">
                      ${dayTotalCost} est. cost
                    </span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingActivity(null);
                  setIsAddActivityOpen(true);
                }}
                className="px-4 py-2.5 bg-[#0B1320] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 text-[#D8A84E]" />
                <span>Add Activity</span>
              </button>
            </div>

            {/* Activities List */}
            {currentDay?.activities && currentDay.activities.length > 0 ? (
              <div className="space-y-3">
                {currentDay.activities.map((activity, index) => {
                  return (
                    <div
                      key={activity.id}
                      draggable
                      onDragStart={e => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={e => handleDrop(e, index)}
                      className={`group bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        draggedActivityIdx === index
                          ? 'opacity-40 border-dashed border-[#D8A84E]'
                          : 'border-[#0B1320]/10 hover:border-[#0B1320]/25 shadow-xs hover:shadow-md'
                      }`}
                    >
                      {/* Left: Drag grip & details */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        {/* Drag Handle */}
                        <div
                          className="p-1 text-[#6B7280] group-hover:text-[#0B1320] cursor-grab active:cursor-grabbing shrink-0 mt-1 hidden sm:block"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Time & sequence number */}
                        <div className="text-center shrink-0 w-14">
                          <span className="block text-sm font-bold font-mono text-[#0B1320] tabular-nums">
                            {activity.time}
                          </span>
                          <span className="text-[10px] text-[#6B7280]">
                            {activity.durationMinutes} min
                          </span>
                        </div>

                        {/* Activity details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-[#D8A84E]">
                              {activity.category}
                            </span>
                            {activity.cost > 0 && (
                              <>
                                <span className="text-[#6B7280]" aria-hidden="true">·</span>
                                <span className="text-xs font-semibold text-[#0B1320] tabular-nums">
                                  ${activity.cost}
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-base font-bold font-editorial text-[#0B1320] leading-snug">
                            {activity.title}
                          </h3>

                          {activity.location && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-[#6B7280] truncate">
                              <MapPin className="w-3 h-3 text-[#D8A84E] shrink-0" />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          )}

                          {activity.notes && (
                            <p className="mt-1.5 text-xs text-[#6B7280] italic bg-[#F5F3EE] p-2 rounded-lg leading-relaxed">
                              "{activity.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Controls (Accessible reordering + Actions) */}
                      <div className="flex items-center justify-end gap-1.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#0B1320]/10 shrink-0">
                        {/* Accessible Move Up / Down Buttons */}
                        <div className="flex items-center border border-[#0B1320]/15 rounded-lg bg-[#F5F3EE] p-0.5 mr-1">
                          <button
                            type="button"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            aria-label="Move activity earlier"
                            className="p-1 text-[#6B7280] hover:text-[#0B1320] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === currentDay.activities.length - 1}
                            aria-label="Move activity later"
                            className="p-1 text-[#6B7280] hover:text-[#0B1320] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Move to another day dropdown */}
                        <select
                          onChange={e => {
                            const targetDay = Number(e.target.value);
                            if (targetDay !== selectedDayNumber) {
                              moveActivityBetweenDays(
                                currentTrip.id,
                                selectedDayNumber,
                                targetDay,
                                activity.id
                              );
                            }
                          }}
                          value={selectedDayNumber}
                          aria-label="Move activity to day"
                          className="text-[11px] bg-[#F5F3EE] border border-[#0B1320]/15 rounded-lg px-2 py-1 text-[#0B1320] focus:outline-hidden cursor-pointer"
                        >
                          {currentTrip.days.map(d => (
                            <option key={d.dayNumber} value={d.dayNumber}>
                              Day {d.dayNumber}
                            </option>
                          ))}
                        </select>

                        {/* Delete Activity */}
                        <button
                          type="button"
                          onClick={() =>
                            deleteActivityFromDay(currentTrip.id, selectedDayNumber, activity.id)
                          }
                          aria-label="Remove activity"
                          className="p-1.5 text-[#6B7280] hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#0B1320]/10">
                <Calendar className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
                <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                  No activities planned for Day {selectedDayNumber}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 mb-5">
                  Begin sculpting your day by adding visits to temples, viewpoints, or dining reservations.
                </p>
                <button
                  onClick={() => setIsAddActivityOpen(true)}
                  className="px-4 py-2 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Add First Activity
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Day Intelligence & Quick Recommendations */}
          <div className="lg:col-span-4 space-y-6">
            {/* Day Logistics Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#0B1320]/10 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D8A84E] block mb-2">
                Pacing & Logistics
              </span>
              <h3 className="text-base font-bold font-editorial text-[#0B1320]">
                Transit & Commute Estimates
              </h3>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                Based on your planned {currentDay?.activities.length || 0} stops, expect approximately 45 minutes of aggregate inter-site transit.
              </p>

              <div className="mt-4 pt-4 border-t border-[#0B1320]/5 space-y-2 text-xs">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Total Scheduled Time</span>
                  <span className="font-semibold text-[#0B1320]">
                    {dayHours}h {dayMins}m
                  </span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Estimated Day Budget</span>
                  <span className="font-semibold text-[#0B1320] tabular-nums">${dayTotalCost}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Remaining Trip Budget</span>
                  <span className="font-semibold text-emerald-700 tabular-nums">
                    ${Math.max(0, currentTrip.totalBudget - currentTrip.spentBudget)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Inspiration Drawer */}
            <div className="bg-[#0B1320] text-white rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-[#D8A84E] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Need Ideas for Day {selectedDayNumber}?</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Explore popular attractions and curated masterclasses for {currentTrip.destinationName}.
              </p>
              <button
                onClick={() =>
                  navigateTo('destination-detail', { destinationId: currentTrip.destinationId })
                }
                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2"
              >
                <span>Browse {currentTrip.destinationName} Guide</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D8A84E]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Activity Modal */}
      <AddActivityModal
        isOpen={isAddActivityOpen}
        onClose={() => {
          setIsAddActivityOpen(false);
          setEditingActivity(null);
        }}
        dayNumber={selectedDayNumber}
        existingActivity={editingActivity}
        onSave={editingActivity ? (activity) => updateTrip({
          ...currentTrip,
          days: currentTrip.days.map(day => day.dayNumber === selectedDayNumber ? {
            ...day, activities: day.activities.map(item => item.id === editingActivity.id ? { ...activity, id: item.id } : item)
          } : day)
        }) : undefined}
      />
    </div>
  );
};
