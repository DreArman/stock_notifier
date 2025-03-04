import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pages from './constants/Pages';
import Home from './pages/Home';
import Forecast from './pages/main/Forecast';
import Alert from './pages/main/Alert';
import Stocks from './pages/main/Stocks';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext.jsx';
import Profile from './pages/main/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Login, Register) - Redirect if already authenticated */}
          <Route element={<PublicRoute redirectTo={Pages.ROOT} />}>
            <Route path={Pages.SIGN_IN} element={<Login />} />
            <Route path={Pages.SIGN_UP} element={<Register />} />
          </Route>

          {/* Protected Routes (Require Auth) */}
          <Route element={<ProtectedRoute redirectTo={Pages.SIGN_IN} />}>
            <Route element={<Layout />}>
              <Route path={Pages.FORECAST} element={<Forecast />} />
              <Route path={Pages.STOCK_ALERTS} element={<Alert />} />
              <Route path={Pages.STOCKS} element={<Stocks />} />
              <Route path={Pages.PROFILE} element={<Profile />} />
            </Route>
          </Route>

          {/* Catch-all 404 route (must be outside PublicRoute & ProtectedRoute) */}
          <Route element={<Layout />}>
            <Route path={Pages.ROOT} element={<Home />} />
            <Route path={Pages.DASHBOARD} element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;