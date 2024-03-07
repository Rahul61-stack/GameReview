"use client";

import { FC, useState } from "react";
import { Pieces, PiecesInterface } from "./pieces";
export interface Position {
  row: number;
  col: number;
}

interface IProps {
  piece: PiecesInterface;
  tile: boolean;
  position: Position;
  onTileClicked: (position: Position) => void;
  selected: boolean;
  showLegalMove:boolean
}

const Tile: FC<IProps> = ({
  piece,
  tile,
  position,
  onTileClicked,
  selected,
  showLegalMove
}) => {
  return (
    <div
      className={
        "flex-none h-24 w-24 relative " +
        (selected ? "bg-amber-200" : tile ? "bg-chesswhite" : "bg-chessblack")
      }
    >
      <button
        onClick={() => {
          onTileClicked(position);
        }}
        className="h-24 w-24"
      >
        {showLegalMove?<div className="h-5 w-5 bg-gray-400 opacity-70 rounded-full container mx-auto my-10"></div>:<></>}
        {piece.image}
      </button>
    </div>
  );
};

export default Tile;
