import { Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getKingLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  boardOrientation: boolean,
) => {
  const rowAt = positionSelected.row;
  const colAt = positionSelected.col;
  let row;
  let col;
  let legalMoves: any[] = [];
  const direction = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  //CASTLING LOGIC

  direction.forEach((value) => {
    row = rowAt + value[0]
    col = colAt + value[1]
    if(row <= 7 && row >= 0 && col <= 7 && col >= 0){
      if(board[row][col] == Pieces.empty){
          //NEED TO ADD LOGIC IF THE POSTION OVERLAPS WITH ANY OTHER PIECE LEGAL MOVE, NOT A LEGAL MOVE
            legalMoves.push({
                row:row,
                col:col
            })
        }
        else if(board[row][col].color!=piece.color){
          //NEED TO ADD THE LOGIC IF PIECE IS GUARDED BY SOMETHING, NOT A LEGAL MOVE
            legalMoves.push({
                row:row,
                col:col
            })
        }
    }
  });
  return legalMoves;
};
