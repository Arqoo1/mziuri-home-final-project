import React from 'react';

function Rating({ rating }) {
  const totalStars = 5;
  const stars = [];

  const roundedRating = Math.round(rating * 2) / 2;

  const starStyle = {
    color: '#e72463', 
    marginRight: '3px',

  };

  const emptyStarStyle = {
    color: 'transparent', 

    WebkitTextStroke: '1px #e72463',
    marginRight: '3px',
  };

  for (let i = 0; i < totalStars; i++) {
    if (i + 1 <= roundedRating) {
      stars.push(
        <i
          key={i}
          className="fas fa-star"
          style={starStyle}
          aria-hidden="true"
        />
      );
    } else if (i + 0.5 === roundedRating) {
      stars.push(
        <i
          key={i}
          className="fas fa-star-half-alt"
          style={starStyle}
          aria-hidden="true"
        />
      );
    } else {
      stars.push(
        <i
          key={i}
          className="far fa-star"
          style={emptyStarStyle}
          aria-hidden="true"
        />
      );
    }
  }

  return <span>{stars}</span>;
}

export default Rating;
