// Comment.js
import React, { useState } from 'react';

const Comment = ({ comments, addComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    addComment(newComment);
    setNewComment('');
  };

  return (
    <div>
      {comments && comments.length > 0 ? (
        <div>
          <h3>댓글</h3>
          {comments.map((comment, index) => (
            <div key={index}>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>댓글이 없습니다.</p>
      )}

      <div>
        <textarea
          placeholder="댓글을 입력하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>댓글 등록</button>
      </div>
    </div>
  );
};

export default Comment;
