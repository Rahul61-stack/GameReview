import { Color, Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getPawnLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  orientation: boolean
) => {
  const rowAt = positionSelected.row;
  const colAt = positionSelected.col;
  const white = piece.color;
  const moveUp = (orientation && !white) || (!orientation && white);
  let row:number;
  let col:number;
  let legalMoves = [];

  // Check if pawn can move 1 square vertically
  row = rowAt + (moveUp ? -1 : 1);
  col = colAt;
  const move1 = board[row][col] == Pieces.empty;

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
    board[row][col] == Pieces.empty &&
    ((moveUp && rowAt == 6) || (!moveUp && rowAt == 1));

  if (move2) {
    legalMoves.push({
      row: row,
      col: col,
    });
  }
  row = rowAt + (moveUp ? -1:1)
  const direction = [1,-1]
  direction.forEach((value)=>{
    col = colAt + value
    if(row>=0&&row<=7&&col>=0&&col<=7){
      if(board[rowAt][colAt].color==Color.white){
        if(board[row][col].color==Color.black){
          legalMoves.push({
            row:row,
            col:col
          })
        }
      } else if(board[rowAt][colAt].color==Color.black){
        if(board[row][col].color==Color.white){
          legalMoves.push({
            row:row,
            col:col
          })
        }
      }
    }
  })
  return legalMoves;
};
