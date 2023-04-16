import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUnlock,
  faUnlockKeyhole,
} from "@fortawesome/free-solid-svg-icons";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error message
  const [errorMessage, setErrorMessage] = useState("");

  // event change handler
  const oldpassOnchange = (e) => {
    setOldPassword(e.target.value);
  };

  const newpassOnchange = (e) => {
    setNewPassword(e.target.value);
  };

  const confirmpassOnchange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // On submit Handler
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put(
        "/api/profile/change-password",
        { oldPassword, newPassword, confirmPassword },
        config
      );
      navigate("/profile");
      console.log(res);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      alert(error.response.data.message);
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
              {/* old password */}
              <div className="col-10 my-2 d-flex flex-column justify-content-center align-items-end">
                <div className="border-bottom border-3 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faUnlock} size="2x" />
                  <input
                    type="password"
                    id="oldPassword"
                    className="border-0 mx-2 fs-3"
                    placeholder="Old Password"
                    required
                    style={{ outline: "none" }}
                    value={oldPassword}
                    onChange={oldpassOnchange}
                  />
                </div>
              </div>
              {/* new password */}
              <div className="col-10 my-2 d-flex flex-column justify-content-center align-items-end">
                <div className="border-bottom border-3 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faUnlockKeyhole} size="2x" />
                  <input
                    type="password"
                    id="newPassword"
                    className="border-0 mx-2 fs-3"
                    placeholder="New Password"
                    required
                    style={{ outline: "none" }}
                    value={newPassword}
                    onChange={newpassOnchange}
                  />
                </div>
              </div>
              {/* comfirm password */}
              <div className="col-10 my-2 d-flex flex-column justify-content-center align-items-end">
                <div className="border-bottom border-3 d-flex justify-content-start align-items-center">
                  <FontAwesomeIcon icon={faLock} size="2x" />
                  <input
                    type="password"
                    id="confirmPassword"
                    className="border-0 mx-2 fs-3"
                    placeholder="Confirm Password"
                    required
                    style={{ outline: "none" }}
                    value={confirmPassword}
                    onChange={confirmpassOnchange}
                  />
                </div>
                <div className="">
                  <p className="text-danger">
                    {errorMessage ? errorMessage : ""}
                  </p>
                </div>
              </div>
              {/* button */}
              <button
                type="submit"
                className={`btn ${
                  newPassword.length >= 8 && confirmPassword.length >= 8
                    ? "btn-success"
                    : "btn-secondary disabled"
                } `}
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
