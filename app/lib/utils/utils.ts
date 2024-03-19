import { Position } from "@/app/components/tile";

const decoder = [8,7,6,5,4,3,2,1,0]

export const positionToSquare = (position: Position) => {
  return String.fromCharCode(decoder[position.col] + 96) + (decoder[position.row]).toString();
};

export const squareToPosition = (square:string) =>{
  const value = square.split('')
  return {row:decoder[Number(value[1])-1],col:Number((value[0].charCodeAt(0)-97))}
}
