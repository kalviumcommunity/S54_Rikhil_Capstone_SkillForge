import {
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiBag1 } from "react-icons/ci";
import { MdCorporateFare } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { getCookie } from "../utils/cookie";
import { AppContext } from "./Context";
import { CheckApplications } from "./CheckApplications";
import Loading from "./Loading";
import { ViewUserSubmission } from "./ViewUserSubmission";
import { CheckSubmissions } from "./CheckSubmissions";

export default function TaskDetails() {
  const [applicationData, setApplicationData] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [data, setData] = useState({});
  const { userType, setUserType } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const authToken = getCookie("auth-token");
  const currentUsername = getCookie("username");
  const applicationDataFetch = () => {
    if (userType == "Student") {
      axios
        .get(`http://localhost:8080/applications/particular/${id}`, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          setApplicationData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userType == "Company") {
      axios
        .get(`http://localhost:8080/applications/task/particular/${id}`, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          setApplicationData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const submissionsDataFetch = () => {
    if (userType == "Student") {
      axios
        .get(`http://localhost:8080/submissions/particular/${id}`, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          setSubmissions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userType == "Company") {
      axios
        .get(`http://localhost:8080/submissions/task/particular/${id}`, {
          headers: { Authorization: authToken },
        })
        .then((res) => {
          setSubmissions(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(applicationDataFetch, []);
  useEffect(submissionsDataFetch, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/tasks/one/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const redirectToApply = (id) => {
    navigate(`/apply/${id}`);
  };
  const redirectToSubmit = (id) => {
    navigate(`/submit/${id}`);
  };
  const renderBtn = (deadline) => {
    if (userType == "Student") {
      if (Object.keys(applicationData).length > 0) {
        if (applicationData.state == "accepted") {
          return (
            <>
              <Button isDisabled colorScheme="purple">
                Application Status : {applicationData.state.toUpperCase()}
              </Button>
              {new Date(deadline).getTime() > new Date().getTime() ? (
                <>
                  {Object.keys(submissions).length == 0 ? (
                    <Button
                      onClick={() => {
                        redirectToSubmit(data._id);
                      }}
                      colorScheme="purple"
                    >
                      Submit
                    </Button>
                  ) : (
                    <ViewUserSubmission data={submissions} />
                  )}
                </>
              ) : (
                <>
                  {Object.keys(submissions).length == 0 ? (
                    <Tooltip label="Deadline crossed!">
                      <Button
                        isDisabled
                        onClick={() => {
                          redirectToSubmit(data._id);
                        }}
                        colorScheme="purple"
                      >
                        Submit
                      </Button>
                    </Tooltip>
                  ) : (
                    <ViewUserSubmission data={submissions} />
                  )}
                </>
              )}
            </>
          );
        }
        return (
          <Button isDisabled colorScheme="purple">
            Application Status : {applicationData.state.toUpperCase()}
          </Button>
        );
      } else {
        return (
          <Button
            onClick={() => {
              redirectToApply(data._id);
            }}
            colorScheme="purple"
            size={["xs", "sm", "md"]}
          >
            Apply for Task!
          </Button>
        );
      }
    } else if (userType == "Company") {
      if (currentUsername == data.company.orgname) {
        if (applicationData.length == 0) {
          return (
            <Button isDisabled colorScheme="purple" size={["xs", "sm", "md"]}>
              No Applications yet!
            </Button>
          );
        } else {
          const deadline = new Date(data.deadline).getTime();
          const today = new Date().getTime();
          return (
            <ButtonGroup>
              <CheckApplications
                size={"6xl"}
                buttonContent={"Check Applications"}
                data={applicationData}
                fetchData={applicationDataFetch}
              />
              {today > deadline ? (
                <CheckSubmissions
                  buttonContent={"Check Submissions"}
                  data={submissions}
                  fetchData={submissionsDataFetch}
                />
              ) : (
                <Tooltip label="You will be able to view submissions when the deadline surpasses!">
                  <Button
                    isDisabled
                    colorScheme="purple"
                    size={["xs", "sm", "md"]}
                  >
                    View Submissions
                  </Button>
                </Tooltip>
              )}
            </ButtonGroup>
          );
        }
      }
    }
  };
  document.title = "SkillForge - Task Details";
  return (
    <>
      {Object.keys(data).length == 0 ? (
        <Loading />
      ) : (
        <VStack
          gap={"3vmax"}
          className="task-details-parent"
          padding="8vmin 15vmin"
        >
          <Heading fontSize={"2vmax"}>{data.title}</Heading>
          <VStack width={"100%"}>
            <Heading alignSelf={"flex-start"} fontSize={"1.3vmax"}>
              Description
            </Heading>
            <Text color={"#A9A9A9"} align={"left"} fontSize={"2vmin"}>
              {data.description}
            </Text>
          </VStack>
          <VStack width={"100%"}>
            <Heading alignSelf={"flex-start"} fontSize={"1.3vmax"}>
              Skills Required
            </Heading>
            <HStack
              className="skills-scroll"
              overflowX={"scroll"}
              width={"100%"}
              alignContent={"flex-start"}
            >
              {data.skills.map((e, i) => {
                return (
                  <Tag
                    fontSize={"2vmin"}
                    key={i}
                    flexShrink={0}
                    colorScheme="purple"
                  >
                    {e}
                  </Tag>
                );
              })}
            </HStack>
          </VStack>

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
              <StatNumber fontSize={"2.3vmin"}>{data.bounty} INR</StatNumber>
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
              <StatNumber fontSize={"2.3vmin"}>{data.company.name}</StatNumber>
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
              <Tooltip
                label={`Submissions allowed before ${new Date(
                  data.deadline
                ).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  timeZone: "Asia/Kolkata",
                })} 5:30AM`}
              >
                <StatNumber fontSize={"2.3vmin"}>
                  {new Date(data.deadline).toLocaleString("en-IN", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "Asia/Kolkata",
                  })}
                </StatNumber>
              </Tooltip>
            </Stat>
          </StatGroup>
          <ButtonGroup>{renderBtn(data.deadline)}</ButtonGroup>
        </VStack>
      )}
    </>
  );
}
