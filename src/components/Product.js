import { Row, Col, Container, ListGroup } from "react-bootstrap";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  height: 400px;

  background: #ffffff;
`;

//
//
//  backdrop-filter: blur(4px);
//  -webkit-backdrop-filter: blur(4px);

function Product({ id, name, img }) {
  return (
    <Box>
      <img
        src={process.env.PUBLIC_URL + img}
        alt={id}
        style={{ width: "280px", height: "300px", objectFit: "cover" }}
      />
      <div className="d-flex justify-content-around py-3">{name}</div>
    </Box>
  );
}

export default Product;
