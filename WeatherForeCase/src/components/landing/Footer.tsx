import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 bg-slate-950/80 backdrop-blur-md border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-12 gap-4">
      <div className="flex flex-col gap-1">
        <span className="font-headline font-black text-slate-500 uppercase tracking-tighter">GUJARAT DISTRICT MONITORING</span>
        <p className="font-body text-[10px] tracking-wide text-slate-500 uppercase">
          © 2026 GUJARAT DISTRICT MONITORING. ALL DATA RIGHTS RESERVED.
        </p>
      </div>
      <div className="flex gap-8">
        <a className="font-body text-xs tracking-wide text-slate-500 hover:text-cyan-300 transition-colors" href="#">API Documentation</a>
        <a className="font-body text-xs tracking-wide text-slate-500 hover:text-cyan-300 transition-colors" href="#">Station Network</a>
        <a className="font-body text-xs tracking-wide text-slate-500 hover:text-cyan-300 transition-colors" href="#">Privacy Protocol</a>
        <a className="font-body text-xs tracking-wide text-slate-500 hover:text-cyan-300 transition-colors" href="#">Legal</a>
      </div>
    </footer>
  );
};

export default Footer;
