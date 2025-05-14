import PropTypes from "prop-types";
import { toast } from "react-toastify";

const PriceChangeInput = ({ percentage, setPercentage, significant, setSignificantChanges }) => {
  const handlePercentageChange = async (value) => {
    const validatedValue = Math.max(5, Math.min(parseInt(value, 10) || 5, 100)); // Clamp value between 5 and 100

    // If the value is the same as the current percentage, do nothing
    if (validatedValue === percentage) {
      return;
    }

    setPercentage(validatedValue); // Update the state with the validated value

    // Call setSignificantChanges to save the updated percentage
    try {
      await setSignificantChanges(significant, validatedValue);
      toast.success("Significant Changes percentage updated!",
        {
          autoClose: 1000, // Decrease the toast display time to 2 seconds
          // onClose: () => setTimeout(() => window.location.reload(), 2000), // Reload the page after 2 seconds
        }
      );
    } catch (error) {
      console.error("Error updating Significant Changes percentage:", error);
      toast.error("Failed to update percentage. Please try again.", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Price Change Percentage</label>
      <input
        type="number"
        className="form-control"
        placeholder="Enter percentage (5-100)"
        value={percentage || ""}
        onChange={(e) => setPercentage(e.target.value)} // Update percentage state locally
        onBlur={() => handlePercentageChange(percentage)} // Call the function on blur
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handlePercentageChange(percentage); // Call the function on Enter
          }
        }}
      />
      <p className="text-muted mt-1">
        Set the percentage change for significant price alerts.
      </p>
    </div>
  );
};

PriceChangeInput.propTypes = {
  percentage: PropTypes.number.isRequired,
  setPercentage: PropTypes.func.isRequired,
  significant: PropTypes.bool.isRequired,
  setSignificantChanges: PropTypes.func.isRequired,
};

export default PriceChangeInput;