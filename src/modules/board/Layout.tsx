import { Grid } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import Item from "./Item";
import { checkIfSuccess } from "./utils";

const Layout = ({ playerTurn, setPlayerTurn, board, setBoard, setWinner, winner }: any) => {
  const game = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
      setTimeout(() => {
        const itemIndex = computerPlays();
        itemIndex && handleUpdate(itemIndex - 1);
      }, 200);
    }
  }, [playerTurn]);

  const handleUpdate = (updateIndex: number) => {
    if(winner) return
    setBoard((board: any) =>
      board.map((item: any, index: number) => {
        if (index === updateIndex) {
          return playerTurn ? "X" : "O";
        } else {
          return item;
        }
      })
    );
    const isValid = checkIfSuccess(board);
    console.log({isValid})
    if (!isValid) {
      setPlayerTurn(!playerTurn);
      return
    }
    setWinner(playerTurn ? "X" : "0")
  };

  return (
    <Grid
      w="full"
      className="bamboo-parent"
      height={"inherit"}
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
