import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Navbar2.css";

const LogoutBtn = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("사용자가 로그아웃했습니다.");
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
      });
  };

  return (
    <div className="logout_button">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutBtn;
