import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import OperativeRoster from '@/components/OperativeRoster';
import SonicTelemetry from '@/components/SonicTelemetry';
import PhysicalSupply from '@/components/PhysicalSupply';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <OperativeRoster />
      <SonicTelemetry />
      <PhysicalSupply />
      <Footer />
    </main>
  );
}
