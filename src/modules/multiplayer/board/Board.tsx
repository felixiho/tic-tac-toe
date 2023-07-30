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
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Score from "./Score";
import Layout from "./Layout";
import { PusherContext } from "../Pusher";

const initialBoard = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

// if (typeof window !== "undefined") {
//   window.addEventListener("beforeunload", (e) => {
//     e.returnValue =
//       "Are you sure you want to leave? You will lose your current progress;";
//   });
// }

const Board = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const multi = useContext(PusherContext);

  const [startName, setStartName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [startId, setStartId] = useState(0);
  const [joinId, setJoinId] = useState(0);
  const [userId, setUserId] = useState(0);
  const initialScore = { X: 0, O: 0 };
  const [playerTurn, setPlayerTurn] = useState(false);
  const [board, setBoard] = useState(initialBoard.flat());
  const [winner, setWinner] = useState(false);
  const [winnerType, setWinnerType] = useState("");
  const [backgroundStyles, setBackgroundStyles] = useState<StyleProps>({});
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    if (!multi || !multi.channel) return;
    const { joinName, startName, channel, startId, joinId, userId } = multi; 
    setStartName(startName);
    setJoinName(joinName);
    setStartId(startId);
    setJoinId(joinId);
    setUserId(userId);
    setPlayerTurn(startId === userId);

    channel.bind("client-board-reset", (data: any) => {
      setBoard(initialBoard.flat());
      setPlayerTurn(startId === userId);
      setWinner(false); 
    });

    channel.bind("client-update-score", (data: any) => {
      // setScore((score: any) => ({
      //   ...score,
      //   [data.player]: score[data.player] + 1,
      // }));
    });

    // () => {
    //   // channel.unsubscribe()
    // }
  }, [multi]);

  const resetBoard = (score?: boolean) => {
    setBoard(initialBoard.flat());
    setPlayerTurn(startId === userId);
    setWinner(false); 
    if (!multi || !multi.channel) return;
    const channel = multi.channel;
    channel.trigger("client-board-reset", {});
  };
 

  useEffect(() => {
    if (winner) {
      const styles = getBackgroundStyles();
      setBackgroundStyles(styles);
    } else {
      setBackgroundStyles({});
    }
  }, [winner]);

  const closeBoard = () => {
    resetBoard(true);
    onClose("");
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
          <Image
            onClick={() => resetBoard()}
            alt="back button"
            src="/refresh.png"
          />
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
            player1={startName}
            player2={joinName}
            isTurn={playerTurn}
            winner={winner}
            userName={userId === startId ? startName : joinName}
            opName={userId === startId ? joinName : startName}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Board;
