import React, { useState } from "react";
import LabelBtn from "./LabelBtn";
import "../css/Product.css";
import ProductModal from "./ProductModal";

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function Product({ productInfo, uid }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Name, Price, Rank, id, imgURL } = productInfo;
  const handleProductClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product">
      <div key={id} className="product-container">
        <div onClick={handleProductClick}>
          <div className="product-image">
            <img src={imgURL} alt="LOGO" />
          </div>
          <div className="product-info">
            <div className="product-name">{truncateText(Name, 30)}</div>
            <div className="product-price">{Price}$</div>
            <div className="product-rank">{Rank}점</div>
          </div>
        </div>
        <LabelBtn productId={id} productName={Name} userId={uid} />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={productInfo}
      />
    </div>
  );
}

export default Product;
