// frontend/src/components/ProductReviews.jsx
import { useState, useEffect } from "react";
import { getReviews, addReview } from "../services/api";

export default function ProductReviews({ product, userId, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product?.id) {
      getReviews(product.id).then(setReviews).catch(console.error);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please login to review");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a review");
      return;
    }
    setIsSubmitting(true);
    try {
      await addReview(product.id, userId, rating, comment);
      setComment("");
      setRating(5);
      const updated = await getReviews(product.id);
      setReviews(updated);
    } catch (err) {
      alert("Failed to add review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="review-modal glass" onClick={(e) => e.stopPropagation()}>
        <div className="review-modal-header">
          <h3>📝 Reviews for {product.name}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="reviews-container">
          {reviews.length === 0 ? (
            <div className="empty-reviews">✨ No reviews yet. Be the first!</div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-stars">{'⭐'.repeat(rev.rating)}</div>
                <div className="review-comment">{rev.comment}</div>
                <div className="review-date">{new Date(rev.created_at).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Your Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button type="button" className="btn secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}