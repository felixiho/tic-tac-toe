import { Flex, Heading } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";

const Item = ({
  itemIndex,
  handleUpdate,
  turn,
  verifyBoard,
  value, 
}: any) => {
  const handleClick = (itemIndex: number) => {
    if (!turn || verifyBoard(itemIndex)) return;
    handleUpdate(itemIndex); 
  }; 


  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      onClick={() => handleClick(itemIndex)}
    >
      <Heading size={"4xl"} fontFamily={"roboto"}>
        {value}
      </Heading>
    </Flex>
  );
};

export default Item;
