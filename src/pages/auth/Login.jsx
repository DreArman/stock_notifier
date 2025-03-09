import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Pages from '../../constants/Pages';
import Logo from '../../components/elements/Logo';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
      <form
        onSubmit={handleSubmit}
        className="w-25 p-4 bg-body-primary rounded-3"
      >
        <div className="d-flex justify-content-center">
          <Logo width={80} height={80} />
        </div>
        <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control mb-md-2"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-md-2">
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

        <div className="form-check text-start my-3">
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
        <label>Don&apos;t have account? <a href={Pages.SIGN_UP}>Sign up</a></label>
      </form>
    </main>
  );
};

export default Login;
