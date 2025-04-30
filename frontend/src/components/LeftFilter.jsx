import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function LeftFilter({ setTitleFilter, setPriceRange }) {
  const [titleFilter, setTitleFilterLocal] = useState("");
  const [priceRange, setPriceRangeLocal] = useState([0, 100]);

  const applyFilter = (e) => {
    e.preventDefault();
    setTitleFilter(titleFilter.toLowerCase());
    setPriceRange(priceRange);
    setTitleFilterLocal("");
    setPriceRangeLocal([0, 100]);
  };

  return (
    <div className="left-filter">
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
        <Slider
          range
          min={0}
          max={100}
          value={priceRange}
          onChange={setPriceRangeLocal}
          trackStyle={[{ backgroundColor: "transparent" }]} // Make track transparent
        />
      </div>
        <p className="price-preview">${priceRange[0]} - ${priceRange[1]}</p>

      <button onClick={applyFilter}>Filter</button>
    </div>
  );
}

export default LeftFilter;
