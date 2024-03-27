import { LegalMoves } from "@/app/components/legalMoves";
import { PieceType, Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "@/app/components/tile";
import { positionToSquare } from "../utils/utils";
import { castlingLegal } from "./castlingLogic";

export const playMove = (legalMoves:LegalMoves,squareSelected:{row:number,col:number,selected:boolean},position:Position,board:PiecesInterface[][]) =>{
    let row = position.row
    let col = position.col
    let switchTurn = false
    if (
        legalMoves[
          positionToSquare({
            row: squareSelected.row,
            col: squareSelected.col,
          })
        ].find((obj) => {
          return obj.row === position.row && obj.col === position.col;
        }) != undefined
      ) {
        board[row][col] = board[squareSelected.row][squareSelected.col];
        board[squareSelected.row][squareSelected.col] = Pieces.empty;
        switchTurn=true
      }
    squareSelected = {row:-1,col:-1,selected:false}
    return {board:board,squareSelected:squareSelected,switchTurn:switchTurn}
}
export const playCastling = (
    board: PiecesInterface[][],
    squareSelected: { row: number; col: number; selected: boolean },
    boardOrientation: boolean,
    position: Position
  ) => {
    const row = position.row;
    const col = position.col;
    const piece = board[row][col];
    const castle = { kingSide: false, queenSide: false };
    let switchTurn = false
    if (
      board[squareSelected.row][squareSelected.col].type == PieceType.king &&
      piece.type == PieceType.rook
    ) {
      const castle = castlingLegal(
        board,
        squareSelected,
        boardOrientation,
        position
      );
      if (castle.kingSide) {
        board[row][squareSelected.col + 2] =
          board[squareSelected.row][squareSelected.col];
        board[row][col - 2] = board[row][col];
        board[squareSelected.row][squareSelected.col] = Pieces.empty;
        board[row][col] = Pieces.empty;
        squareSelected = { row: -1, col: -1, selected: false };
        switchTurn = true
      } else if (castle.queenSide) {
        board[row][squareSelected.col - 2] =
          board[squareSelected.row][squareSelected.col];
        board[row][col + 3] = board[row][col];
        board[squareSelected.row][squareSelected.col] = Pieces.empty;
        board[row][col] = Pieces.empty;
        squareSelected = { row: -1, col: -1, selected: false };
        switchTurn = true
      }
    } else {
      squareSelected = { row: row, col: col, selected: true };
    }
    return { board: board, squareSelected: squareSelected, castle: castle,switchTurn:switchTurn };
  };