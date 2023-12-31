// functions/deletePost.js

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const deletePostInFirestore = async (postId) => {
  try {
    // 게시물 문서 참조를 얻어와서 삭제

    await deleteDoc(doc(db, "Posts", postId));
    console.log("삭제가 정상적으로 이루어졌습니다.");
  } catch (error) {
    console.error("게시물 삭제 중 오류 발생:", error.message);
    // 필요에 따라 더 자세한 오류 처리 추가
  }
};

export default deletePostInFirestore;
