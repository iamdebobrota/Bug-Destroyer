import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Select, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTodosData } from "../../redux/Todos/actions";

const CrudOperations = ({ id }) => {
  const toast = useToast();
  const [statusVal, setStatusVal] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const partiallyDelete = (id) => {
    let token = JSON.parse(localStorage.getItem("token"));
    axios(`${process.env.REACT_APP_API_URL}/todo/delete/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getTodosData());
        toast({
          title: "Deleted from Todos",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => console.log("Something went wrong"));
  };

  const handleSelect = (e) => {
    let value = e.target.value;
    setStatusVal({
      status: {
        inPogress: value == "inPogress" ? true : false,
        todo: value == "todo" ? true : false,
        done: value == "done" ? true : false,
      },
    });
  };

  const EditTodosStatus = (id) => {
    let token = JSON.parse(localStorage.getItem("token"));

    axios(`${process.env.REACT_APP_API_URL}/todo/updateStatus/${id}`, {
      method: "PATCH",
      data: JSON.stringify(statusVal),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch(getTodosData());
        toast({
          title: "Status upadated",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => console.log("Something went wrong"));
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (statusVal) {
      EditTodosStatus(id);
      setStatusVal();
    }
  }, [statusVal]);

  return (
    <HStack>
      <Button bg={"gray.800"} onClick={() => partiallyDelete(id)}>
        <DeleteIcon color={"red"} />
      </Button>
      <Select
        onChange={(e) => handleSelect(e)}
        bg={"gray.800"}
        size={"sm"}
        color="white"
        fontSize={"12px"}
      >
        <option>Edit status</option>
        <option
          style={{
            fontWeight: "bold",
            backgroundColor: isHovering ? "white" : "white",
            color: isHovering ? "black" : "black",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          value="todo"
        >
          To do
        </option>
        <option
          style={{
            fontWeight: "bold",
            backgroundColor: isHovering ? "white" : "white",
            color: isHovering ? "black" : "black",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          value="inPogress"
        >
          In progress
        </option>
        <option
          style={{
            fontWeight: "bold",
            backgroundColor: isHovering ? "white" : "white",
            color: isHovering ? "black" : "black",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          value="done"
        >
          Done
        </option>
      </Select>
    </HStack>
  );
};

export default CrudOperations;
