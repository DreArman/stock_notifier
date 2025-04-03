import { useState } from "react";
// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail, sendEmail, register } from "../../services/authService";
import Pages from "../../constants/Pages";

const Verify = () => {
    const [code, setCode] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const [resendDisabled, setResendDisabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { email, username, password } = location.state || {};

    // useEffect(() => {
    //     if (!email || !username || !password) {
    //       navigate(Pages.SIGN_UP); // Redirect to the Register page
    //     }
    // }, [email, username, password, navigate]);

    const handleInputChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join(""); // Combine the 6 digits into a single string
        try {
            await verifyEmail(email, verificationCode); // Verify the code
            await register(username, email, password); // Register the user on successful verification
            navigate(Pages.SIGN_IN); // Redirect to the login page on success
        } catch (err) {
            setError(err); // Display error message
        }
    };

    const handleResend = async () => {
        try {
            setResendDisabled(true); // Disable resend button for 1 minute
            await sendEmail(username, email); // Resend the code
            setTimeout(() => setResendDisabled(false), 60000); // Re-enable after 1 minute
        } catch (err) {
            setError(err); // Display error message
        }
    };

    return (
        <main className="container d-flex flex-column justify-content-center align-items-center vh-100 w-25">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <h2 className="text-center mb-4">
                    Please enter the 6-digit verification code sent to your email.
                </h2>

                {error && <p className="text-danger">{error}</p>}

                <div className="d-flex gap-2 mb-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="form-control text-center"
                            style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
                            value={code[index]}
                            onChange={(e) => {
                                const input = e.target;
                                handleInputChange(input.value.slice(0, 1), index); // Update the code array
                                if (input.nextElementSibling && input.value) {
                                    input.nextElementSibling.focus(); // Move to the next input
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && !e.target.value && e.target.previousElementSibling) {
                                    e.target.previousElementSibling.focus(); // Move to the previous input
                                }
                            }}
                        />
                    ))}
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Submit
                </button>
                <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={handleResend}
                    disabled={resendDisabled}
                >
                    Resend Code
                </button>
            </form>
        </main>
    );
};

export default Verify;