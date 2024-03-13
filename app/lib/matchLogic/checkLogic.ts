import legalMovesGenerator, { LegalMoves } from "@/app/components/legalMoves";
import { PiecesInterface } from "@/app/components/pieces";
import { Position } from "@/app/components/tile";
import { Color } from "@/app/components/pieces";

export interface Check {
  checkFrom: Position[];
  ischeck: boolean;
}

export const checkLogic = (
  board: PiecesInterface[][],
  turn: Color,
  boardOrientation: boolean,
  king: { whitePosition: Position; blackPosition: Position },
) => {
  let check: Check = { checkFrom: [], ischeck: false };
  const legalMoves = legalMovesGenerator(
    board,
    boardOrientation,
    turn,
    check,
  );
  if (turn == Color.white) {
    for (let key in legalMoves) {
      legalMoves[key].forEach((move) => {
        if (
          move.row == king.blackPosition.row &&
          move.col == king.blackPosition.col
        ) {
          check.checkFrom.push({ row: move.row, col: move.col });
          check.ischeck = true;
          console.log(check);
        }
      });
    }
  } else if (turn == Color.black) {
    for (let key in legalMoves) {
      legalMoves[key].forEach((move) => {
        if (
          move.row == king.whitePosition.row &&
          move.col == king.whitePosition.col
        ) {
          check.checkFrom.push({ row: move.row, col: move.col });
          check.ischeck = true;
          console.log(check);
        }
      });
    }
  }
  return check;
};
