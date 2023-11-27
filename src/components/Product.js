import React, { useState } from "react";
import LabelBtn from "./LabelBtn";
import "../css/Product.css";
import ProductModal from "./ProductModal";

function Product({ productInfo, uid }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Name, Price, Rank, id } = productInfo;

  const handleProductClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product">
      <div key={id} className="product-container" onClick={handleProductClick}>
        <div className="product-image">
          <img src="./images/community.png" alt="LOGO" />
        </div>
        <div className="product-info">
          <div className="product-name">{Name}</div>
          <div className="product-price">{Price}$</div>
          <div className="product-rank">{Rank}점</div>
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
