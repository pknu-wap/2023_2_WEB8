import Product from "./Product";

//임의의 데이터
const myBookmarks = [
  { product_id: 1, product_name: "하삼동커피", product_img: "이미지 링크1" },
  { product_id: 2, product_name: "로지텍", product_img: "이미지 링크2" },
  { product_id: 3, product_name: "베트남쌀국수", product_img: "이미지 링크3" },
];

function Bookmarks() {
  return (
    <div>
      {myBookmarks.map((bookmark) => {
        return (
          <Product
            id={bookmark.product_id}
            name={bookmark.product_name}
            img={bookmark.product_img}
          />
        );
      })}
    </div>
  );
}

export default Bookmarks;
