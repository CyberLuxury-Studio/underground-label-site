"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const operatives = [
  { id: '01', name: 'KRYPTIC', role: 'SOUND_DESIGN', listeners: '1.2M', release: 'VOID_WALKER_EP' },
  { id: '02', name: 'NEURO_TOX', role: 'PRODUCER', listeners: '845K', release: 'ACID_RAIN_LP' },
  { id: '03', name: 'SYNDICATE', role: 'DJ / LIVE_ACT', listeners: '2.1M', release: 'NEO_TOKYO_NIGHTS' },
  { id: '04', name: 'NULL_P0INTER', role: 'MASTERING', listeners: '120K', release: 'SYSTEM_CRASH_001' },
];

const OperativeCard = ({ op }: { op: any }) => (
  <div
    className="group relative w-[300px] md:w-[400px] h-[500px] md:h-[600px] shrink-0 bg-[#131313] overflow-hidden border border-white/5 bg-black/40 backdrop-blur-md transition-colors duration-500 hover:border-[#00FF00]/50"
  >
    {/* Ultra-high-contrast B&W placeholder (simulated) */}
    <div className="absolute inset-0 bg-[#0a0a0a] grayscale group-hover:mix-blend-luminosity transition-all duration-700">
       {/* Simulate a photo with a gradient for now, as we don't have images */}
       <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black"></div>
       <div className="absolute inset-0 bg-[#00FF00] opacity-0 group-hover:opacity-20 mix-blend-color transition-opacity duration-700"></div>
    </div>

    {/* Top Stats */}
    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start font-mono text-xs text-white/50 z-10">
      <span className="text-[#00FF00] font-bold">OP_ID:{op.id}</span>
      <span>STATUS: ACTIVE</span>
    </div>

    {/* Center Name */}
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <h3 className="text-4xl md:text-5xl font-space-grotesk font-bold text-white/10 group-hover:text-white/90 transition-colors duration-500 uppercase tracking-tighter">
        {op.name}
      </h3>
    </div>

    {/* Bottom Agent Stats (Revealed on hover) */}
    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10 bg-gradient-to-t from-black/90 to-transparent">
      <div className="font-mono text-sm space-y-2 text-[#00FF00]">
        <div className="flex justify-between border-b border-[#00FF00]/20 pb-1">
          <span className="opacity-70">ROLE:</span>
          <span>{op.role}</span>
        </div>
        <div className="flex justify-between border-b border-[#00FF00]/20 pb-1">
          <span className="opacity-70">LATEST_RELEASE:</span>
          <span>{op.release}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">MONTHLY_LISTENERS:</span>
          <span>{op.listeners}</span>
        </div>
      </div>
    </div>
  </div>
);

function RosterCarousel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 w-full mb-12">
          <h2 className="text-4xl font-bold uppercase tracking-widest font-space-grotesk text-[#e5e2e1]">
            Operative Roster
          </h2>
          <div className="w-24 h-1 bg-[#00FF00] mt-4 opacity-50"></div>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
          {operatives.map((op, i) => (
            <OperativeCard key={op.id} op={op} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function OperativeRoster() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="relative h-[300vh] bg-[#050505]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full mb-12">
            <h2 className="text-4xl font-bold uppercase tracking-widest font-space-grotesk text-[#e5e2e1]">
              Operative Roster
            </h2>
            <div className="w-24 h-1 bg-[#00FF00] mt-4 opacity-50"></div>
          </div>
          <div className="flex gap-8 px-6 md:px-24">
            {operatives.map((op) => (
              <OperativeCard key={op.id} op={op} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <RosterCarousel />;
}
