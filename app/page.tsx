import Board from "./components/board";
import Board2 from "./components/board2";

export default function Home() {
  return (
    <main>
      <div className="flex justify-start py-10 pl-20 h-screen bg-black text-white">
        <Board2 />
      </div>
    </main>
  );
}
