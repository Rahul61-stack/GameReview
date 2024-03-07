import { Position } from "./tile";
import { PiecesInterface } from "./pieces";
import { Color } from "./pieces";
import { positionToSquare } from "../lib/utils/utils";

export interface LegalMoves {
  [key: string]: Position[];
}

const legalMovesGenerator = (
  board: PiecesInterface[][],
  boardOrientation: boolean,
  turn: Color
) => {
  let piecelegalMoves: Position[] = [];
  let allLegalMoves: { [key: string]: Position[] } = {};
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
        allLegalMoves[
          positionToSquare({
            row: i,
            col: j,
          })
        ] = piecelegalMoves;
      }
    }
  }
  return allLegalMoves;
};

export default legalMovesGenerator;
