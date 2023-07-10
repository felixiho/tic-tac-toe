

export const checkIfSuccess = (board: string[] | boolean[]) => {
  const split: any = [[], [], []]
  board.forEach((item, index) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    split[row][col] = item
  })

  //rows
  for (let i = 0; i < 3; i++) {
    if (split[i][0] === split[i][1] && split[i][0] === split[i][2] && split[i][0] !== "") {
      return { player: split[i][0], dimensions: `row${i}` };
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (split[0][j] === split[1][j] && split[0][j] === split[2][j] && split[0][j] !== "") {
      return { player: split[0][j], dimensions: `col${j}` };
    }
  }

  // Check diagonals
  if (
    (split[0][0] === split[1][1] && split[0][0] === split[2][2] && split[0][0] !== "")
  ) {
    return { player: split[0][0], dimensions: 'diagonal1'};
  } else if (split[0][2] === split[1][1] && split[0][2] === split[2][0] && split[0][2] !== "") {
    return { player: split[0][2], dimensions: 'diagonal2'};
  }

  return {player: false, dimensions: false}

}