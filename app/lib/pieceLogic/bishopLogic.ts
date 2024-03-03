import { PieceType, Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getBishopLegalMoves = (
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
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  direction.forEach((value) => {
    row = rowAt + value[0];
    col = colAt + value[1];
    while (row < 8 && row >= 0 && col < 8 && col >= 0) {
      if (board[row][col].type == PieceType.none) {
        legalMoves.push({
          row: row,
          col: col,
        });
        row = row + value[0];
        col = col + value[1];
      } else if (board[row][col].color != piece.color) {
        legalMoves.push({
          row: row,
          col: col,
        });
        break;
      } else {
        break;
      }
    }
  });

  return legalMoves;
};
