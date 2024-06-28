import {
  Box,
  HStack,
  Heading,
  MenuItem,
  Stack,
  Text,
  VStack,
  background,
  useToast,
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

export default function CompanyDashboard() {
  const [greeting, setGreeting] = useState("");
  const [data, setData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
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
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, companyRes, subRes] = await Promise.all([
          axios.get("https://skill-forge-backend.rikhiltaneja.com/tasks/particular/company", {
            headers: { Authorization: authToken },
          }),
          axios.get("https://skill-forge-backend.rikhiltaneja.com/company/one", {
            headers: { Authorization: authToken },
          }),
          axios.get("https://skill-forge-backend.rikhiltaneja.com/submissions/company/particular", {
            headers: { Authorization: authToken },
          }),
        ]);
        setTasks(tasksRes.data);
        setData(companyRes.data);
        setSubmissions(subRes.data);
      } catch (error) {
        console.log(error);
        toast({
          title: "Server error! Contact admin",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
      }
    };
    setTimeout(fetchData, 1000);
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
            <VStack
              width={["80vw", "80vw", "80vw", "60vw"]}
              className="right-dashboard"
              justifyContent={"center"}
              // flex={1}
              gap={'5vmin'}
            >
              <VStack width={"100%"} gap={"3vmin"}>
                <Heading fontSize={"2vmax"}>Tasks Published</Heading>
                <HStack
                  className="published-tasks"
                  overflowX={"scroll"}
                  width={"inherit"}
                >
                  {tasks.length == 0 ? (
                    <Text>No Tasks here yet!</Text>
                  ) : (
                    tasks.map((e) => {
                      return (
                        <Box
                          width={["80%", "80%", "70%", "50%"]}
                          height={["12vh", "10vh", "15vh", "20vh"]}
                          cursor={"pointer"}
                          flexShrink={0}
                          key={e._id}
                          border={"1px solid #8a3bf3"}
                          borderRadius={"10px"}
                          p={"2vmin"}
                        >
                          <VStack
                            className="published-tasks"
                            overflowY={"scroll"}
                            height={"100%"}
                          >
                            <Heading
                              fontSize={[
                                "1.5vmax",
                                "1.5vmax",
                                "1.8vmax",
                                "1.3vamx",
                              ]}
                            >
                              {e.title.length > 25
                                ? e.title.substr(0, 25) + "..."
                                : e.title}
                            </Heading>
                            <Text
                              fontSize={[
                                "2.5vmin",
                                "2.5vmin",
                                "2vmin",
                                "2vmin",
                              ]}
                            >
                              {e.description.length > 200
                                ? e.description.substr(0, 200) + "..."
                                : e.description}
                            </Text>
                          </VStack>
                        </Box>
                      );
                    })
                  )}
                </HStack>
              </VStack>
            </VStack>
          </Stack>
        </div>
      )}
    </>
  );
}
