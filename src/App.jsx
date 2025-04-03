import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/Layout';
import Pages from './constants/Pages';
import Home from './pages/Home';
import Forecast from './pages/main/Forecast';
import Alert from './pages/main/Alert';
import Stocks from './pages/main/Stocks';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Verify from './pages/auth/Verify.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';
import Profile from './pages/main/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import './css/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Login, Register, Verify) */}
          <Route element={<Layout />}>
            <Route element={<PublicRoute redirectTo={Pages.ROOT} />}>
              <Route path={Pages.SIGN_IN} element={<Login />} />
              <Route path={Pages.SIGN_UP} element={<Register />} />
              <Route path={Pages.VERIFY} element={<Verify />} />
            </Route>
          </Route>

          {/* Protected Routes (Require Auth) */}
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute redirectTo={Pages.SIGN_IN} />}>
              <Route path={Pages.FORECAST} element={<Forecast />} />
              <Route path={Pages.STOCK_ALERTS} element={<Alert />} />
              <Route path={Pages.STOCKS} element={<Stocks />} />
              <Route path={Pages.PROFILE} element={<Profile />} />
            </Route>
          </Route>

          {/* Catch-all 404 route */}
          <Route element={<Layout />}>
            <Route path={Pages.ROOT} element={<Home />} />
            <Route path={Pages.DASHBOARD} element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;