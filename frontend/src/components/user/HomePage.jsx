import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../common/FooterC";
import Complaint from "../user/Complaint";
import Status from "../user/Status";
import "bootstrap/dist/css/bootstrap.min.css";
// Custom styles

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Complaint");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const { name } = user;
          setUserName(name);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [navigate]);

  const handleNavLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-gradient-primary shadow-sm">
        <div className="container-fluid">
          <h1 className="navbar-brand text-light">👋 Hi, {userName}</h1>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeComponent === "Complaint" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavLinkClick("Complaint")}
                >
                  📝 Complaint Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={`nav-link ${
                    activeComponent === "Status" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavLinkClick("Status")}
                >
                  📋 Status
                </NavLink>
              </li>
            </ul>
          </div>
          <button className="btn btn-gradient-danger btn-sm" onClick={Logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Body */}
      <div className="body bg-gradient-light py-5">
        <div className="container">
          {activeComponent === "Complaint" && (
            <div className="fade-in">
              <Complaint />
            </div>
          )}
          {activeComponent === "Status" && (
            <div className="fade-in">
              <Status />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;
