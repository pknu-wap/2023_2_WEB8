import MyPage from "./routes/MyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './routes/Signup';
import Login from "./routes/Login";
function App() {
  return (
    <div>
      <Signup />
    </div>
  );
}

export default App;
