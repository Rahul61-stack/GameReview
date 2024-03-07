import { Position } from "./tile";
import { Pieces, PiecesInterface } from "./pieces";
import { Color } from "./pieces";

export interface LegalMoves {
  position: Position;
  legalMoves: Position[];
}

const legalMovesGenerator = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  boardOrientation: boolean,
  turn: boolean
) => {
  let legalMoves: { row: number; col: number }[] = [];
  legalMoves = piece.legalMoves(
    piece,
    board,
    positionSelected,
    boardOrientation
  );
  let piecelegalMoves: Position[] = [];
  let allLegalMoves: LegalMoves[] = [
    {
      position: {
        row: -1,
        col: -1,
      },
      legalMoves: [],
    },
  ];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (turn && board[i][j].color == Color.white) {
        const pieceType = board[i][j].type.toString();
        piecelegalMoves = board[i][j].legalMoves(
          board[i][j],
          board,
          { row: i, col: j },
          boardOrientation
        );
        allLegalMoves.push({
          position: { row: i, col: j },
          legalMoves: piecelegalMoves,
        });
      } else if (!turn && board[i][j].color == Color.black) {
        const pieceType = board[i][j].type.toString();
        piecelegalMoves = board[i][j].legalMoves(
          board[i][j],
          board,
          { row: i, col: j },
          boardOrientation
        );
        allLegalMoves.push({
          position: { row: i, col: j },
          legalMoves: piecelegalMoves,
        });
      }
    }
  }
  console.log(allLegalMoves);
  return legalMoves;
};

export default legalMovesGenerator;
