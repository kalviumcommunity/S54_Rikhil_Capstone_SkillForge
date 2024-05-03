import {
  Button,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  Box,
  Heading,
  Text,
  Tag,
  HStack,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { getCookie } from "../utils/cookie";
import { useState } from "react";
import axios from "axios";

export function ChakraModal({ buttonContent, size, data, fetchData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedState, setSelectedState] = useState("pending");
  const authToken = getCookie("auth-token");
  console.log(data[0].state);
  const stateChange = (state, applicationID) => {
    axios
      .post(
        "http://localhost:8080/applications/change/state",
        {
          state: state,
          application: applicationID,
        },
        { headers: { Authorization: authToken } }
      )
      .then((res) => {
        console.log(res);
        fetchData()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button colorScheme="purple" size={["xs", "sm", "md"]} onClick={onOpen}>
        {buttonContent}
      </Button>

      <Modal
        scrollBehavior="inside"
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bg={"#242424"} gap={"5vmin"}>
          <ModalHeader fontSize={"2vmax"} color={"white"} textAlign={"center"}>
            Review Applications
          </ModalHeader>
          <Select
            color={"gray"}
            alignSelf={"center"}
            defaultValue={"pending"}
            width={"fit-content"}
            onChange={(e) => {
              setSelectedState(e.target.value);
            }}
          >
            <option value={"pending"}>Pending</option>
            <option value={"accepted"}>Accepted</option>
            <option value={"rejected"}>Rejected</option>
          </Select>
          <ModalCloseButton color={"white"} />
          <ModalBody color={"white"}>
            <VStack gap={"5vmin"}>
              {data
                .filter((e) => {
                  return e.state == selectedState;
                })
                .map((e, i) => {
                  return (
                    <Box className="application-box" key={i} p={"4vmin"}>
                      <VStack gap={"2vmin"}>
                        <>
                          <Heading
                            fontSize={"2.5vmin"}
                            alignSelf={"flex-start"}
                          >
                            Why does the candidate want to participate?
                          </Heading>
                          <Text fontSize={"2vmin"} alignSelf={"flex-start"}>
                            {e.why}
                          </Text>
                        </>
                        <>
                          <Heading
                            fontSize={"2.5vmin"}
                            alignSelf={"flex-start"}
                          >
                            Breif Action Plan of the candidate to participate
                          </Heading>
                          <Text fontSize={"2vmin"} alignSelf={"flex-start"}>
                            {e.how}
                          </Text>
                        </>
                        <HStack width={"100%"} justifyContent={"space-between"}>
                          <ButtonGroup>
                            <Button
                              as={IconButton}
                              size={["xs", "sm", "md"]}
                              colorScheme="purple"
                              icon={<IoMdCheckmark />}
                              onClick={() => {
                                stateChange("accepted", e._id);
                              }}
                            ></Button>
                            <Button
                              as={IconButton}
                              size={["xs", "sm", "md"]}
                              colorScheme="purple"
                              icon={<RxCross1 />}
                              onClick={() => {
                                stateChange("rejected", e._id);
                              }}
                            ></Button>
                          </ButtonGroup>
                          <Tag alignSelf={"flex-end"} colorScheme="purple">
                            Application by : {e.user.name}
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
