import MyPage from "./routes/MyPage";
import Login from "./routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/Login`}
          element={<Login />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/MyPage`}
          element={<MyPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
