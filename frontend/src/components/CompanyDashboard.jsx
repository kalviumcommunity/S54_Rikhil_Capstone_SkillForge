import { HStack, Heading, MenuItem, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

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
  }, []);
  return (
    <>
      {Object.keys(data).length == 0 ? (
        <div className="loading">Loading</div>
      ) : (
        <div className="dashboard-parent">
          <HStack
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            gap={"15vmax"}
          >
            <VStack align={"flex-start"}>
              <VStack gap={"4vmin"} alignItems={"flex-start"}>
                <Heading fontSize={"2.5vmax"}>{greeting}</Heading>
                <VStack gap={"2vmin"} alignItems={"flex-start"}>
                  <Heading fontSize={"1.5vmax"}>Your Profile</Heading>
                  <VStack alignItems={"flex-start"}>
                    <ul>
                      <Text>{data.name}</Text>
                      <Text>{data.website}</Text>
                      <Text>{data.contact.phone}</Text>
                      <Text>{data.contact.email}</Text>
                    </ul>
                  </VStack>
                </VStack>
              </VStack>
            </VStack>
            <VStack flex={1} gap={"4vmin"}>
              <VStack>
                <Heading fontSize={"2vmax"}>Tasks Published</Heading>
              </VStack>
              <VStack>
                <Heading fontSize={"2vmax"}>Submissions Received</Heading>
              </VStack>
            </VStack>
          </HStack>
        </div>
      )}
    </>
  );
}
