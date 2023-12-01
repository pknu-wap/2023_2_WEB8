import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../css/Navbar2.css";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("사용자가 로그아웃했습니다.");
        alert("로그아웃 했습니다.");

        if (window.location.pathname.includes("mypage")) {
          navigate(`${process.env.PUBLIC_URL}/main`);
        } else {
          window.location.reload();
        }
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
