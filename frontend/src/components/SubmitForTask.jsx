import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
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
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../assets/submission.png";
import { getCookie, setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck, typeCheck } from "../utils/loginCheck";

export default function SubmitForTask() {
  document.title = "SkillForge - New Task";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const toastIdRef = React.useRef();
  const authToken = getCookie("auth-token");
  const { id } = useParams();

  const FormSubmitHandler = (data) => {
    // console.log(data);
    toastIdRef.current = toast({
      title: `Generating Submission`,
      status: "loading",
      isClosable: false,
    });
    setTimeout(() => {
      axios
        .post(`http://localhost:8080/submissions/new/${id}`, data, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          toast.update(toastIdRef.current, {
            title: `Successfully Submitted`,
            description:'Redirecting...',
            status: "success",
            isClosable: false,
          });
          setTimeout(() => {
            navigate(`/task/details/${id}`);
          });
        })
        .catch((err) => {
          console.log(err);
          toast.update(toastIdRef.current, {
            title: `Server Error! Contact admin`,
            status: "error",
            isClosable: false,
          });
        });
    }, 2000);
  };
  return (
    <VStack gap={["7vmin", "6vmin", "4vmin"]} className="form-parent">
      <Heading fontSize={"2.5vmax"}>Submission Form</Heading>
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
        <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
          <Text as="i" fontSize="1vmax">
            Enter the following details!
          </Text>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Repositiry Link (Code)
            </FormLabel>
            <Input
              _focus={{ borderColor: "purple" }}
              type="text"
              borderColor="white"
              {...register("repo", {
                required: "This field is required",
                pattern: {
                  value: /^(?:http|https):\/\/[^\s]+/,
                  message: "Enter a valid HTTP or HTTPS URL!",
                },
              })}
            />
            <p className="err">{errors.repo?.message}</p>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Project Deployed Link (if applicable)
            </FormLabel>
            <Input
              _focus={{ borderColor: "purple" }}
              type="text"
              borderColor="white"
              {...register("deployed", {
                pattern: {
                  value: /^(?:http|https):\/\/[^\s]+/,
                  message: "Enter a valid HTTP or HTTPS URL!",
                },
              })}
            />
            <p className="err">{errors.deployed?.message}</p>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Project Description
            </FormLabel>
            <Textarea
              placeholder="Brief your action-plan to accomplish this task"
              _focus={{ borderColor: "purple" }}
              type="text"
              borderColor="white"
              {...register("description", {
                required: "This field is required",
                minLength: {
                  value: 100,
                  message: "Minimum 100 characters required",
                },
              })}
            />
            <p className="err">{errors.description?.message}</p>
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
    </VStack>
  );
}
