import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  MapPin,
  Compass,
  CheckCircle2,
  Calendar,
  Heart,
  Globe,
  Camera,
  Plane,
  Save,
  Sparkles
} from 'lucide-react';

const TRAVEL_STYLES = [
  'Adventure',
  'Culture',
  'Food',
  'Nature',
  'Luxury',
  'Slow Travel',
  'Architecture',
  'Photography'
];

export const ProfilePage: React.FC = () => {
  const { user, setUser, trips, favorites, showToast } = useApp();

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [homeAirport, setHomeAirport] = useState(user.homeAirport);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(user.travelStyles);
  const [isEditing, setIsEditing] = useState(false);

  const toggleStyle = (style: string) => {
    const next = selectedStyles.includes(style) ? selectedStyles.filter(s => s !== style) : [...selectedStyles, style];
    setSelectedStyles(next);
    setUser(prev => ({ ...prev, travelStyles: next }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      bio,
      homeAirport,
      travelStyles: selectedStyles
    }));
    setIsEditing(false);
    showToast('Traveler profile updated', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-24 text-[#111827]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1320]/10 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#D8A84E] shadow-md shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Traveler info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B1320]">
                    {user.name}
                  </h1>
                  <p className="text-xs text-[#6B7280]">{user.email}</p>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-[#0B1320]/20 hover:bg-[#0B1320]/5 text-[#0B1320] text-xs font-semibold rounded-xl cursor-pointer transition-colors self-center sm:self-auto"
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </button>
              </div>

              <p className="text-xs text-[#6B7280] max-w-xl leading-relaxed">
                {user.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-[#D8A84E]" />
                  <span>Home: {user.homeAirport}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#0B1320] font-semibold">{user.role} Status</span>
              </div>
            </div>
          </div>

          {/* Large Travel Stats */}
          <div className="mt-8 pt-6 border-t border-[#0B1320]/10 grid grid-cols-3 gap-4 text-center">
            <div className="bg-[#F5F3EE] p-4 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-[#0B1320] tabular-nums">
                {user.tripsCompleted}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
                Trips Completed
              </span>
            </div>

            <div className="bg-[#F5F3EE] p-4 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-[#D8A84E] tabular-nums">
                {user.countriesVisited}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
                Countries Visited
              </span>
            </div>

            <div className="bg-[#F5F3EE] p-4 rounded-2xl">
              <span className="block text-2xl sm:text-3xl font-bold font-editorial text-[#0B1320] tabular-nums">
                {favorites.destinations.length + favorites.attractions.length}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
                Saved Places
              </span>
            </div>
          </div>
        </div>

        {/* Edit Form if open */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1320]/10 shadow-xs space-y-4 animate-fadeIn"
          >
            <h3 className="text-lg font-bold font-editorial text-[#0B1320]">
              Edit Profile Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                  Home Airport / Base
                </label>
                <input
                  type="text"
                  value={homeAirport}
                  onChange={e => setHomeAirport(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                Travel Bio & Philosophy
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Section: Travel Styles & Preferences */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1320]/10 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold font-editorial text-[#0B1320]">
              Travel Styles & Passions
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Select what motivates your itineraries to tailor AI-free recommendations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {TRAVEL_STYLES.map(style => {
              const isSelected = selectedStyles.includes(style);
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => toggleStyle(style)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#0B1320] text-white shadow-xs'
                      : 'bg-[#F5F3EE] text-[#6B7280] hover:text-[#0B1320]'
                  }`}
                >
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#D8A84E]" />}
                  <span>{style}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Favorite Destinations Pinboard */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0B1320]/10 shadow-xs space-y-4">
          <div>
            <h3 className="text-xl font-bold font-editorial text-[#0B1320]">
              Favorite Sanctuaries & Regions
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Pinned destinations from past expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {user.favoriteDestinations.map((fav, idx) => (
              <div
                key={idx}
                className="bg-[#F5F3EE] p-3.5 rounded-xl border border-[#0B1320]/5 flex items-center gap-2.5"
              >
                <MapPin className="w-4 h-4 text-[#D8A84E] shrink-0" />
                <span className="text-xs font-semibold text-[#0B1320]">{fav}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
