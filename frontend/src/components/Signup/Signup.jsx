import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for error
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const nameOnchange = (e) => {
    setName(e.target.value);
    name.length > 4 ? setNameError(false) : setNameError(true);
  };

  const emailOnchange = (e) => {
    setEmail(e.target.value);
    let validRegex =
      /^[a-z]{2}[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,20}@[a-z]{3,12}.com$/;
    if (e.target.value.match(validRegex)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const passwordOnchange = (e) => {
    setPassword(e.target.value);
    password.length >= 8 ? setPassError(false) : setPassError(true);
  };

  // On submit Handler
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "/api/register",
        { name, email, password },
        config
      );
      navigate("/profile");
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 500) {
        alert(error.response.data.message);
      }
      console.log(error.response.data.message);
    }

    console.log("Signup Form Submited");
  };

  return (
    <>
      <div className="container ">
        <div className="row ">
          <div className="col-12 col-md-10 col-lg-7 col-xl-5 mx-auto border border-3 m-5 p-5 ">
            <h1 className="text-center border-bottom border-4 border-info rounded-3 p-1">
              SignUp
            </h1>
            <form
              onSubmit={onSubmitForm}
              action=""
              className="d-flex flex-column justify-content-center align-items-center "
            >
              {/* Name */}
              <div className="col-10 m-2 d-flex flex-column justify-content-center align-items-end ">
                <div className="border-bottom border-3 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                  <input
                    type="text"
                    id="name"
                    className="border-0 mx-2 fs-3"
                    placeholder="Enter Your Name"
                    required
                    style={{ outline: "none" }}
                    value={name}
                    onChange={nameOnchange}
                  />
                </div>
                <div className="">
                  {nameError ? (
                    <p className="text-danger">Name too short !</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* Email */}
              <div className="col-10 m-2 d-flex flex-column justify-content-center align-items-end ">
                <div className="border-bottom border-3 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faEnvelope} size="2x" />
                  <input
                    type="email"
                    id="email"
                    className="border-0 mx-2 fs-3"
                    placeholder="Enter Your Email"
                    required
                    style={{ outline: "none" }}
                    value={email}
                    onChange={emailOnchange}
                  />
                </div>
                <div className="">
                  {emailError ? (
                    <p className="text-danger">Enter valid email !</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* password */}
              <div className="col-10 mb-2 d-flex flex-column justify-content-center align-items-end">
                <div className="border-bottom border-3 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faLock} size="2x" />
                  <input
                    type="password"
                    id="password"
                    className="border-0 mx-2 fs-3"
                    placeholder="Enter Your Password"
                    required
                    style={{ outline: "none" }}
                    value={password}
                    onChange={passwordOnchange}
                  />
                </div>
                <div className="">
                  {passError ? (
                    <p className="text-danger">
                      Password should be greater than 8 characters !
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* button */}
              <button
                type="submit"
                className={`btn  ${
                  nameError || emailError || passError
                    ? "btn-secondary disabled"
                    : "btn-primary"
                }`}
              >
                Register
              </button>
              {/* Moved to the Login component */}
              <NavLink
                className="nav-link text-end mt-3 border-bottom border-2 text-secondary "
                to="/login"
              >
                Already have an account?
                <span className="text-primary fs-6 fst-italic mx-1 px-3 pb-1 border rounded-pill bg-success text-white">
                  Login
                </span>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
