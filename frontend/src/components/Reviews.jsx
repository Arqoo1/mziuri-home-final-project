import React, { useEffect, useState } from 'react';
import { fetchReviews, addReview } from '../api/productapi';
import InputGroup from './InputGroup';

function Reviews({ productId, product }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [activeTab, setActiveTab] = useState('Add Review');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) return;

    const loadReviews = async () => {
      try {
        const data = await fetchReviews(productId);
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load reviews:', err);
        setReviews([]);
      }
    };

    loadReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = localStorage.getItem('username') || 'Guest';
    const productName = typeof product?.title?.en === 'string' ? product.title.en.trim() : '';

    console.log({
      productId,
      user: loggedInUser,
      review: newReview,
      rating,
      userEmail,
      productName,
    });

    if (!newReview.trim() || !userEmail.trim() || !sendEmail || rating === 0 || !productName) {
      setError('All fields are required');
      return;
    }

    setError('');

    const createdReview = await addReview(
      productId,
      loggedInUser,
      newReview,
      rating,
      userEmail,
      productName
    );

    if (createdReview) {
      setReviews((prev) => [createdReview, ...prev]);
      setNewReview('');
      setRating(0);
      setUserEmail('');
      setSendEmail(false);
    } else {
      setError('Failed to add review');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <section className="reviews">
      <section className="reviews-container">
        <nav>
          <button onClick={() => setActiveTab('Description')}>Description</button>
          <button onClick={() => setActiveTab('Reviews')}>Reviews ({reviews.length})</button>
          <button onClick={() => setActiveTab('Add Review')}>Add Review</button>
        </nav>

        {activeTab === 'Description' && <p>This is the product description content.</p>}

        {activeTab === 'Reviews' && (
          <section className="usersReviewContainer">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="review"
              >
                <div className="review-top">
                  {review.createdAt && (
                    <div className="review-date">
                      <p>{formatDate(review.createdAt)}</p>
                    </div>
                  )}

                  {review.rating && (
                    <span className="review-stars">{Array(review.rating).fill('★').join('')}</span>
                  )}
                </div>

                <strong>
                  {review.user}: {review.review}
                </strong>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'Add Review' && (
          <form onSubmit={handleSubmit}>
            <h1>Add a review</h1>
            <p>Share your thoughts about this product</p>
            <p>Your email address will not be published. Required fields are marked *</p>

            {error && (
              <p
                className="error-message"
                style={{ color: 'red' }}
              >
                {error}
              </p>
            )}

            <InputGroup
              label="Your review *"
              name="review"
              error={!newReview.trim() && error}
            >
              <input
                type="text"
                placeholder="Write a review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="review-input"
              />
            </InputGroup>

            <InputGroup
              name="rating"
              error={rating === 0 && error}
            >
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? 'selected' : ''}`}
                    onClick={() => setRating(star)}
                    style={{
                      cursor: 'pointer',
                      fontSize: '24px',
                      color: star <= rating ? 'gold' : 'gray',
                    }}
                  >
                    {star <= rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </InputGroup>

            <InputGroup
              label="Your email *"
              name="email"
              error={!userEmail.trim() && error}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="email-input"
              />
            </InputGroup>

            <InputGroup
              name="sendEmail"
              error={!sendEmail && error}
            >
              <label>
                You will receive an email soon.
                <input
                  className="s"
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                />
              </label>
            </InputGroup>

            <button type="submit">Submit</button>
          </form>
        )}
      </section>
    </section>
  );
}

export default Reviews;
