import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  // On Change Handler
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/login",
        { email, password },
        config
      );

      navigate("/profile");
      console.log(data);
    } catch (error) {
      error ? setIsError(true) : setIsError(false);
      console.log(error);
    }

    console.log("Login Form Submited");
  };

  return (
    <>
      <div className="container ">
        <div className="row ">
          <div className="col-12 col-md-10 col-lg-7 col-xl-5 mx-auto border border-3 m-5 p-5 ">
            <h1 className="text-center border-bottom border-4 border-info rounded-3 p-1">
              Login
            </h1>
            <form
              onSubmit={onSubmitForm}
              action=""
              className="d-flex flex-column justify-content-center align-items-center"
            >
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
                    onChange={(e) => setEmail(e.target.value)}
                    onSelect={() => setIsError(false)}
                  />
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
                    onChange={(e) => setPassword(e.target.value)}
                    onSelect={() => setIsError(false)}
                  />
                </div>
                <div className="">
                  {isError ? (
                    <p className="text-danger">Invalid Credential!</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* button */}
              <button
                type="submit"
                className="btn btn-success border btn-outline-light rounded-pill w-25 shadow-lg "
              >
                Login
              </button>
              {/* Moved to the Register component */}
              <NavLink
                className="nav-link text-end mt-3 border-bottom border-2 text-secondary "
                to="/register"
              >
                Don't have an account?
                <span className="text-primary fs-6 fst-italic mx-1 px-3 pb-1 border rounded-pill bg-info text-white">
                  Register
                </span>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
