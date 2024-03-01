"use client";

import { useRef, useState } from "react";
import Tile, { Position } from "./tile";
import { initialBoardWhite, initialBoardBlack } from "./initialBoard";

const returnBoard = (size: number) => {
  let board: boolean[][] = [];
  let boardRow: boolean[] = [];
  let tileColor = true;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      boardRow.push(tileColor);
      tileColor = !tileColor;
    }
    board.push(boardRow);
    boardRow = [];
    tileColor = !tileColor;
  }

  return board;
};

const boardOrientation = true;

function Board() {
  const [board, setBoard] = useState(
    boardOrientation ? initialBoardBlack : initialBoardWhite
  );
  const [positionSelected, setPositionSelected] = useState({
    row: -1,
    col: -1,
    selected: false,
  });

  const [lastSelectedPosition, setLastSelectedPosition] = useState({
    row: -1,
    col: -1,
  });

  const getLegalMoves = (board: string[][], piece: string) => {
    const rowAt = positionSelected.row;
    const colAt = positionSelected.col;
    const orientation = boardOrientation;
    const white = piece.includes("white");
    const moveUp = (orientation && !white) || (!orientation && white);
    let legalMoves = [];
    let row;
    let col;

    if (piece.includes("Pawn")) {
      // Check if pawn can move 1 square vertically
      row = rowAt + (moveUp ? -1 : 1);
      col = colAt;
      const move1 = board[row][col] == "";

      if (move1) {
        legalMoves.push({
          row: row,
          col: col,
        });
      }

      // Check if pawn can move 2 squares vertically
      row = rowAt + (moveUp ? -2 : 2);
      col = colAt;
      const move2 =
        move1 &&
        board[row][col] == "" &&
        ((moveUp && rowAt == 6) || (!moveUp && rowAt == 1));

      if (move2) {
        legalMoves.push({
          row: row,
          col: col,
        });
      }

      return legalMoves;
    }

    return [];
  };

  const movePiece = (position: Position) => {
    const row = position.row;
    const col = position.col;

    if (board[row][col] != "" && !positionSelected.selected) {
      setPositionSelected({
        row: row,
        col: col,
        selected: true,
      });
      setLastSelectedPosition({
        row: row,
        col: col,
      });
    } else if (board[row][col] == "" && positionSelected.selected) {
      const legalMoves = getLegalMoves(
        board,
        board[lastSelectedPosition.row][lastSelectedPosition.col]
      );

      console.log(legalMoves);

      const expectedMoveIsLegal = legalMoves.find((obj) => {
        return obj.row === row && obj.col === col;
      });

      if (expectedMoveIsLegal) {
        board[row][col] = board[positionSelected.row][positionSelected.col];
        board[positionSelected.row][positionSelected.col] = "";
        setLastSelectedPosition({
          row: positionSelected.row,
          col: positionSelected.col,
        });
        setBoard(board);
        setPositionSelected({
          row: row,
          col: col,
          selected: false,
        });
      } else {
        setPositionSelected({
          row: -1,
          col: -1,
          selected: false,
        });
        setLastSelectedPosition({
          row: -1,
          col: -1,
        });
      }
    } else if (board[row][col] != "" && positionSelected.selected) {
      setPositionSelected({
        row: row,
        col: col,
        selected: true,
      });
      setLastSelectedPosition({
        row: -1,
        col: -1,
      });
    } else if (board[row][col] == "" && !positionSelected.selected) {
      setPositionSelected({
        row: -1,
        col: -1,
        selected: false,
      });
      setLastSelectedPosition({
        row: -1,
        col: -1,
      });
    }
  };

  return (
    <div className="flex-col">
      {returnBoard(8).map((row, rowIndex) => {
        return (
          <div className="flex" key={rowIndex}>
            {row.map((tile, tileIndex) => {
              return (
                <Tile
                  key={tileIndex}
                  tile={tile}
                  piece={board[rowIndex][tileIndex]}
                  position={{ row: rowIndex, col: tileIndex }}
                  onTileClicked={(position: Position) => movePiece(position)}
                  selected={
                    (positionSelected.row == rowIndex &&
                      positionSelected.col == tileIndex) ||
                    (lastSelectedPosition.row == rowIndex &&
                      lastSelectedPosition.col == tileIndex)
                      ? true
                      : false
                  }
                ></Tile>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
