import { Box, Grid, Image } from "@chakra-ui/react";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import Item from "./Item";
import { checkIfSuccess } from "./utils";

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
  const verifyBoard = (itemIndex: number) => {
    return board[itemIndex];
  };

  const computerPlays = () => {
    const emptyGrids: number[] = [];
    board.forEach((item: any, index: number) => {
      if (!item) {
        emptyGrids.push(index);
      }
    });
    if (!emptyGrids.length) return;
    const position = emptyGrids[Math.floor(Math.random() * emptyGrids.length)];
    return position + 1;
  };

  useEffect(() => {
    if (!playerTurn) {
      const itemIndex = computerPlays();
      !winner && itemIndex && handleUpdate(itemIndex - 1);
    }
  }, [playerTurn]);

  useEffect(() => {
    const isValid = checkIfSuccess(board);
    if (isValid.player) {
      setWinner(isValid.player);
      setScore((score: any) => ({
        ...score,
        [isValid.player]: score[isValid.player] + 1,
      }));
      setWinnerDimension(isValid.dimensions);
    } else {
      setPlayerTurn(!playerTurn);
    }
  }, [board]);

  const handleUpdate = (updateIndex: number) => {
    if (winner) return;
    setBoard((board: any) =>
      board.map((item: any, index: number) => {
        if (index === updateIndex) {
          return playerTurn ? "X" : "O";
        } else {
          return item;
        }
      })
    );
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
