const legalMovesGenerator = (
  piece: string,
  board: string[][],
  rowAt: number,
  colAt: number,
  moveUp: boolean,
) => {
  let row;
  let col;
  let legalMoves = [];
  if (piece.includes("Pawn")) {
    // Check if pawn can move 1 square vertically
    row = rowAt + (moveUp ? -1 : 1);
    col = colAt;
    const move1 = board[row][col] == "";

    if (move1) {
      legalMoves.push({
        row: row,
        col: col,
      });
    }

    // Check if pawn can move 2 squares vertically
    row = rowAt + (moveUp ? -2 : 2);
    col = colAt;
    const move2 =
      move1 &&
      board[row][col] == "" &&
      ((moveUp && rowAt == 6) || (!moveUp && rowAt == 1));

    if (move2) {
      legalMoves.push({
        row: row,
        col: col,
      });
    }
  } else if (piece.includes("Rook")) {
    let forwardMove = true
    for (let c = 1; c < 8; c++) {
      if(forwardMove){
        row = rowAt + (moveUp ? -c : c);
        col = colAt;
        let move = board[row][col] == "";
        if (move) {
            legalMoves.push({
              row: row,
              col: col,
            });
          } else{
            forwardMove = !forwardMove
          }
      }  
      else{
        row = rowAt + (moveUp ? c : -c);
        col = colAt;
      if(row>=0&&row<=7&&col>=0&&col<=7){
        console.log(row,col)
          const backwardMove = board[row][col] == "";
          if (backwardMove) {
            legalMoves.push({
              row: row,
              col: col,
            });
          } else;
      }
      }
    }
  }
  return legalMoves;
};

export default legalMovesGenerator;
