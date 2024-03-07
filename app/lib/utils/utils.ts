import { Position } from "@/app/components/tile";

export const positionToSquare = (position: Position) => {
  return String.fromCharCode(position.col + 97) + (position.row + 1).toString();
};
