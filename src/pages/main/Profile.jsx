import TelegramButton from "../../components/elements/TelegramButton";
import { setUserData, changeUserPassword } from "../../services/userService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../models/User";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(user.telegramID);
  const [dontAskAgain, setDontAskAgain] = useState(localStorage.getItem('dontAskAgain') === 'true');

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDontAskAgainChange = (e) => {
    setDontAskAgain(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('dontAskAgain', dontAskAgain);
    const data = await setUserData(username, code);
    if (data && data.message === "User info changed") {
      toast.success("User info changed successfully!");
    }
    console.log(data);
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
    const data = await changeUserPassword(oldPassword, newPassword);
    console.log(data);
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
          <form className="needs-validation mb-2" onSubmit={handleSubmit} noValidate>
            <div className="row g-4 py-3 row-cols-lg-1">
              <div className="col-12">
                <label htmlFor="nameSurname" className="form-label">Name Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="nameSurname"
                  name="nameSurname"
                  placeholder="John Doe"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="confirm" className="form-label mt-1 mb-2">Ask for confirmation of delete action</label><br/>
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
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="telegram" className="form-label">Telegram</label><br/>
                <TelegramButton telegramID={code} setCode={setCode} />
              </div>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Save Changes
            </button>
          </form>
        </div>
        <div className="col-lg-6" >
          <h4 className="mb-3">Change Password</h4>
          <form className="needs-validation" onSubmit={handlePasswordSubmit} noValidate>
            <div className="row g-4 py-3 row-cols-lg-1">
              <div className="col-12">
                  <label htmlFor="password" className="form-label">Old Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="old_password"
                    name="password"
                    placeholder="Old Password"
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="new_password"
                    name="password"
                    placeholder="New Password"
                    required={password ? true : false}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">Repeat Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="repeat_password"
                    name="password"
                    placeholder="Repeat Password"
                    required={password ? true : false}
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