import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { MyTripsPage } from './pages/MyTripsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CreateTripModal } from './components/CreateTripModal';
import { ShareTripModal } from './components/ShareTripModal';
import { ToastContainer } from './components/ToastContainer';
import { PageTransition } from './animations/PageTransition';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE] selection:bg-[#D8A84E]/25 selection:text-[#0B1320]">
      <Navbar />

      <main className="flex-1">
        <PageTransition pageKey={currentPage}>
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'explore' && <ExplorePage />}
          {currentPage === 'destination-detail' && <DestinationDetailPage />}
          {currentPage === 'trip-planner' && <TripPlannerPage />}
          {currentPage === 'budget-planner' && <BudgetPlannerPage />}
          {currentPage === 'my-trips' && <MyTripsPage />}
          {currentPage === 'favorites' && <FavoritesPage />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'admin' && <AdminDashboardPage />}
        </PageTransition>
      </main>

      <CreateTripModal />
      <ShareTripModal />
      <ToastContainer />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}