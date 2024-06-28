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
  Textarea,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import img from "../assets/task-list.jpg";
import { getCookie, setCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { loginCheck, typeCheck } from "../utils/loginCheck";

export default function NewTask() {
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
  
  const FormSubmitHandler = (data) => {
    toastIdRef.current = toast({
      title: `Uploading Task`,
      status: "loading",
      isClosable: false,
    });
    setTimeout(() => {
      axios
        .post("https://skill-forge-backend.rikhiltaneja.com/tasks/new", data, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          toast.update(toastIdRef.current, {
            title: `Task Uploading`,
            status: "success",
            isClosable: false,
          });
          setTimeout(() => {
            navigate("/company/dashboard");
          });
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 404) {
              toast.update(toastIdRef.current, {
                title: `Comapny Not Found!`,
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
      <Heading fontSize={"2.5vmax"}>Upload New Task</Heading>
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
              Title
            </FormLabel>
            <Input
              type="text"
              borderColor="white"
              {...register("title", {
                required: "Name is required",
              })}
            />
            <p className="err">{errors.title?.message}</p>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Description
            </FormLabel>
            <Textarea
              type="text"
              borderColor="white"
              {...register("description", {
                required: "Description is required",
              })}
            />
            <p className="err">{errors.description?.message}</p>
          </FormControl>
          <FormControl>
            <FormLabel fontSize="1vmax" as="i" fontWeight="550">
              Skills
            </FormLabel>
            <Input
            placeholder="Enter comma ',' separated skills req."
              type="text"
              borderColor="white"
              {...register("skills", {
                required: "Skills are required",
              })}
            />
            <p className="err">{errors.skills?.message}</p>
          </FormControl>
          <HStack width={"100%"} gap={"1.5vmin"}>
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Bounty (in ₹)
              </FormLabel>
              <Input
                type="number"
                borderColor="white"
                {...register("bounty", {
                  required: "Bounty is required",
                })}
              />
              <p className="err">{errors.bounty?.message}</p>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1vmax" as="i" fontWeight="550">
                Deadline
              </FormLabel>
              <Input
                type="date"
                borderColor="white"
                {...register("deadline", {
                  required: "Deadline is required",
                })}
              />
              <p className="err">{errors.deadline?.message}</p>
            </FormControl>
          </HStack>
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
