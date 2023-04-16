import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UpdateProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // for error
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // on change event
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

  // On submit Handler
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put("/api/profile", { name, email }, config);
      navigate("/profile");
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 500) {
        alert(error.response.data.message);
      }
      console.log(error.response.data.message);
    }

    console.log("Update Profile Form Submited");
  };

  return (
    <>
      <div className="container ">
        <div className="row ">
          <div className="col-12 col-md-10 col-lg-7 col-xl-5 mx-auto border border-3 m-5 p-5 ">
            <h1 className="text-center border-bottom border-4 border-info rounded-3 p-1">
              Update Profile
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
                    <p className="text-danger">Name too short!</p>
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

              {/* button */}
              <button
                type="submit"
                className={`btn  ${
                  nameError || emailError
                    ? "btn-secondary disabled"
                    : "btn-success"
                }`}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
