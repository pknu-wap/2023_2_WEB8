import React from "react";
import Review from "./Review";

const ProductModal = ({ isOpen, product, onClose }) => {
  // 모달이 열리지 않거나 선택한 상품이 없을 경우 아무것도 렌더링하지 않음
  if (!isOpen || !product) {
    return null;
  }

  const { name, price, rank } = product;

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{name}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p>Price: {price}$</p>
          <p>Rank: {rank}점</p>
        </div>
        <Review />
      </div>
    </div>
  );
};

export default ProductModal;
