import { useState, useCallback } from "react";
import { winningCombinations } from "./tools/wc";
import "./App.css";

export default function App() {
  const [currentTurn, setCurrentTurn] = useState(false);
  const [boxStates, setBoxStates] = useState(Array(9).fill(""));
  const [gameFinished, setGameFinished] = useState({ over: false, winner: "" });

  const handleClick = useCallback(
      (boxId) => {
        if (gameFinished?.over) return;
        let data = [...boxStates];
        data[boxId] = currentTurn ? "X" : "O";
        setCurrentTurn(!currentTurn);
        setBoxStates(data);
        for (let i = 0; i < winningCombinations.length; i++) {
          const [a, b, c] = winningCombinations[i];
          if (data[a] && data[a] === data[b] && data[a] === data[c]) {
            setGameFinished({
              ...gameFinished,
              over: true,
              winner: currentTurn ? "X" : "O"
            });
            return data[a];
          } else {
            let playCount = 0;
            data.forEach((e) => {
              if (e !== "") {
                playCount += 1;
              }
            });
            if (playCount === 9) {
              setGameFinished({ ...gameFinished, over: true });
            }
          }
        }
      },
      [currentTurn, boxStates, gameFinished]
  );

  const resetGame = () => {
    setBoxStates(Array(9).fill(""));
    setGameFinished({ over: false, winner: "" });
    setCurrentTurn(false);
  };

  return (
      <div className="App">
        <h1>TIC TAC TOE</h1>
        <div className="container">
          {boxStates?.map((e, k) => (
              <div key={k} className="gamebox" onClick={() => handleClick(k)}>
                {e}
              </div>
          ))}
        </div>
        {gameFinished?.over && <span className="gameOver">Game over..</span>}
        {gameFinished?.winner !== "" && (
            <p>
              Winner : <strong>{gameFinished.winner}</strong>
            </p>
        )}
        <button className="playAgain" onClick={resetGame}>PLAY AGAIN</button>
      </div>
  );
}
