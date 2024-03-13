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
  check: Check,
) => {
  let piecelegalMoves: Position[] = [];
  let allLegalMoves: LegalMoves = {};
  //WAYS TO REMOVE CHECK:
  // MOVE KING
  // BLOCK CHECK
  // TAKE PIECE THAT IS GIVING CHECK
  if (check.ischeck) {

  } else {
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
          allLegalMoves[
            positionToSquare({
              row: i,
              col: j,
            })
          ] = piecelegalMoves;
        }
      }
    }
  }
  return allLegalMoves;
};

export default legalMovesGenerator;
