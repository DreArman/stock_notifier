import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Pages from "../../constants/Pages";
import Logo from "../../components/elements/Logo";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { sendEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await sendEmail(username, email); // Send email
      if (message === "Verification email sent") {
        console.log(message); // Log success message
        navigate(Pages.VERIFY, { state: { email, username, password } }); // Redirect to Verify page with state
      } else {
        setError("Unexpected response from server."); // Handle unexpected response
      }
    } catch (err) {
      setError(err.message || "Failed to send verification email."); // Display error message
    }
  };

  return (
    <main className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={(e) => {
          if (username.trim().split(/\s+/).length > 2) {
            alert("Incorrect name format. Please enter a valid name.");
            e.preventDefault();
            return;
          }
          handleSubmit(e);
        }}
        className="w-25 p-4 bg-body-primary rounded-3"
      >
        <div className="d-flex justify-content-center align-items-center mb-4">
          <Logo width={80} height={80} />
        </div>
        <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

        {error && <p className="text-danger">{error}</p>}

        <div className="form-floating">
          <input
            type="text"
            className="form-control mb-md-2"
            id="floatingName"
            placeholder="Name Surname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Name Surname</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control mb-md-2"
            id="floatingEmail"
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
        </div><br/>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign up
        </button>
        <label>
          Already have an account? <a href={Pages.SIGN_IN}>Sign in</a>
        </label>
      </form>
    </main>
  );
};

export default Register;
