import { PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";
import { getRookLegalMoves } from "./rookLogic";
import { getBishopLegalMoves } from "./bishopLogic";

export const getQueenLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  boardOrientation: boolean
) => {
  let legalMoves = [];
  let rookMoves = getRookLegalMoves(
    piece,
    board,
    positionSelected,
    boardOrientation
  );
  let bishopMoves = getBishopLegalMoves(
    piece,
    board,
    positionSelected,
    boardOrientation
  );
  legalMoves = [...rookMoves, ...bishopMoves];
  return legalMoves;
};
