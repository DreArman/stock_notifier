import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Pages from '../../constants/Pages';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
    navigate(Pages.SIGN_IN);
  };
  return (
    <main className="vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
      <form
        onSubmit={handleSubmit}
        className="w-25 p-4 bg-body-primary rounded-3"
      >
        <img
          className="mb-4"
          src="https://cdn-icons-png.flaticon.com/512/17473/17473639.png"
          alt=""
          width="80"
          height="80"
        />
        <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Name Surname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Surname Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
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
      </form>
    </main>
  );
};

export default Register;
