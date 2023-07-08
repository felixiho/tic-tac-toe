import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const Score = ({ player, isTurn }: { player: string; isTurn: boolean }) => {
  return (
    <Flex w="full" my={10} flexDir={"column"}>
      {!isTurn && <Text textAlign={"center"}>Let's go! {player}'s turn </Text>}

      <Flex w="full" mt={10} justifyContent={"space-between"}  >
        <Box w="50%">
          <Image src="monkey.png"  mx="auto" />
          <Text textAlign={"center"}  mt={2} fontSize={"xl"}> {player}  </Text> 
          <Heading size={"2xl"} mt={2}  textAlign={"center"}>1</Heading>
        </Box>
        <Box w="50%">
          <Image src="tiger.png" mx="auto" />
          <Text mt={2} fontSize={"xl"} textAlign={"center"}>Computer </Text> 
          <Heading size={"2xl"} mt={2} textAlign={"center"}>3</Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Score;