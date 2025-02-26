import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
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
  console.log(isAuthenticated);
  if (isAuthenticated()) {
    return (
      <Router>
        <Header />
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