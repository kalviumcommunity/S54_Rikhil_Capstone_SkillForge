import {
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 800);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="nav-parent">
      <Link to={"/"}>
        <Text as={"b"} fontSize={["2.5vmax", "3vmax", "2vmax", "1.8vmax"]}>
          Skill<span style={{ color: "#8a3bf3" }}>Forge</span>
        </Text>
      </Link>
      {isMobile ? (
        <>
          <Menu>
            <MenuButton
              size={"sm"}
              colorScheme="purple"
              as={IconButton}
              icon={<GiHamburgerMenu color="white" />}
            />
            <MenuList color={"#8a3bf3"}>
              <MenuItem icon={<FaHome />}>Home</MenuItem>
              <MenuItem icon={<SiGoogletasks />}>Tasks</MenuItem>
              <MenuItem icon={<FaQuestion />}>FAQs</MenuItem>
              <MenuItem icon={<IoIosLogIn />}>Login</MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <HStack spacing={"10vmin"}>
            <Link>
              <Text className="2vmin">Home</Text>
            </Link>
            <Link>
              <Text className="2vmin">Tasks</Text>
            </Link>
            <Link>
              <Text className="2vmin">FAQs</Text>
            </Link>
          </HStack>
          <Link to={'/prelogin'}>
            <Button
              leftIcon={<IoIosLogIn />}
              colorScheme="purple"
              color={"white"}
              size={["xs", "sm", "md"]}
            >
              Login
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
