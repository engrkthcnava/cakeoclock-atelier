import React, { useState } from 'react';
import './Products.css';

// --- IMPORTS ---
import rvcrinkles from '../products/Red-Velvet-Crinkles.jpg';
import brookies from '../products/Brookies.JPG';
import brownies from '../products/Brownies.JPG';
import rvcake from '../products/Red-Velvet-Cake.jpg';
import chocolava from '../products/Chocolava-Butternut.jpg';
import oreobanana from '../products/Oreo-Banana-Cake.jpg';
import choco from '../products/Chocolate-Cake.jpg';
import dcc from '../products/Dubai-CC.jpg';
import chipstorm from '../featured/Choco-Chip.png';
import ccWalnut from '../featured/CC-Walnut.png';
import matchaCookie from '../featured/Matcha-Cookie.png';
import doubleChoco from '../featured/Double-Choco.png';

const PRODUCTS = [
  {
    id: 1,
    name: 'CRIMSON KISS',
    desc: 'Velvety Red Velvet Crinkles with White Chocolate Pockets',
    category: 'Pastries',
    img: rvcrinkles
  },
  {
    id: 2,
    name: 'THE DOUBLE TAKE',
    desc: 'The Ultimate Hybrid of Fudgy Brownie and Classic Cookie',
    category: 'Pastries',
    img: brookies
  },
  {
    id: 3,
    name: 'FUDGE ECLIPSE',
    desc: 'Rich, Ultra-Fudgy Dark Chocolate Brownie Squares',
    category: 'Pastries',
    img: brownies
  },
  {
    id: 4,
    name: 'SCARLET ROYALE',
    desc: 'Elegant Red Velvet Cake Layered with Smooth Cream Cheese',
    category: 'Cakes',
    img: rvcake
  },
  {
    id: 5,
    name: 'VOLCANIC BUTTERNUT',
    desc: 'Decadent Chocolate Lava Cake with a Rich Butternut Twist',
    category: 'Pastries',
    img: chocolava
  },
  {
    id: 6,
    name: 'BANANA CRUNCHWAVE',
    desc: 'Moist Banana Sponge Layered with Crunchy Oreo Elements',
    category: 'Cakes',
    img: oreobanana
  },
  {
    id: 7,
    name: 'MIDNIGHT SYMPHONY',
    desc: 'A Luxurious and Deeply Decadent Pure Chocolate Cake',
    category: 'Cakes',
    img: choco
  },
  {
    id: 8,
    name: 'DESERT GOLD',
    desc: 'Gourmet Decadence Inspired by Exotic Dubai Decadence',
    category: 'Pastries',
    img: dcc
  },
  {
    id: 9,
    name: 'CHIPSTORM',
    desc: 'Crisp chocolate chip cookies baked to golden perfection',
    category: 'Cookies',
    img: chipstorm
  },
  {
    id: 10,
    name: 'WALNUT WHIRL',
    desc: 'Chocolate chip walnut cookies with rich buttery crunch',
    category: 'Cookies',
    img: ccWalnut
  },
  {
    id: 11,
    name: 'MATCHA MYSTIQUE',
    desc: 'Delicate matcha cookies with a soft, fragrant finish',
    category: 'Cookies',
    img: matchaCookie
  },
  {
    id: 12,
    name: 'DOUBLE TROUBLE',
    desc: 'Extra fudgy double chocolate cookies for chocoholics',
    category: 'Cookies',
    img: doubleChoco
  }
];

function Products() {
  const [filter, setFilter] = useState('All');
  const [isCakesOpen, setIsCakesOpen] = useState(true);
  const [isPastriesOpen, setIsPastriesOpen] = useState(true);
  const [isCookiesOpen, setIsCookiesOpen] = useState(true);

  const filteredProducts = filter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(item => item.category === filter);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="products-page-bg">
      <div className="products-layout-container">
        <aside className="products-sidebar">
          <h1 className="sidebar-title">PRODUCTS</h1>

          <div
            className={`all-link ${filter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterChange('All')}
          >
            All ({PRODUCTS.length})
          </div>

          <div className="sidebar-accordion">
            <div className="accordion-item">
              <div className="accordion-header" onClick={() => setIsCakesOpen(!isCakesOpen)}>
                <span>Cakes</span>
                <span className="icon">{isCakesOpen ? '—' : '+'}</span>
              </div>
              {isCakesOpen && (
                <ul className="accordion-content">
                  <li
                    className={filter === 'Cakes' ? 'active-sub' : ''}
                    onClick={() => handleFilterChange('Cakes')}
                  >
                    Cakes
                  </li>
                </ul>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => setIsPastriesOpen(!isPastriesOpen)}>
                <span>Pastries</span>
                <span className="icon">{isPastriesOpen ? '—' : '+'}</span>
              </div>
              {isPastriesOpen && (
                <ul className="accordion-content">
                  <li
                    className={filter === 'Pastries' ? 'active-sub' : ''}
                    onClick={() => handleFilterChange('Pastries')}
                  >
                    Pastries
                  </li>
                </ul>
              )}
            </div>

            <div className="accordion-item">
              <div className="accordion-header" onClick={() => setIsCookiesOpen(!isCookiesOpen)}>
                <span>Cookies</span>
                <span className="icon">{isCookiesOpen ? '—' : '+'}</span>
              </div>
              {isCookiesOpen && (
                <ul className="accordion-content">
                  <li
                    className={filter === 'Cookies' ? 'active-sub' : ''}
                    onClick={() => handleFilterChange('Cookies')}
                  >
                    Cookies
                  </li>
                </ul>
              )}
            </div>
          </div>
        </aside>

        <main className="products-main-content">
          <div className="products-grid-2-col">
            {filteredProducts.map((item) => (
              <div key={item.id} className="product-tile">
                <div className="product-img-box">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;