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
}

const Tile: FC<IProps> = ({
  piece,
  tile,
  position,
  onTileClicked,
  selected,
}) => {
  return (
    <div
      className={
        "flex-none h-24 w-24 " +
        (selected ? "bg-amber-200" : tile ? "bg-chesswhite" : "bg-chessblack")
      }
    >
      <button
        onClick={() => {
          onTileClicked(position);
        }}
        className="h-24 w-24"
      >
        {piece.image}
      </button>
    </div>
  );
};

export default Tile;
