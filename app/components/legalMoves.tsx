import { getPawnLegalMoves } from "../lib/pieceLogic/pawnLogic";
import { getRookLegalMoves } from "../lib/pieceLogic/rookLogic";
import { getKnightLegalMoves } from "../lib/pieceLogic/knightLogic";
import { Position } from "./tile";
import { PiecesInterface } from "./pieces";

const legalMovesGenerator = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  boardOrientation: boolean
) => {
  let legalMoves: { row: number; col: number }[] = [];
  if (piece.type == "pawn") {
    legalMoves = getPawnLegalMoves(
      piece,
      board,
      positionSelected,
      boardOrientation
    );
  } else if (piece.type == "rook") {
    legalMoves = getRookLegalMoves(
      piece,
      board,
      positionSelected,
      boardOrientation
    );
  } else if (piece.type == "knight") {
    legalMoves = getKnightLegalMoves(
      piece,
      board,
      positionSelected,
      boardOrientation
    );
  }
  return legalMoves;
};

export default legalMovesGenerator;
