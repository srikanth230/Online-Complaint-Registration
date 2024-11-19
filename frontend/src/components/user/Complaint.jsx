import axios from "axios";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userComplaint, setUserComplaint] = useState({
    userId: user._id,
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    status: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      userId: user._id,
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      status: "",
      comment: "",
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await axios.post(
        `http://localhost:8000/Complaint/${user._id}`,
        userComplaint
      );
      alert("Your Complaint has been submitted successfully!");
      setMessage("Your complaint was submitted successfully!");
      handleClear();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
      setMessage("Failed to submit your complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg bg-dark text-white">
        <div className="card-header text-center">
          <h3>Submit Your Complaint</h3>
          <p className="text-muted">We value your feedback and concerns</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                value={userComplaint.name}
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                name="address"
                onChange={handleChange}
                value={userComplaint.address}
                type="text"
                className="form-control"
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                name="city"
                onChange={handleChange}
                value={userComplaint.city}
                type="text"
                className="form-control"
                placeholder="Enter your city"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                name="state"
                onChange={handleChange}
                value={userComplaint.state}
                type="text"
                className="form-control"
                placeholder="Enter your state"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                name="pincode"
                onChange={handleChange}
                value={userComplaint.pincode}
                type="text"
                className="form-control"
                placeholder="Enter your area pincode"
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                name="status"
                onChange={handleChange}
                value={userComplaint.status}
                type="text"
                className="form-control"
                placeholder="e.g., pending"
                required
              />
            </div>

            <div className="col-12">
              <label htmlFor="comment" className="form-label">
                Description
              </label>
              <textarea
                name="comment"
                onChange={handleChange}
                value={userComplaint.comment}
                className="form-control"
                rows="4"
                placeholder="Describe your complaint in detail"
                required
              ></textarea>
            </div>

            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg ms-3"
                onClick={handleClear}
                disabled={isSubmitting}
              >
                Clear
              </button>
            </div>
          </form>

          {message && (
            <div className="alert alert-info text-center mt-3">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaint;
