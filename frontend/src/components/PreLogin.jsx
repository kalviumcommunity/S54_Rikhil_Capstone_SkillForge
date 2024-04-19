import { Button, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { FaBuilding } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PreLogin() {
  return (
    <div className="prelogin">
      <Heading fontSize={["3vmax", "2vmax"]}>Select a Role</Heading>
      <HStack spacing={"4vmin"}>
        <Link to={'/company/register'}>
            <Button
              size={["xs", "sm", "sm"]}
              colorScheme="red"
              leftIcon={<FaBuilding />}
            >
              Company
            </Button>
        </Link>
        <Link to={'/user/register'}>
          <Button
            size={["xs", "sm", "sm"]}
            colorScheme="red"
            leftIcon={<FaUser />}
          >
            User
          </Button>
        </Link>
        <Link to={'/institution/register'}>
          <Button
            size={["xs", "sm", "sm"]}
            colorScheme="red"
            leftIcon={<FaUniversity />}
          >
            Institution
          </Button>
        </Link>
      </HStack>
    </div>
  );
}
