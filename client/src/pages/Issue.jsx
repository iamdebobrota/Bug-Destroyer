import { Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ShowCode from "../components/ShowCode";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getIssues, postComment } from "../redux/Issue/action";

const Issue = (props) => {
  const { _id, code, comments, deleted, desc, user, title } = props;
  const [commentData, setCommentData] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let ip = e.target;
    setCommentData({
      ...commentData,
      [ip.name]: ip.value,
    });
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    let payload = {
      ...commentData,
      id: _id,
    };
    dispatch(postComment(payload));
  };
  return (
    <Box
      w={"100%"}
      m={"20px 0"}
      border={"1px solid #ffffff12"}
      borderTop={"10px solid #161B22"}
      backgroundColor={"#101010"}
      boxShadow={
        "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;"
      }
      rounded={"10px"}
      overflow={"hidden"}
    >
      <Flex w={"100%"} justifyContent={"space-between"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-end"}
          w={"20%"}
          borderRight={"10px solid #161B22"}
          pr={"10px"}
          p={"10px"}
        >
          <Avatar size={"sm"} src={user[0]?.profile} />
          <Text
            fontSize={"12px"}
            fontWeight={"100"}
            mt={"10px"}
            textAlign={"right"}
          >
            {user[0].firstname + user[0].lastname}
          </Text>
        </Box>
        <Box p={"10px"} flex={1}>
          <Box>
            <Text fontSize={"22px"} fontWeight={"100"}>
              {title}
            </Text>
          </Box>
          <Box mt={"15px"}>
            <Text fontSize={"15px"} fontWeight={"200"} letterSpacing={"1px"}>
              {desc}
            </Text>
          </Box>
          <Box>
            <ShowCode code={code} />
          </Box>
        </Box>
      </Flex>

      <Box padding={"20px"}>
        {comments.map((item) => {
          return (
            <>
              <Box p={"2px 10px"} border={"1px solid gray.200"} key={item._id}>
                <Text fontSize={"14px"} fontWeight={"100"}>
                  {item.comment}
                </Text>
              </Box>
            </>
          );
        })}
      </Box>
      <Box padding={"20px"}>
        <form onSubmit={handleCommentSubmit}>
          <Flex gap={"20px"}>
            <FormControl w={"80%"}>
              <Input
                type="text"
                placeholder="Add your suggestions"
                name="comment"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              backgroundColor={"#1A73E85f"}
              _hover={{ backgroundColor: "#1A73E8" }}
              rounded={"10px"}
              width={"20%"}
            >
              <Input cursor="pointer" type="submit" value="Post" />
            </FormControl>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Issue;
