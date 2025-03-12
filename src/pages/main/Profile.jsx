import TelegramButton from "../../components/elements/TelegramButton";
import { setUserData } from "../../services/userService";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User } from "../../models/User";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(user.telegramID);
  console.log(user);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(
      new User({email: user.email, username: username, telegramID: code})
    );
    const data =  await setUserData(user);
    console.log(data);
  };

  const handlePasswordSubmit = async (e) => { 
    e.preventDefault();
    console.log("Submitted Password:", password);
  };

  return (
    <main className="container pt-5 w-50 align-items-center justify-content-center">
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