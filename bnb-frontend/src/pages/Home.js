import React from 'react';
import Hero from '../components/Hero';
import ProductTray from '../components/ProductTray'; // The Carousel
import OurStory from '../components/OurStory';       // The Video Section Teaser

function Home() {
  return (
    <>
      {/* 1. The Big Slider */}
      <Hero />
      
      {/* 2. The Bread Carousel */}
      <ProductTray />
      
      {/* 3. The Video Teaser (The one with "Read More" button) */}
      <OurStory /> 
    </>
  );
}

export default Home;