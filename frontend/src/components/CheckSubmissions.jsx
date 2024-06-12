import React, { useEffect, useState, memo } from "react";
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
import axios from "axios";

const CheckSubmissions = memo(
  ({ buttonContent, data, fetchData, winAmount, id }) => {
    console.log(data);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authToken = getCookie("auth-token");
    const company = getCookie("username");
    const [key, setKey] = useState("");
    let winner = data.find((obj) => obj["winner"] == true);

    useEffect(() => {
      axios
        .get("http://localhost:8080/payments/getkey")
        .then((res) => {
          setKey(res.data.key);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const markWinner = (username, subId) => {
      axios
        .post("http://localhost:8080/payments/checkout", {
          amount: winAmount,
        })
        .then((res) => {
          const options = {
            key,
            amount: winAmount,
            currency: "INR",
            name: `Skill Forge`,
            description: "Bounty Prize",
            image: ``,
            order_id: res.data.order.id,
            callback_url: `http://localhost:8080/payments/paymentverification?to=${username}&amount=${winAmount}&from=${company}&id=${id}&subID=${subId}`,
            redirect: false,
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "razorapy official",
            },
            theme: {
              color: "#8a3bf3",
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
          onClose();
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
          isCentered
          scrollBehavior="inside"
          size={["sm", "md", "2xl", "4xl"]}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent bg={"#242424"} gap={"5vmin"}>
            <ModalHeader
              fontSize={"2vmax"}
              color={"white"}
              textAlign={"center"}
            >
              Check Submissions
            </ModalHeader>
            <ModalCloseButton color={"white"} />
            <ModalBody color={"white"}>
              <VStack gap={"5vmin"}>
                {data.map((e, i) => (
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
                        {winner != undefined ? (
                          <>
                            {e.winner && (
                              <Tag
                                colorScheme="green"
                                fontSize={"2vmin"}
                                alignSelf={"flex-end"}
                              >
                                <Text as={"b"}>Winner Project</Text>
                              </Tag>
                            )}
                          </>
                        ) : (
                          <Button
                            onClick={() => {
                              markWinner(e.user.username, e._id);
                            }}
                            colorScheme="purple"
                            size={["xs", "sm", "md"]}
                          >
                            Mark Winner!
                          </Button>
                        )}
                        <Tag
                          colorScheme="purple"
                          fontSize={"2vmin"}
                          marginLeft={'auto'}
                        >
                          Submission by: {e.user.name}
                        </Tag>
                      </HStack>
                    </VStack>
                  </Box>
                ))}
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
);

export default CheckSubmissions;
