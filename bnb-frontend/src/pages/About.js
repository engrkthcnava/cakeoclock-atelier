import React from 'react';
import './About.css';

// ==========================================================================
// LOCAL BRAND IMAGE IMPORTS (Sourced directly from your src/images folder)
// ==========================================================================
import aboutMe0 from '../images/Aboutme0.jpg';
import aboutMe1 from '../images/Aboutme1.jpg';
import aboutMe2 from '../images/Aboutme2.jpeg';
import aboutMe3 from '../images/Aboutme3.jpeg';

const IMAGES = {
  // Swapped to make the header banner super inviting, warm, and cute!
  kitchenShowcase: aboutMe1, 
  ingredients: aboutMe0,     
  craftsmanship: aboutMe2,    
  cookie: aboutMe3       
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
              Bean 'n Bite honors the authentic art of homemade baking, giving life to premium 
              dessert creations designed to centralize and elevate your sweet cravings.
            </p>
            <p>
              Born from a genuine obsession with the perfect bake, Bean 'n Bite operates as a specialized 
              web application that brings freshly pulled oven luxuries directly to our local community. 
              We stand firmly against commercialized, chemical-heavy mass production, choosing instead to 
              let raw, pure flavors speak for themselves.
            </p>
            <p>
              Our concept centers on artisanal transparency and exceptional execution. From the precise temperature 
              of our melting chocolate layers to the intentional crunch of our roasted mix-ins, we offer a meticulous 
              selection of baked goods crafted to brighten your ordinary days and celebrate your milestone moments.
            </p>
          </div>

          {/* Core Visual Wrapper */}
          <div className="masterchef-image-wrapper">
             <img 
               src={IMAGES.kitchenShowcase} 
               alt="Bean 'n Bite Sweet Preparation" 
               className="full-width-img"
             />
          </div>
        </div>
      </section>

      {/* SECTION 2: The Blueprint (3 Columns) */}
      <section className="about-blueprint-section">
        <div className="about-container">
          <h2 className="section-title">The Bean 'n Bite Blueprint of Sweet Innovation</h2>
          <p className="section-subtitle">
            Blending strict kitchen precision with small-batch artistry, our system is built 
            around curating limited product drops to ensure every singular bite arrives fresh and unparalleled.
          </p>

          <div className="blueprint-grid">
            
            {/* Column 1: The Heart of the Kitchen (Image 0) */}
            <div className="blueprint-card">
              <div className="card-img-box">
                <img src={IMAGES.ingredients} alt="Bean 'n Bite Baking Kitchen" />
              </div>
              <h3>The Cozy Bakehouse</h3>
              <p>
                Our baking space is designed around intention and care. By stepping away from large-scale assembly 
                lines, our small-batch station allows us to carefully watch over every tray as it bakes. This ensures 
                every cookie dough base develops that gorgeous, uniform, homemade signature feel before ever heading out 
                the door.
              </p>
            </div>

            {/* Column 2: Flagship Chocolate Chip (Image 2) */}
            <div className="blueprint-card">
              <div className="card-img-box">
                <img src={IMAGES.craftsmanship} alt="Flagship Chocolate Chip Cookie" />
              </div>
              <h3>The Flagship Standard</h3>
              <p>
                Our classic Chocolate Chip Cookie represents the golden rule of our kitchen: never settle for ordinary. 
                We balance sweet, premium chocolate discs against a soft, pull-apart dough center and beautifully 
                crisp outer edges. It is a nostalgic classic reimagined with a modern, high-end texture profile.
              </p>
            </div>

            {/* Column 3: The Cookie Duo Combinations (Image 3) */}
            <div className="blueprint-card">
              <div className="card-img-box">
                <img src={IMAGES.cookie} alt="Chocochip and Chocowalnut Selection" />
              </div>
              <h3>The Heritage Blends</h3>
              <p>
                True indulgence lies in contrast, which is beautifully captured in our cookie pairings. By marrying the 
                purist charm of our traditional chocolate chips with the rich, deep, fire-toasted crunch of premium walnuts, 
                we give our community the ultimate choice of flavors. It's an exploration of buttery depths and nutty 
                dimensions that define who we are.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default About;