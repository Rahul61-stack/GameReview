import { Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getKnightLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  orientation: boolean
) => {
  const rowAt = positionSelected.row;
  const colAt = positionSelected.col;
  let row;
  let col;
  let legalMoves: any[] = [];
  let direction = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  console.log(piece);

  direction.forEach((value) => {
    row = rowAt + value[0]; //
    col = colAt + value[1]; // [[8, 8], [8, 4], [6, 8], [6, 4]]
    if (row <= 7 && row >= 0 && col <= 7 && col >= 0) {
      console.log(row, col);
      if (board[row][col].color != piece.color) {
        legalMoves.push({
          row: row,
          col: col,
        });
      }
    }
  });
  direction.forEach((value) => {
    row = rowAt + value[1];
    col = colAt + value[0]; // [[9, 7], [5, 7], [9, 5], [5, 5]]
    if (row <= 7 && row >= 0 && col <= 7 && col >= 0) {
      console.log(row, col);
      if (board[row][col].color != piece.color) {
        legalMoves.push({
          row: row,
          col: col,
        });
      }
    }
  });

  console.log(legalMoves);

  return legalMoves;
};
