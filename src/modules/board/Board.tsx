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

const Board = ({
  isOpen,
  onClose, 
}: {
  isOpen: boolean;
  onClose: any
}) => { 
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
          <Image onClick={() => onClose("single")} alt="back button" src="/back.png" />
          <Image onClick={onClose} alt="back button" src="/refresh.png" />
        </ModalHeader> 
        <ModalBody>
          <Flex w="full" justifyContent={"center"} flexDir={"column"} px={4}>
            <Box height={"326px"}>
              asdfasdf
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Board;
