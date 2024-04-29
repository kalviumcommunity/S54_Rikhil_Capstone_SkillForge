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
import React, { useEffect, useState } from "react";
import { CiBag1 } from "react-icons/ci";
import { MdCorporateFare } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function IndustryTasks() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  document.title = "SkillForge - Explore Industry Tasks";
  useEffect(() => {
    axios
      .get("http://localhost:8080/tasks/all")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const knowMore = (id) => {
    navigate(`/task/details/${id}`);
  };
  return (
    <>
      {data.length == 0 ? (
        ""
      ) : (
        <div className="tasks-parent">
          <Heading fontSize={"2vmax"}>
            Available <span style={{ color: "#8a3bf3" }}>Tasks</span>
          </Heading>
          <Input
            placeholder="Enter any skill to search tasks"
            width={"50%"}
            size={["xs", "sm", "md"]}
          />
          <SimpleGrid
            paddingTop={"2vmin"}
            spacing={"3vmin"}
            width={"70vw"}
            columns={[1, 1, 1, 2]}
          >
            {data.map((e, i) => {
              return (
                <Box className="task-box" borderRadius={"10px"} p={"4vmin"}>
                  <VStack justifyContent={"space-between"} height={"100%"}>
                    <VStack width={"100%"} height={"100%"} gap={"2vmin"}>
                      <Heading
                        fontSize={["1.7vmax", "1.7vmax", "1.7vmax", "1.5vmax"]}
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
                            <>
                              <Tag
                                flexShrink={0}
                                size={"sm"}
                                colorScheme="purple"
                              >
                                {e}
                              </Tag>
                            </>
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

                      <Button size={["xs", "sm", "md"]}>Apply for Task</Button>
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
