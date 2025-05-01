import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail, register } from "../../services/authService";
import Pages from "../../constants/Pages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
    const [code, setCode] = useState(new Array(6).fill(""));
    const [submitDisabled, setSubmitDisabled] = useState(false); // State to disable buttons
    const location = useLocation();
    const navigate = useNavigate();
    const { email, username, password } = location.state || {}; // Extract email, username, and password from location state   

    // Redirect to Register if required data is missing
    useEffect(() => {
        if (!email || !username || !password) {
            navigate(Pages.SIGN_UP); // Redirect to the Register page
        }
    }, [email, username, password, navigate]);

    const handleInputChange = (value, index) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = parseInt(code.join("")); // Combine the 6 digits into a single integer
        setSubmitDisabled(true); // Disable buttons after submission starts
        try {
            await verifyEmail(email, verificationCode); // Verify the code
        } catch (err) {
            toast.error(err.message || "Verification failed. Please check the code and try again."); // Specific error for verification
            setSubmitDisabled(false); // Re-enable buttons if verification fails
            return;
        }

        try {
            const data = await register(username, email, password); // Register the user on successful verification
            toast.success(data.message, {
                autoClose: 1000, // Decrease the toast display time to 2 seconds
                onClose: () => setTimeout(() => navigate(Pages.SIGN_IN)), // Redirect to the login page after 2 seconds
            });
        } catch (err) {
            toast.error(err.message || "Registration failed. Please try again later."); // Specific error for registration
            setSubmitDisabled(false); // Re-enable buttons if registration fails
            return;
        }
    };

    return (
        <main className="container d-flex flex-column justify-content-center align-items-center vh-100 w-25">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <h2 className="text-center mb-4">
                    Please enter the 6-digit verification code sent to your email.
                </h2>

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
                            onPaste={(e) => {
                                e.preventDefault(); // Prevent default paste behavior
                                const pastedData = e.clipboardData.getData("text").replace(/\D/g, ""); // Remove non-numeric characters
                                const newCode = [...code];
                                pastedData.split("").forEach((char, i) => {
                                    if (i < 6) newCode[i] = char; // Distribute characters across inputs
                                });
                                setCode(newCode); // Update the code state
                            }}
                            disabled={submitDisabled} // Disable input fields if submission is successful
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={submitDisabled} // Disable submit button if submission is successful
                >
                    Submit
                </button>
            </form>
        </main>
    );
};

export default Verify;