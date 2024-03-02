import { Pieces, PiecesInterface } from "@/app/components/pieces";
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
  let row;
  let col;
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

  return legalMoves;
};
