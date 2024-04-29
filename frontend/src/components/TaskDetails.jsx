import {
  Button,
  HStack,
  Heading,
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
import { useParams } from "react-router-dom";
import { CiBag1 } from "react-icons/ci";
import { MdCorporateFare } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";

export default function TaskDetails() {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/tasks/one/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {Object.keys(data).length == 0 ? (
        ""
      ) : (
        <VStack
          gap={"3vmax"}
          className="task-details-parent"
          padding="8vmin 20vmin"
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
                  <Tag key={i} flexShrink={0} colorScheme="purple">
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
              <StatNumber fontSize={"2.3vmin"}>
                {new Date(data.deadline).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  timeZone: "Asia/Kolkata",
                })}
              </StatNumber>
            </Stat>
          </StatGroup>
          <Button colorScheme="purple">Apply for Task!</Button>
        </VStack>
      )}
    </>
  );
}
