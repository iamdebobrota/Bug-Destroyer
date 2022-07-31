import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { AiOutlineBug } from "react-icons/ai";
import { NavLink as DomLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/action";

const Links = [
  { name: "Dashboard", active: true, to: "/" },
  { name: "Todo's", active: false, to: "/todos" },
  { name: "Issues", active: false, to: "/issues" },
  { name: "Raise Issue", active: false, to: "/create-issue" },
];

const mobileLinks = [
  { name: "Dashboard", active: true, to: "/" },
  { name: "Todo's", active: false, to: "/todos" },
  { name: "Issues", active: false, to: "/issues" },
  { name: "Profile", active: false, to: "/profile" },
  { name: "Raise Issue", active: false, to: "/create-issue" },
];

const NavLink = ({ children }) => (
  <DomLink
    to={children.to}
    className={(navData) => (navData.isActive ? "active" : "link")}
  >
    <Text
      px={2}
      py={1}
      fontSize="sm"
      transition="color 600ms ease"
      _hover={{
        textDecoration: "none",
        color: "#fff",
      }}
    >
      {children.name}
    </Text>
  </DomLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/signup");
  };
  return (
    <Box
      width={"100%"}
      position={"fixed"}
      top={"0px"}
      right={"0px"}
      left={"0px"}
      zIndex={7}
      backgroundColor={"#000"}
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"
      }
      color={"#fff"}
    >
      <Box maxW={"1260px"} m={"auto"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            spacing={8}
            w={"100%"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <DomLink style={{ border: "none" }} to="/">
              <HStack>
                <Icon as={AiOutlineBug} w={8} h={8} fill="white" />
                <Text
                  textTransform={"uppercase"}
                  display={{ base: "none", md: "flex" }}
                  fontSize="lg"
                >
                  Destroyer
                </Text>
              </HStack>
            </DomLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </HStack>
            <Flex alignItems={"center"}>
              <Menu backgroundColor={"#202124"}>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  display={{ base: "none", md: "flex" }}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                  />
                </MenuButton>
                <MenuList
                  boxShadow={
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"
                  }
                  backgroundColor={"#202124"}
                >
                  <DomLink to="/profile">
                    <MenuItem
                      backgroundColor={"#202124"}
                      _focus={{
                        backgroundColor: "#202124",
                      }}
                      _hover={{
                        backgroundColor: "#6d6d6d",
                      }}
                    >
                      Profile
                    </MenuItem>
                  </DomLink>
                  <MenuItem
                    backgroundColor={"#202124"}
                    _hover={{
                      backgroundColor: "#6d6d6d",
                    }}
                    onClick={() => handleLogOut()}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              marginRight={"12px"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
        </Flex>

        {isOpen ? (
          <Box backgroundColor="#202124" pb={4} display={{ md: "none" }}>
            <Stack backgroundColor="#202124" as={"nav"} spacing={4}>
              {mobileLinks.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
