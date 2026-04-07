import React from 'react';

interface NavbarProps {
  onExplore?: () => void;
  onSatellite?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onExplore, onSatellite }) => {
  return (
    <nav className="fixed top-0 w-full z-100 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,242,255,0.08)] flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-8">
        <span 
          className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 font-headline cursor-pointer"
          onClick={() => window.location.reload()}
        >
          METEO VENTURI
        </span>
        <div className="hidden md:flex items-center gap-6 font-headline tracking-tight text-sm">
          <button onClick={onSatellite} className="text-slate-400 hover:text-white transition-colors">Satellite</button>
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Radar</button>
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Historical</button>
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Insights</button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Actions removed as requested */}
        <button 
          onClick={onExplore}
          className="hidden md:block bg-white/5 hover:bg-white/10 text-white font-headline font-bold px-5 py-2 rounded-xl border border-white/10 transition-all"
        >
          EXPLORE MAP
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
