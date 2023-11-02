import styled from "styled-components";

const Box = styled.div`
  display: flex;
  margin: 10px 0px;
  background: #ffffff;
`;

//여기서 각 리스트들의 css까지 정함
function Article(props) {
  return (
    <Box className="d-flex justify-content-between" style={{ width: "880px" }}>
      <div>
        <h5 style={{ fontWeight: "bold" }}>{props.title}</h5>
        <span>{props.content}</span>
      </div>
      <div>
        <img
          src={process.env.PUBLIC_URL + props.img}
          alt={`image`}
          style={{ height: "120px" }}
        />
      </div>
    </Box>
  );
}

export default Article;
