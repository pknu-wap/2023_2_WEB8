import "../css/Navbar.css";

function Navbars() {
  return (
    <div>
      <header className="navbar-style-7">
        <img className="logo_img" src="./images/logo_black.png" alt="LOGO" />
        <div className="nav_list">
          <button className="nav_button">
            <img
              className="nav_img"
              src="./images/community.png"
              alt="community"
            />
          </button>
          <button className="nav_button">
            <img
              className="nav_img"
              src="./images/cosmetics.png"
              alt="cosmetics"
            />
          </button>
          <button className="nav_button">
            <img className="nav_img" src="./images/Mypage.png" alt="MyPage" />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbars;
