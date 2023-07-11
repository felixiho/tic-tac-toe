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

const SingleAuth = ({
  isOpen,
  onClose,
  setName, 
}: {
  isOpen: boolean;
  onClose: any
  setName: (a:string) => void
}) => { 
  const [playerName, setPlayerName] = useState("")
  const playGame = () => {
    if (playerName.length > 2){
      setName(playerName)
      onClose("board")
    }
  } 

  const closeModal = () => {
    setPlayerName("")
    onClose("")
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
              Set Name
            </Text>
            <Input
              _focusVisible={{ outline: "none" }}
              textAlign={"center"}
              fontSize={"lg"}
              placeholder="Enter Name"
              mt={6}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <Button
              _hover={{ background: "#8FB01B" }}
              fontSize={"lg"}
              color="white"
              bg="#8FB01B"
              mt={6}
              mb={12}
              onClick={playGame}
            >
              Play
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SingleAuth;
