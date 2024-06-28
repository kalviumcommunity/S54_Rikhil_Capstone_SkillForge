import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Icon,
  Input,
  SimpleGrid,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CiBag1 } from "react-icons/ci";
import { MdCorporateFare } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context";
import { getCookie } from "../utils/cookie";
import Loading from "./Loading";

export default function IndustryTasks() {
  console.log("TEST");
  const [data, setData] = useState([]);
  const [applicationTaskIDsArr, setApplicationTaskIDArr] = useState([]);
  const [submissionsIDsArr, setSubmissionsIDsArr] = useState([]);
  const [applications, setApplications] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  document.title = "SkillForge - Explore Industry Tasks";
  const authToken = getCookie("auth-token");
  const currentUsername = getCookie("username");
  useEffect(() => {
    const fetchData = async () => {
      if (userType == "Student") {
        try {
          const [applicationRes, submissionsRes, tasksRes] = await Promise.all([
            axios.get("https://skill-forge-backend.rikhiltaneja.com/applications/user/particular", {
              headers: { Authorization: authToken },
            }),
            axios.get("https://skill-forge-backend.rikhiltaneja.com/submissions/user/particular", {
              headers: { Authorization: authToken },
            }),
            axios.get("https://skill-forge-backend.rikhiltaneja.com/tasks/all"),
          ]);
          setApplications(applicationRes.data);
          setSubmissions(submissionsRes.data);
          setData(tasksRes.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        axios
          .get("https://skill-forge-backend.rikhiltaneja.com/tasks/all")
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    applications.map((e) => {
      setApplicationTaskIDArr((prev) => {
        return [...prev, e.task];
      });
    });
    submissions.map((e) => {
      setSubmissionsIDsArr((prev) => {
        return [...prev, e.task];
      });
    });
  }, [applications, submissions]);
  const knowMore = (id) => {
    navigate(`/task/details/${id}`);
  };
  const { userType } = useContext(AppContext);
  const redirectToApply = (id) => {
    navigate(`/apply/${id}`);
  };
  const redirectToSubmit = (id) => {
    navigate(`/submit/${id}`);
  };
  const RenderButton = ({ id, deadline }) => {
    if (userType == "Student") {
      // console.log(id)
      if (new Date(deadline).getTime() > new Date().getTime()) {
        if (applicationTaskIDsArr.includes(id)) {
          let result = applications.find((obj) => obj["task"] == id);
          if (result.state != "accepted") {
            return (
              <Button isDisabled size={["xs", "sm", "md"]}>
                Applied ({result.state})
              </Button>
            );
          } else if (result.state == "accepted") {
            if (submissionsIDsArr.includes(id)) {
              return (
                <Button isDisabled colorScheme="purple">
                  Submitted
                </Button>
              );
            } else {
              return (
                <Button
                  onClick={() => {
                    redirectToSubmit(id);
                  }}
                  colorScheme="purple"
                >
                  Submit
                </Button>
              );
            }
          }
        } else {
          return (
            <Button
              onClick={() => {
                redirectToApply(id);
              }}
              size={["xs", "sm", "md"]}
            >
              Apply for Task
            </Button>
          );
        }
      }
    } else if (userType == "Company") {
      if (id == currentUsername) {
        return <Button size={["xs", "sm", "md"]}>Edit</Button>;
      }
    }
  };
  return (
    <>
      {data.length == 0 ? (
        <Loading />
      ) : (
        <div className="tasks-parent">
          <Heading fontSize={"2vmax"}>
            Available <span style={{ color: "#8a3bf3" }}>Tasks</span>
          </Heading>
          <Input
            placeholder="Enter any skill to seawrch tasks"
            width={"50%"}
            size={["xs", "sm", "md"]}
          />
          <SimpleGrid
            paddingTop={"2vmin"}
            spacing={"3vmin"}
            width={"70vw"}
            columns={[1, 1, 1, 2]}
          >
            {data
              // .filter((e) => {
              //   return new Date(e.deadline).getTime() > new Date().getTime();
              // })
              .map((e, i) => {
                return (
                  <Box
                    key={i}
                    className="task-box"
                    borderRadius={"10px"}
                    p={"4vmin"}
                  >
                    <VStack justifyContent={"space-between"} height={"100%"}>
                      <VStack width={"100%"} height={"100%"} gap={"2vmin"}>
                        <Heading
                          fontSize={["2vmax", "2vmax", "2vmax", "1.6vmax"]}
                        >
                          {e.title.length > 30
                            ? e.title.substr(0, 30) + "..."
                            : e.title}
                        </Heading>
                        <Text
                          fontSize={["2.4vmin", "2.4vmin", "2.4vmin", "2vmin"]}
                          color={"#C4C4C4"}
                        >
                          {e.description.length > 200
                            ? e.description.substr(0, 200) + "..."
                            : e.description}
                        </Text>
                        <HStack
                          className="skills-scroll"
                          overflowX={"scroll"}
                          width={"100%"}
                          alignContent={"flex-start"}
                        >
                          {e.skills.map((e, i) => {
                            return (
                              <Tag
                                key={i}
                                flexShrink={0}
                                size={"sm"}
                                colorScheme="purple"
                              >
                                {e}
                              </Tag>
                            );
                          })}
                        </HStack>
                        <StatGroup width={"100%"}>
                          <Stat display={"flex"} justifyContent={"center"}>
                            <StatLabel
                              color={"gray"}
                              display={"flex"}
                              gap={"0.2vmin"}
                              fontSize={"1.7vmin"}
                              alignItems={"center"}
                            >
                              <CiBag1 />
                              Bounty
                            </StatLabel>
                            <StatNumber fontSize={"2.3vmin"}>
                              {e.bounty} INR
                            </StatNumber>
                          </Stat>
                          <Stat display={"flex"} justifyContent={"center"}>
                            <StatLabel
                              color={"gray"}
                              display={"flex"}
                              gap={"0.2vmin"}
                              fontSize={"1.7vmin"}
                              alignItems={"center"}
                            >
                              <MdCorporateFare />
                              Posted by
                            </StatLabel>
                            <StatNumber fontSize={"2.3vmin"}>
                              {e.company.name}
                            </StatNumber>
                          </Stat>
                          <Stat display={"flex"} justifyContent={"center"}>
                            <StatLabel
                              color={"gray"}
                              display={"flex"}
                              gap={"0.2vmin"}
                              fontSize={"1.7vmin"}
                              alignItems={"center"}
                            >
                              <FaRegCalendarCheck />
                              Deadline
                            </StatLabel>
                            <StatNumber fontSize={"2.3vmin"}>
                              {new Date(e.deadline).toLocaleString("en-IN", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                timeZone: "Asia/Kolkata",
                              })}
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </VStack>
                      <ButtonGroup
                        colorScheme="purple"
                        paddingTop={"1.5vmin"}
                        width={"100%"}
                        justifyContent={"center"}
                      >
                        <Button
                          onClick={() => {
                            knowMore(e._id);
                          }}
                          size={["xs", "sm", "md"]}
                        >
                          Know More!
                        </Button>

                        {userType == "Student" ? (
                          <RenderButton id={e._id} deadline={e.deadline} />
                        ) : (
                          <RenderButton id={e.company.orgname} />
                        )}
                      </ButtonGroup>
                    </VStack>
                  </Box>
                );
              })}
          </SimpleGrid>
        </div>
      )}
    </>
  );
}
