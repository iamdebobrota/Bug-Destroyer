import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text,
  Box,
  InputGroup,
  HStack,
  InputRightElement,
  useColorModeValue,
  Grid,
  useToast,
  Progress,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import swal from "sweetalert";

import svg from "./svg.svg";
import svg1 from "./svg1.svg";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { login, signup } from "../../redux/auth/action";

export default function SplitScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [sign, setSign] = useState(false);

  const [loginData, setLoginData] = useState({});
  const [signUpData, setSignUpData] = useState({});

  const { loading, err, res_msg, res_type } = useSelector(
    (store) => store.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoSignup = () => {
    sign ? setSign(false) : setSign(true);
  };

  const toast = useToast();

  useEffect(() => {
    if (res_msg !== "") {
      if (res_msg === "User Registered Successfully!") {
        setSign(false);
      }
      if (res_msg === "User Logged in successfully") {
        navigate("/");
      }
      toast({
        title: res_msg,
        status: res_type,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [res_msg, res_type]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  const handleChangeLoginData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleChangeSignUpData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(signUpData));
  };

  return (
    <Stack mt={"-64px"}>
      {!sign ? (
        <Stack
          minH={"100vh"}
          width="100%"
          background={"#11181a"}
          margin={"auto"}
          display={"flex"}
          justify={"center"}
          alignItems={"center"}
        >
          {/* <Heading as='h4' size='2xl' textAlign={'center'} color={'white'}>Welcome to Bug Destroyer</Heading> */}
          <Stack
            minH={"80vh"}
            width="60%"
            borderRadius={"3xl"}
            direction={{ base: "column", md: "row" }}
            background={"#090909"}
          >
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={4} w={"full"} maxW={"md"}>
                <Image
                  src={logo}
                  alt="H"
                  height={"80px"}
                  pl={5}
                  m={-10}
                  width={"80px"}
                />
                <Heading fontSize={"3xl"} textAlign={"center"} color={"white"}>
                  Sign in to your account
                </Heading>

                <div
                  style={{
                    borderBottom: "4px solid red",
                    margin: "auto",
                    width: "60px",
                    marginTop: "8px",
                  }}
                ></div>

                <Flex justifyContent={"center"} gap={5}>
                  <Box
                    href="#"
                    padding={1}
                    cursor={"pointer"}
                    borderRadius={"full"}
                    background={"#1a78f3"}
                  >
                    <FaFacebook fontSize={"28px"} color={"white"} />
                  </Box>
                  <Box
                    cursor={"pointer"}
                    padding={1}
                    borderRadius={"full"}
                    background={"#cbcbcb"}
                  >
                    <FcGoogle fontSize={"28px"} />
                  </Box>
                  <Box
                    href="#"
                    padding={1}
                    cursor={"pointer"}
                    borderRadius={"full"}
                    background={"#087ad9"}
                  >
                    <FaLinkedinIn fontSize={"28px"} color={"white"} />
                  </Box>
                </Flex>
                <Text textAlign={"center"} color={"white"} fontWeight={600}>
                  OR
                </Text>

                <form onSubmit={handleLoginSubmit}>
                  <FormControl id="email">
                    <FormLabel color={"white"}>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      color={"#fff"}
                      onChange={handleChangeLoginData}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel color={"white"}>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      color={"#fff"}
                      onChange={handleChangeLoginData}
                    />
                  </FormControl>
                  <Stack spacing={6}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox color={"white"}>Remember me</Checkbox>
                      <Link color={"blue.500"}>Forgot password?</Link>
                    </Stack>
                    {loading ? (
                      <Progress size="xs" isIndeterminate />
                    ) : (
                      <Button
                        type="submit"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Sign in
                      </Button>
                    )}
                  </Stack>
                </form>
                <Text
                  fontSize="sm"
                  color={"white"}
                  cursor={"pointer"}
                  onClick={handleGoSignup}
                >
                  Don't have account ?{" "}
                  <Link style={{ color: "#3182ce", fontSize: "19px" }}>
                    {" "}
                    Create an account
                  </Link>
                </Text>
              </Stack>
            </Flex>
            <Flex flex={1}>
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                borderRightRadius={"3xl"}
                src={svg}
              />
            </Flex>
          </Stack>
        </Stack>
      ) : (
        <Flex
          minH={"100vh"}
          width="100%"
          background={"#11181a"}
          //  background={'#090909'}
          margin={"auto"}
          display={"flex"}
          justify={"center"}
          alignItems={"center"}
        >
          <Flex
            minH={"80vh"}
            color={"white"}
            align={"center"}
            justify={"center"}
            // bg={useColorModeValue('gray.50', 'gray.800')}
            boxShadow={"lg"}
            //  height='600px'
            width="60%"
            borderRadius={"3xl"}
            direction={{ base: "column", md: "row" }}
            background={"#090909"}
            flexDirection={"row-reverse"}
          >
            <Stack
              flex={1}
              spacing={2}
              mx={"auto"}
              maxW={"lg"}
              py={1}
              px={5}
              height="100%"
            >
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} mt={4} textAlign={"center"}>
                  Sign up
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>
              <Flex justifyContent={"center"} gap={5}>
                <Box
                  href="#"
                  padding={1}
                  cursor={"pointer"}
                  borderRadius={"full"}
                  background={"#1a78f3"}
                >
                  <FaFacebook fontSize={"28px"} color={"white"} />
                </Box>
                <Box
                  cursor={"pointer"}
                  padding={1}
                  borderRadius={"full"}
                  background={"#cbcbcb"}
                >
                  <FcGoogle fontSize={"28px"} />
                </Box>
                <Box
                  href="#"
                  padding={1}
                  cursor={"pointer"}
                  borderRadius={"full"}
                  background={"#087ad9"}
                >
                  <FaLinkedinIn fontSize={"28px"} color={"white"} />
                </Box>
              </Flex>
              <Text textAlign={"center"} color={"white"} fontWeight={600}>
                OR
              </Text>

              <Box
                rounded={"lg"}
                // bg={useColorModeValue('white', 'gray.700')}

                p={8}
              >
                <Stack spacing={4}>
                  <form onSubmit={(e) => handleSignUpSubmit(e)}>
                    <HStack>
                      <Box>
                        <FormControl id="firstName" isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input
                            type="text"
                            name="firstname"
                            onChange={handleChangeSignUpData}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl id="lastName">
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            type="text"
                            name="lastname"
                            onChange={handleChangeSignUpData}
                          />
                        </FormControl>
                      </Box>
                    </HStack>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        onChange={handleChangeSignUpData}
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChangeSignUpData}
                        />
                        <InputRightElement h={"full"}>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                      {loading ? (
                        <Progress size="xs" isIndeterminate />
                      ) : (
                        <Button
                          type="submit"
                          loadingText="Submitting"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{
                            bg: "blue.500",
                          }}
                        >
                          Sign up
                        </Button>
                      )}
                    </Stack>
                  </form>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link color={"blue.400"} onClick={handleGoSignup}>
                        Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>

            <Flex flex={1}>
              <Image
                paddingLeft={4}
                alt={"Login Image"}
                objectFit={"cover"}
                borderRightRadius={"3xl"}
                src={svg1}
                pr={6}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Stack>
  );
}
