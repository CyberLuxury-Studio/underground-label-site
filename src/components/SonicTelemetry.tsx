"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, FastForward, Rewind } from 'lucide-react';

const tracklist = [
  { id: 1, name: "INIT_SEQUENCE.WAV", time: "04:20", status: "PLAYING" },
  { id: 2, name: "NEURO_LINK_ESTABLISHED.FLAC", time: "05:12", status: "QUEUED" },
  { id: 3, name: "SYSTEM_OVERRIDE.MP3", time: "03:45", status: "QUEUED" },
  { id: 4, name: "GHOST_IN_THE_MACHINE.WAV", time: "06:08", status: "QUEUED" },
];

export default function SonicTelemetry() {
  const [bars, setBars] = useState<{heights: string[], duration: number}[]>([]);

  useEffect(() => {
    // Generate 60 bars for the waveform
    setBars(Array.from({ length: 60 }, () => ({
      heights: [`${Math.random() * 20 + 10}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 20 + 10}%`],
      duration: Math.random() * 0.5 + 0.3
    })));
  }, []);

  return (
    <section className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/40 backdrop-blur-md border border-white/5 p-8 font-mono"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#00FF00]/20 pb-4">
            <h2 className="text-xl text-[#00FF00] font-bold tracking-widest uppercase">
              Sonic_Telemetry_v2.0
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#84967e]">
              <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></span>
              LIVE_TRANSMISSION
            </div>
          </div>

          {/* Player Controls & Waveform */}
          <div className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <button className="text-[#84967e] hover:text-[#00FF00] transition-colors"><Rewind className="w-6 h-6" /></button>
              <button className="w-12 h-12 rounded-full bg-[#00FF00] text-black flex items-center justify-center hover:scale-105 transition-transform">
                <Play className="w-5 h-5 ml-1" />
              </button>
              <button className="text-[#84967e] hover:text-[#00FF00] transition-colors"><Square className="w-6 h-6" /></button>
              <button className="text-[#84967e] hover:text-[#00FF00] transition-colors"><FastForward className="w-6 h-6" /></button>

              <div className="ml-auto text-sm text-[#00FF00]">
                01:24 / 04:20
              </div>
            </div>

            {/* Waveform Visualizer */}
            <div className="h-24 w-full flex items-end gap-[2px] bg-[#0a0a0a] p-2 border border-white/5 rounded">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes waveform {
                  0%, 100% { height: var(--h1); }
                  50% { height: var(--h2); }
                }
                .waveform-bar {
                  flex: 1;
                  background-color: rgba(0, 255, 0, 0.6);
                  min-width: 1px;
                  animation: waveform var(--duration) linear infinite;
                }
              `}} />
              {bars.map((bar, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{
                    '--h1': bar.heights[0],
                    '--h2': bar.heights[1],
                    '--duration': `${bar.duration}s`
                  } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* Tracklist Terminal */}
          <div className="bg-[#0a0a0a] p-4 border border-white/5 h-64 overflow-y-auto">
            <div className="text-xs text-[#84967e] mb-4">root@protocol:~# ls -la /audio/transmissions/</div>

            <div className="space-y-2">
              {tracklist.map((track) => (
                <div
                  key={track.id}
                  className={`flex justify-between items-center p-2 text-sm ${
                    track.status === 'PLAYING'
                      ? 'bg-[#00FF00]/10 text-[#00FF00] border-l-2 border-[#00FF00]'
                      : 'text-[#84967e] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="opacity-50">{track.id.toString().padStart(2, '0')}</span>
                    <span>{track.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="opacity-50">{track.time}</span>
                    <span className={`text-xs ${track.status === 'PLAYING' ? 'animate-pulse' : 'opacity-30'}`}>
                      [{track.status}]
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#00FF00]">
              <span>root@protocol:~#</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-[#00FF00] inline-block"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
