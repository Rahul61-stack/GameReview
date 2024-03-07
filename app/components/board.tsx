"use client";

import { useState } from "react";
import Tile, { Position } from "./tile";
import { initialBoardWhite, initialBoardBlack } from "./initialBoard";
import { Color, Pieces } from "./pieces";
import legalMovesGenerator2 from "./legalMoves";
import { positionToSquare } from "../lib/utils/utils";

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
  const [turn, setTurn] = useState(Color.white);
  const [moves, setMoves] = useState([]);
  const [squareSelected, setSquareSelected] = useState({
    row: -1,
    col: -1,
    selected: false,
  });
  const [legalMoves, setLegalMoves] = useState(
    legalMovesGenerator2(board, boardOrientation, turn)
  );
  const [castlingAvailable, setCastlingAvaiable] = useState({
    blackKingSide: true,
    blackQueenSide: true,
    whiteKingSide: true,
    whiteQueenSide: true,
  });
  const [check, setCheck] = useState(false);
  const [piecesOffBoard, setPiecesOffBoard] = useState([]);

  function checkPiece(position: Position) {
    let row = position.row;
    let col = position.col;
    let piece = board[position.row][position.col];

    if (piece.color != turn && !squareSelected.selected) {
      return;
    }
    if (!squareSelected.selected) {
      setSquareSelected({ row: row, col: col, selected: true });
    } else {
      if (piece.color == turn) {
        setSquareSelected({ row: row, col: col, selected: true });
      } else if (piece.color == Color.none) {
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
          setBoard(board);
          setSquareSelected({ row: -1, col: -1, selected: false });
          if (turn == Color.white) {
            setTurn(Color.black);
            setLegalMoves(
              legalMovesGenerator2(board, boardOrientation, Color.black)
            );
          } else {
            setTurn(Color.white);
            setLegalMoves(
              legalMovesGenerator2(board, boardOrientation, Color.white)
            );
          }
        } else {
          setSquareSelected({ row: -1, col: -1, selected: false });
        }
      }
    }
  }

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
                  onTileClicked={(position: Position) => checkPiece(position)}
                  selected={
                    squareSelected.row == rowIndex &&
                    squareSelected.col == tileIndex
                  }
                  showLegalMove={
                    squareSelected.selected &&
                    legalMoves[
                      positionToSquare({
                        row: squareSelected.row,
                        col: squareSelected.col,
                      })
                    ].find((obj) => {
                      return obj.row === rowIndex && obj.col === tileIndex;
                    }) != undefined
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
