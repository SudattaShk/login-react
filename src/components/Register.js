import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateForm = () => {
    let formErrors = {};

    // Validate fields
    if (!formData.firstName) formErrors.firstName = "First name is required.";
    if (!formData.lastName) formErrors.lastName = "Last name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    if (!formData.confirmPassword) formErrors.confirmPassword = "Confirm password is required.";

    // Check password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match!";
    }

    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email address.";
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // If no errors, proceed with registration
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = storedUsers.some((user) => user.email === formData.email);

      if (userExists) {
        alert("User already exists!");
      } else {
        // Save user to localStorage
        storedUsers.push(formData);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        localStorage.setItem("currentUser", JSON.stringify(formData));

        // Update the Redux store
        dispatch(setUser(formData));
        alert("User registered successfully!");
      }
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
        <div className="input-group">
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

        <div className="input-group">
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

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
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

        <div className="input-group">
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
