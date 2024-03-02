import { PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getRookLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  orientation: boolean
) => {
  const rowAt = positionSelected.row;
  const colAt = positionSelected.col;
  const white = piece.color;
  const moveUp = (orientation && !white) || (!orientation && white);
  let row;
  let col;
  let legalMoves = [];

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let direction of directions) {
    row = rowAt + direction[0];
    col = row + direction[1];
    while (row < 8 && row >= 0 && col >= 0 && col < 8) {
      if (board[row][col].type == "") {
        legalMoves.push({ row: row, col: col });
      } else {
      }
    }
  }

  //   let forwardMove = true;
  //   for (let c = 1; c < 8; c++) {
  //     if (forwardMove) {
  //       row = rowAt + (moveUp ? -c : c);
  //       col = colAt;
  //       let move = board[row][col] == "";
  //       if (move) {
  //         legalMoves.push({
  //           row: row,
  //           col: col,
  //         });
  //       } else {
  //         forwardMove = !forwardMove;
  //       }
  //     } else {
  //       row = rowAt + (moveUp ? c : -c);
  //       col = colAt;
  //       if (row >= 0 && row <= 7 && col >= 0 && col <= 7) {
  //         console.log(row, col);
  //         const backwardMove = board[row][col] == "";
  //         if (backwardMove) {
  //           legalMoves.push({
  //             row: row,
  //             col: col,
  //           });
  //         } else;
  //       }
  //     }
  //   }

  return legalMoves;
};
