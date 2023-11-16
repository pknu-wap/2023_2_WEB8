// Like.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const Like = ({ likes, handleLike }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    handleLike(liked ? -1 : 1); // 좋아요 취소하면 -1, 좋아요 누르면 1
  };

  return (
    <div className="heart" onClick={toggleLike}>
      {liked ? (
        <FontAwesomeIcon icon={fasHeart} size="1.5x" color="red" />
      ) : (
        <FontAwesomeIcon icon={farHeart} size="1.5x" />
      )}
      {likes !== undefined && likes !== null ? (
        <span className="like-count">{liked ? likes + 1 : likes}</span> 
      ) : null}
    </div>
  );
};

export default Like;
