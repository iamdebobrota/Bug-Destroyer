import React, { useEffect, useState } from "react";
import { Box, Input, Text, useToast } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Editor from "./Editor";
import CodingEditor from "./CodingEditor";
import { useDispatch, useSelector } from "react-redux";
import { createIssue } from "../redux/Issue/action";
import { useNavigate } from "react-router-dom";

const IssueForm = () => {
  const [issueData, setIssueData] = useState({});
  const [content, setContent] = useState("");
  const [code, setCode] = useState(``);
  const [showData, setShowData] = useState(false);
  const toast = useToast();

  const { isLoading, isErr, res_msg, res_type } = useSelector(
    (store) => store.issue
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let ip = e.target;
    setIssueData({
      ...issueData,
      [ip.name]: ip.value,
    });
  };

  useEffect(() => {
    if (res_msg !== "") {
      if (res_msg === "Issue created successfully") {
        navigate("/issues");
      }
      toast({
        title: res_msg,
        status: res_type,
        duration: 5000,
        isClosable: true,
      });
    }
  }, [res_msg, res_type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      title: issueData?.title,
      code,
      desc: content,
    };
    // setShowData(true);
    dispatch(createIssue(payload));
    console.log(payload);
  };
  return (
    <Box
      width={"100%"}
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;"
      }
      pt={"20px"}
      pb={"20px"}
      color={"#fff"}
    >
      <Box>
        {showData && (
          <>
            <Box>{issueData.code}</Box>
            <Box>{issueData.desc}</Box>
          </>
        )}
      </Box>
      <Box maxW={"760px"} m={"auto"} px={4}>
        <Box>
          <Text fontSize={"22px"} fontWeight="hairline">
            Raise a public issue
          </Text>
        </Box>
        <Box
          rounded={"8px"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
          }
          p={"20px"}
          backgroundColor={"#101010"}
          mt="15px"
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                required
                onChange={handleChange}
                name="title"
                type="text"
              />
              <FormHelperText>
                Be specific and imagine you’re asking a question to another
                person
              </FormHelperText>
            </FormControl>
            <FormControl mt={"20px"}>
              <FormLabel>Description</FormLabel>
              <Editor setContent={setContent} />
            </FormControl>
            <FormControl mt={"20px"}>
              <FormLabel>Write your code here</FormLabel>
              <CodingEditor setCode={setCode} />
            </FormControl>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <FormControl
                w={"20%"}
                backgroundColor={"#1A73E85f"}
                _hover={{ backgroundColor: "#1A73E8" }}
                rounded={"10px"}
                mt={"20px"}
              >
                <Input cursor="pointer" type={"submit"} value="Raise Issue" />
              </FormControl>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default IssueForm;
