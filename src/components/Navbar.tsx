import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Heart, User, Compass, Calendar, Plus, Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    favorites,
    setCreateTripModalOpen,
    searchFilter,
    setSearchFilter
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalFavorites =
    favorites.destinations.length + favorites.attractions.length + favorites.experiences.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('explore');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#0B1320]/10 py-3 shadow-xs'
          : 'bg-[#F5F3EE] border-b border-[#0B1320]/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* ZONE 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => navigateTo('home')}
            className="group text-left text-2xl font-bold tracking-tight text-[#0B1320] font-editorial flex items-center gap-1.5 focus:outline-hidden"
          >
            <span className="text-[#0B1320] transition-colors group-hover:text-[#D8A84E]">
              TravelVerse
            </span>
          </button>

          {/* ZONE 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#111827]">
            <button
              onClick={() => navigateTo('explore')}
              className={`transition-colors hover:text-[#0B1320] cursor-pointer relative py-1 ${
                currentPage === 'explore'
                  ? 'text-[#0B1320] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1320]'
                  : 'text-[#6B7280]'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => navigateTo('explore')}
              className="text-[#6B7280] hover:text-[#0B1320] transition-colors cursor-pointer py-1"
            >
              Destinations
            </button>
            <button
              onClick={() => navigateTo('trip-planner')}
              className={`transition-colors hover:text-[#0B1320] cursor-pointer relative py-1 ${
                currentPage === 'trip-planner'
                  ? 'text-[#0B1320] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1320]'
                  : 'text-[#6B7280]'
              }`}
            >
              Trip Planner
            </button>
            <button
              onClick={() => navigateTo('budget-planner')}
              className={`transition-colors hover:text-[#0B1320] cursor-pointer relative py-1 ${
                currentPage === 'budget-planner'
                  ? 'text-[#0B1320] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1320]'
                  : 'text-[#6B7280]'
              }`}
            >
              Budget
            </button>
            <button
              onClick={() => navigateTo('my-trips')}
              className={`transition-colors hover:text-[#0B1320] cursor-pointer relative py-1 ${
                currentPage === 'my-trips'
                  ? 'text-[#0B1320] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1320]'
                  : 'text-[#6B7280]'
              }`}
            >
              My Trips
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className={`transition-colors hover:text-[#0B1320] cursor-pointer relative py-1 flex items-center gap-1 ${
                currentPage === 'admin'
                  ? 'text-[#0B1320] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0B1320]'
                  : 'text-[#6B7280]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#D8A84E]" />
              <span>Admin</span>
            </button>
          </nav>

          {/* ZONE 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search */}
            <div className="relative">
              {showSearchInput ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    placeholder="Search Kyoto, Paris..."
                    autoFocus
                    onBlur={() => !searchFilter && setShowSearchInput(false)}
                    className="w-40 sm:w-56 text-xs bg-white border border-[#0B1320]/20 rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-[#0B1320]"
                  />
                </form>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search places"
                  className="p-2 text-[#6B7280] hover:text-[#0B1320] transition-colors cursor-pointer rounded-lg hover:bg-black/5"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Saved Favorites */}
            <button
              onClick={() => navigateTo('favorites')}
              aria-label="Saved favorites"
              className="relative p-2 text-[#6B7280] hover:text-[#0B1320] transition-colors cursor-pointer rounded-lg hover:bg-black/5"
            >
              <Heart
                className={`w-4 h-4 ${
                  totalFavorites > 0 ? 'text-[#0B1320] fill-[#0B1320]/10' : ''
                }`}
              />
              {totalFavorites > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D8A84E]" />
              )}
            </button>

            {/* User Profile */}
            <button
              onClick={() => navigateTo('profile')}
              aria-label="User profile"
              className="p-1.5 text-[#6B7280] hover:text-[#0B1320] transition-colors cursor-pointer rounded-lg hover:bg-black/5"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#0B1320]/15">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Elena"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Create Trip CTA */}
            <button
              onClick={() => setCreateTripModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0B1320] text-white hover:bg-[#1E293B] text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-xs cursor-pointer active:scale-98 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 text-[#D8A84E]" />
              <span>Create Trip</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 text-[#0B1320] hover:bg-black/5 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F3EE] border-b border-[#0B1320]/10 px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            <button
              onClick={() => {
                navigateTo('explore');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <Compass className="w-4 h-4 text-[#D8A84E]" />
              <span>Explore Destinations</span>
            </button>
            <button
              onClick={() => {
                navigateTo('trip-planner');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <Calendar className="w-4 h-4 text-[#D8A84E]" />
              <span>Trip Planner</span>
            </button>
            <button
              onClick={() => {
                navigateTo('budget-planner');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <span>Budget Planner</span>
            </button>
            <button
              onClick={() => {
                navigateTo('my-trips');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <span>My Trips</span>
            </button>
            <button
              onClick={() => {
                navigateTo('favorites');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <Heart className="w-4 h-4 text-[#D8A84E]" />
              <span>Saved Places ({totalFavorites})</span>
            </button>
            <button
              onClick={() => {
                navigateTo('profile');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <User className="w-4 h-4 text-[#D8A84E]" />
              <span>Traveler Profile</span>
            </button>
            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left py-2 px-3 rounded-lg hover:bg-black/5 text-[#0B1320]"
            >
              <Shield className="w-4 h-4 text-[#D8A84E]" />
              <span>Admin Management</span>
            </button>
            <div className="pt-2 border-t border-[#0B1320]/10">
              <button
                onClick={() => {
                  setCreateTripModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0B1320] text-white py-2.5 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D8A84E]" />
                <span>Create New Trip</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
