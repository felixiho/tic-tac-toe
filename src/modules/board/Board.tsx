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
import { useState } from "react";
import Score from "./Score";

const Board = ({
  isOpen,
  onClose,
  player,
}: {
  isOpen: boolean;
  onClose: any;
  player: string;
}) => {
  const [playerTurn, setPlayerTurn] = useState(false);
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
          <Image onClick={() => {}} alt="back button" src="/refresh.png" />
        </ModalHeader>
        <ModalBody>
          <Flex w="full" justifyContent={"center"} flexDir={"column"}>
            <Box height={"326px"} bgColor="#f5f5f5">
              
            </Box>
          </Flex>
          <Score player={player} isTurn={playerTurn} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Board;
