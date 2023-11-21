import React from "react";
import LabelBtn from "./LabelBtn";
import "../css/Product.css"; // Import the CSS file

function Product({ id, name, price, rank, uid }) {
  return (
    <div className="product-container">
      <div className="product-image">
        {/* <img src={imageUrl} alt={name} /> */}
        <img src="./images/community.png" alt="LOGO" />
      </div>
      <div className="product-info">
        <div className="product-name">{name}</div>
        <div className="product-price">{price}$</div>
        <div className="product-rank">{rank}점</div>
      </div>

      <LabelBtn productName={name} userId={uid} />
    </div>
  );
}

export default Product;
