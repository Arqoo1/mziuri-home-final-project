import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import InputGroup from './InputGroup';

function LeftFilter({
  setTitleFilter,
  setPriceRange,
  priceRange,
  setSelectedTags,
  allTags,
  selectedCategory,
  setSelectedCategory,
  allCategories,
}) {
  const [titleFilter, setTitleFilterLocal] = useState('');
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [selectedTags, setLocalSelectedTags] = useState([]);

  const applyTitleFilter = (e) => {
    e.preventDefault();
    setTitleFilter(titleFilter.toLowerCase());
    setTitleFilterLocal('');
  };

  const applyPriceFilter = (e) => {
    e.preventDefault();
    setPriceRange(localPriceRange);
  };

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((tg) => tg !== tag)
      : [...selectedTags, tag];
    setLocalSelectedTags(newTags);
    setSelectedTags(newTags);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  return (
    <div className="left-filter">
      <div className="filter-section">
        <h4 className="searchTitle">Search by Title</h4>
        <InputGroup
          label=""
          name="titleFilter"
        >
          <div className="searchInputWrapper">
            <input
              type="text"
              placeholder="Enter title..."
              value={titleFilter}
              onChange={(e) => setTitleFilterLocal(e.target.value)}
              className="searchInput"
              id="titleFilter"
            />
            <button
              className="searchButton"
              onClick={applyTitleFilter}
              disabled={!titleFilter}
            >
              <i className="fa fa-search"></i>{' '}
            </button>
          </div>
        </InputGroup>
      </div>

      <div className="filter-section">
        <h4 className="searchTitle">Filter by Category</h4>
        <InputGroup
          label=""
          name="categoryFilter"
        >
          <ul className="category-list">
            {allCategories.map((category) => (
              <li
                key={category}
                className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
                {selectedCategory === category && <span className="category-check">✓</span>}
              </li>
            ))}
          </ul>
        </InputGroup>
      </div>

      <div className="filter-section">
        <h4 className="searchTitle">Price Filter</h4>
        <InputGroup
          label=""
          name="priceFilter"
        >
          <Slider
            range
            min={0}
            max={100}
            value={localPriceRange}
            onChange={setLocalPriceRange}
            trackStyle={[{ backgroundColor: 'transparent' }]}
          />
          <div className="price-controls">
            <p className="price-preview">
              ${localPriceRange[0]} - ${localPriceRange[1]}
            </p>
            <button
              className="priceButton"
              onClick={applyPriceFilter}
              disabled={
                localPriceRange[0] === priceRange[0] && localPriceRange[1] === priceRange[1]
              }
            >
              Apply Price
            </button>
          </div>
        </InputGroup>
      </div>
      <div className="filter-section">
        <h4 className="searchTitle">Filter by Tags</h4>
        <InputGroup
          label=""
          name="tagFilter"
        >
          <ul className="tag-list">
            {allTags.map((tag) => (
              <li
                key={tag}
                className={`tag-item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && <span className="tag-count">✓</span>}
              </li>
            ))}
          </ul>
        </InputGroup>
      </div>
    </div>
  );
}

export default LeftFilter;
