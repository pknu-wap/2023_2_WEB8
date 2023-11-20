import LabelBtn from "./LabelBtn";

function Product({ id, name, price, rank, uid }) {
  return (
    <div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{rank}</div>
      <LabelBtn productName={name} userId={uid} />
    </div>
  );
}

export default Product;
