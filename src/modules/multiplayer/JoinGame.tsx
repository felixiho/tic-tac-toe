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
import { PusherContext } from "./Pusher";
import { useState, useContext } from "react";
import { joinGame } from "../api";

const JoinGame = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const multi = useContext(PusherContext);
  const [playerCode, setPlayerCode] = useState("");
  const [loading, setLoading] = useState(false);

  const playGame = async () => {
    if (playerCode.length > 5 && multi) {
      const { setCode, setStartName, pusher } = multi;
      const response = await joinGame(playerCode);
      setCode(playerCode);
      setStartName(response.data.startName.start);
      const channel = pusher.subscribe(`presence-${playerCode}`);
      channel.bind("pusher:subscription_succeeded", (members: any) => {
        if (members.count > 2) {
          alert("Code already used. Please start a new game");
          setLoading(false);
        } else {
          setLoading(false);
          console.log("joined game");
        }
      });
    }
  };

  const closeModal = () => {
    onClose("");
  };

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
              Enter Code
            </Text>
            <Input
              _focusVisible={{ outline: "none" }}
              textAlign={"center"}
              fontSize={"lg"}
              placeholder="Enter Code"
              mt={6}
              value={playerCode}
              onChange={(e) => setPlayerCode(e.target.value)}
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

export default JoinGame;
