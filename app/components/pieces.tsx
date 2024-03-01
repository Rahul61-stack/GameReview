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
export const Pieces = {
  blackQueenRook: blackRook,
  blackKingRook: blackRook,
  blackQueenKnight: blackKnight,
  blackKingKnight: blackKnight,
  blackQueenBishop: blackBishop,
  blackKingBishop: blackBishop,
  blackKing: blackKing,
  blackQueen: blackQueen,
  blackPawn: blackPawn,
  whiteQueenRook: whiteRook,
  whiteKingRook: whiteRook,
  whiteQueenKnight: whiteKnight,
  whiteKingKnight: whiteKnight,
  whiteQueenBishop: whiteBishop,
  whiteKingBishop: whiteBishop,
  whiteKing: whiteKing,
  whiteQueen: whiteQueen,
  whitePawn: whitePawn,
};
