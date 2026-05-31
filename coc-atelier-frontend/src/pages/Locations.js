import React, { useState, useEffect } from 'react';
import './Locations.css';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Perfect for a 3x3 grid layout

  useEffect(() => {
    fetch('./locations.json')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Error loading locations:", err));
  }, []);

  const filteredItems = filter === 'All' 
    ? locations 
    : locations.filter(item => item.category === filter);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (num) => {
    setCurrentPage(num);
    window.scrollTo(0, 0);
  };

  return (
    <div className="locations-page">
      {/* 1. Full-Width Landscape Banner */}
      <div className="locations-banner">
        <img 
          src="https://breadtalk.com.ph/wp-content/uploads/2021/06/Loc_Banner-01-1920x600.jpg" 
          alt="BreadTalk Store" 
        />
      </div>

      <div className="locations-container">
        <div className="locations-layout">
          {/* --- SIDEBAR SECTION --- */}
          <aside className="locations-sidebar">
            <h2 className="sidebar-title">BRANCHES</h2>
            <ul className="sidebar-list">
              <li 
                className={filter === 'Metro Manila' ? 'active' : ''}
                onClick={() => {
                  setFilter('Metro Manila');
                  setCurrentPage(1);}}
                >
                  Metro Manila
              </li>
              <li 
                className={filter === 'Luzon' ? 'active' : ''}
                onClick={() => {
                  setFilter('Luzon');
                  setCurrentPage(1);}}
                >
                  Luzon
              </li>
              <li
                className={filter === 'Visayas' ? 'active' : ''}
                onClick={() => {
                  setFilter('Visayas');
                  setCurrentPage(1);}}
                >
                  Visayas
              </li>
                            <li 
                className={filter === 'Mindanao' ? 'active' : ''}
                onClick={() => {
                  setFilter('Mindanao');
                  setCurrentPage(1);}}
                >
                  Mindanao
              </li>
            </ul>
          </aside>

          {/* 4. Main 3-Column Content Grid */}
          <main className="locations-main">
            <div className="locations-grid-3-col">
              {currentItems.map(loc => (
                <div key={loc.id} className="location-tile">
                  <h3>{loc.name}</h3>
                  <p>{loc.address}</p>
                </div>
              ))}
            </div>

            {/* 5. Navigation Pagination Bar */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <div className="pagination-bar-container">
                  <button 
                    className={`pagination-item arrow ${currentPage === 1 ? 'disabled' : ''}`} 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  >
                    <span className="chevron left"></span>
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button 
                      key={i+1} 
                      className={`pagination-item ${currentPage === i+1 ? 'active' : ''}`} 
                      onClick={() => handlePageChange(i+1)}
                    >
                      {i+1}
                    </button>
                  ))}
                  <button 
                    className={`pagination-item arrow ${currentPage === totalPages ? 'disabled' : ''}`} 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  >
                    <span className="chevron right"></span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Locations;