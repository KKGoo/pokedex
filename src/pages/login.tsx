import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/login.scss";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate fields
    if (username.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email",
        confirmButtonText: "Ok",
      });
      return;
    }
    if (password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your password",
        confirmButtonText: "Ok",
      });
      return;
    }

    // Make request to local file
    try {
      const response = await axios.get("./users.json");
      console.log(response.data);

      const user: User | undefined = response.data.find(
        (u: User) => u.email === username && u.password === password
      );
      console.log(user);
      if (user) {
        // create and store token
        const token = `Bearer ${btoa(`${user.email}:${user.password}`)}`;
        localStorage.setItem("token", token);
        // navigate to home page
        navigate("/home");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "You have successfully logged in.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid username or password!",
          confirmButtonText: "Try again",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while trying to log in. Please try again later.",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Login">
      <div className="Login__container">
        <form className="Form__container" onSubmit={handleLogin}>
          <h1 className="Form__header">LogIn</h1>
          <div>
            <div className="Form__input-container">
              <p className="Form__input-label">Email</p>
              <input
                className="Form__input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="Form__input-container">
              <p className="Form__input-label">Password</p>
              <div className="Form__input-wrapper">
                <input
                  className="Form__input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  className="Form__input-toggle"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
          <div className="Form__buttons">
            <button className="Form__button" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div className="backgrounds">
          <h1>
            Hello <br /> Pokemon <br /> Master!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
