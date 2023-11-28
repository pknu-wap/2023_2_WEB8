import React from "react";
import Review from "./review";

const ProductModal = ({ isOpen, product, onClose }) => {
  // 모달이 열리지 않거나 선택한 상품이 없을 경우 아무것도 렌더링하지 않음
  if (!isOpen || !product) {
    return null;
  }
  const { Name, Price, Rank, Brand, Ingredients } = product;
  // console.log(Ingredients);

  return (
    <div className="modal" style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{Name}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p>Brand: {Brand}</p>
          <p>Price: {Price}$</p>
          <p>Rank: {Rank}점</p>
          <p>Ingredients: {Ingredients}</p>
        </div>
        <Review product={product} />
      </div>
    </div>
  );
};

export default ProductModal;
