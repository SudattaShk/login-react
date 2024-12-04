import React, { useState } from "react";

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Changed from username to email
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "", // Changed from username to email
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let formErrors = {};

    // Validate if fields are not empty
    if (!formData.firstName) formErrors.firstName = "First name is required.";
    if (!formData.lastName) formErrors.lastName = "Last name is required.";
    if (!formData.email) formErrors.email = "Email is required."; // Check if email is provided
    if (!formData.password) formErrors.password = "Password is required.";
    if (!formData.confirmPassword) formErrors.confirmPassword = "Please confirm your password.";

    // Password match validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match!";
    }

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform validation
    const formErrors = validateForm();
    setErrors(formErrors);

    // If no errors, proceed to register
    if (Object.keys(formErrors).length === 0) {
      onRegister(formData); // Pass formData to the onRegister function
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label> 
          <input
            type="email" // Updated to type="email"
            id="email" // Changed from username to email
            name="email" // Changed from username to email
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>} {/* Show email error if any */}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
