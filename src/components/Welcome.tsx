import { Flex, Heading, Text, Box } from "@chakra-ui/layout";
import { ReactNode } from "react";
import PlayerButton from "./PlayerButton";

const Welcome = () => {
  return (
    <Flex w="full" alignItems={"center"}>
      <Flex w="full" flexDir={"column"}>
        <Box w="full">
          <Heading w="full" fontSize={"4xl"} textAlign={"center"}>
            Tic Tac Toe
          </Heading>
          <Text mt={2} fontWeight={"semibold"} fontSize={"md"} textAlign={"center"}>
            Forest Theme
          </Text>
        </Box>
        <Flex mt={8} w="full" flexDir={"column"} justifyContent={"center"}>
            <PlayerButton multi={false} />
            <PlayerButton multi={true} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Welcome;
