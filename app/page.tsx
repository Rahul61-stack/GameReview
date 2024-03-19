import Board from "./components/board";

export default function Home() {
  return (
    <main>
      <div className="flex justify-start py-5 pl-20 h-screen bg-black text-white">
        <Board />
      </div>
    </main>
  );
}
