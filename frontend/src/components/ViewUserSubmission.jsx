import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

export function ViewUserSubmission({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="purple" size={["xs", "sm", "md"]} onClick={onOpen}>
        View your Submission
      </Button>

      <Modal isCentered size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"white"} bg={"#242424"}>
          <ModalHeader alignSelf={"center"}>Your Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={"4vmin"} alignItems={"flex-start"}>
              <VStack alignItems={"flex-start"}>
                <Heading fontSize={"1.2vmax"}>Repo Link</Heading>
                <a href={data.repo}>
                  <Text
                    decoration={"underline"}
                    color={"lightblue"}
                    fontSize={"1.7vmin"}
                  >
                    {data.repo}
                  </Text>
                </a>
              </VStack>
              {data.deployed.length > 0 && (
                <VStack alignItems={"flex-start"}>
                  <Heading fontSize={"1.2vmax"}>Deployed Link</Heading>
                  <a href={data.deployed}>
                    <Text
                      decoration={"underline"}
                      color={"lightblue"}
                      fontSize={"1.7vmin"}
                    >
                      {data.deployed}
                    </Text>
                  </a>
                </VStack>
              )}
              <VStack alignItems={"flex-start"}>
                <Heading fontSize={"1.2vmax"}>Description</Heading>
                <Text fontSize={"1.7vmin"}>{data.description}</Text>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
