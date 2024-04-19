import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function Home() {
  document.title = "SkillForge";
  return (
    <div className="home-parent">
      <Text align={"center"} as={"b"} fontSize={"2.5vmax"}>
        Industry experience, now only a{" "}
        <span style={{ color: "#8a3bf3" }}>few clicks</span> away.
      </Text>
      <Text color={"grey"} align={"center"} fontSize={"2.3vmin"}>
        Gain real-world skills and experience by tackling challenges posted by{" "}
        <br />
        various industy level businesses and organizations.
      </Text>
      <HStack paddingTop={"1vmin"} spacing={"3vmin"}>
        <Button size={["xs", "sm", "md"]} colorScheme="whiteAlpha">
          How it works?
        </Button>
        <Button size={["xs", "sm", "md"]} colorScheme="purple">
          Browse Tasks
        </Button>
      </HStack>
    </div>
  );
}
