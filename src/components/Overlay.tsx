import { ModalOverlay } from "@chakra-ui/react"; 

const Overlay = () => {
  return (
    <ModalOverlay
      bg="transparent"
      backdropFilter="auto"
      backdropInvert="0%"
      backdropBlur="0px"
    />
  );
};

export default Overlay;
