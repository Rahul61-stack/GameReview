"use client";

import { useEffect, useState } from "react";
import Tile, { Position } from "./tile";
import { initialBoardWhite, initialBoardBlack } from "./initialBoard";
import { Color, Pieces, PiecesInterface, PieceType } from "./pieces";
import { castlingLegal } from "../lib/matchLogic/castlingLogic";
import legalMovesGenerator2 from "./legalMoves2";
import { LegalMoves } from "./legalMoves";

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

function Board2() {
  const [board, setBoard] = useState(
    boardOrientation ? initialBoardBlack : initialBoardWhite,
  );
  const [turn, setTurn] = useState(Color.white);
  const [moves, setMoves] = useState([]);
  const [squareSelected, setSquareSelected] = useState({
    row: -1,
    col: -1,
    selected: false,
  });
  const [legalMoves, setLegalMoves] = useState<LegalMoves[]>(
    legalMovesGenerator2(board, boardOrientation, turn),
  );
  const [castlingAvailable, setCastlingAvaiable] = useState({
    blackKingSide: true,
    blackQueenSide: true,
    whiteKingSide: true,
    whiteQueenSide: true,
  });
  const [check, setCheck] = useState(false);
  const [piecesOffBoard, setPiecesOffBoard] = useState([]);
  const [showLegalMoves, setShowLegalMoves] = useState<Position[]>();
  

  function showMoves(row: number, col: number) {
    setShowLegalMoves(
      legalMoves.find(
        (value) => value.position.row == row && value.position.col == col,
      )?.legalMoves,
    );
  }

  useEffect(()=>{
    console.log(squareSelected,showLegalMoves)
  },[squareSelected,showLegalMoves])
  
  function checkPiece(position: Position) {
    let row = position.row;
    let col = position.col;
    let piece = board[position.row][position.col];
    setLegalMoves(legalMovesGenerator2(board,boardOrientation,turn))

    if (piece.color != turn && !squareSelected.selected) {
      return;
    } 
    if(!squareSelected.selected){
      setSquareSelected({row:row,col:col,selected:true})
      showMoves(row,col)
    }
    else if(squareSelected.selected){
      if(piece.color==turn){
        setSquareSelected({row:row,col:col,selected:true})
        showMoves(row,col)
      }
      else if(piece.color==Color.none){
        if(showLegalMoves?.find((value) => value.row == row && value.col == col)){
          board[row][col] = board[squareSelected.row][squareSelected.col]
          board[squareSelected.row][squareSelected.col] = Pieces.empty
          setSquareSelected({row:-1,col:-1,selected:false})
          setBoard(board)
          setShowLegalMoves([])
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
                      ? true
                      : false
                  }
                  showLegalMove={
                    showLegalMoves?.find(
                      (value) =>
                        value.row == rowIndex && value.col == tileIndex,
                    )
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

export default Board2;
