import {
  HStack,
  Heading,
  MenuItem,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { FaArrowDown } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { GoGraph } from "react-icons/go";
import { MdOutlinePublish } from "react-icons/md";
import { Link } from "react-router-dom";

export default function CompanyDashboard() {
  const [greeting, setGreeting] = useState("");
  const [data, setData] = useState({});
  const authToken = getCookie("auth-token");
  function greetByTime() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }
  useEffect(greetByTime, []);
  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:8080/company/one", {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  }, []);
  return (
    <>
      {Object.keys(data).length == 0 ? (
        <div style={{ flex: 1, color: "white" }} className="loading">
          Loading
        </div>
      ) : (
        <div className="dashboard-parent">
          <Stack flexDirection={"row"} alignItems={"flex-start"} gap={"7vmax"}>
            <VStack
              width={"30%"}
              className="left-dashboard"
              gap={"1vmin"}
              // alignItems={"flex-start"}
            >
              <Heading fontSize={"2.5vmax"}>{greeting}</Heading>
              <VStack width={"100%"} alignItems={"flex-start"} gap={"2.5vmin"}>
                <Text
                  as={"b"}
                  alignSelf={"center"}
                  color={"grey"}
                  fontSize={"3vmin"}
                >
                  {data.name}
                </Text>
                <VStack width={"100%"} alignItems={"flex-start"}>
                  <Text
                    alignSelf={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1vmin"}
                    as={"b"}
                    color={"white"}
                    fontSize={"2vmin"}
                  >
                    Quick Actions {<FaArrowDown />}
                  </Text>
                  <HStack
                    justifyContent={"center"}
                    gap={"2vmin"}
                    flexWrap={"wrap"}
                  >
                    <Text
                      cursor={"pointer"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"1vmin"}
                      as={"b"}
                      color={"gray"}
                      fontSize={"2vmin"}
                    >
                      {<ImProfile />} Edit Profile
                    </Text>
                    <Text
                      cursor={"pointer"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"1vmin"}
                      as={"b"}
                      color={"gray"}
                      fontSize={"2vmin"}
                    >
                      {<GoGraph />} Promote Tasks
                    </Text>
                    <Link to={"/new/task"}>
                      <Text
                        cursor={"pointer"}
                        display={"flex"}
                        alignItems={"center"}
                        gap={"1vmin"}
                        as={"b"}
                        color={"gray"}
                        fontSize={"2vmin"}
                      >
                        {<MdOutlinePublish />} New Task
                      </Text>
                    </Link>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
            <VStack className="right-dashboard" flex={1} gap={"4vmin"}>
              <VStack>
                <Heading fontSize={"2vmax"}>Tasks Published</Heading>
              </VStack>
              <VStack>
                <Heading fontSize={"2vmax"}>Submissions Received</Heading>
              </VStack>
            </VStack>
          </Stack>
        </div>
      )}
    </>
  );
}
