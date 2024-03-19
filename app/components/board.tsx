"use client";

import { useRef, useState } from "react";
import Tile, { Position } from "./tile";
import { initialBoardWhite, initialBoardBlack } from "./initialBoard";
import { Color, PieceType, Pieces } from "./pieces";
import legalMovesGenerator from "./legalMoves";
import { positionToSquare } from "../lib/utils/utils";
import { Check, checkLogic } from "../lib/matchLogic/checkLogic";
import { playMove, playCastling } from "../lib/matchLogic/playMove";

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

const boardOrientation = false;

function Board() {
  const [board, setBoard] = useState(
    boardOrientation ? initialBoardBlack : initialBoardWhite
  );
  const [king, setKing] = useState({
    white: { row: 7, col: 4 },
    black: { row: 0, col: 4 },
  });
  const check = useRef<Check>({
    checkFrom: [],
    ischeck: false,
    king: { row: -1, col: -1 },
  });
  const [turn, setTurn] = useState(Color.white);
  const [moves, setMoves] = useState([]);
  const [squareSelected, setSquareSelected] = useState({
    row: -1,
    col: -1,
    selected: false,
  });
  const [legalMoves, setLegalMoves] = useState(
    legalMovesGenerator(board, boardOrientation, turn, {
      checkFrom: [],
      ischeck: false,
      king: { row: -1, col: -1 },
    })
  );
  const [castlingAvailable, setCastlingAvaiable] = useState({
    blackKingSide: true,
    blackQueenSide: true,
    whiteKingSide: true,
    whiteQueenSide: true,
  });
  const [piecesOffBoard, setPiecesOffBoard] = useState([]);

  function checkPiece(position: Position) {
    let row = position.row;
    let col = position.col;
    let piece = board[position.row][position.col];

    //WRONG COLORED PIECE OR EMPTY TILE CLICKED
    if (piece.color != turn && !squareSelected.selected) {
      return;
    }
    //CORRECT COLORED PIECE SELECTED
    if (!squareSelected.selected) {
      setSquareSelected({ row: row, col: col, selected: true });
    }
    //PIECE WAS SELECTED BEFOREHAND
    else {
      //NEW PIECE SELECTED IS OF SAME COLOR
      if (piece.color == turn) {
        //CHECK IF CASTILNG IS LEGAL
        const values = playCastling(
          board,
          squareSelected,
          boardOrientation,
          position
        );
        const castle = values.castle;
        setBoard(board);
        setSquareSelected(values.squareSelected);
        check.current = checkLogic(
          board,
          turn,
          boardOrientation,
          position,
          king
        );
        if (values.switchTurn) {
          if (turn == Color.white) {
            setTurn(Color.black);
            console.log(check.current);
            setLegalMoves(
              legalMovesGenerator(
                board,
                boardOrientation,
                Color.black,
                check.current
              )
            );
          } else {
            setTurn(Color.white);
            setLegalMoves(
              legalMovesGenerator(
                board,
                boardOrientation,
                Color.white,
                check.current
              )
            );
          }
        }
      }
      //EMPTY SPACE OR OPPOSITE COLORED PIECE SELECTED
      else {
        const values = playMove(legalMoves, squareSelected, position, board);
        setBoard(values.board);
        setSquareSelected(values.squareSelected);
        // CHECK CHECK
        check.current = checkLogic(
          board,
          turn,
          boardOrientation,
          position,
          king
        );
        if (values.switchTurn) {
          if (turn == Color.white) {
            setTurn(Color.black);
            console.log(check.current);
            setLegalMoves(
              legalMovesGenerator(
                board,
                boardOrientation,
                Color.black,
                check.current
              )
            );
          } else {
            setTurn(Color.white);
            setLegalMoves(
              legalMovesGenerator(
                board,
                boardOrientation,
                Color.white,
                check.current
              )
            );
          }
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
                  check={check.current.ischeck}
                  selected={
                    squareSelected.row == rowIndex &&
                    squareSelected.col == tileIndex
                  }
                  showLegalMove={
                    (
                      turn == Color.white
                        ? board[rowIndex][tileIndex].color == Color.black
                        : board[rowIndex][tileIndex].color == Color.white
                    )
                      ? false
                      : squareSelected.selected &&
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
