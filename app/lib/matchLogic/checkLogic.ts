import legalMovesGenerator, { LegalMoves } from "@/app/components/legalMoves";
import { PiecesInterface } from "@/app/components/pieces";
import { Position } from "@/app/components/tile";
import { Color } from "@/app/components/pieces";

export interface Check {
  checkFrom: Position[];
  ischeck: boolean;
  king:Position
}

export const checkLogic = (
  board: PiecesInterface[][],
  turn: Color,
  boardOrientation: boolean,
  position:Position,
  king: { white: Position; black: Position },
) => {
  let check: Check = { checkFrom: [], ischeck: false, king:{row:-1,col:-1} };
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
          move.row == king.black.row &&
          move.col == king.black.col
        ) {
          console.log("CHECK");
          check.checkFrom.push({ row: position.row, col: position.col });
          check.ischeck = true;
          check.king = king.black
          console.log(check);
        }
      });
    }
  } else if (turn == Color.black) {
    for (let key in legalMoves) {
      legalMoves[key].forEach((move) => {
        if (
          move.row == king.white.row &&
          move.col == king.white.col
        ) {
          check.checkFrom.push({ row: move.row, col: move.col });
          check.ischeck = true;
          check.king = king.white
          console.log(check);
        }
      });
    }
  }
  return check;
};
