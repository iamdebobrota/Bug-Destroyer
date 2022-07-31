import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { getUser } from "../../redux/auth/action";

export default function UserProfileEdit() {
  const [userData, setUserData] = useState({});
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const [file, setFile] = useState();

  let userid = localStorage.getItem("userid");

  function handleChange(e) {
    let fileU = e.target.files;
    let name = e.target.name;
    let value = e.target.value;

    if (fileU) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
    setUserData({
      ...userData,
      [name]: value,
      file,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = JSON.stringify(userData);
    // dispatch(getSignupToken(payload, userid))
    console.log(userData);

    swal({
      title: "success",
      text: "Profile update successfull",
      icon: "success",
      button: "OK",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("#090909", "gray.800")}
        color={"white"}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"xl"}
          bg={useColorModeValue("#11181a", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>

          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={file}>
                  {/* <FaUserCircle/> */}
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full" style={{ cursior: "pointer" }}>
                <input
                  type="file"
                  name="filename"
                  w="full"
                  _hover={{ color: "green", bg: "white" }}
                  background={"#090909"}
                  onChange={handleChange}
                />
                {/* Upload photo</input> */}
              </Center>
            </Stack>
          </FormControl>

          <Flex>
            <FormControl id="userName" isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder="UserName"
                name="username"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="Cpassword" isRequired marginLeft={"8"}>
              <FormLabel>Current password</FormLabel>
              <Input
                placeholder="Current password"
                name="currentpassword"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Flex>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="password"
                name="newpassword"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired marginLeft={"8"}>
              <FormLabel>confirm Password</FormLabel>
              <Input
                placeholder="confirm password"
                name="confirmpassword"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={handleChange}
              />
            </FormControl>
          </Flex>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
