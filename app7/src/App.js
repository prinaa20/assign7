import React, { useState } from "react";

function App() {
  // Initial state
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [turnsLeft, setTurnsLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  // Generate random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle guess input
  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  // Check the guess
  const checkGuess = () => {
    if (gameOver) return;

    const playerGuess = parseInt(guess, 10);

    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
      setMessage("Please enter a number between 1 and 100.");
      return;
    }

    setGuessHistory([...guessHistory, playerGuess]);

    if (playerGuess === targetNumber) {
      setMessage(`Congratulations! ${playerGuess} is the correct number!`);
      setGameOver(true);
    } else {
      setTurnsLeft(turnsLeft - 1);
      if (turnsLeft - 1 <= 0) {
        setMessage(`Game Over! The number was ${targetNumber}.`);
        setGameOver(true);
      } else {
        setMessage(
          playerGuess < targetNumber
            ? "Too low! Try again."
            : "Too high! Try again."
        );
      }
    }

    setGuess("");
  };

  // Reset the game
  const resetGame = () => {
    setTargetNumber(generateRandomNumber());
    setGuess("");
    setGuessHistory([]);
    setMessage("");
    setTurnsLeft(10);
    setGameOver(false);
  };

  return (
    <div style={styles.container}>
      <h1>Guess the Number</h1>
      <p>Guess a number between 1 and 100.</p>
      <p>Turns left: {turnsLeft}</p>
      <p>Previous guesses: {guessHistory.join(", ") || "None"}</p>
      <p>{message}</p>

      {!gameOver && (
        <div>
          <input
            type="number"
            value={guess}
            onChange={handleGuessChange}
            placeholder="Enter your guess"
            style={styles.input}
          />
          <button onClick={checkGuess} style={styles.button}>
            Submit Guess
          </button>
        </div>
      )}

      {gameOver && (
        <button onClick={resetGame} style={styles.button}>
          Play Again
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "150px",
    marginRight: "10px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default App;
