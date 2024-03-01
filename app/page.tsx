import Board from "./components/board";
import { keys } from "./components/pieces";

export default function Home() {
  return (
    <main>
      
      <div className="flex justify-start py-10 pl-20">
        <Board/>
      </div>
    </main>
  );
}
