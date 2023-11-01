import MyPage from "./routes/MyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<MyPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
