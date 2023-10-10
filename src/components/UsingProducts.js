import Product from "./Product";

//임의의 데이터
const MyUsingProduct = [
  { product_id: 1, product_name: "시금치", product_img: "이미지 링크1" },
  { product_id: 2, product_name: "handmade", product_img: "이미지 링크2" },
  { product_id: 3, product_name: "night mode", product_img: "이미지 링크3" },
];

function UsingProducts() {
  return (
    <div>
      {MyUsingProduct.map((product) => {
        return (
          <Product
            id={product.product_id}
            name={product.product_name}
            img={product.product_img}
          />
        );
      })}
    </div>
  );
}

export default UsingProducts;
