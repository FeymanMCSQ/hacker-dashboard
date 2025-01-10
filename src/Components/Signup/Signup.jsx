import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";

const SignUp = ({ setShowSignIn }) => {
  const [Data, setData] = useState();
  const [currentView, setCurrentView] = useState("signup");
  const [colorMode, setColorMode] = useState("white");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        setData({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      } catch (error) {
        console.error(
          "Error during signup:",
          error.response?.data?.message || error.message
        );
        // Check for specific error messages from backend
        if (error.response?.data?.message) {
          setErrors({ general: error.response.data.message });
        } else {
          setErrors(validationErrors);
        }
      }

      try {
        const response = await fetch("http://localhost:3001/api/signup", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Sign Up successful");
          setShowSignIn(false);
        } else {
          const errorData = await response.json();
          alert(`Signup Failed: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error during Signup", error);
        alert("An error occured, please try again");
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const handleRegistration = async () => {
    try {
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div
      className={styles.main}
      style={{
        backgroundColor: colorMode === "dark" ? "rgb(44, 43, 43)" : "white",
      }}
    >
      <div
        className={styles.formContainer}
        style={{ backgroundColor: colorMode === "dark" ? "black" : "white" }}
      >
        <div className={styles.header}>
          <h2 style={{ color: colorMode === "dark" ? "yellow" : "black" }}>
            SignUp
          </h2>
        </div>
        {errors.general && (
          <span className={styles.error}>{errors.general}</span>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label
              htmlFor="username"
              style={{ color: colorMode === "dark" ? "yellow" : "black" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              style={{
                backgroundColor:
                  colorMode === "dark" ? "rgb(44, 43, 43)" : "white",
                color: colorMode === "dark" ? "yellow" : "black",
              }}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label
              htmlFor="email"
              style={{ color: colorMode === "dark" ? "yellow" : "black" }}
            >
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={{
                backgroundColor:
                  colorMode === "dark" ? "rgb(44, 43, 43)" : "white",
                color: colorMode === "dark" ? "yellow" : "black",
              }}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label
              htmlFor="password"
              style={{ color: colorMode === "dark" ? "yellow" : "black" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              style={{
                backgroundColor:
                  colorMode === "dark" ? "rgb(44, 43, 43)" : "white",
                color: colorMode === "dark" ? "yellow" : "black",
              }}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label
              htmlFor="confirmPassword"
              style={{ color: colorMode === "dark" ? "yellow" : "black" }}
            >
              Retype the password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Retype your password"
              required
              style={{
                backgroundColor:
                  colorMode === "dark" ? "rgb(44, 43, 43)" : "white",
                color: colorMode === "dark" ? "yellow" : "black",
              }}
            />
            {errors.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            style={{ color: colorMode === "dark" ? "yellow" : "white" }}
          >
            Sign Up
          </button>
        </form>
        <div className={styles.loginLink}>
          <p style={{ color: colorMode === "dark" ? "yellow" : "black" }}>
            Already have an account? <a style={{ cursor: "pointer" }}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
