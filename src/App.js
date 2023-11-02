import MyPage from "./routes/MyPage";
import Login from "./routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
