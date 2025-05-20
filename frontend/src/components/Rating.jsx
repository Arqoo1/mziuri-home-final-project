import React from 'react';

function Rating(rating) {
  const roundedRating = Math.round(rating);
  const stars = [];

  for (let i = 0; i < roundedRating; i++) {
    stars.push(
      <i
        key={i}
        className="fas fa-star"
      ></i>
    );
  }

  return stars;
}

export default Rating;
