import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Footer from "./FooterC";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic class for active nav links
  const isActive = (path) => location.pathname === path;

  const validateInputs = () => {
    if (!email || !password) {
      setError("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    setError(""); // Clear previous errors
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/Login", {
        email,
        password,
      });

      alert("Successfully logged in");
      localStorage.setItem("user", JSON.stringify(response.data));
      const { userType } = response.data;

      switch (userType) {
        case "Admin":
          navigate("/AdminHome");
          break;
        case "Ordinary":
          navigate("/HomePage");
          break;
        case "Agent":
          navigate("/AgentHome");
          break;
        default:
          navigate("/Login");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
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
            <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
              <Link to="/" className="nav-link text-light">
                Home
              </Link>
            </li>
            <li className={`nav-item ${isActive("/signup") ? "active" : ""}`}>
              <Link to="/signup" className="nav-link text-light">
                SignUp
              </Link>
            </li>
            <li className={`nav-item ${isActive("/login") ? "active" : ""}`}>
              <Link to="/login" className="nav-link text-light">
                Login
              </Link>
            </li>
          </ul>
        </Container>
      </Navbar>

      {/* Login Section */}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <h2 className="fw-bold mb-4">Login</h2>
                  <p className="text-white-50 mb-5">Access your account below</p>

                  {error && (
                    <div className="alert alert-danger text-start">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleLogin}>
                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-outline-light btn-lg px-5"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>

                  <p className="mt-3">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
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

export default Login;
