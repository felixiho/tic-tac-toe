import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const Score = ({
  player1,
  player2,
  isTurn,
  winner,
  score, 
  userName,
  opName,
}: {
  player1: string;
  player2: string
  isTurn: boolean;
  winner: boolean | string;
  score: any; 
  userName: string
  opName: string 
}) => { 
  return (
    <Flex w="full" my={10} flexDir={"column"}>
      {winner ? (
        <Text textAlign={"center"}>
          {!isTurn ? userName : opName} Wins!!
        </Text>
      ) : (
        <Text textAlign={"center"}>
          Let's go! {isTurn  ? userName : opName}'s turn{" "}
        </Text>
      )}
      <Flex w="full" mt={10} justifyContent={"space-between"}>
        <Box w="50%">
          <Image src="monkey.png" mx="auto" />
          <Text textAlign={"center"} mt={2} fontSize={"xl"}>
            {player1}
          </Text>
          <Heading size={"2xl"} mt={2} textAlign={"center"}>
            {score.O}
          </Heading>
        </Box>
        <Box w="50%">
          <Image src="tiger1.png" mx="auto" />
          <Text mt={2} fontSize={"xl"} textAlign={"center"}>
            {player2}
          </Text>
          <Heading size={"2xl"} mt={2} textAlign={"center"}>
            {score.X}
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Score;
