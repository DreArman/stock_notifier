import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pages from "../../constants/Pages";
import Logo from "../../components/elements/Logo";
import { sendEmail } from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendEmail(username, email);
      console.log(data);
      if (data && data.message === "Verification email sent") {
        navigate(Pages.VERIFY, { state: { email, username, password } });
      }
    } catch (err) {
      toast.error(err || "Failed to send verification email.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <main className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
      <ToastContainer />
      <div className="row w-100 justify-content-center">
        <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4 col-xxl-3">
          <form
            onSubmit={(e) => {
              if (username.trim().split(/\s+/).length > 2) {
                toast.error("Incorrect name format. Please enter a valid name.", {
                  autoClose: 1000,
                });
                e.preventDefault();
                return;
              }
              handleSubmit(e);
            }}
            className="p-4 rounded-4 shadow"
          >
            <div className="d-flex justify-content-center align-items-center mb-4">
              <Logo width={80} height={80} />
            </div>
            <h1 className="h3 mb-3 fw-normal text-center">Please Sign Up</h1>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Name Surname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="floatingName">Name Surname</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingEmail">Email address</label>
            </div>

            <div className="form-floating mb-4">
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

            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign up
            </button>

            <div className="mt-3 text-center">
              <label>
                Already have an account? <a href={Pages.SIGN_IN}>Sign in</a>
              </label>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
