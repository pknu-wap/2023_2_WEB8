import styled from "styled-components";

const Box = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items:start,
  padding: 10px;
  margin: 10px;
  height: 400px;
  overflow: hidden;
  background: #ffffff;
`;

function Product({ id, name, img, price }) {
  return (
    <Box>
      <img
        src={process.env.PUBLIC_URL + img}
        alt={id}
        className="m-auto"
        style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
      />
      <div className="d-flex justify-content-around py-3">{name}</div>
      <div className="d-flex justify-content-around py-3">{price}</div>
    </Box>
  );
}

export default Product;
