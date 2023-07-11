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
  ImageProps,
  StyleProps,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useState } from "react";
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
  const initialScore = { X: 0, O: 0 }
  const [playerTurn, setPlayerTurn] = useState(true);
  const [board, setBoard] = useState(initialBoard.flat());
  const [winner, setWinner] = useState(false);
  const [winnerType, setWinnerType] = useState("");
  const [backgroundStyles, setBackgroundStyles] = useState<StyleProps>({});
  const [score, setScore] = useState(initialScore);


  const resetBoard = (score?:boolean) => {
    setBoard(initialBoard.flat());
    setPlayerTurn(true);
    setWinner(false);
    if (score) setScore(initialScore)
  };

  useLayoutEffect(() => {
    if (winner) {
      const styles = getBackgroundStyles();
      setBackgroundStyles(styles);
    } else {
      setBackgroundStyles({});
    }
  }, [winner]);

  const closeBoard = () => {
    resetBoard(true);
    onClose("single");
  };

  const getBackgroundStyles = (): StyleProps => {
    if (!winner || !winnerType) return {};
    switch (winnerType) {
      case "diagonal1":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "diagonal1.png",
        };
      case "diagonal2":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "diagonal2.png",
          backgroundPosition: "64%",
        };
      case "row0":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "horizontal.png",
          backgroundPosition: "0 -9.3rem",
        };
      case "row1":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "horizontal.png",
          backgroundPosition: "0 -2.7rem",
        };
      case "row2":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "horizontal.png",
          backgroundPosition: "0 3.7rem",
        };
      case "col0":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "vertical.png",
          backgroundPosition: "-10rem 0",
        };
      case "col1":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "vertical.png",
          backgroundPosition: "-3.6rem 0",
        };
      case "col2":
        return {
          backgroundRepeat: "no-repeat",
          backgroundImage: "vertical.png",
          backgroundPosition: "3rem 0",
        };

      default:
        break;
    }
    return {
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <Modal
      isCentered
      onClose={() => onClose("")}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={"sm"}
      closeOnOverlayClick={false}
    >
      <Overlay />
      <ModalOverlay />
      <ModalContent maxW={"342px"}>
        <ModalHeader display={"flex"} justifyContent={"space-between"}>
          <Image onClick={closeBoard} alt="back button" src="/back.png" />
          <Image onClick={() => resetBoard()} alt="back button" src="/refresh.png" />
        </ModalHeader>
        <ModalBody>
          <Flex w="full" justifyContent={"center"} flexDir={"column"}>
            <Box height={"326px"} {...backgroundStyles}>
              <Layout
                playerTurn={playerTurn}
                setWinner={setWinner}
                setPlayerTurn={setPlayerTurn}
                board={board}
                setBoard={setBoard}
                winner={winner}
                setWinnerDimension={setWinnerType}
                setScore={setScore}
              />
            </Box>
          </Flex>
          <Score
            score={score}
            player={player}
            isTurn={playerTurn}
            winner={winner}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Board;
