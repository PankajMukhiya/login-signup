import React from "react";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col mx-auto mt-5">
            <h1 className="text-center border-bottom border-top rounded-pill shadow-lg py-2">
              Welcome to the Our Website Home Page
            </h1>
            <p className="text-center py-2">
              Please do
              <NavLink to="/login" className="text-decoration-none fs-5"> Login</NavLink> Or
              <NavLink to="/register" className="text-decoration-none fs-5"> Signup</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
