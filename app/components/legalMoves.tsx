import { Position } from "./tile";
import { PiecesInterface } from "./pieces";

const legalMovesGenerator = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  boardOrientation: boolean
) => {
  let legalMoves: { row: number; col: number }[] = [];

  legalMoves = piece.legalMoves(
    piece,
    board,
    positionSelected,
    boardOrientation
  );

  return legalMoves;
};

export default legalMovesGenerator;
