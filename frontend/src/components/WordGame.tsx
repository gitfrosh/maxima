import { AlertProvider } from "../context/AlertContext";
import WordGameInner from "./WordGameInner";

function WordGame() {
  return (
    <AlertProvider>
      <WordGameInner />
    </AlertProvider>
  );
}

export default WordGame;
