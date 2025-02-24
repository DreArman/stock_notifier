import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

// Define an enum for the pages
const Pages = {
  ROOT: "/",
  HOME: "/home",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path={Pages.ROOT} element={<Home />} />
        <Route path={Pages.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;