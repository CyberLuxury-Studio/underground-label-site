"use client";
import React from 'react';
import { motion } from 'framer-motion';

const supply = [
  { id: 1, name: "VOID_WALKER_VINYL_12", price: "$35", status: "AVAILABLE" },
  { id: 2, name: "PROTOCOL_HEAVY_HOODIE", price: "$85", status: "REDACTED" },
  { id: 3, name: "SYSTEM_CRASH_CASSETTE", price: "$15", status: "AVAILABLE" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function PhysicalSupply() {
  return (
    <section id="supply" className="py-32 px-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 border-b border-white/10 pb-4"
        >
          <h2 className="text-4xl font-bold uppercase tracking-widest font-space-grotesk text-[#e5e2e1]">
            Physical Supply
          </h2>
          <div className="text-[#84967e] font-mono text-sm mt-2">SECURE_PROCUREMENT_CHANNEL_OPEN</div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {supply.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`relative bg-[#0e0e0e] border p-6 transition-colors font-mono ${
                item.status === 'REDACTED'
                  ? 'border-white/5 opacity-60 grayscale'
                  : 'border-[#3b4b37]/50 hover:border-[#00FF00]/50 bg-black/40 backdrop-blur-md'
              }`}
            >
              {/* Product Image Placeholder */}
              <div className="w-full aspect-square bg-[#1a1a1a] mb-6 flex items-center justify-center border border-white/5 relative overflow-hidden">
                {item.status === 'REDACTED' && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-black text-[#FF003C] font-bold text-sm sm:text-base md:text-lg tracking-[0.2em] px-4 py-2 uppercase transform -rotate-12 border border-[#FF003C]/50 whitespace-nowrap overflow-hidden text-ellipsis w-11/12 text-center">
                      [REDACTED - SUPPLY EXHAUSTED]
                    </div>
                  </div>
                )}
                <div className="w-24 h-24 rounded-full border border-white/10 opacity-50"></div>
              </div>

              <div className="flex justify-between items-start mb-4 text-[#e5e2e1]">
                <h3 className="text-sm font-bold w-2/3 leading-tight">{item.name}</h3>
                <span className="text-[#00FF00]">{item.price}</span>
              </div>

              <button
                disabled={item.status === 'REDACTED'}
                className={`w-full py-3 border text-xs tracking-widest uppercase transition-all ${
                  item.status === 'REDACTED'
                    ? 'border-white/10 text-white/30 cursor-not-allowed'
                    : 'border-[#00FF00]/30 text-[#00FF00] hover:bg-[#00FF00] hover:text-black'
                }`}
              >
                {item.status === 'REDACTED' ? 'UNAVAILABLE' : 'ACQUIRE'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
