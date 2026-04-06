import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Data Latency', value: '12ms', color: 'text-primary-container' },
  { label: 'Field Sensing', value: '360°', color: 'text-secondary-container' },
  { label: 'Accuracy Rate', value: '99.4%', color: 'text-primary-container' },
  { label: 'Neural Monitoring', value: '24/7', color: 'text-secondary-container' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-surface-container-low/30">
      <div className="container mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
          >
            <div className={`font-headline text-4xl md:text-6xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="font-headline text-[10px] tracking-[0.3em] uppercase text-on-surface/40">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
