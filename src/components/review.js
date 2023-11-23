import React, { useState } from "react";
import "../css/Review.css";
import useAuth from "../functions/useAuth";

const Review = ({ reviewId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const user = useAuth();

  const handleAddReview = () => {
    if (
      currentReview.trim() !== "" &&
      currentRating > 0 &&
      currentRating <= 5
    ) {
      const reviewObject = {
        username: user.userName,
        review: currentReview,
        rating: currentRating,
      };
      setReviews((prevReviews) => [...prevReviews, reviewObject]);
      setCurrentReview("");
      setCurrentRating(0);
    }
  };

  return (
    <div className="review-container">
      <h4 className="review-header">한 줄 후기</h4>
      <ul className="review-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            {`${review.username}: ${review.review} (${review.rating}점)`}
          </li>
        ))}
      </ul>
      <form>
        <input
          type="text"
          placeholder="후기를 작성해주세요."
          value={currentReview}
          onChange={(e) => setCurrentReview(e.target.value)}
          className="review-input"
        />
        <select
          value={currentRating}
          onChange={(e) => setCurrentRating(Number(e.target.value))}
          className="rating-input"
        >
          <option value={0}>평점 선택</option>
          <option value={1}>1점</option>
          <option value={2}>2점</option>
          <option value={3}>3점</option>
          <option value={4}>4점</option>
          <option value={5}>5점</option>
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddReview();
          }}
          className="submit-review-btn"
        >
          ↑
        </button>
      </form>
    </div>
  );
};

export default Review;
