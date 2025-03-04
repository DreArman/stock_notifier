import { useState } from "react";

const Profile = () => {
    const [formData, setFormData] = useState({
        nameSurname: "",
        username: "",
        telegram: "",
        password: ""
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
      };
    
      return (
        <main className="container py-5">
          <div className="text-center">
            <h2>Checkout Form</h2>
            <p className="lead">Fill in your details below to proceed with checkout.</p>
          </div>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing Information</h4>
              <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="nameSurname" className="form-label">Full Name</label>
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
                    <label htmlFor="username" className="form-label">Username</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
    
                  <div className="col-12">
                    <label htmlFor="telegram" className="form-label">Telegram Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="telegram"
                      name="telegram"
                      placeholder="@yourtelegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      required
                    />
                  </div>
    
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">Change Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Continue to Checkout
                </button>
              </form>
            </div>
          </div>
        </main>
      );
    };

export default Profile;