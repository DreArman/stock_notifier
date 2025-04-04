import TelegramButton from "../../components/elements/TelegramButton";
import { setUserData, changeUserPassword } from "../../services/userService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
// import { User } from "../../models/User";
import { getUserData } from '../../services/userService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user.username.split(" "));
  const [code, setCode] = useState(user.telegramID);
  const [password, setPassword] = useState("");
  
  const handleChangeName = (e) => {
    setFullName((prev) => [e.target.value, prev[1]]);
  };
  
  const handleChangeSurname = (e) => {
    setFullName((prev) => [prev[0], e.target.value]);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  // const [dontAskAgain, setDontAskAgain] = useState(localStorage.getItem('dontAskAgain') === 'true');
  // const handleDontAskAgainChange = (e) => {
  //   setDontAskAgain(e.target.checked);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = fullName.join(" ");
    try {
      const data = await setUserData(username, code);
      if (data && data.message === "User info changed") {
        
        const userData = await getUserData();
        if (userData) {
          console.log(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          // setUser(User.fromJson(userData));
          // setCode(userData.user_telegram_id);
          toast.success(data.message, {
            autoClose: 1000, // Decrease the toast display time to 2 seconds
            onClose: () => setTimeout(() => window.location.reload()),
          });
        }
      } 
      else {
        toast.error(data.message)
      }
    }
    catch (e) {
      toast.error(e || "An error occurred while saving the data.", { autoClose: 1000 })
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.old_password.value;
    const newPassword = e.target.new_password.value;
    const repeatPassword = e.target.repeat_password.value;
    if (newPassword !== repeatPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    // Call the function to change the password here
    try {
      const data = await changeUserPassword(oldPassword, newPassword);
      console.log(data);
      if (data && data.message === "User password changed"){
        toast.success(data.message, {
          autoClose: 1000, // Decrease the toast display time to 2 seconds
          onClose: () => setTimeout(() => window.location.reload()),
        });
      }
    } 
    catch (e){
      toast.error(e || "An error occurred while changing the password.", { autoClose: 1000 })
    }
  };

  return (
    <main className="container pt-5 w-50 align-items-center justify-content-center">
      <ToastContainer />
      <div className="text-center">
        <h2>Edit Profile</h2>
        <p className="lead">Fill in your details below to update your profile.</p>
      </div>
      <div className="row d-flex">
        <div className="col-lg-6">
          <h4 className="mb-3">Profile Information</h4>
          <form className="needs-validation mb-2" 
            onSubmit={(e) => {
              if (fullName[0].trim().split(/\s+/).length > 1) {
                toast.error("Incorrect name format. Please enter a valid name.");
                e.preventDefault();
                return;
              }
              if (fullName[1].trim().split(/\s+/).length > 1) {
                toast.error("Incorrect name format. Please enter a valid name.");
                e.preventDefault();
                return;
              }
              handleSubmit(e);
            }}>
            <div className="row g-4 py-3 row-cols-lg-1">
              <div className="col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={fullName[0]}
                  onChange={handleChangeName}
                  required
                />
              </div>

              <div className="col-12">
              <label htmlFor="surname" className="form-label">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  name="surname"
                  placeholder="Surname"
                  value={fullName[1]}
                  onChange={handleChangeSurname}
                  required
                />
                {/* <label htmlFor="confirm" className="form-label mt-1 mb-2">Ask for confirmation of delete action</label><br />
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="dontAskAgain"
                    checked={dontAskAgain}
                    onChange={handleDontAskAgainChange}
                  />
                  <label className="form-check-label" htmlFor="dontAskAgain">
                    Don&apos;t ask me again
                  </label>
                </div> */}
              </div>

              <div className="col-12">
                <label htmlFor="telegram" className="form-label">Telegram</label><br />
                <TelegramButton telegramID={code} setCode={setCode} required/>
              </div>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Save Changes
            </button>
          </form>
        </div>
        <div className="col-lg-6">
          <h4 className="mb-3">Change Password</h4>
          <form className="needs-validation" onSubmit={handlePasswordSubmit}>
            <div className="row g-4 py-3 row-cols-lg-1">
              <div className="col-12">
                <label htmlFor="old_password" className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="old_password"
                  placeholder="Old Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="new_password" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="new_password"
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="repeat_password" className="form-label">Repeat Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="repeat_password"
                  placeholder="Repeat Password"
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;