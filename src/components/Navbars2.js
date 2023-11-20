import "../css/Navbar2.css";
import { useNavigate } from "react-router-dom";

function Navbars() {
  const navigate = useNavigate();

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
          <button
            className="nav_button"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/mypage`)}
          >
            Mypage
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbars;
