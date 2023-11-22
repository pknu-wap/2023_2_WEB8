import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import useAuth from "../functions/useAuth";
import { useNavigate } from "react-router-dom";
import "../css/EditUserInfo.css";

const EditUserInfo = () => {
  const [uid, setUid] = useState("");
  const [skinType, setSkinType] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [searchParams] = useSearchParams();
  const currentUser = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setSkinType(currentUser.skinType);
      setUserName(currentUser.userName);
      setEmail(currentUser.email);
      setUid(currentUser.uid);
    }
  }, [currentUser]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    setUid(params.uid);
    // You can retrieve other params similarly if needed
  }, [searchParams]);

  const handleEdit = async () => {
    try {
      if (uid && skinType) {
        const userRef = doc(db, "Users", uid);
        const userDoc = await getDoc(userRef);

        setEmail(userDoc.data().email);
        setUserName(userDoc.data().userName);
        if (userDoc.exists()) {
          await updateDoc(userRef, { skinType: skinType });
          console.log("User Info updated successfully");
        }
        navigate(`${process.env.PUBLIC_URL}/mypage`);
      }
    } catch (error) {
      console.error("Error in EditUserInfo <<< ", error);
    }
  };

  return (
    <div className="user-profile">
      <div className="form-group">
        <label>
          Name:
          <input
            type="text"
            value={userName}
            readOnly
            className="input-field"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Email:
          <input type="text" value={email} readOnly className="input-field" />
        </label>
      </div>
      <select
        name="skin-type"
        id="skin-type"
        onChange={(e) => setSkinType(e.target.value)}
        className="select-field"
      >
        <option value="" disabled={skinType !== ""}>
          {skinType
            ? `선택한 피부 타입: ${skinType}`
            : "피부 타입을 선택하세요"}
        </option>
        <option value="Dry">건성</option>
        <option value="Oily">지성</option>
        <option value="Sensitive">민감성</option>
        <option value="Unset">모름</option>
      </select>
      <button onClick={handleEdit} className="btn-confirm">
        확인
      </button>
      <button className="btn-cancel">취소</button>
    </div>
  );
};

export default EditUserInfo;
