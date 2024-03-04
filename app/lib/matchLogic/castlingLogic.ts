import { Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "@/app/components/tile";

export interface Castling{
    kingSide:boolean,
    queenSide:boolean
}

export function castlingLegal(
  board: PiecesInterface[][],
  positionSelected: Position,
  boardOrientation: boolean,
  position:Position
) {
  let kingSide = false;
  let queenSide = false;
  let col = positionSelected.col;
  let row = positionSelected.row;
  let castlingLegal:Castling;
  console.log(position);
  while (col >= 0) {
    col = boardOrientation ? col - 1 : col + 1;
    if (col == 0) {
      kingSide = true;
      break;
    }
    if (board[row][col] != Pieces.empty) {
      break;
    }
  }
  col= positionSelected.col
  while (col <= 7) {
    col = boardOrientation ? col + 1 : col - 1;
    if (col == 7) {
      queenSide = true;
      console.log("HERE")
      break;
    }
    if (board[row][col] != Pieces.empty) {
        console.log("SATISFY")
      break;
    }
  }
  castlingLegal = {
    kingSide:kingSide,
    queenSide:queenSide
  }
  
  return castlingLegal;
}
