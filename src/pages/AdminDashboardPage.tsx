import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_ADMIN_USERS } from '../data/mockData';
import { Destination } from '../types';
import {
  LayoutDashboard,
  MapPin,
  Compass,
  Users,
  Calendar,
  Layers,
  BarChart3,
  Settings,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Search,
  CheckCircle2,
  Trash2,
  Eye,
  ShieldAlert
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { destinations, trips, addDestination, navigateTo, showToast } = useApp();

  const [activeSidebarTab, setActiveSidebarTab] = useState<
    'dashboard' | 'destinations' | 'users' | 'trips' | 'analytics'
  >('dashboard');

  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [isAddDestModalOpen, setIsAddDestModalOpen] = useState(false);

  // New destination form state
  const [newDestName, setNewDestName] = useState('');
  const [newDestCountry, setNewDestCountry] = useState('');
  const [newDestRegion, setNewDestRegion] = useState('East Asia');
  const [newDestDesc, setNewDestDesc] = useState('');
  const [newDestMinBudget, setNewDestMinBudget] = useState(900);
  const [newDestMaxBudget, setNewDestMaxBudget] = useState(1600);

  const handleCreateDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestName || !newDestCountry) {
      showToast('Name and Country are required', 'error');
      return;
    }

    const newDest: Destination = {
      id: newDestName.toLowerCase().replace(/\s+/g, '-'),
      name: newDestName,
      country: newDestCountry,
      region: newDestRegion,
      rating: 4.9,
      reviewsCount: 120,
      heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
      description: newDestDesc || `Explore the captivating culture and sights of ${newDestName}.`,
      bestTime: 'May – October',
      avgTripDays: '5–7 days',
      budgetRange: { min: newDestMinBudget, max: newDestMaxBudget },
      attractionsCount: 12,
      experiencesCount: 8,
      categories: ['Culture', 'Adventure', 'Nature'],
      coordinates: { lat: 35.0, lng: 135.0 },
      highlights: ['Historic District', 'Panoramic Viewpoint', 'Local Market'],
      travelTips: ['Book central accommodations early.'],
      localFoods: [{ name: 'Regional Specialty', description: 'Fresh seasonal meal', price: '$15 - $25' }]
    };

    addDestination(newDest);
    setIsAddDestModalOpen(false);
    setNewDestName('');
    setNewDestCountry('');
    setNewDestDesc('');
  };

  const filteredUsers = SAMPLE_ADMIN_USERS.filter(
    u =>
      u.name.toLowerCase().includes(searchUserQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUserQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-20 text-[#111827]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1. ADMIN SIDEBAR */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-[#0B1320]/10 shadow-xs space-y-6">
            <div className="px-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8A84E]">
                Management Console
              </span>
              <h2 className="text-xl font-bold font-editorial text-[#0B1320]">
                Admin Operations
              </h2>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'destinations', label: 'Destinations', icon: MapPin },
                { id: 'trips', label: 'Trips & Itineraries', icon: Calendar },
                { id: 'users', label: 'Traveler Community', icon: Users },
                { id: 'analytics', label: 'Analytics & Traffic', icon: BarChart3 }
              ].map(item => {
                const Icon = item.icon;
                const isSelected = activeSidebarTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSidebarTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#0B1320] text-white shadow-xs'
                        : 'text-[#6B7280] hover:text-[#0B1320] hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#D8A84E]' : 'text-current'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#0B1320]/10 px-2 space-y-2">
              <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold block">
                System Health
              </span>
              <div className="flex items-center gap-2 text-xs text-emerald-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>API Gateway Online (0.9s)</span>
              </div>
            </div>
          </div>

          {/* 2. ADMIN MAIN CONTENT */}
          <div className="lg:col-span-9 space-y-8">
            {/* Top Bar for View */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-[#0B1320]">
                  {activeSidebarTab === 'dashboard' && 'Executive Overview'}
                  {activeSidebarTab === 'destinations' && 'Destination Management'}
                  {activeSidebarTab === 'trips' && 'Trip Itineraries Catalog'}
                  {activeSidebarTab === 'users' && 'Traveler Accounts'}
                  {activeSidebarTab === 'analytics' && 'Growth Analytics'}
                </h1>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Real-time synchronization across TravelVerse databases.
                </p>
              </div>

              {activeSidebarTab === 'destinations' && (
                <button
                  onClick={() => setIsAddDestModalOpen(true)}
                  className="px-4 py-2 bg-[#0B1320] text-white hover:bg-[#1E293B] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D8A84E]" />
                  <span>Add Destination</span>
                </button>
              )}
            </div>

            {/* DASHBOARD VIEW */}
            {activeSidebarTab === 'dashboard' && (
              <div className="space-y-8">
                {/* 5 High-Level KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-white rounded-2xl p-4 border border-[#0B1320]/10 shadow-xs">
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold block">
                      Total Users
                    </span>
                    <span className="text-2xl font-bold font-editorial text-[#0B1320] tabular-nums mt-1 block">
                      14,820
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">+12% this mo.</span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#0B1320]/10 shadow-xs">
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold block">
                      Total Trips
                    </span>
                    <span className="text-2xl font-bold font-editorial text-[#0B1320] tabular-nums mt-1 block">
                      32,450
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">+24% this mo.</span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#0B1320]/10 shadow-xs">
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold block">
                      Destinations
                    </span>
                    <span className="text-2xl font-bold font-editorial text-[#D8A84E] tabular-nums mt-1 block">
                      {destinations.length}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">Active catalog</span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#0B1320]/10 shadow-xs">
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold block">
                      Saved Places
                    </span>
                    <span className="text-2xl font-bold font-editorial text-[#0B1320] tabular-nums mt-1 block">
                      84,100
                    </span>
                    <span className="text-[11px] text-[#6B7280]">Bookmarks</span>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#0B1320]/10 shadow-xs col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#6B7280] uppercase tracking-wider font-bold block">
                      Monthly Trips
                    </span>
                    <span className="text-2xl font-bold font-editorial text-emerald-700 tabular-nums mt-1 block">
                      +18.4%
                    </span>
                    <span className="text-[11px] text-[#6B7280]">Trajectory</span>
                  </div>
                </div>

                {/* Analytics Chart Preview */}
                <div className="bg-white rounded-3xl p-6 border border-[#0B1320]/10 shadow-xs">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                        Monthly Itinerary Creation Velocity
                      </h3>
                      <p className="text-xs text-[#6B7280]">
                        Number of day-by-day itineraries compiled over the past 6 months
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#D8A84E]">2026 Volume</span>
                  </div>

                  {/* SVG Bar / Curve Chart */}
                  <div className="h-52 w-full pt-4">
                    <div className="h-full flex items-end justify-between gap-3 sm:gap-6 border-b border-[#0B1320]/10 pb-2">
                      {[
                        { month: 'May', count: 2400, height: '40%' },
                        { month: 'Jun', count: 3800, height: '60%' },
                        { month: 'Jul', count: 5200, height: '82%' },
                        { month: 'Aug', count: 6400, height: '95%' },
                        { month: 'Sep', count: 5900, height: '88%' },
                        { month: 'Oct', count: 7100, height: '100%' }
                      ].map(bar => (
                        <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          <span className="text-[10px] text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                            {bar.count}
                          </span>
                          <div
                            className="w-full max-w-[42px] bg-[#0B1320] group-hover:bg-[#D8A84E] rounded-t-lg transition-all"
                            style={{ height: bar.height }}
                          />
                          <span className="text-xs font-medium text-[#6B7280]">{bar.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Two Column: Recent Trips & Popular Destinations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Recent Trips */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0B1320]/10 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-editorial text-base font-bold text-[#0B1320]">
                        Recent Itineraries
                      </h3>
                      <span className="text-xs text-[#6B7280]">Live feed</span>
                    </div>

                    <div className="space-y-3">
                      {trips.slice(0, 4).map(trip => (
                        <div
                          key={trip.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#F5F3EE] hover:bg-slate-100 transition-colors"
                        >
                          <div className="min-w-0 pr-2">
                            <h4 className="text-xs font-bold text-[#0B1320] truncate">
                              {trip.title}
                            </h4>
                            <span className="text-[11px] text-[#6B7280]">
                              {trip.destinationName} · {trip.durationDays} Days · ${trip.totalBudget}
                            </span>
                          </div>
                          <button
                            onClick={() => navigateTo('trip-planner', { tripId: trip.id })}
                            aria-label="Inspect trip"
                            className="p-1 text-[#6B7280] hover:text-[#0B1320] cursor-pointer"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Popular Destinations Ranking */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0B1320]/10 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-editorial text-base font-bold text-[#0B1320]">
                        Top Bookmarked Sanctuaries
                      </h3>
                      <span className="text-xs text-[#D8A84E] font-semibold">Rankings</span>
                    </div>

                    <div className="space-y-2.5">
                      {destinations.slice(0, 4).map((dest, idx) => (
                        <div
                          key={dest.id}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 text-center text-xs font-bold font-mono text-[#D8A84E]">
                              0{idx + 1}
                            </span>
                            <div>
                              <span className="text-xs font-bold text-[#0B1320] block">
                                {dest.name}, {dest.country}
                              </span>
                              <span className="text-[11px] text-[#6B7280]">
                                {dest.reviewsCount} verified traveler reviews
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[#0B1320]">
                            ★ {dest.rating.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DESTINATIONS MANAGEMENT VIEW */}
            {activeSidebarTab === 'destinations' && (
              <div className="bg-white rounded-3xl border border-[#0B1320]/10 overflow-hidden shadow-xs">
                <div className="p-6 border-b border-[#0B1320]/10 flex items-center justify-between">
                  <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                    All Registered Destinations ({destinations.length})
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F3EE] text-[#6B7280] uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-6">Destination</th>
                        <th className="py-3 px-6">Region</th>
                        <th className="py-3 px-6">Rating</th>
                        <th className="py-3 px-6">Avg Length</th>
                        <th className="py-3 px-6">Budget Range</th>
                        <th className="py-3 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0B1320]/5">
                      {destinations.map(d => (
                        <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-6 font-bold text-[#0B1320]">
                            {d.name}, {d.country}
                          </td>
                          <td className="py-3.5 px-6 text-[#6B7280]">{d.region}</td>
                          <td className="py-3.5 px-6 text-[#D8A84E] font-semibold tabular-nums">
                            ★ {d.rating.toFixed(2)}
                          </td>
                          <td className="py-3.5 px-6 text-[#6B7280]">{d.avgTripDays}</td>
                          <td className="py-3.5 px-6 text-[#0B1320] tabular-nums font-medium">
                            ${d.budgetRange.min} – ${d.budgetRange.max}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() =>
                                navigateTo('destination-detail', { destinationId: d.id })
                              }
                              className="text-xs text-[#0B1320] hover:text-[#D8A84E] font-semibold cursor-pointer"
                            >
                              View Live
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS COMMUNITY VIEW */}
            {activeSidebarTab === 'users' && (
              <div className="bg-white rounded-3xl border border-[#0B1320]/10 overflow-hidden shadow-xs">
                <div className="p-6 border-b border-[#0B1320]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                    Active Travelers ({filteredUsers.length})
                  </h3>

                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#6B7280]" />
                    <input
                      type="text"
                      placeholder="Search member by name/email..."
                      value={searchUserQuery}
                      onChange={e => setSearchUserQuery(e.target.value)}
                      className="text-xs pl-8 pr-3 py-1.5 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-lg text-[#0B1320] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F3EE] text-[#6B7280] uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-6">User</th>
                        <th className="py-3 px-6">Role</th>
                        <th className="py-3 px-6">Trips</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Member Since</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0B1320]/5">
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-6">
                            <span className="font-bold text-[#0B1320] block">{u.name}</span>
                            <span className="text-[11px] text-[#6B7280]">{u.email}</span>
                          </td>
                          <td className="py-3.5 px-6 font-semibold text-[#0B1320]">{u.role}</td>
                          <td className="py-3.5 px-6 tabular-nums">{u.trips}</td>
                          <td className="py-3.5 px-6">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                u.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-[#6B7280]">{u.joined}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TRIPS VIEW */}
            {activeSidebarTab === 'trips' && (
              <div className="bg-white rounded-3xl border border-[#0B1320]/10 overflow-hidden shadow-xs">
                <div className="p-6 border-b border-[#0B1320]/10">
                  <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
                    All Managed Itineraries ({trips.length})
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F3EE] text-[#6B7280] uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-6">Title</th>
                        <th className="py-3 px-6">Destination</th>
                        <th className="py-3 px-6">Duration</th>
                        <th className="py-3 px-6">Budget</th>
                        <th className="py-3 px-6">Code</th>
                        <th className="py-3 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0B1320]/5">
                      {trips.map(trip => (
                        <tr key={trip.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-6 font-bold text-[#0B1320]">{trip.title}</td>
                          <td className="py-3.5 px-6 text-[#6B7280]">{trip.destinationName}</td>
                          <td className="py-3.5 px-6 tabular-nums">{trip.durationDays} Days</td>
                          <td className="py-3.5 px-6 text-[#0B1320] tabular-nums font-semibold">
                            ${trip.totalBudget} (Spent: ${trip.spentBudget})
                          </td>
                          <td className="py-3.5 px-6 font-mono text-[11px] text-[#D8A84E]">
                            {trip.shareableCode}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => navigateTo('trip-planner', { tripId: trip.id })}
                              className="text-xs text-[#0B1320] hover:text-[#D8A84E] font-semibold cursor-pointer"
                            >
                              Edit Planner
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ANALYTICS VIEW */}
            {activeSidebarTab === 'analytics' && (
              <div className="bg-white rounded-3xl p-8 border border-[#0B1320]/10 shadow-xs space-y-6">
                <h3 className="font-editorial text-xl font-bold text-[#0B1320]">
                  Engagement & Retention Telemetry
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-[#F5F3EE] p-5 rounded-2xl">
                    <span className="text-xs text-[#6B7280] block">Average Dwell per Itinerary</span>
                    <span className="text-3xl font-bold font-editorial text-[#0B1320] tabular-nums mt-1 block">
                      18m 42s
                    </span>
                    <span className="text-xs text-emerald-700 mt-1 block">+3.4m vs last month</span>
                  </div>
                  <div className="bg-[#F5F3EE] p-5 rounded-2xl">
                    <span className="text-xs text-[#6B7280] block">Itinerary Sharing Rate</span>
                    <span className="text-3xl font-bold font-editorial text-[#D8A84E] tabular-nums mt-1 block">
                      44.8%
                    </span>
                    <span className="text-xs text-[#6B7280] mt-1 block">Exported or linked</span>
                  </div>
                  <div className="bg-[#F5F3EE] p-5 rounded-2xl">
                    <span className="text-xs text-[#6B7280] block">Budget Accuracy Variance</span>
                    <span className="text-3xl font-bold font-editorial text-[#0B1320] tabular-nums mt-1 block">
                      ± 6.2%
                    </span>
                    <span className="text-xs text-[#6B7280] mt-1 block">Predicted vs logged</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add New Destination Modal */}
      {isAddDestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-[#0B1320]/15 shadow-2xl p-6 space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#0B1320]">
              Register New Destination
            </h3>

            <form onSubmit={handleCreateDestination} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                  Destination Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Seville"
                  value={newDestName}
                  onChange={e => setNewDestName(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spain"
                  value={newDestCountry}
                  onChange={e => setNewDestCountry(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                    Min Budget ($)
                  </label>
                  <input
                    type="number"
                    value={newDestMinBudget}
                    onChange={e => setNewDestMinBudget(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                    Max Budget ($)
                  </label>
                  <input
                    type="number"
                    value={newDestMaxBudget}
                    onChange={e => setNewDestMaxBudget(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1320] mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Atmospheric summary..."
                  value={newDestDesc}
                  onChange={e => setNewDestDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#F5F3EE] border border-[#0B1320]/15 rounded-xl text-[#0B1320]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#0B1320]/10">
                <button
                  type="button"
                  onClick={() => setIsAddDestModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#6B7280]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1320] text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Publish Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
