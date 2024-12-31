import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";

//This is the login React component
const Login = () => {
  //Usestate is used to store data
  const [Data, setData] = useState();
  //Use state is used to toggle between login and signup
  const [currentView, setCurrentView] = useState("signup");
  //useState is used to toggle between light and dark mode
  const [colorMode, setColorMode] = useState("white");

  //A useState object that works with formdata
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //A useState array for error
  const [errors, setErrors] = useState({});

  //A useState function that detects changes in form and updates the
  //formData array
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Makes sure that the user is putting a valid email and
  //a password greater than 6
  const validate = () => {
    let validationErrors = {};

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    return validationErrors;
  };

  //This function makes sure that the form sumbits the valid data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    //Checks if any of the key value pairs in the validation
    //error return 0, and if they do then sets the
    //code to be formdata
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
            Login
          </h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label
              htmlFor="usernameOrEmail"
              style={{ color: colorMode === "dark" ? "yellow" : "black" }}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{
                backgroundColor:
                  colorMode === "dark" ? "rgb(44, 43, 43)" : "white",
                color: colorMode === "dark" ? "yellow" : "black",
              }}
            />
            {errors.usernameOrEmail && (
              <span className={styles.error}>{errors.usernameOrEmail}</span>
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

          <button
            type="submit"
            className={styles.submitButton}
            style={{ color: colorMode === "dark" ? "yellow" : "white" }}
          >
            Login
          </button>
        </form>

        <div className={styles.signupLink}>
          <p style={{ color: colorMode === "dark" ? "yellow" : "black" }}>
            Don't have an account? <a style={{ cursor: "pointer" }}>Sign up</a>
          </p>
          <p style={{ color: colorMode === "dark" ? "yellow" : "black" }}>
            Forgot your password? <a>Click here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
