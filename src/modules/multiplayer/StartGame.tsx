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

const StartGame = ({
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
    onClose("multi")
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
            <Text fontSize={"lg"} fontWeight={"semibold"} textAlign={"center"}>
              Start a game
            </Text> 
             
            <Text fontSize={"lg"} mt={4} textAlign={"center"}>
              Copy Code <br />
              <b>504902</b>
             </Text>
            <Button
              _hover={{ background: "#8FB01B" }}
              fontSize={"lg"}
              color="white"
              bg="#8FB01B" 
              mt={6}
              mb={12}
              onClick={() => onClose("waiting")}
            >
              Next
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StartGame;
