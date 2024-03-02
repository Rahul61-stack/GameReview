"use client";

import { FC, useState } from "react";
import { Pieces } from "./pieces";
export interface Position {
  row: number;
  col: number;
}

interface IProps {
  piece: string;
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
  let str = piece as keyof typeof Pieces;
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
        {Pieces[str]}
      </button>
    </div>
  );
};

export default Tile;
