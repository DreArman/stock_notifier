import { useState } from "react";
import TelegramButton from "../../components/elements/TelegramButton";
import { getUserData } from "../../services/userService";

const Profile = () => {
  const [formData, setFormData] = useState({
    nameSurname: "John Doe", // Pre-fill with current name
    telegram: 99999
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile =  await getUserData();
    console.log(profile);
    // console.log("Submitted Data:", formData);
  };

  const handleLinkTelegram = (code) => {
    // Handle linking Telegram with the provided code
    console.log("Linking Telegram with code:", code);
    setFormData({ ...formData, telegram: "Linked" });
  };

  return (
    <main className="container py-1 aligh-items-center justify-content-center">
      <div className="text-center">
        <h2>Edit Profile</h2>
        <p className="lead">Fill in your details below to update your profile.</p>
      </div>
      <div className="col-lg-8 jsutify-content-center mx-auto">
        <h4 className="mb-3">Profile Information</h4>
        <form className="needs-validation mb-2" onSubmit={handleSubmit} noValidate>
          <div className="row g-4 py-3 row-cols-lg-2">
            <div className="col-12">
              <label htmlFor="nameSurname" className="form-label">Name Surname</label>
              <input
                type="text"
                className="form-control"
                id="nameSurname"
                name="nameSurname"
                placeholder="John Doe"
                value={formData.nameSurname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="telegram" className="form-label">Telegram</label><br/>
              <TelegramButton telegramID={formData.telegram} onLinkTelegram={handleLinkTelegram} />
            </div>
          </div>
          <hr className="my-4" />
          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Save Changes
          </button>
        </form>
        <h4 className="mb-3">Change Password</h4>
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="row g-4 py-3 row-cols-lg-2">
            <div className="col-12">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
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
                id="password"
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
    </main>
  );
};

export default Profile;