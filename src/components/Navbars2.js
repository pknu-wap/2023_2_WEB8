import "../css/Navbar2.css";

function Navbars() {
  return (
    <div>
      <header className="navbar-style-7">
        <img className="logo_img" src="./images/logo_black.png" alt="LOGO" />
        <div className="nav_list">
          <button className="nav_button">Cosmetics</button>
          <button className="nav_button">Community</button>
          <button className="nav_button">Mypage</button>
        </div>
      </header>
    </div>
  );
}

export default Navbars;
