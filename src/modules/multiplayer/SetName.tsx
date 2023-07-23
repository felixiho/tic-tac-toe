import Overlay from "@/components/Overlay";
import { Flex, Text} from "@chakra-ui/layout"; 
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
import { useContext, useEffect, useState } from "react";
import { generateCode, registerPlayer } from "../api";
import { PusherContext } from "./Pusher";

const SetName = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(false);
  const multi = useContext(PusherContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  const playGame = async () => {
    if (playerName.length > 2) {
      setLoading(true);
      const response = await registerPlayer(playerName);
      const token = response.data.token;
      const user_id = response.data.user_id
      localStorage.setItem("tickToken", token);
      if (multi) {
        const { pusher, setCode, setStartName, setStartId,  setChannel, setUserId } = multi;
        const codeResponse = await generateCode();
        const code = codeResponse.data.games.code as string;
        setCode(code);
        const channel = pusher.subscribe(`presence-${code}`);
        channel.bind("pusher:subscription_succeeded", (members: any) => {
          if (members.count > 2) {
            alert("Code already used. Please start a new game");
            setLoading(false);
          } else {
            setChannel(channel) 
            setStartName(playerName);
            setStartId(user_id)
            setUserId(user_id)
            setLoading(false);
            onClose("waiting");
          }
        });  
      }
    }
  };
  const closeModal = () => {
    setPlayerName("");
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
              isLoading={loading}
            >
              Play
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SetName;
