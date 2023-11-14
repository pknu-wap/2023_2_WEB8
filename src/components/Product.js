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

function Product({ id, name, price, rank }) {
  return (
    <Box>
      <div className="d-flex justify-content-around py-3">{name}</div>
      <div className="d-flex justify-content-around py-3">{price}</div>
      <div className="d-flex justify-content-around py-3">{rank}</div>
    </Box>
  );
}

export default Product;
