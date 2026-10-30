import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TripActivity, ExpenseCategory } from '../types';
import { X, Clock, MapPin, DollarSign, Tag, FileText } from 'lucide-react';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  existingActivity?: TripActivity | null;
  onSave?: (activity: Omit<TripActivity, 'id'>) => void;
}

const CATEGORIES: ExpenseCategory[] = [
  'Accommodation',
  'Transport',
  'Food',
  'Activities',
  'Shopping',
  'Other'
];

export const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  dayNumber,
  existingActivity,
  onSave
}) => {
  const { activeTrip, addActivityToDay, showToast } = useApp();

  const [title, setTitle] = useState(existingActivity?.title || '');
  const [time, setTime] = useState(existingActivity?.time || '10:00');
  const [location, setLocation] = useState(existingActivity?.location || '');
  const [durationMinutes, setDurationMinutes] = useState(existingActivity?.durationMinutes || 90);
  const [cost, setCost] = useState(existingActivity?.cost || 0);
  const [category, setCategory] = useState<ExpenseCategory>(existingActivity?.category || 'Activities');
  const [notes, setNotes] = useState(existingActivity?.notes || '');

  useEffect(() => {
    if (!isOpen) return;
    setTitle(existingActivity?.title || ''); setTime(existingActivity?.time || '10:00');
    setLocation(existingActivity?.location || ''); setDurationMinutes(existingActivity?.durationMinutes ?? 90);
    setCost(existingActivity?.cost ?? 0); setCategory(existingActivity?.category || 'Activities');
    setNotes(existingActivity?.notes || '');
  }, [isOpen, existingActivity]);
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide an activity title', 'error');
      return;
    }

    const payload = {
      title: title.trim(),
      time,
      location: location.trim() || 'Central City',
      durationMinutes,
      cost,
      category,
      notes: notes.trim()
    };

    if (onSave) {
      onSave(payload);
    } else if (activeTrip) {
      addActivityToDay(activeTrip.id, dayNumber, payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-[#0B1320]/15 shadow-2xl animate-scaleUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#0B1320]/10 flex items-center justify-between bg-[#F5F3EE]">
          <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
            {existingActivity ? 'Edit Activity' : `Add Activity — Day ${dayNumber}`}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-[#6B7280] hover:text-[#0B1320] rounded-lg hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Activity Name
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Zen Meditation at Daitoku-ji"
              className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Start Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Duration (minutes)
              </label>
              <input
                type="number"
                min={15}
                step={15}
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Location / Venue
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Higashiyama District, Kyoto"
                className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Estimated Cost ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-[#6B7280]" />
                <input
                  type="number"
                  min={0}
                  step={5}
                  value={cost}
                  onChange={e => setCost(Number(e.target.value))}
                  className="w-full text-xs pl-9 pr-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ExpenseCategory)}
                className="w-full text-xs px-3 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0B1320] mb-1.5">
              Practical Notes / Booking Tips
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Tickets purchased on voucher, meet guide at North gate"
              className="w-full text-xs px-3.5 py-2 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320] focus:outline-hidden focus:border-[#0B1320]"
            />
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-[#0B1320]/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#6B7280] hover:text-[#0B1320] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
