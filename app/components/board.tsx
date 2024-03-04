"use client";

import { useState } from "react";
import legalMovesGenerator from "./legalMoves";
import Tile, { Position } from "./tile";
import { initialBoardWhite, initialBoardBlack } from "./initialBoard";
import { Color, Pieces, PiecesInterface, PieceType } from "./pieces";
import { castlingLegal } from "../lib/matchLogic/castlingLogic";

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
    boardOrientation ? initialBoardBlack : initialBoardWhite,
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

  const [turn, setTurn] = useState(true);

  const getLegalMoves = (
    board: PiecesInterface[][],
    piece: PiecesInterface,
  ) => {
    const legalMoves = legalMovesGenerator(
      piece,
      board,
      positionSelected,
      boardOrientation,
    );
    return legalMoves;
  };

  const movePiece = (position: Position) => {
    const row = position.row;
    const col = position.col;
    const piece = board[row][col];

    if (!positionSelected.selected && (piece.color == Color.white) != turn)
      return;

    if (piece != Pieces.empty && !positionSelected.selected) {
      setPositionSelected({
        row: row,
        col: col,
        selected: true,
      });
      setLastSelectedPosition({
        row: row,
        col: col,
      });
    } else if (piece == Pieces.empty && positionSelected.selected) {
      const legalMoves = getLegalMoves(
        board,
        board[positionSelected.row][positionSelected.col],
      );

      const expectedMoveIsLegal = legalMoves.find((obj) => {
        return obj.row === row && obj.col === col;
      });

      if (expectedMoveIsLegal) {
        board[row][col] = board[positionSelected.row][positionSelected.col];
        board[positionSelected.row][positionSelected.col] = Pieces.empty;
        setLastSelectedPosition({
          row: positionSelected.row,
          col: positionSelected.col,
        });
        setBoard(board);
        setTurn(!turn);
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
    } else if (piece != Pieces.empty && positionSelected.selected) {
      if (
        piece.color != board[positionSelected.row][positionSelected.col].color
      ) {
        const legalMoves = getLegalMoves(
          board,
          board[positionSelected.row][positionSelected.col],
        );

        const expectedMoveIsLegal = legalMoves.find((obj) => {
          return obj.row === row && obj.col === col;
        });

        if (expectedMoveIsLegal) {
          board[row][col] = board[positionSelected.row][positionSelected.col];
          board[positionSelected.row][positionSelected.col] = Pieces.empty;
          setLastSelectedPosition({
            row: positionSelected.row,
            col: positionSelected.col,
          });
          setBoard(board);
          setTurn(!turn);
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
      } else if (
        piece.type == PieceType.rook &&
        piece.color == board[positionSelected.row][positionSelected.col].color
      ) {
        console.log("IN FUNCTION");
        const castling = castlingLegal(
          board,
          positionSelected,
          boardOrientation,
          position,
        );
        if (castling.kingSide && position.col < positionSelected.col) {
          board[positionSelected.row][positionSelected.col - 2] =
            board[positionSelected.row][positionSelected.col];
          board[positionSelected.row][positionSelected.col] = Pieces.empty;
          board[row][col + 2] = piece;
          board[row][col] = Pieces.empty;
          setBoard(board);
          setTurn(!turn);
        } else if (castling.queenSide && position.col > positionSelected.col) {
          board[positionSelected.row][positionSelected.col + 2] =
            board[positionSelected.row][positionSelected.col];
          board[positionSelected.row][positionSelected.col] = Pieces.empty;
          board[row][col - 3] = piece;
          board[row][col] = Pieces.empty;
          setBoard(board);
          setTurn(!turn);
        }
      } else {
        setPositionSelected({
          row: row,
          col: col,
          selected: true,
        });
        setLastSelectedPosition({
          row: -1,
          col: -1,
        });
      }
    } else if (piece == Pieces.empty && !positionSelected.selected) {
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
      <h1 className="">{(turn ? "WHITE" : "BLACK") + " to move"}</h1>
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
