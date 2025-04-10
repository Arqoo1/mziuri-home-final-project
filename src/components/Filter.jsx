import React, { useState } from "react";

function Filter({ setTitleFilter, setPriceRange }) {
  const [titleFilter, setTitle] = useState("");
  const [priceRange, setPrice] = useState(100);

  const handleTitleChange = (e) => {
    setTitle(e.target.value.toLowerCase());
  };

  const handleRangeChange = (e) => {
    const value = Number(e.target.value);
    setPrice(value);
  };

  const applyFilter = (e) => {
    e.preventDefault();
    setTitleFilter(titleFilter);
    setPriceRange([0, priceRange]);

    setTitle("");
    setPrice(100);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by title..."
        value={titleFilter}
        onChange={handleTitleChange}
      />

      <div className="price-filter">
        <label>Select max price:</label>
        <input
          type="range"
          min="0"
          max="100"
        //   step="1"
          value={priceRange}
          onChange={handleRangeChange}
        />
        <p className="price-preview">0 - ${priceRange}</p>
      </div>

      <button onClick={applyFilter}>Filter</button>
    </div>
  );
}

export default Filter;
