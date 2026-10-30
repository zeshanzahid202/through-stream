import React, { useState } from 'react';
import { useApp, PageType } from '../context/AppContext';
import { Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  const [info, setInfo] = useState<string | null>(null);
  const links: { label: string; page: PageType }[] = [
    { label: 'Destinations', page: 'explore' }, { label: 'Itinerary Planner', page: 'trip-planner' },
    { label: 'Budget Management', page: 'budget-planner' }, { label: 'My Trips', page: 'my-trips' },
    { label: 'Saved Places', page: 'favorites' }, { label: 'Destination Manager (Local)', page: 'admin' }
  ];
  return <footer className="bg-[#0B1320] text-[#F5F3EE] px-6 py-16">
    <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
      <div><button onClick={() => navigateTo('home')} className="flex gap-3 items-center font-editorial text-2xl font-bold"><Compass className="text-[#D8A84E]" />TravelVerse</button><p className="mt-5 text-sm leading-relaxed text-white/60">Discover inspiring destinations, plan each day, and keep your travel budget in view.</p><p className="mt-3 text-xs text-white/50">Your plans are saved in this browser. Export important itineraries for your records.</p></div>
      <nav aria-label="Footer navigation"><h2 className="text-[#D8A84E] mb-4 font-semibold">Plan your journey</h2>{links.map(link => <button key={link.page} onClick={() => navigateTo(link.page)} className="block py-2 text-sm text-white/70 hover:text-white">{link.label}</button>)}</nav>
      <div><h2 className="font-editorial text-xl mb-4">Your next journey starts here.</h2><p className="text-sm text-white/60 mb-5">Explore culture, nature, food and remarkable places around the world.</p><button onClick={() => navigateTo('explore')} className="bg-[#D8A84E] text-[#0B1320] rounded-xl px-5 py-3 text-sm font-semibold">Explore destinations</button></div>
    </div>
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-5 justify-between text-xs text-white/50"><p>© {new Date().getFullYear()} TravelVerse</p><div className="flex gap-5"><button onClick={() => setInfo('Privacy: Trips, expenses, favorites and your profile are stored in this browser. Clearing browser data removes them. Share links contain itinerary snapshots, including notes. External photos and fonts may connect to third-party services.')}>Privacy</button><button onClick={() => setInfo('Terms: This is a personal travel planning tool. Sample prices, reviews and destination information are illustrative. Confirm costs, opening hours and travel requirements before booking. Export important plans for safekeeping.')}>Terms</button><button onClick={() => setInfo('Create a journey from My Trips, add activities by day, and track expenses in Budget Management. Share creates a snapshot link; later changes do not sync. No account or API key is required.')}>How it works</button></div></div>
    {info && <div role="dialog" aria-modal="true" aria-label="Information" className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"><div className="max-w-lg rounded-2xl bg-white p-6 text-[#0B1320]"><p className="text-sm leading-relaxed">{info}</p><button autoFocus onClick={() => setInfo(null)} className="mt-5 rounded-lg bg-[#0B1320] text-white px-4 py-2">Close</button></div></div>}
  </footer>;
};
