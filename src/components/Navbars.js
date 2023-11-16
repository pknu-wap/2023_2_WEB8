import '../css/Navbar.css';  // 별도의 CSS 파일을 만들어서 스타일을 관리

function Navbars() {
  return (
    <div>
      <header className='navbar-style-7'>
        <img className="logo_img" src="./images/logo_black.png" alt="LOGO" />
        <div className="nav_list">
          <button className="nav_button">
            login
          </button>
          <button className="nav_button">
            comm
          </button>
          <button className="nav_button">
            <img className="nav_img" src="./images/cosmetics.png" alt="community" />
          </button>
          <button className="nav_button">
            <img className="nav_img" src="./images/bell.png" alt="알림" />
          </button>
          <button className="nav_button">
            <img className="nav_img" src="./images/Mypage.png" alt="마이페이지" />
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbars;
