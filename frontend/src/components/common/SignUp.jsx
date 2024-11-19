import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./FooterC";

const SignUp = () => {
  const [title, setTitle] = useState("Select User Type");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleTitle = (select) => {
    setTitle(select);
    setUser({ ...user, userType: select });
  };

  const validateForm = () => {
    if (!user.name || !user.email || !user.password || !user.phone || !user.userType) {
      setError("All fields are required. Please fill out the entire form.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (!/^\d{10}$/.test(user.phone)) {
      setError("Mobile number must be 10 digits.");
      return false;
    }
    setError(""); // Clear previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/SignUp", user);
      alert("Registration successful!");
      setUser({ name: "", email: "", password: "", phone: "", userType: "" });
    } catch (err) {
      setError("Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ResolveX</Navbar.Brand>
          <ul className="navbar-nav">
            <li className="nav-item mb-2">
              <Link to={"/"} className="nav-link text-light">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to={"/signup"} className="nav-link text-light">
                SignUp
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to={"/login"} className="nav-link text-light">
                Login
              </Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* SignUp Section */}
      <section className="gradient-custom py-5">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <h2 className="fw-bold mb-4">Sign Up</h2>
                  <p className="text-white-50 mb-4">
                    Please fill in the details to create your account.
                  </p>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Enter your full name"
                        required
                      />
                      <label className="form-label">Full Name</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Enter your email"
                        required
                      />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Create a strong password"
                        required
                      />
                      <label className="form-label">Password</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        placeholder="Enter your mobile number"
                        required
                      />
                      <label className="form-label">Mobile No.</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="secondary"
                          className="w-100"
                          id="dropdown-basic"
                        >
                          {title}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleTitle("Ordinary")}>
                            Ordinary
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleTitle("Admin")}>
                            Admin
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleTitle("Agent")}>
                            Agent
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <label className="form-label mt-2">User Type</label>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Register"}
                    </button>
                  </form>

                  <p className="mt-4">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-light fw-bold">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SignUp;
