import React, { useContext } from "react";
import { useForm } from "react-hook-form";
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
  useConst,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../assets/CompanyLoginImage.png";
import { setCookie } from "../utils/cookie";
import { loginCheck } from "../utils/loginCheck";
import { AppContext } from "./Context";

export default function CompanyRegister() {
  const navigate = useNavigate();
  const { setLogin } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const toastIdRef = React.useRef();
  const FormSubmitHandler = (data) => {
    toastIdRef.current = toast({
      title: `Signing Up`,
      status: "loading",
      isClosable: false,
    });
    setTimeout(() => {
      axios
        .post("http://localhost:8080/company/signup", data)
        .then((res) => {
          setCookie("auth-token", res.data, 10);
          setCookie("type", "Company", 10);
          setLogin(loginCheck());
          toast.update(toastIdRef.current, {
            title: `Signed Up`,
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
            if (err.response.status == 400) {
              toast.update(toastIdRef.current, {
                title: `Enter unique name(s)`,
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
      <Heading fontSize={"2.5vmax"}>Company Registeration</Heading>
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
          <HStack width={"100%"} gap={"1.5vmin"}>
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Company Name
              </FormLabel>
              <Input
                type="text"
                borderColor="white"
                {...register("name", {
                  required: "Company Name is required",
                })}
              />
              <p className="err">{errors.name?.message}</p>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Unique signin name
              </FormLabel>
              <Input
                type="text"
                borderColor="white"
                {...register("orgname", {
                  required: "This field is required",
                })}
              />
              <p className="err">{errors.orgname?.message}</p>
            </FormControl>
          </HStack>
          <HStack width={"100%"} gap={"1.5vmin"}>
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
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Website
              </FormLabel>
              <Input
                type="text"
                borderColor="white"
                {...register("website", {
                  required: "Website URL is required",
                  pattern: {
                    value:
                      /^https:\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)?$/,
                    message: "Enter a valid URL",
                  },
                })}
              />
              <p className="err">{errors.website?.message}</p>
            </FormControl>
          </HStack>
          <HStack width={"100%"} gap={"1.5vmin"}>
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Phone no.
              </FormLabel>
              <Input
                type="number"
                borderColor="white"
                {...register("contact.phone", {
                  required: "Phone no is required",
                  minLength: {
                    value: 10,
                    message: "Minimum 10 digits required",
                  },
                  maxLength: {
                    value: 10,
                    message: "Maximum 10 digits allowed",
                  },
                })}
              />
              <p className="err">{errors.contact?.phone?.message}</p>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Email
              </FormLabel>
              <Input
                type="email"
                borderColor="white"
                {...register("contact.email", {
                  required: "Email is required",
                })}
              />
              <p className="err">{errors.contact?.email?.message}</p>
            </FormControl>
          </HStack>
          <Button size={["xs", "sm", "md"]} type="submit" colorScheme="purple">
            Submit
          </Button>
        </form>
      </div>
      <Text fontSize={"2vmin"}>Already registered? <Link style={{color:'#8a3bf3', textDecoration:'underline'}} to={'/company/login'}>Login</Link></Text>
    </VStack>
  );
}
