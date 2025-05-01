import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Pages from '../../constants/Pages';
import Logo from '../../components/elements/Logo';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (e) {
      console.error("Login error:", e);
      toast.error(e);
    }
  };

  return (
    <main className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <ToastContainer />
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
          <form onSubmit={handleSubmit} className="p-4 rounded-4 shadow">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <Logo width={80} height={80} />
            </div>
            <h1 className="h3 mb-3 fw-normal text-center">Please Sign In</h1>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>

            <div className="mt-3 text-center">
              <label>
                Don&apos;t have an account? <a href={Pages.SIGN_UP}>Sign up</a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
