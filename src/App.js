import { BrowserRouter, Routes, Route } from "react-router-dom";
import Community from './routes/Community';
import MyPage from "./routes/MyPage";
import RegistrationForm from "./routes/Login";
import Signup from "./routes/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${process.env.PUBLIC_URL}/login`}
          element={<RegistrationForm />}
        ></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/mypage`}
          element={<MyPage />}
        ></Route>
        <Route path={`${process.env.PUBLIC_URL}/community`}
          element={<Community />}></Route>
        <Route
          path={`${process.env.PUBLIC_URL}/signup`}
          element={<Signup />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
