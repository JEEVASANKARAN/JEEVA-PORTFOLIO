import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Encryption from './components/Encryption';
import Projects from './components/Projects';
import Footer from './components/Footer';
import StarsCanvas from './components/StarsCanvas';
import SponsorModal from './components/SponsorModal';
import { useState } from 'react';
import './App.css';

export default function App() {
  const [showSponsor, setShowSponsor] = useState(false);

  return (
    <div style={{ background: '#060010', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Fixed star background behind everything */}
      <StarsCanvas />

      {/* Main content */}
      <Navbar />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="security">
          <Encryption />
        </section>
        <section id="projects">
          <Projects />
        </section>
      </main>

      <Footer onSponsorClick={() => setShowSponsor(true)} />
      {showSponsor && <SponsorModal onClose={() => setShowSponsor(false)} />}
    </div>
  );
}
