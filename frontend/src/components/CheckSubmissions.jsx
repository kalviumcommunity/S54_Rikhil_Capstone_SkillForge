import React from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { getCookie } from "../utils/cookie";

export function CheckSubmissions({ buttonContent, data, fetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authToken = getCookie("auth-token");
  return (
    <>
      <Button colorScheme="purple" size={["xs", "sm", "md"]} onClick={onOpen}>
        {buttonContent}
      </Button>

      <Modal
        isCentered
        scrollBehavior="inside"
        size={["sm", "md", "2xl", "4xl"]}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg={"#242424"} gap={"5vmin"}>
          <ModalHeader fontSize={"2vmax"} color={"white"} textAlign={"center"}>
            Check Submissions
          </ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody color={"white"}>
            <VStack gap={"5vmin"}>
              {data.map((e, i) => {
                return (
                  <Box
                    width={"100%"}
                    className="application-box"
                    key={i}
                    p={"4vmin"}
                  >
                    <VStack alignItems={"flex-start"} gap={"3vmin"}>
                      <VStack alignItems={"flex-start"}>
                        <Heading fontSize={"2.3vmin"}>
                          Code/Repository Link
                        </Heading>
                        <a target="_blank" href={e.repo}>
                          <Text
                            fontSize={"1.7vmin"}
                            decoration={"underline"}
                            color={"lightblue"}
                          >
                            {e.repo}
                          </Text>
                        </a>
                      </VStack>
                      <VStack alignItems={"flex-start"}>
                        <Heading fontSize={"2.3vmin"}>Deployed Link</Heading>
                        {e.deployed.length > 0 ? (
                          <a target="_blank" href={e.repo}>
                            <Text
                              fontSize={"1.7vmin"}
                              decoration={"underline"}
                              color={"lightblue"}
                            >
                              {e.repo}
                            </Text>
                          </a>
                        ) : (
                          <Text>Not Provided</Text>
                        )}
                      </VStack>
                      <VStack alignItems={"flex-start"}>
                        <Heading fontSize={"2.3vmin"}>
                          Project Description
                        </Heading>
                        <Text fontSize={"1.7vmin"}>{e.description}</Text>
                      </VStack>
                      <HStack width={"100%"} justifyContent={"space-between"}>
                        <Button colorScheme="purple" size={["xs", "sm", "md"]}>
                          Mark Winner!
                        </Button>
                        <Tag colorScheme="purple" fontSize={'2vmin'} alignSelf={"flex-end"}>
                          Submission by: {e.user.name}
                        </Tag>
                      </HStack>
                    </VStack>
                  </Box>
                );
              })}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              size={["xs", "sm", "md"]}
              colorScheme="purple"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
