function Product({ id, name, price, rank }) {
  return (
    <div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{rank}</div>
    </div>
  );
}

export default Product;
