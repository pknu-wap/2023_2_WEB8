import MyPage from "./routes/MyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './routes/Signup';
import Login from "./routes/Login";
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
        <Route
          path={`${process.env.PUBLIC_URL}/MyPage`}
          element={<Signup />}
        ></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
