import React, { useState } from "react";
import "../css/Comment.css";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="comment-container">
      <h4 className="comment-header">댓글</h4>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment-item">
            {comment}
          </li>
        ))}
      </ul>
      <form>
        <input
          type="text"
          placeholder="댓글 작성..."
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          className="comment-input"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddComment();
          }}
          className="comment-submit"
        >
          ↑
        </button>
      </form>
    </div>
  );
};

export default Comment;
