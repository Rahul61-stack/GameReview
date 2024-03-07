import { Position } from "./tile";
import { PiecesInterface } from "./pieces";
import { Color } from "./pieces";

const legalMovesGenerator2 = (
  board: PiecesInterface[][],
  boardOrientation: boolean,
  turn:Color
) => {
  let piecelegalMoves: Position[] = [];
  let allLegalMoves:{position:Position,legalMoves:Position[]}[] = []
  for(let i=0;i<8;i++){
    for(let j = 0;j<8;j++){
      if(turn&&board[i][j].color==Color.white){
        piecelegalMoves = board[i][j].legalMoves(board[i][j],
          board,
          {row:i,col:j},
          boardOrientation)
          allLegalMoves.push({position:{row:i,col:j},legalMoves:piecelegalMoves})
      }
      else if(!turn&&board[i][j].color==Color.black){
        piecelegalMoves = board[i][j].legalMoves(board[i][j],
          board,
          {row:i,col:j},
          boardOrientation)
          allLegalMoves.push({position:{row:i,col:j},legalMoves:piecelegalMoves})
      }
    }
  }
  return allLegalMoves;
};

export default legalMovesGenerator2;