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

const Waiting = ({
  isOpen,
  onClose, 
}: {
  isOpen: boolean;
  onClose: any 
}) => { 
  const [playerName, setPlayerName] = useState("")
  const playGame = () => {
    if (playerName.length > 2){ 
      onClose("board")
    }
  } 

  const closeModal = () => { 
    onClose("start")
  }




  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"xs"}
      closeOnOverlayClick={false}
    >
      <Overlay />
      <ModalOverlay />
      <ModalContent maxW={"256px"}>
        <ModalHeader>
          <Image onClick={closeModal} alt="back button" src="/back.png" />
        </ModalHeader>
        <ModalBody>
          <Flex w="full" justifyContent={"center"} flexDir={"column"} px={4}>
            <Text fontSize={"lg"} fontWeight={"semibold"} textAlign={"center"} my={16}>
              Waiting for player to join .........
            </Text>  
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Waiting;
