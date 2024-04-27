import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";
import { useToast } from "@chakra-ui/react";

export const Login = ({ children }) => {
  const navigate = useNavigate();
  const { login, setLogin } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (!login) {
      toast({
        title: "Not Logged In",
        description: "Please login to access that service!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/prelogin");
    }
  }, []);

  return <>{children}</>;
};

export const OnlyCompany = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType != "Company") {
      toast({
        title: "Not Authorized",
        description: "Sign-Up/Login as Company to access that page!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/company/register");
    }
  }, []);

  return <>{children}</>;
};

export const OnlyUser = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType != "Student") {
      toast({
        title: "Not Authorized",
        description: "Sign-Up/Login as Student to access that page!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/user/register");
    }
  }, []);

  return <>{children}</>;
};
