import { Position } from "./tile";
import { PieceType, PiecesInterface } from "./pieces";
import { Color } from "./pieces";
import { positionToSquare, squareToPosition } from "../lib/utils/utils";
import { Check } from "../lib/matchLogic/checkLogic";

export interface LegalMoves {
  [key: string]: Position[];
}

const legalMovesGenerator = (
  board: PiecesInterface[][],
  boardOrientation: boolean,
  turn: Color,
  check: Check,
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
          boardOrientation,
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
      // BLOCK CHECK
      // TAKE PIECE THAT IS GIVING CHECK
      const possibleCheck = check.checkFrom[0]
        for (let key in possibleMoves) {
          allLegalMoves[key] = [];
          possibleMoves[key].forEach((value) => {
            if (
              positionToSquare({ row: check.king.row, col: check.king.col }) !=
              key
            ) {
              if (
                value.row == possibleCheck.row &&
                value.col == possibleCheck.col
              ) {
                allLegalMoves[key].push({ row: value.row, col: value.col });
              }
              if (check.king.row - check.king.col == value.row - value.col) {
                allLegalMoves[key].push({ row: value.row, col: value.col });
              } else if (
                (check.king.row == possibleCheck.row &&
                  check.king.row == value.row) ||
                (check.king.col == possibleCheck.col &&
                  check.king.col == value.col)
              ) {
                allLegalMoves[key].push({ row: value.row, col: value.col });
              }
            }
          });
        }
      console.log(allLegalMoves);
    }
  }
  return allLegalMoves;
};

export default legalMovesGenerator;
