"use client";

import { useRef, useState } from "react";
import Tile, { Position } from "./tile";
import { initialBoardWhite, initialBoardBlack } from "./initialBoard";
import { Color, PieceType, Pieces } from "./pieces";
import legalMovesGenerator from "./legalMoves";
import { positionToSquare } from "../lib/utils/utils";
import { checkLogic } from "../lib/matchLogic/checkLogic";
import { castlingLegal } from "../lib/matchLogic/castlingLogic";
import { Check } from "../lib/matchLogic/checkLogic";

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
    boardOrientation ? initialBoardBlack : initialBoardWhite,
  );
  const [king,setKing] = useState({white:{row:7,col:4},black:{row:0,col:4}})
  const check = useRef<Check>({ checkFrom: [], ischeck: false,king:{row:-1,col:-1} });
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
      king:{row:-1,col:-1}
    }),
  );
  const [castlingAvailable, setCastlingAvaiable] = useState({
    blackKingSide: true,
    blackQueenSide: true,
    whiteKingSide: true,
    whiteQueenSide: true,
  });
  const [piecesOffBoard, setPiecesOffBoard] = useState([]);
  // useEffect(()=>{
  //   console.log(legalMoves)
  // },[legalMoves])

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
        if (
          board[squareSelected.row][squareSelected.col].type ==
            PieceType.king &&
          piece.type == PieceType.rook
        ) {
          let castle = castlingLegal(
            board,
            squareSelected,
            boardOrientation,
            position,
          );
          if (castle.kingSide) {
          } else if (castle.queenSide) {
          }
        } else setSquareSelected({ row: row, col: col, selected: true });
      } else {
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
          // CHECK CHECK
          check.current = checkLogic(board, turn, boardOrientation, position,
            king,
          );

          if (turn == Color.white) {
            setTurn(Color.black);
            console.log(check.current);
            setLegalMoves(
              legalMovesGenerator(
                board,
                boardOrientation,
                Color.black,
                check.current,
              ),
            );
          } else {
            setTurn(Color.white);
            setLegalMoves(
              legalMovesGenerator(
                board,
                boardOrientation,
                Color.white,
                check.current,
              ),
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
