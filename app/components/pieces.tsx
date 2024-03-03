import Image from "next/image";
import { getPawnLegalMoves } from "../lib/pieceLogic/pawnLogic";
import { Position } from "./tile";
import { getQueenLegalMoves } from "../lib/pieceLogic/queenLogic";
import { getKnightLegalMoves } from "../lib/pieceLogic/knightLogic";
import { getBishopLegalMoves } from "../lib/pieceLogic/bishopLogic";
import { getRookLegalMoves } from "../lib/pieceLogic/rookLogic";

export enum Color {
  white = 1,
  black = 0,
  none = -1,
}

export enum PieceType {
  rook,
  knight,
  bishop,
  queen,
  king,
  pawn,
  none,
}

const blackBishop = (
  <Image alt="" src="/BlackBishop.png" height={90} width={90} />
);
const blackKing = <Image alt="" src="/BlackKing.png" height={90} width={90} />;
const blackKnight = (
  <Image alt="" src="/BlackKnight.png" height={90} width={90} />
);
const blackPawn = <Image alt="" src="/BlackPawn.png" height={90} width={90} />;
const blackQueen = (
  <Image alt="" src="/BlackQueen.png" height={90} width={90} />
);
const blackRook = <Image alt="" src="/BlackRook.png" height={90} width={90} />;
const whiteBishop = (
  <Image alt="" src="/WhiteBishop.png" height={90} width={90} />
);
const whiteKing = <Image alt="" src="/WhiteKing.png" height={90} width={90} />;
const whiteKnight = (
  <Image alt="" src="/WhiteKnight.png" height={90} width={90} />
);
const whitePawn = <Image alt="" src="/WhitePawn.png" height={90} width={90} />;
const whiteQueen = (
  <Image alt="" src="/WhiteQueen.png" height={90} width={90} />
);
const whiteRook = <Image alt="" src="/WhiteRook.png" height={90} width={90} />;

export interface PiecesInterface {
  image: JSX.Element;
  type: PieceType;
  color: Color;
  side: boolean;
  legalMoves(
    pieces: PiecesInterface,
    board: PiecesInterface[][],
    position: Position,
    boardOrientation: boolean
  ): {
    row: number;
    col: number;
  }[];
}

const dummyMoves = (
  pieces: PiecesInterface,
  board: PiecesInterface[][],
  position: Position,
  boardOrientation: boolean
) => {
  return [
    {
      row: -1,
      col: -1,
    },
  ];
};

export const Pieces = {
  blackQueenRook: {
    image: blackRook,
    type: PieceType.rook,
    color: Color.black,
    side: true,
    legalMoves: getQueenLegalMoves,
  },
  blackKingRook: {
    image: blackRook,
    type: PieceType.rook,
    color: Color.black,
    side: false,
    legalMoves: getPawnLegalMoves,
  },
  blackQueenKnight: {
    image: blackKnight,
    type: PieceType.knight,
    color: Color.black,
    side: true,
    legalMoves: getKnightLegalMoves,
  },
  blackKingKnight: {
    image: blackKnight,
    type: PieceType.knight,
    color: Color.black,
    side: false,
    legalMoves: getKnightLegalMoves,
  },
  blackQueenBishop: {
    image: blackBishop,
    type: PieceType.bishop,
    color: Color.black,
    side: true,
    legalMoves: getBishopLegalMoves,
  },
  blackKingBishop: {
    image: blackBishop,
    type: PieceType.bishop,
    color: Color.black,
    side: false,
    legalMoves: getBishopLegalMoves,
  },
  blackKing: {
    image: blackKing,
    type: PieceType.king,
    color: Color.black,
    side: false,
    legalMoves: getPawnLegalMoves,
  },
  blackQueen: {
    image: blackQueen,
    type: PieceType.queen,
    color: Color.black,
    side: true,
    legalMoves: getQueenLegalMoves,
  },
  blackPawn: {
    image: blackPawn,
    type: PieceType.pawn,
    color: Color.black,
    side: false,
    legalMoves: getPawnLegalMoves,
  },
  whiteQueenRook: {
    image: whiteRook,
    type: PieceType.rook,
    color: Color.white,
    side: true,
    legalMoves: getRookLegalMoves,
  },
  whiteKingRook: {
    image: whiteRook,
    type: PieceType.rook,
    color: Color.white,
    side: false,
    legalMoves: getRookLegalMoves,
  },
  whiteQueenKnight: {
    image: whiteKnight,
    type: PieceType.knight,
    color: Color.white,
    side: true,
    legalMoves: getKnightLegalMoves,
  },
  whiteKingKnight: {
    image: whiteKnight,
    type: PieceType.knight,
    color: Color.white,
    side: false,
    legalMoves: getKnightLegalMoves,
  },
  whiteQueenBishop: {
    image: whiteBishop,
    type: PieceType.bishop,
    color: Color.white,
    side: true,
    legalMoves: getBishopLegalMoves,
  },
  whiteKingBishop: {
    image: whiteBishop,
    type: PieceType.bishop,
    color: Color.white,
    side: false,
    legalMoves: getBishopLegalMoves,
  },
  whiteKing: {
    image: whiteKing,
    type: PieceType.king,
    color: Color.white,
    side: false,
    legalMoves: getPawnLegalMoves,
  },
  whiteQueen: {
    image: whiteQueen,
    type: PieceType.queen,
    color: Color.white,
    side: true,
    legalMoves: getQueenLegalMoves,
  },
  whitePawn: {
    image: whitePawn,
    type: PieceType.pawn,
    color: Color.white,
    side: false,
    legalMoves: getPawnLegalMoves,
  },
  empty: {
    image: <></>,
    type: PieceType.none,
    color: Color.none,
    side: false,
    legalMoves: dummyMoves,
  },
};
