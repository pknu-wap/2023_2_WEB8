import '../css/Sortlist.css'

function Sortlist() {
  return(
    <div className="sort_list_box">
      <div className="dropdown_content">
        <a href="latest_order">최신순</a>
        <a href="#" className="hidden">인기순</a>
      </div>
    </div>
  );
}

export default Sortlist;