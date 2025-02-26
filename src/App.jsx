import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { isAuthenticated } from "./utils/auth.js";

// Define an enum for the pages
const Pages = {
  ROOT: "/",
  HOME: "/home",
  LOGIN: "/login",
  REGISTER: "/register",
};

function App() {
  if (isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path={Pages.ROOT} element={<Home />} />
          <Route path={Pages.HOME} element={<Home />} />
          <Route path={Pages.LOGIN} element={<Login />} />
          <Route path={Pages.REGISTER} element={<Register />} />
        </Routes>
      </Router>
    )
  }
  return (
    <Router>
      <Routes>
        <Route path={Pages.ROOT} element={<Login />} />
        <Route path={Pages.LOGIN} element={<Login />} />
        <Route path={Pages.REGISTER} element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;