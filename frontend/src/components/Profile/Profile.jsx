import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/api/profile");
      setUserData(data.user);
    }
    fetchData();
  }, []);

  // console.log(userData);

  const onClickLogout = async () => {
    try {
      const res = await axios.get("api/logout");
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-7 mx-auto">
            <h1 className="text-center text-info border-3 border-success border-bottom rounded-pill shadow py-2">
              My Profile
            </h1>
          </div>

          {/* name */}
          <div className="col-10 col-md-7 mx-auto d-flex flex-column flex-md-row justify-content-start align-items-start mt-3">
            <h2 className="">Name:</h2>
            <p className="fs-3 ms-2">{userData ? userData.name : "loading"}</p>
          </div>

          {/* email */}
          <div className="col-10 col-md-7 mx-auto d-flex flex-column flex-md-row justify-content-start align-items-start mt-3 ">
            <h2 className="">Email:</h2>
            <p className="fs-3 ms-2">{userData ? userData.email : "loading"}</p>
          </div>

          {/* name */}
          <div className="col-10 col-md-7 mx-auto d-flex flex-column flex-md-row justify-content-start align-items-start mt-3">
            <h2 className="">Joined On:</h2>
            <p className="fs-3 ms-2">
              {userData ? String(userData.createdAt).substr(0, 10) : "loading"}
            </p>
          </div>

          {/* button */}
          <div className="col-10 col-md-7 mx-auto d-flex flex-column justify-content-center align-items-start mt-3">
            <NavLink
              to="/profile/update"
              className="nav-link btn btn-outline-success text-dark rounded-pill fs-5 my-1"
            >
              Edit Profile
            </NavLink>
            <NavLink
              to="/profile/change-password"
              className="nav-link btn btn-outline-warning text-dark rounded-pill fs-5 my-1"
            >
              Change Password
            </NavLink>
            <button
              onClick={onClickLogout}
              type="button"
              className="nav-link btn btn-outline-danger text-dark rounded-pill fs-5 my-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
