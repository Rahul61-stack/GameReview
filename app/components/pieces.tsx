import Image from "next/image";

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
  type: string;
  color: boolean;
  side: boolean;
}

export const Pieces = {
  blackQueenRook: { image: blackRook, type: "rook", color: false, side: true },
  blackKingRook: { image: blackRook, type: "rook", color: false, side: false },
  blackQueenKnight: {
    image: blackKnight,
    type: "knight",
    color: false,
    side: true,
  },
  blackKingKnight: {
    image: blackKnight,
    type: "knight",
    color: false,
    side: false,
  },
  blackQueenBishop: {
    image: blackBishop,
    type: "bishop",
    color: false,
    side: true,
  },
  blackKingBishop: {
    image: blackBishop,
    type: "bishop",
    color: false,
    side: false,
  },
  blackKing: { image: blackKing, type: "king", color: false, side: false },
  blackQueen: { image: blackQueen, type: "queen", color: false, side: true },
  blackPawn: { image: blackPawn, type: "pawn", color: false, side: false },
  whiteQueenRook: { image: whiteRook, type: "pawn", color: false, side: false },
  whiteKingRook: { image: whiteRook, type: "pawn", color: false, side: false },
  whiteQueenKnight: {
    image: whiteKnight,
    type: "knight",
    color: true,
    side: false,
  },
  whiteKingKnight: {
    image: whiteKnight,
    type: "knight",
    color: true,
    side: false,
  },
  whiteQueenBishop: {
    image: whiteBishop,
    type: "bishop",
    color: true,
    side: false,
  },
  whiteKingBishop: {
    image: whiteBishop,
    type: "bishop",
    color: true,
    side: false,
  },
  whiteKing: { image: whiteKing, type: "king", color: true, side: false },
  whiteQueen: { image: whiteQueen, type: "pawn", color: true, side: false },
  whitePawn: { image: whitePawn, type: "pawn", color: true, side: false },
  empty: { image: <></>, type: "", color: false, side: false },
};
