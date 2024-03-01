import Board from "./components/board";

export default function Home() {
  return (
    <main>
      <div className="flex justify-start py-10 pl-20 h-screen bg-black">
        <Board />
      </div>
    </main>
  );
}
