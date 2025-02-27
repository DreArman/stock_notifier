import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pages from "./constants/Pages";
import Home from "./pages/main/Home";
import Forecast from "./pages/main/Forecast";
import Alert from "./pages/main/Alert";
import Stocks from "./pages/main/Stocks";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import { isAuthenticated } from "./utils/auth.js";
import Profile from "./pages/main/Profile.jsx";


function App() {
  const isAuth = isAuthenticated();
  return (
    <Router>
      <Routes>
        {/* Public Routes (Login, Register) - Redirect if already authenticated */}
        <Route element={<PublicRoute isAuth={isAuth} redirectTo={Pages.DASHBOARD} />}>
          <Route element={<Layout isAuth={isAuth} />}>
            <Route path={Pages.ROOT} element={<Login />} />
            <Route path={Pages.SIGN_IN} element={<Login />} />
            <Route path={Pages.SIGN_UP} element={<Register />} />
          </Route>
        </Route>

        {/* Protected Routes (Require Auth) */}
        <Route element={<ProtectedRoute isAuth={isAuth} redirectTo={Pages.SIGN_IN} />}>
          <Route element={<Layout isAuth={isAuth} />}>
            <Route path={Pages.DASHBOARD} element={<Home />} />
            <Route path={Pages.FORECAST} element={<Forecast />} />
            <Route path={Pages.STOCK_ALERTS} element={<Alert />} />
            <Route path={Pages.STOCKS} element={<Stocks />} />
            <Route path={Pages.PROFILE} element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;