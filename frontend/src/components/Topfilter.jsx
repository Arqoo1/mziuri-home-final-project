import React from 'react';

const TopFilter = ({ sort, setSort, isSelectOpen, setIsSelectOpen }) => {
  const handleSelectClick = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <div className="top-filter">
      <div className="icon-group">
        <i className="fas fa-th-list"></i>
        <i className="fas fa-th"></i>
      </div>

      <div className="sort-container">
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          onClick={handleSelectClick}
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="alphabetical_asc">Name: A to Z</option>
          <option value="alphabetical_desc">Name: Z to A</option>
          <option value="rating_desc">Rating: High to Low</option>
          <option value="rating_asc">Rating: Low to High</option>
        </select>
        <div className={`select-arrow ${isSelectOpen ? 'rotate' : ''}`}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
};

export default TopFilter;
