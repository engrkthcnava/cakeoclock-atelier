import React from 'react';
import './About.css';

// Public premium food image links matching your dessert lineup
const IMAGES = {
  kitchenShowcase: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80", // Beautiful rustic kitchen/baking setting
  ingredients: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=600&q=80",      // High quality baking ingredients (cocoa, flour)
  craftsmanship: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",    // Artisan details / careful food prep
  ubeDessert: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80"       // Stunning elegant dessert close up
};

function About() {
  return (
    <div className="about-page">
      
      {/* SECTION 1: Intro & Kitchen Craft */}
      <section className="about-intro-section">
        <div className="about-container">
          {/* Header Text */}
          <div className="intro-text-block">
            <h1>A Sweet Curation Unrolls...</h1>
            <p className="intro-lead">
              Cake o' Clock Atelier honors the authentic art of homemade baking, giving life to premium 
              dessert creations designed to centralize and elevate your sweet cravings.
            </p>
            <p>
              Born from a passion for handcrafted confectionery, Cake o' Clock Atelier operates as a specialized 
              web application that brings high-quality desserts directly from our kitchen to our 
              local community, breaking away from commercialized mass production.
            </p>
            <p>
              Our concept centers on premium transparency and exceptional taste. From our digital catalog 
              to our curated physical releases, we offer a meticulous selection of everyday luxuries—ensuring 
              our customers enjoy sweets at the peak of their freshness and artistic presentation.
            </p>
          </div>

          {/* Core Visual Wrapper */}
          <div className="masterchef-image-wrapper">
             <img 
               src={IMAGES.kitchenShowcase} 
               alt="Cake o' Clock Atelier Baking Kitchen" 
               className="full-width-img"
             />
          </div>
        </div>
      </section>

      {/* SECTION 2: The Blueprint (3 Columns) */}
      <section className="about-blueprint-section">
        <div className="about-container">
          <h2 className="section-title">The Cake o' Clock Atelier Blueprint of Sweet Innovation</h2>
          <p className="section-subtitle">
            Blending time-honored heritage recipes with small-batch artistry, our system is built 
            around curating limited product drops to answer the local call for distinct, premium homemade options.
          </p>

          <div className="blueprint-grid">
            
            {/* Column 1: Premium Elements */}
            <div className="blueprint-card">
              <div className="card-img-box">
                <img src={IMAGES.ingredients} alt="Curated Premium Ingredients" />
              </div>
              <h3>Curated Ingredients</h3>
              <p>
                We handpick each element of our desserts—from rich, dense cocoas for our premium brownie batches 
                to delicate, refined flours for our soft cupcake bases. By controlling every variable from its raw 
                state, we guarantee a richer, pure homemade profile.
              </p>
            </div>

            {/* Column 2: Heritage Craft */}
            <div className="blueprint-card">
              <div className="card-img-box">
                <img src={IMAGES.craftsmanship} alt="Baking Artistry" />
              </div>
              <h3>Baking Artistry</h3>
              <p>
                Focusing on a perfect harmony of textures and balancing deep flavor depths. Each dessert batch 
                is mixed and decorated with deliberate care, focusing on giving custom inquiries and requests 
                the specialized attention they deserve.
              </p>
            </div>

            {/* Column 3: The 1997 Legacy */}
            <div className="blueprint-card">
              <div className="card-img-box">
                <img src={IMAGES.ubeDessert} alt="Signature 1997 Recipe" />
              </div>
              <h3>Heritage Creations</h3>
              <p>
                The heart of our kitchen lies in our signature 1997 Ube Halaya recipe. Passed down with strict 
                adherence to tradition, it highlights our dedication to preserving time-tested flavor legacies 
                amidst modern dessert innovations.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default About;