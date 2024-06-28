import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Heading,
  Box,
  VStack,
  HStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../assets/LoginImage.png";
import { setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck, typeCheck } from "../utils/loginCheck";

export default function UserRegister() {
  document.title = "SkillForge - User Login";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { setLogin, setUserType } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    axios
      .get("https://skill-forge-backend.rikhiltaneja.com/institution/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const toast = useToast();
  const toastIdRef = React.useRef();
  const FormSubmitHandler = (data) => {
    toastIdRef.current = toast({
      title: `Signing In`,
      status: "loading",
      isClosable: false,
    });
    setTimeout(() => {
      axios
        .post("https://skill-forge-backend.rikhiltaneja.com/users/signin", data)
        .then((res) => {
          setCookie("auth-token", res.data, 10);
          setCookie("type", "Student", 10);
          setCookie("username", data.username, 10);
          setLogin(loginCheck());
          setUserType(typeCheck());
          toast.update(toastIdRef.current, {
            title: `Signed In`,
            status: "success",
            isClosable: false,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.status == 401) {
              toast.update(toastIdRef.current, {
                title: `Wrong Password`,
                status: "error",
                isClosable: false,
              });
            } else if (err.response.status == 404) {
              toast.update(toastIdRef.current, {
                title: `Username not found!`,
                status: "error",
                isClosable: false,
              });
            } else {
              toast.update(toastIdRef.current, {
                title: `Server Error! Contact Admin`,
                status: "error",
                isClosable: false,
              });
            }
          } else {
            toast.update(toastIdRef.current, {
              title: `Server Error! Contact Admin`,
              status: "error",
              isClosable: false,
            });
          }
        });
    }, 2000);
  };
  return (
    <VStack gap={["7vmin", "6vmin", "4vmin"]} className="form-parent">
      <Heading fontSize={"2.5vmax"}>User Login</Heading>
      <div className="form-box">
        <Box display={["none", "none", "flex"]}>
          <img
            style={{
              width: "30vw",
              height: "100%",
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            src={img}
            alt=""
          />
        </Box>
        <form
          style={{ gap: "4vmin" }}
          className="form"
          onSubmit={handleSubmit(FormSubmitHandler)}
        >
          <Text as="i" fontSize="1vmax">
            Enter the following details!
          </Text>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Username
            </FormLabel>
            <Input
              type="text"
              borderColor="white"
              {...register("username", {
                required: "Username is required",
              })}
            />
            <p className="err">{errors.username?.message}</p>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Password
            </FormLabel>
            <Input
              type="password"
              borderColor="white"
              {...register("password", {
                required: "Password Required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password Not Valid (Use Special Characters & Numbers)",
                },
              })}
            />
            <p className="err">{errors.password?.message}</p>
          </FormControl>
          <Button
            leftIcon={<IoMdDoneAll color="white" />}
            size={["xs", "sm", "md"]}
            type="submit"
            colorScheme="purple"
          >
            Submit
          </Button>
        </form>
      </div>
      <Text fontSize={"2vmin"}>
        Not Registered?{" "}
        <Link
          style={{ color: "#8a3bf3", textDecoration: "underline" }}
          to={"/user/register"}
        >
          Register
        </Link>
      </Text>
    </VStack>
  );
}
