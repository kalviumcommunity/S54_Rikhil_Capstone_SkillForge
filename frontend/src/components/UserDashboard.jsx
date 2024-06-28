import {
  Box,
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
import Loading from "./Loading";

export default function UserDashboard() {
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
        .get("https://skill-forge-backend.rikhiltaneja.com/users/one", {
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
        <Loading />
      ) : (
        <div className="dashboard-parent">
          <Stack
            flex={1}
            flexDirection={["column", "column", "column", "row"]}
            alignItems={["center", "center", "center", "flex-start"]}
            justifyContent={"center"}
            gap={"7vmax"}
          >
            <VStack
              flexShrink={0}
              width={["70vw", "70vw", "70vw", "25vw"]}
              className="left-dashboard"
              gap={"1vmin"}
              // alignItems={"flex-start"}
            >
              <Heading fontSize={"2.5vmax"}>{greeting}</Heading>
              <VStack width={"100%"} alignItems={"flex-start"} gap={"3vmin"}>
                <Text
                  as={"b"}
                  alignSelf={"center"}
                  color={"grey"}
                  fontSize={"3vmin"}
                >
                  {data.name}
                </Text>
                <VStack width={"100%"} alignItems={"center"}>
                  <Text
                    alignSelf={"center"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={"1vmin"}
                    as={"b"}
                    color={"white"}
                    fontSize={"2.5vmin"}
                  >
                    Quick Actions {<FaArrowDown />}
                  </Text>
                  <HStack
                    justifyContent={"center"}
                    gap={"1.5vmin"}
                    flexWrap={"wrap"}
                  >
                    <Text
                      cursor={"pointer"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.5vmin"}
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
                      gap={"0.5vmin"}
                      as={"b"}
                      color={"gray"}
                      fontSize={"2vmin"}
                    >
                      {<ImProfile />} Leaderboard
                    </Text>
                    <Text
                      cursor={"pointer"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.5vmin"}
                      as={"b"}
                      color={"gray"}
                      fontSize={"2vmin"}
                    >
                      {<ImProfile />} Explore Tasks
                    </Text>
                    <Text
                      cursor={"pointer"}
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.5vmin"}
                      as={"b"}
                      color={"gray"}
                      fontSize={"2vmin"}
                    >
                      {<ImProfile />} Make a Submission
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
            <VStack
              width={["80vw", "80vw", "80vw", "60vw"]}
              className="right-dashboard"
              justifyContent={"center"}
              // flex={1}
              gap={"4vmin"}
            >
              <VStack width={"100%"}>
                <Heading fontSize={"2vmax"}>Enrolled Tasks</Heading>
                <HStack
                  className="published-tasks"
                  overflowX={"scroll"}
                  width={"inherit"}
                >
                  <Box border={"1px solid purple"} p={"2vmin"}>
                    Hello
                  </Box>
                </HStack>
              </VStack>
              <VStack>
                <Heading fontSize={"2vmax"}>Submissions Made</Heading>
              </VStack>
            </VStack>
          </Stack>
        </div>
      )}
    </>
  );
}
