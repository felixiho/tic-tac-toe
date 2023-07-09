

export const checkIfSuccess = (board:string[]|boolean[]) => {
  const split: any = [[], [], []]
  board.forEach((item, index) => {
    const row = Math.floor(index/3)
    const col = index%3
    split[row][col] = item
  })

  split.forEach((row: any) => { 
    const isValid = checkHorizontal(row)
    console.log({isValid})
    if (isValid){
      return true
    }
  })

  return false
  
}

//check horizontal
const checkHorizontal = (row:string[]) => {
  return row.every(item => item && item === row[0]) 
}