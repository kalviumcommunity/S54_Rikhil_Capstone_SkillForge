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
import React, { useContext, useEffect, useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { AppContext } from "./Context";
import { CiLogout } from "react-icons/ci";
import { deleteCookie } from "../utils/cookie";
import { loginCheck } from "../utils/loginCheck";
import { IoIosArrowDown } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { MdCorporateFare } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { login, setLogin, userType, setUserType } = useContext(AppContext);
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
  const logout = () => {
    deleteCookie("auth-token");
    deleteCookie("type");
    location.reload();
    setLogin(loginCheck());
  };
  const renderLoginBtn = () => {
    if (login) {
      return (
        <Button
          leftIcon={<CiLogout />}
          colorScheme="purple"
          color={"white"}
          size={["xs", "sm", "md"]}
          onClick={logout}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Link to={"/prelogin"}>
          <Button
            leftIcon={<IoIosLogIn />}
            colorScheme="purple"
            color={"white"}
            size={["xs", "sm", "md"]}
          >
            Login
          </Button>
        </Link>
      );
    }
  };
  console.log(login);
  const mainMenuOptions = () => {
    if (login) {
      if (userType == "Student") {
        return (
          <>
            <Link to={"/user/dashboard"}>
              <MenuItem icon={<MdSpaceDashboard />}>Dashboard</MenuItem>
            </Link>
            <Link to={"/industry/tasks"}>
              <MenuItem icon={<MdCorporateFare />}>Industry Tasks</MenuItem>
            </Link>
            <MenuItem icon={<FaUniversity />}>Institution Events</MenuItem>
          </>
        );
      } else if (userType == "Company") {
        return (
          <>
            <Link to={"/company/dashboard"}>
              <MenuItem icon={<MdSpaceDashboard />}>Dashboard</MenuItem>
            </Link>
            <Link to={"/industry/tasks"}>
              <MenuItem icon={<MdCorporateFare />}>Industry Tasks</MenuItem>
            </Link>
            {/* <MenuItem icon={<FaUniversity />}>Institution Events</MenuItem> */}
          </>
        );
      } else if (userType == "Institution") {
        return (
          <>
            <MenuItem icon={<MdSpaceDashboard />}>Dashboard</MenuItem>
            {/* <MenuItem icon={<MdCorporateFare />}>Industry Tasks</MenuItem> */}
            <MenuItem icon={<FaUniversity />}>Institution Events</MenuItem>
          </>
        );
      }
    } else {
      return (
        <Link to={"/prelogin"}>
          <MenuItem icon={<IoIosLogIn />}>Login to view Services</MenuItem>
        </Link>
      );
    }
  };
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
              <MenuItem as={Link} to={'/faq'} icon={<FaQuestion />}>FAQs</MenuItem>
              <Link to={"/prelogin"}>
                <MenuItem icon={<IoIosLogIn />}>Login</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <HStack spacing={"10vmin"}>
            <Link>
              <Text className="2vmin">Home</Text>
            </Link>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={Button}
                    colorScheme="transparent"
                    rightIcon={
                      isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
                    }
                  >
                    Services
                  </MenuButton>
                  <MenuList color={"#8a3bf3"}>{mainMenuOptions()}</MenuList>
                </>
              )}
            </Menu>
            <Link to={'/faq'}>
              <Text className="2vmin">FAQs</Text>
            </Link>
          </HStack>
          {renderLoginBtn()}
        </>
      )}
    </div>
  );
}