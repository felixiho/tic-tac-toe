import Overlay from "@/components/Overlay";
import { Flex, Text, Box } from "@chakra-ui/layout";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Score from "./Score";
import Layout from "./Layout";

const initialBoard = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

const Board = ({
  isOpen,
  onClose,
  player,
}: {
  isOpen: boolean;
  onClose: any;
  player: string;
}) => {
  const [playerTurn, setPlayerTurn] = useState(true);
  const [board, setBoard] = useState(initialBoard.flat());
  const [winner, setWinner] = useState(false);

  const resetBoard = () => {
    setBoard(initialBoard.flat());
    setPlayerTurn(true);
    setWinner(false)
  };

  return (
    <Modal
      isCentered
      onClose={() => onClose("")}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"sm"}
    >
      <Overlay />
      <ModalOverlay />
      <ModalContent maxW={"342px"}>
        <ModalHeader display={"flex"} justifyContent={"space-between"}>
          <Image
            onClick={() => onClose("single")}
            alt="back button"
            src="/back.png"
          />
          <Image onClick={resetBoard} alt="back button" src="/refresh.png" />
        </ModalHeader>
        <ModalBody>
          <Flex w="full" justifyContent={"center"} flexDir={"column"}>
            <Box height={"326px"}>
              <Layout
                playerTurn={playerTurn}
                setWinner={setWinner}
                setPlayerTurn={setPlayerTurn}
                board={board}
                setBoard={setBoard}
                winner={winner}
              />
            </Box>
          </Flex>
          <Score player={player} isTurn={playerTurn} winner={winner} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Board;
