import "../css/Navbar2.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../functions/useAuth.js";
import LogoutBtn from "./logoutBtn.js";

function Navbars() {
  const navigate = useNavigate();
  const currentUser = useAuth();

  const handleLogout = () => {
    // 로그아웃 처리 로직
    // useAuth 함수에서 반환된 함수에 인자로 false를 전달하여 로그아웃 상태로 설정
    currentUser(false);
  };

  return (
    <div>
      <header className="navbar-style-7">
        <img className="logo_img" src="./images/logo_black.png" alt="LOGO" />
        <div className="nav_list">
          <button
            className="nav_button"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/main`)}
          >
            Cosmetics
          </button>
          <button
            className="nav_button"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/community`)}
          >
            Community
          </button>
          {currentUser ? (
            <>
              <button
                className="nav_button"
                onClick={() => navigate(`${process.env.PUBLIC_URL}/mypage`)}
              >
                Mypage
              </button>
              <LogoutBtn />
            </>
          ) : (
            // 로그인 상태가 아닐 때 로그인/회원가입 버튼 표시
            <>
              <button
                className="login_button"
                onClick={() => navigate(`${process.env.PUBLIC_URL}/login`)}
              >
                Login
              </button>
              /
              <button
                className="sign_button"
                onClick={() => navigate(`${process.env.PUBLIC_URL}/signup`)}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbars;
