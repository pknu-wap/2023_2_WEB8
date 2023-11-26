import React, { useEffect, useState } from "react";
import useAuth from "../functions/useAuth";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  orderBy,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import "../css/Review.css";

const Review = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  const [isUpdate, setIsUpdate] = useState(true);
  const user = useAuth();

  const handleAddReview = (e) => {
    e.preventDefault();

    if (!currentReview) {
      alert("내용을 입력하세요");
    } else if (currentRating === 0) {
      alert("별점을 입력하세요");
    } else {
      createReviewInFirebase();

      setCurrentReview("");
      setCurrentRating(0);
      setIsUpdate((prev) => !prev);
    }
  };

  useEffect(() => {
    fetchReview(setReviews);
  }, [isUpdate]);

  const createReviewInFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "Reviews"), {
        productId: product.id,
        userId: user.uid,
        userName: user.userName,
        rating: currentRating,
        content: currentReview,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log("Error in createReviewInFirebase of Review <<< ", error);
    }
  };

  const fetchReview = async (setReviews) => {
    try {
      const q = query(
        collection(db, "Reviews"),
        where("productId", "==", product.id),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const reviewData = [];

      querySnapshot.forEach((doc) => {
        const review = doc.data();

        reviewData.push({
          productId: review.productId,
          userName: review.userName,
          userId: review.userIid,
          rating: review.rating,
          content: review.content,
        });
      });

      setReviews(reviewData);
    } catch (error) {
      console.log("Error in fetchReview of Review <<< ", error);
    }
  };

  return (
    <div className="review-container">
      <h4 className="review-header">한 줄 후기</h4>
      <ul className="review-list">
        {reviews.map((review, index) => (
          <li key={index} className="review-item">
            {`${review.userName}: ${review.content} (${review.rating}점)`}
          </li>
        ))}
      </ul>
      <form>
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
        <input
          type="text"
          placeholder="후기를 작성해주세요."
          value={currentReview}
          onChange={(e) => setCurrentReview(e.target.value)}
          className="review-input"
        />

        <button onClick={handleAddReview} className="submit-review-btn">
          ↑
        </button>
      </form>
    </div>
  );
};

export default Review;
