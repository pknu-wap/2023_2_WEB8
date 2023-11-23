import React, { useState } from "react";
import LabelBtn from "./LabelBtn";
import "../css/Product.css";
import ProductModal from "./ProductModal";

function Product({ id, name, price, rank, uid }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = () => {
    setSelectedProduct({
      id,
      name,
      price,
      rank,
    });
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
          <div className="product-name">{name}</div>
          <div className="product-price">{price}$</div>
          <div className="product-rank">{rank}점</div>
        </div>
        <LabelBtn productId={id} productName={name} userId={uid} />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
}

export default Product;
