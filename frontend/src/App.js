import React from "react";
import {
  Home,
  Signup,
  Login,
  Profile,
  Navbar,
  UpdateProfile,
  UpdatePassword,
} from "./components";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/update" element={<UpdateProfile />} />
        <Route
          exact
          path="/profile/change-password"
          element={<UpdatePassword />}
        />
      </Routes>
    </>
  );
};

export default App;
