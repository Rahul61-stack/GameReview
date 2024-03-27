import { Position } from "./tile";
import { PiecesInterface } from "./pieces";
import { Color } from "./pieces";
import { positionToSquare } from "../lib/utils/utils";
import { Check } from "../lib/matchLogic/checkLogic";

export interface LegalMoves {
  [key: string]: Position[];
}

const legalMovesGenerator = (
  board: PiecesInterface[][],
  boardOrientation: boolean,
  turn: Color,
  check: Check
) => {
  let piecelegalMoves: Position[] = [];
  let allLegalMoves: LegalMoves = {};
  let possibleMoves: LegalMoves = {};
  for (let i: number = 0; i < 8; i++) {
    for (let j: number = 0; j < 8; j++) {
      let piece = board[i][j];
      if (turn == piece.color) {
        piecelegalMoves = piece.legalMoves(
          piece,
          board,
          { row: i, col: j },
          boardOrientation
        );
        possibleMoves[
          positionToSquare({
            row: i,
            col: j,
          })
        ] = piecelegalMoves;
      }
    }
  }
  if (!check.ischeck) {
    allLegalMoves = possibleMoves;
  } else {
    if (check.checkFrom.length == 1) {
      const possibleCheck = check.checkFrom[0];
      let directionCol = check.king.col > possibleCheck.col ? 1 : -1;
      for (let key in possibleMoves) {
        allLegalMoves[key] = [];
        if (
          positionToSquare({ row: check.king.row, col: check.king.col }) != key
        ) {
          possibleMoves[key].forEach((value) => {
            //Capture the check
            if (
              value.row == possibleCheck.row &&
              value.col == possibleCheck.col
            ) {
              allLegalMoves[key].push({ row: value.row, col: value.col });
            }
            //Check from bishop or queen
            if (
              value.row + directionCol * value.col ==
                possibleCheck.row + directionCol * possibleCheck.col &&
              value.row + directionCol * value.col ==
                check.king.row + directionCol * check.king.col
            ) {
              allLegalMoves[key].push({ row: value.row, col: value.col });
            } else if (
              value.row === check.king.row &&
              value.row === possibleCheck.row &&
              (check.king.col > possibleCheck.col
                ? value.col > possibleCheck.col && value.col < check.king.col
                : value.col < possibleCheck.col && value.col > check.king.col)
            ) {
              allLegalMoves[key].push({ row: value.row, col: value.col });
            } else if (
              value.col === check.king.col &&
              value.col === possibleCheck.col &&
              (check.king.row > possibleCheck.row
                ? value.row > possibleCheck.row && value.row < check.king.row
                : value.row < possibleCheck.row && value.row > check.king.row)
            ) {
              allLegalMoves[key].push({ row: value.row, col: value.col });
            }
          });
        } else {
          
        }
      }
    }
  }
  return allLegalMoves;
};

export default legalMovesGenerator;
