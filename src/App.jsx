import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Headers from "./components/Headers"; 

// Define an enum for the pages
const Pages = {
  ROOT: "/",
  HOME: "/home",
};

function App() {
  return (
    <Router>
      <Headers />
      <Routes>
        <Route path={Pages.ROOT} element={<Home />} />
        <Route path={Pages.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;