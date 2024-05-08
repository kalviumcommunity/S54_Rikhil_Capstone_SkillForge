import { Text, VStack } from "@chakra-ui/react";
import React from "react";

export default function Loading() {
  return (
    <VStack style={{ color: "white" }} flex={"1"} justifyContent={'center'}>
      <Text>LOADING!</Text>
    </VStack>
  );
}
