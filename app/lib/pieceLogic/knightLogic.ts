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
  direction.forEach((value) => {
    row = rowAt + value[0];
    col = colAt + value[1];
    if (row <= 7 && row >= 0 && col <= 7 && col >= 0) {
      const move = board[row][col] == Pieces.empty;
      if (move) {
        legalMoves.push({
          row: row,
          col: col,
        });
      }
    }
  });
  direction.forEach((value) => {
    row = rowAt + value[1];
    col = colAt + value[0];
    if (row <= 7 && row >= 0 && col <= 7 && col >= 0) {
      const move = board[row][col] == Pieces.empty;
      if (move) {
        legalMoves.push({
          row: row,
          col: col,
        });
      }
    }
  });

  return legalMoves;
};
