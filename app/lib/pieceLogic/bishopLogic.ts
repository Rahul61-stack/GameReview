import { Pieces, PiecesInterface } from "@/app/components/pieces";
import { Position } from "../../components/tile";

export const getBishopLegalMoves = (
  piece: PiecesInterface,
  board: PiecesInterface[][],
  positionSelected: Position,
  orientation: boolean
) => {
  const rowAt = positionSelected.row;
  const colAt = positionSelected.col;
  let row;
  let col;
  let legalMoves: any[] = [];
  let direction = [[1, 1],[1,-1],[-1,1],[-1,-1]
  ];
  direction.forEach((value)=>{
    for (let i = 0; i < 8; i++) {
        row = rowAt + i*value[0]
        col = colAt + i*value[1]
        if (row <= 7 && row >= 0 && col <= 7 && col >= 0){
            console.log(row,col)
            const move = board[row][col] == Pieces.empty
            if(move){
                legalMoves.push({
                    row:row,
                    col:col
                })
            }else {break}
        }
    }
  })
  

  return legalMoves;
};
