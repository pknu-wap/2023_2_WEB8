import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import LikedFunc from "../functions/likeFunc";

const Like = ({ postId, postLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likedNum, setLikedNum] = useState(postLikes);
  const toggleLike = () => {
    setLiked(!liked);

    LikedFunc(postId, !liked);

    //setLiked가 비동기적으로 수행하기 때문에 그에 맞게 작성됨
    if (!liked) setLikedNum((num) => num + 1);
    else setLikedNum((num) => num - 1);
  };

  return (
    <div
      className="heart"
      onClick={() => {
        toggleLike();
      }}
    >
      {liked ? (
        <FontAwesomeIcon icon={fasHeart} size="1.5x" color="red" />
      ) : (
        <FontAwesomeIcon icon={farHeart} size="1.5x" />
      )}
      <span>{likedNum}</span>
    </div>
  );
};

export default Like;
