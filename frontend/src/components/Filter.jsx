import React, { useState } from "react";

function Filter({ setTitleFilter, setPriceRange }) {
  const [titleFilter, setTitleFilterLocal] = useState("");  
  const [priceRange, setPriceRangeLocal] = useState(100);   

  const applyFilter = (e) => {
    e.preventDefault();
    setTitleFilter(titleFilter.toLowerCase());
    setPriceRange([0, priceRange]);
    setTitleFilterLocal("");
    setPriceRangeLocal(100);
  };

  return (
    <div className="filter-container">
      <h4>FILTER</h4>
      
      <input
        type="text"
        placeholder="Search by title..."
        value={titleFilter}
        onChange={(e) => setTitleFilterLocal(e.target.value)}
        className="searchInput"
      />
      
      <div className="price-filter">
        <p>Price</p>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={priceRange}
          onChange={(e) => setPriceRangeLocal(Number(e.target.value))}
        />
        <p className="price-preview">0 - ${priceRange}</p>
      </div>
      
      <button onClick={applyFilter}>Filter</button>
    </div>
  );
}

export default Filter;
