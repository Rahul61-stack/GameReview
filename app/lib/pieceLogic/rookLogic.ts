import { Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getRookLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  orientation: boolean
) => {
  const rowAt = positionSelected.row;
  const colAt = positionSelected.col;
  let row;
  let col;
  let legalMoves = [];

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let direction of directions) {
    row = rowAt + direction[0];
    col = colAt + direction[1];
    while (row < 8 && row >= 0 && col >= 0 && col < 8) {
      console.log(row, col);
      if (board[row][col] == Pieces.empty) {
        legalMoves.push({ row: row, col: col });
        row = row + direction[0];
        col = col + direction[1];
      } else if (piece.color != board[row][col].color) {
        legalMoves.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }
  }

  return legalMoves;
};
