import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Test from "../Test";
import PreLogin from "../PreLogin";
import CompanyRegister from "../CompanyRegister";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prelogin" element={<PreLogin />} />
      <Route path="/company/register" element={<CompanyRegister />} />
    </Routes>
  );
}
