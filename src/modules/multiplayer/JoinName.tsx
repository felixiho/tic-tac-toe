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
import { useState, useContext } from "react";
import { registerPlayer } from "../api";
import { PusherContext } from "./Pusher";

const JoinName = ({
  isOpen,
  onClose, 
}: {
  isOpen: boolean;
  onClose: any 
}) => { 
  const [playerName, setPlayerName] = useState("")
  const [loading, setLoading] = useState(false);
  const multi = useContext(PusherContext);


  const playGame = async() => {
    if (playerName.length > 2) {
      setLoading(true);
      const response = await registerPlayer(playerName);
      const token = response.data.token;
      localStorage.setItem("tickToken", token);
      if(multi){
        const {setJoinName} = multi
        setJoinName(playerName)
      }
      setLoading(false)
      onClose("join")
    }
  } 

  const closeModal = () => { 
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
              Enter Name
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
              isLoading={loading}
            >
              Next
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default JoinName;
