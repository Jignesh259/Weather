import React from 'react';

interface NavbarProps {
  onExplore?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onExplore }) => {
  return (
    <nav className="fixed top-0 w-full z-100 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(0,242,255,0.08)] flex justify-between items-center px-8 h-16">
      <div className="flex items-center gap-8">
        <span 
          className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 font-headline cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Gujarat Weather
        </span>
        <div className="hidden md:flex items-center gap-6 font-headline tracking-tight text-sm">
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Satellite</button>
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Radar</button>
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Historical</button>
          <button onClick={onExplore} className="text-slate-400 hover:text-white transition-colors">Insights</button>
        </div>
      </div>
      <div className="flex items-center gap-4 text-slate-400">
        <button className="p-2 hover:bg-white/5 rounded-full transition-all duration-300" onClick={() => alert('Dark mode toggled')}>
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
        <button className="p-2 hover:bg-white/5 rounded-full transition-all duration-300" onClick={() => alert('No new notifications')}>
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
