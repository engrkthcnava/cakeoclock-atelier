import React, { useState } from 'react';
// We don't need a separate CSS file import if it's already in App.js
// import './App.css'; 

// --- IMPORTS ---
import rvcrinkles from '../featured/Red-Velvet-Crinkles.png';
import brookies from '../featured/Brookies.png';
import brownies from '../featured/Brownies.png';
import rvcake from '../featured/Red-Velvet-Cake.png';
import chocolava from '../featured/Chocolava-Butternut.png';
import oreobanana from '../featured/Oreo-Banana-Cake.png';
import choco from '../featured/Chocolate-Cake.png';
import dcc from '../featured/Dubai-CC.png';
import plateImg from '../featured/plate.png';

const PRODUCTS = [
  { id: 1, name: "CRIMSON KISS", img: rvcrinkles },
  { id: 2, name: "THE DOUBLE TAKE", img: brookies },
  { id: 3, name: "FUDGE ECLIPSE", img: brownies },
  { id: 4, name: "SCARLET ROYALE", img: rvcake },
  { id: 5, name: "VOLCANIC BUTTERNUT", img: chocolava },
  { id: 6, name: "BANANA CRUNCHWAVE", img: oreobanana },
  { id: 7, name: "MIDNIGHT SYMPHONY", img: choco },
  { id: 8, name: "DESERT GOLD", img: dcc }
];

function ProductTray() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  // --- THE MAGIC LOGIC ---
  // This calculates where a product should sit relative to the center.
  const getStyleForIndex = (index) => {
    const total = PRODUCTS.length;
    
    // Find distance from active index
    let offset = index - activeIndex;

    // Adjust for wrapping (Infinite Loop Logic)
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    // Visual calculations
    const absOffset = Math.abs(offset);
    const isActive = offset === 0;
    
    // Spacing: 250px apart
    const translateX = offset * 290; 
    
    // Scale: Center is 1.4, neighbors are smaller
    const scale = isActive ? 1.6 : 0.6;
    
    // Opacity: Fade out items far away
    const opacity = absOffset > 2 ? 0 : (isActive ? 1 : 0.5);
    
    // Z-Index: Center is highest, others lower
    const zIndex = isActive ? 10 : 1;

    // Hide items that are too far off screen to prevent glitches
    const display = absOffset > 3 ? 'none' : 'flex';

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
      display
    };
  };

  return (
    <section className="product-section">
      <div className="header-area">
        <h3>FEATURED PRODUCTS</h3>
        {/* BreadTalk Gold Gradient Title */}
        <h1 className="featured-title">{PRODUCTS[activeIndex].name}</h1>
      </div>

      <div className="slider-area">
        {/* 1. THE STATIC TRAY (Center Stage) */}
        <div className="static-plate" aria-hidden="true">
          <img src={plateImg} alt="Tray" />
        </div>

        {/* 2. THE PRODUCTS (Circular Array) */}
        <div className="carousel-container">
          {PRODUCTS.map((product, index) => (
            <div 
              className="product-card-3d"
              key={product.id}
              style={getStyleForIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <img src={product.img} alt={product.name} />
            </div>
          ))}
        </div>

        {/* 3. NAVIGATION BUTTONS */}
        <button className="nav-btn left" onClick={prevSlide}>❮</button>
        <button className="nav-btn right" onClick={nextSlide}>❯</button>
      </div>
    </section>
  );
}

export default ProductTray;