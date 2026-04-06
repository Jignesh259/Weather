import React from 'react';
import { motion } from 'framer-motion';

const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container-low/50 relative">
      <div className="container mx-auto px-8">
        <div className="mb-20">
          <h2 className="font-headline text-xs tracking-[0.3em] text-primary-container uppercase mb-4 transition-all hover:tracking-[0.4em]">Core Systems</h2>
          <h3 className="font-headline text-4xl font-bold tracking-tight text-white">PRECISION MODULES</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Feature 1: ML Predictions */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-8 group relative overflow-hidden glass-card rounded-2xl p-8 transition-all duration-500 hover:bg-surface-container-high/80"
          >
            <div className="absolute top-0 right-0 p-8">
              <span className="material-symbols-outlined text-primary-container text-5xl opacity-20 group-hover:opacity-100 transition-opacity">psychology</span>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h4 className="font-headline text-2xl font-bold mb-4 text-white">ML-Powered Predictions</h4>
                <p className="text-on-surface/60 max-w-md leading-relaxed">
                  Our proprietary Venturi Core processes over 40 petabytes of atmospheric data daily, using deep learning to predict erratic weather patterns before they materialize.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4 text-primary-container font-headline text-sm tracking-widest">
                <span>ANALYTICS ACTIVE</span>
                <div className="h-px flex-1 bg-primary-container/20"></div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Real-time AQI */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300 border-l border-primary-container/20"
          >
            <span className="material-symbols-outlined text-secondary-container text-4xl mb-8">air</span>
            <div>
              <h4 className="font-headline text-xl font-bold mb-3 text-white">Real-time AQI Tracking</h4>
              <p className="text-on-surface/60 text-sm leading-relaxed">
                Particle density monitoring down to the molecular level. Integrated respiratory risk assessment for every 500m grid.
              </p>
            </div>
          </motion.div>

          {/* Feature 3: Coverage */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300 border-b border-secondary-container/20"
          >
            <span className="material-symbols-outlined text-primary-container text-4xl mb-8">grid_view</span>
            <div>
              <h4 className="font-headline text-xl font-bold mb-3 text-white">36 District Coverage</h4>
              <p className="text-on-surface/60 text-sm leading-relaxed">
                Full-spectrum satellite synchronization across all regional zones, providing redundant sensor data for 100% uptime.
              </p>
            </div>
          </motion.div>

          {/* Feature 4: Atmospheric Rendering */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="md:col-span-8 glass-card rounded-2xl overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent z-10"></div>
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" 
              src="https://images.unsplash.com/photo-1534088568595-a066f7104211?auto=format&fit=crop&q=80" 
              alt="Data visualization"
            />
            <div className="relative z-20 p-8 h-full flex flex-col justify-end">
              <h4 className="font-headline text-2xl font-bold mb-2 text-white">Visual Atmospheric Rendering</h4>
              <p className="text-on-surface/70 text-sm max-w-sm">
                Interactive 4D maps that visualize thermal currents and pressure fronts in real-time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
