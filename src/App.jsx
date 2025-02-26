import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pages from "./constants/Pages";
import Home from "./pages/main/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import { isAuthenticated } from "./utils/auth.js";


function App() {
  const isAuth = isAuthenticated();
  return (
    <Router>
      <Routes>
        {/* Public Routes (Login, Register) - Redirect if already authenticated */}
        <Route element={<PublicRoute isAuth={isAuth} redirectTo={Pages.HOME} />}>
          <Route element={<Layout isAuth={isAuth} />}>
            <Route path={Pages.ROOT} element={<Login />} />
            <Route path={Pages.LOGIN} element={<Login />} />
            <Route path={Pages.REGISTER} element={<Register />} />
          </Route>
        </Route>

        {/* Protected Routes (Require Auth) */}
        <Route element={<ProtectedRoute isAuth={isAuth} redirectTo={Pages.LOGIN} />}>
          <Route element={<Layout isAuth={isAuth} />}>
            <Route path={Pages.HOME} element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;