import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Test from "../Test";
import PreLogin from "../PreLogin";
import CompanyRegister from "../CompanyRegister";
import UserRegister from "../UserRegister";
import InstitutionRegister from "../InstitutionRegister";
import CompanyLogin from "../CompanyLogin";
import UserLogin from "../UserLogin";
import InstitutionLogin from "../InstitutionLogin";
import CompanyDashboard from "../CompanyDashboard";
import { Login, OnlyCompany, OnlyUser, UserAndCompany } from "./PrivateRoutes";
import NewTask from "../NewTask";
import UserDashboard from "../UserDashboard";
import IndustryTasks from "../IndustryTasks";
import TaskDetails from "../TaskDetails";
import ApplyForTask from "../ApplyForTask";
import SubmitForTask from "../SubmitForTask";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prelogin" element={<PreLogin />} />
      <Route path="/company/register" element={<CompanyRegister />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/institution/register" element={<InstitutionRegister />} />
      <Route path="/company/login" element={<CompanyLogin />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/institution/login" element={<InstitutionLogin />} />
      <Route
        path="/company/dashboard"
        element={
          <Login>
            <OnlyCompany>
              <CompanyDashboard />
            </OnlyCompany>
          </Login>
        }
      />
      <Route
        path="/user/dashboard"
        element={
          <Login>
            <OnlyUser>
              <UserDashboard />
            </OnlyUser>
          </Login>
        }
      />
      <Route
        path="/new/task"
        element={
          <Login>
            <OnlyCompany>
              <NewTask />
            </OnlyCompany>
          </Login>
        }
      />
      <Route
        path="/industry/tasks"
        element={
          <Login>
            <UserAndCompany>
              <IndustryTasks />
            </UserAndCompany>
          </Login>
        }
      />
      <Route
        path="/task/details/:id"
        element={
          <Login>
            <UserAndCompany>
              <TaskDetails />
            </UserAndCompany>
          </Login>
        }
      />
      <Route
        path="/apply/:id"
        element={
          <Login>
            <OnlyUser>
              <ApplyForTask />
            </OnlyUser>
          </Login>
        }
      />
      <Route
        path="/submit/:id"
        element={
          <Login>
            <OnlyUser>
              <SubmitForTask />
            </OnlyUser>
          </Login>
        }
      />
    </Routes>
  );
}
