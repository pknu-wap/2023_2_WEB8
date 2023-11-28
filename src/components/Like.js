import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import LikedFunc from "../functions/likeFunc";
import useAuth from "../functions/useAuth";

const Like = ({ postId, postLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likedNum, setLikedNum] = useState(postLikes);
  const currentUser = useAuth(); // Firebase auth context에서 현재 사용자 정보 가져오기
  const navigate = useNavigate();

  const toggleLike = () => {
    if (!currentUser) {
      // 비로그인 상태에서는 로그인이 필요하다는 메시지를 띄우고 로그인 화면으로 이동
      alert("로그인이 필요한 서비스입니다.");
      // 로그인 페이지로 이동하는 코드 추가
      navigate(`${process.env.PUBLIC_URL}/login`);
      return;
    }

    setLiked(!liked);
    LikedFunc(postId, !liked);

    // setLiked가 비동기적으로 수행하기 때문에 그에 맞게 작성됨
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
        <FontAwesomeIcon icon={fasHeart} size="sm" color="red" />
      ) : (
        <FontAwesomeIcon icon={farHeart} size="sm" />
      )}
      <span>{likedNum}</span>
    </div>
  );
};

export default Like;
