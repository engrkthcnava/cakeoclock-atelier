import React from 'react';
import { Link } from 'react-router-dom'; 
import './OurStory.css';

const COZY_KITCHEN_IMG = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80";

function OurStory() {
  return (
    <section className="story-section">      
      <div className="story-container">
        
        {/* LEFT COLUMN: Clean, Compact Narrative Teaser */}
        <div className="story-text">
          <span className="story-meta-tag">Our Story</span>
          <h2 className="story-title">Crafting Cake o' Clock Atelier</h2>          
          <p>
            Cake o' Clock Atelier was born out of a deep passion for the art of homemade baking, 
            transforming simple, premium ingredients into sweet moments of joy. 
            Operating on an exclusive, limited-batch "drop" schedule, we deliver 
            artisan desserts straight from our kitchen to your hands at their absolute 
            peak of freshness.
          </p>
          
          <Link to="/about">
            <button className="story-btn">Read Full Story</button>
          </Link>
        </div>

        {/* RIGHT COLUMN: The Clean Visual Side Window */}
        <div className="story-visual-frame">
          <div className="story-image-overlay-badge">Est. 2026</div>
          <img 
            src={COZY_KITCHEN_IMG} 
            alt="Cake o' Clock Atelier Artisan Kitchen Setup" 
            className="story-display-img"
          />
        </div>

      </div>
    </section>
  );
}

export default OurStory;