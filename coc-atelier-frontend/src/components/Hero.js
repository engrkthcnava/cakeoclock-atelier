import React, { useState } from 'react';

// Import your images here
import feature1 from '../hero/feature1.JPG'; // Adjust path (../ goes up one folder)
import feature2 from '../hero/feature2.JPG';
import feature3 from '../hero/feature3.jpg';
import feature4 from '../hero/feature4.jpg';
import feature5 from '../hero/feature5.jpg';

// --- THE FIX: Store data as Objects, not just images ---
const HERO_DATA = [
  { 
    id: 1, 
    image: feature1, 
    title: "RICH & FUDGY", 
    subtitle: "THE ULTIMATE CHOCOLATE FIX" 
  },
  { 
    id: 2, 
    image: feature2, 
    title: "BEST OF BOTH WORLDS", 
    subtitle: "WHY CHOOSE WHEN YOU CAN HAVE BOTH?" 
  },
  { 
    id: 3, 
    image: feature3, 
    title: "SOFT & CHEWY", 
    subtitle: "A DUSTING OF SWEET PERFECTION" 
  },
  { 
    id: 4, 
    image: feature4, 
    title: "ELEGANT & CLASSIC", 
    subtitle: "PERFECT FOR EVERY CELEBRATION" 
  },
  { 
    id: 5, 
    image: feature5, 
    title: "PREMIUM & GOOEY", 
    subtitle: "TASTE THE TRENDING SENSATION" 
  }
];

function Hero() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % HERO_DATA.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? HERO_DATA.length - 1 : prev - 1));
  };

  // Helper to get current slide data
  const currentSlide = HERO_DATA[index];

  return (
    <header className="hero-section" style={{ backgroundImage: `url(${currentSlide.image})` }}>
      
      <button className="arrow-btn left-arrow" onClick={prevSlide}>❮</button>

      <div className="hero-content">
        <h1>{currentSlide.title}</h1>
        <h2>{currentSlide.subtitle}</h2> 
      </div>

      <button className="arrow-btn right-arrow" onClick={nextSlide}>❯</button>
    
    </header>
  );
}

export default Hero;