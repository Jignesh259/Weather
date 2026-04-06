import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../../assets/unnamed.png';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden bg-surface-dim">
      {/* Background Image with Atmospheric Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-container/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary-container/20 blur-[120px] rounded-full"></div>
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay grayscale" 
          src={heroBg}
          alt="Storm Clouds"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dim/50 via-transparent to-surface-dim"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-4 py-1 mb-6 glass-card rounded-full border border-outline-variant/20"
        >
          <span className="font-headline text-[10px] tracking-[0.2em] uppercase text-primary-container">Next-Gen Meteorological Intel</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-headline text-5xl md:text-8xl font-bold tracking-tighter text-on-surface mb-8 leading-[0.9] max-w-5xl mx-auto"
        >
          THE FUTURE OF <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">ATMOSPHERIC PRECISION</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="max-w-2xl mx-auto text-on-surface/70 text-lg mb-10 leading-relaxed font-body"
        >
          Harnessing neural network analysis to provide hyper-local weather accuracy with 99.4% predictive certainty. Welcome to the lab of the skies.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button 
            onClick={onStart}
            className="aurora-gradient text-slate-950 font-headline font-bold px-10 py-4 rounded-full text-lg shadow-[0_0_25px_rgba(0,242,255,0.3)] hover:scale-105 transition-transform duration-300"
          >
            EXPLORE FORECAST
          </button>
          <button className="glass-card text-on-surface font-headline font-medium px-10 py-4 rounded-full text-lg border border-white/10 hover:bg-white/5 transition-colors duration-300">
            SYSTEM ARCHITECTURE
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="font-headline text-[10px] tracking-widest uppercase text-white">Deep Sync</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary-container to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
