import { Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { ReactNode } from "react";

const PlayerButton = ({ multi }: { multi: boolean }) => {
  return (
    <Flex w="100%" justifyContent={"center"}>
      <Button height="60px"  fontWeight={"medium"} rounded={"md"} bg="white" my={2} w="256px" _hover={{bgColor: "#f5f5f5"}}>
        {
          !multi ? <Image mr={4}  width="30px" src="/monkey.png" /> :  <Image width="50px" src="/monkeyTiger.png" mr={2} /> 
        }
        {multi ? "Multi player" : "Single Player"}
      </Button>
    </Flex>
  );
};

export default PlayerButton;
