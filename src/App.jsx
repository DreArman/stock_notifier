import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/main/Home";
import Header from "./components/Header"; 

// Define an enum for the pages
const Pages = {
  ROOT: "/",
  HOME: "/home",
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={Pages.ROOT} element={<Home />} />
        <Route path={Pages.HOME} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;