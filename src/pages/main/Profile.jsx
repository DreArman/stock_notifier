import TelegramButton from "../../components/elements/TelegramButton";
import { setUserData } from "../../services/userService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../models/User";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  console.log(user);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    setUser(
      new User({email: user.email, username: username, telegramID: user.telegramID})
    );
    const profile =  await setUserData();
    console.log(profile);
    // console.log("Submitted Data:", formData);
  };

  const handleLinkTelegram = (code) => {
    // Handle linking Telegram with the provided code
    console.log("Linking Telegram with code:", code);
    // setTelgramID(code); /TODO 
  };

  return (
    <main className="container py-1 align-items-center justify-content-center">
      <div className="text-center">
        <h2>Edit Profile</h2>
        <p className="lead">Fill in your details below to update your profile.</p>
      </div>
      <div className="row">
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
                <label htmlFor="telegram" className="form-label">Telegram</label><br/>
                <TelegramButton telegramID={user.telegramID} onLinkTelegram={handleLinkTelegram} />
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
          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="row g-4 py-3 row-cols-lg-1">
              <div className="col-12">
                <label htmlFor="password" className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="new_password"
                  name="password"
                  placeholder="New Password"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">Repeat Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="repeat_password"
                  name="password"
                  placeholder="New Password"
                  onChange={handleChange}
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