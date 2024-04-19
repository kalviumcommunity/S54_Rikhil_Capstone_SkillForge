import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <div className="footer-parent">
      <Stack flexDirection={["column","row","row"]} gap={["5vmax","10vmax","15vmax","25vmax"]}>
        <VStack alignItems={"start"} spacing={"0vmin"}>
          <Text as={"b"} fontSize={"2.5vmax"}>
            Skill<span style={{ color: "#8a3bf3" }}>Forge</span>
          </Text>
          <Text color={"gray"} fontSize={["2vmin","1.5vmin","1.5vmin","1.5vmin"]}>
            Hire skilled and motivated students <br />
            for your tasks and support their journey.
          </Text>
        </VStack>
        <HStack spacing={"10vmin"}>
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"2vmin"} as={"b"}>
              About
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Features
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Pricing
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Support
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Forums
            </Text>
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"2vmin"} as={"b"}>
              About
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Features
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Pricing
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Support
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Forums
            </Text>
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"2vmin"} as={"b"}>
              About
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Features
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Pricing
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Support
            </Text>
            <Text fontSize={"1.5vmin"} color={"gray"}>
              Forums
            </Text>
          </VStack>
        </HStack>
      </Stack>
    </div>
  );
}
