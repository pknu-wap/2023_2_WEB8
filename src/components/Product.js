function Product({ id, name, img }) {
  return (
    <div>
      <img src={img} alt={id} />
      <span>{name}</span>
    </div>
  );
}

export default Product;
