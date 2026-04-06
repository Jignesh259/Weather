import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import StatsSection from '../components/landing/StatsSection';
import BentoGrid from '../components/landing/BentoGrid';
import Footer from '../components/landing/Footer';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore }) => {
  return (
    <div className="bg-surface-dim min-h-screen text-on-surface">
      <Navbar onExplore={onExplore} />
      <Hero onStart={onExplore} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <StatsSection />
        <BentoGrid />

        {/* Closing CTA */}
        <section className="py-24 container mx-auto px-8 mb-24">
          <div className="glass-card rounded-3xl overflow-hidden flex flex-col md:flex-row border border-white/5">
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="font-headline text-4xl font-bold mb-6 text-white uppercase tracking-tight">READY FOR THE NEXT <br /> ATMOSPHERIC SHIFT?</h2>
              <p className="text-on-surface/60 mb-10 leading-relaxed font-body">
                Deploy your personal meteorological station profile and start receiving precision alerts tailored to your exact coordinates.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onExplore}
                  className="bg-primary-container text-slate-950 font-headline font-bold px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all"
                >
                  GET STARTED
                </button>
                <button className="text-on-surface/80 font-headline font-medium px-8 py-3 rounded-xl border border-outline-variant/30 hover:bg-white/5 transition-colors">
                  API ACCESS
                </button>
              </div>
            </div>
            <div className="md:w-1/2 min-h-[400px] relative bg-slate-900/40">
              <div className="absolute inset-0 bg-primary-container/10 z-10 pointer-events-none"></div>
              <img
                className="w-full h-full object-cover grayscale opacity-60"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80"
                alt="Map visualization"
              />
            </div>
          </div>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default LandingPage;
