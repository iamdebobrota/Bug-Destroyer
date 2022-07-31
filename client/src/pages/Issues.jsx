import { Box, Center, CircularProgress, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIssues } from "../redux/Issue/action";
import Issue from "./Issue";

const Issues = () => {
  const dispatch = useDispatch();
  const { isLoading, isErr, data } = useSelector((store) => store.issue);
  useEffect(() => {
    dispatch(getIssues());
  }, []);
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
      <Box maxW={"760px"} m={"auto"} px={4}>
        {isLoading ? (
          <Center>
            <CircularProgress isIndeterminate color="blue.300" />
          </Center>
        ) : isErr ? (
          <div>Something went wrong!</div>
        ) : (
          data.map((item) => {
            return <Issue key={item._id} {...item} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default Issues;
