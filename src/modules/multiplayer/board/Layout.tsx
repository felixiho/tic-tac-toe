import { Box, Grid, Image } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Item from "./Item";
import { checkIfSuccess } from "./utils";
import { PusherContext } from "../Pusher";

const Layout = ({
  playerTurn,
  setPlayerTurn,
  board,
  setBoard,
  setWinner,
  winner,
  setWinnerDimension,
  setScore,
}: any) => {
  //check if grid is valid
  const multi = useContext(PusherContext);
  const verifyBoard = (itemIndex: number) => {
    return board[itemIndex];
  };

  useEffect(() => {
    if (!multi || !multi.channel) return;
    const channel = multi.channel;
    channel.bind("client-player-turn", (data: any) => {
      setPlayerTurn(true);
      handleUpdate(data.updateIndex, true);
    });
  }, [multi]);

  useEffect(() => { 
    // if (!playerTurn) {
    const isValid = checkIfSuccess(board);
    if (isValid.player) {
      setWinner(isValid.player); 
      setScore((score: any) => ({
        ...score,
        [isValid.player]: score[isValid.player] + 1,
      }));
      setWinnerDimension(isValid.dimensions);
    }
    // }
  }, [board]);

  const handleUpdate = (updateIndex: number, isCurrent: boolean = false) => {
    if (winner || !multi) return;
    const { joinId, userId } = multi;
    setBoard((board: any) =>
      board.map((item: any, index: number) => {
        if (index === updateIndex) {
          if (isCurrent) {
            return userId === joinId ? "O" : "X";
          }
          return userId === joinId ? "X" : "O";
        } else {
          return item;
        }
      })
    );
    const isValid = checkIfSuccess(board);
    if (isValid.player) {
      setWinner(isValid.player);
      setScore((score: any) => ({
        ...score,
        [isValid.player]: score[isValid.player] + 1,
      }));

      if (multi && multi.channel) {
        const channel = multi.channel;
        channel.trigger("client-update-score", { player: isValid.player });
      }
      setWinnerDimension(isValid.dimensions);
    }

    if (!isCurrent) triggerTurn(updateIndex);
  };

  const triggerTurn = (updateIndex: number) => {
    setPlayerTurn(false);
    if (multi && multi.channel) {
      const channel = multi.channel;
      channel.trigger("client-player-turn", {
        updateIndex,
      });
    }
  };

  return (
    <Grid
      w="full"
      className="bamboo-parent"
      position={"relative"}
      height={"inherit"}
      zIndex={winner ? -2 : 0}
      gridTemplate={" repeat(3, 1fr) / repeat(3, 1fr)"}
    >
      {board.map((value: any, index: number) => (
        <Item
          key={index}
          itemIndex={index}
          handleUpdate={handleUpdate}
          turn={playerTurn}
          verifyBoard={verifyBoard}
          value={value}
        />
      ))}
    </Grid>
  );
};

export default Layout;
