import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import InputGroup from './InputGroup';
import { useTranslation } from 'react-i18next';
import Button from './Button';
function LeftFilter({
  setTitleFilter,
  setPriceRange,
  priceRange,
  selectedTags,
  setSelectedTags,
  allTags,
  selectedCategory,
  setSelectedCategory,
  allCategories,
}) {
  const [titleFilter, setTitleFilterLocal] = useState('');
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const { t, i18n } = useTranslation();

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
    const exists = selectedTags.some((t) => t.en === tag.en);
    const newTags = exists ? selectedTags.filter((t) => t.en !== tag.en) : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prev) => (prev?.en === category.en ? null : category));
  };

  const uniqueCategories = [...new Map(allCategories.map((cat) => [cat.en, cat])).values()];

  const seen = new Set();
  const uniqueTags = allTags.filter((tag) => {
    const key = tag.en;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className="left-filter">
      {/* Title Filter */}
      <div className="filter-section">
        <h4 className="searchTitle">{t('search_by_title')}</h4>
        <InputGroup
          label=""
          name="titleFilter"
        >
          <div className="searchInputWrapper">
            <input
              type="text"
              placeholder={t('enter_title')}
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
              <i className="fa fa-search"></i>
            </button>
          </div>
        </InputGroup>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <h4 className="searchTitle">{t('filter_by_category')}</h4>
        <InputGroup
          label=""
          name="categoryFilter"
        >
          <ul className="category-list">
            {uniqueCategories.map((category, index) => {
              const displayLabel = category[i18n.language] || category.en;
              const isSelected = selectedCategory?.en === category.en;

              return (
                <li
                  key={index}
                  className={`category-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {displayLabel}
                  {isSelected && <span className="category-check">✓</span>}
                </li>
              );
            })}
          </ul>
        </InputGroup>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h4 className="searchTitle">{t('price_filter')}</h4>
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
            <Button
              text={t('apply_price')}
              className="btn1"
              onClick={applyPriceFilter}
              disabled={
                localPriceRange[0] === priceRange[0] && localPriceRange[1] === priceRange[1]
              }
            />
          </div>
        </InputGroup>
      </div>

      {/* Tag Filter */}
      <div className="filter-section">
        <h4 className="searchTitle">{t('filter_by_tags')}</h4>
        <InputGroup
          label=""
          name="tagFilter"
        >
          <ul className="tag-list">
            {uniqueTags.map((tag) => {
              const displayLabel = tag[i18n.language] || tag.en;
              const isSelected = selectedTags.some((t) => t.en === tag.en);

              return (
                <li
                  key={tag.en}
                  className={`tag-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {displayLabel}
                  {isSelected && <span className="tag-count">✓</span>}
                </li>
              );
            })}
          </ul>
        </InputGroup>
      </div>
    </div>
  );
}

export default LeftFilter;
