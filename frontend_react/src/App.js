import React, { useState } from "react";
import "./App.css";

/**
 * Tic Tac Toe main App component.
 * Implements a modern 3x3 board, 2-player game logic, scoring, and responsive controls.
 */

// Utility to check winning conditions
// PUBLIC_INTERFACE
function calculateWinner(squares) {
  /**
   * Checks for a winning line on a 3x3 grid.
   * Returns 'X', 'O', or null.
   */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the entrypoint and main view for the Tic Tac Toe game.
   * Handles state, rendering, and user interactions.
   */
  // Game board state: 0-8 squares
  const [board, setBoard] = useState(Array(9).fill(null));
  // Tracks if X plays next (true = X, false = O)
  const [xIsNext, setXIsNext] = useState(true);
  // Score state
  const [score, setScore] = useState({ X: 0, O: 0 });
  // "X" starts as player one, "O" player two by convention
  const [playerNames] = useState({ X: "Player 1", O: "Player 2" });

  // Derived game status
  const winner = calculateWinner(board);
  const isBoardFull = board.every(Boolean);

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    /**
     * Handles square click for playing a move.
     * Ignores if square taken or game ended.
     */
    if (board[i] || winner) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    // If win after move, update score
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setScore((s) => ({ ...s, [gameWinner]: s[gameWinner] + 1 }));
    }
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /**
     * Resets board state & prepares for next game.
     */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function handleFullReset() {
    /**
     * Hard resets board and scores.
     */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setScore({ X: 0, O: 0 });
  }

  // Modern, minimalistic UI structure
  return (
    <div className="tic-tac-toe-app">
      {/* Header with title */}
      <h1 className="title" data-testid="game-title">
        Tic Tac Toe
      </h1>
      <div className="scoreboard">
        <div className="player player-x" data-active={xIsNext && !winner && !isBoardFull ? "true" : undefined}>
          <span className="player-label" style={{ color: "var(--color-x)" }}>
            {playerNames.X}
          </span>
          <span className="player-mark">X</span>
          <span className="score">{score.X}</span>
        </div>
        <div className="vs">vs</div>
        <div className="player player-o" data-active={!xIsNext && !winner && !isBoardFull ? "true" : undefined}>
          <span className="player-label" style={{ color: "var(--color-o)" }}>
            {playerNames.O}
          </span>
          <span className="player-mark">O</span>
          <span className="score">{score.O}</span>
        </div>
      </div>
      {/* Status message */}
      <div className="status" data-testid="game-status">
        {winner ? (
          <>
            <span className="winner-text">
              {playerNames[winner]} wins! <span className={winner === "X" ? "winner-x" : "winner-o"}>{winner}</span>
            </span>
          </>
        ) : isBoardFull ? (
          <>
            <span className="tie-text">It's a tie!</span>
          </>
        ) : (
          <>
            <span>
              {xIsNext ? playerNames.X : playerNames.O}'s turn
              <span className={"status-mark " + (xIsNext ? "status-x" : "status-o")}>
                {xIsNext ? "X" : "O"}
              </span>
            </span>
          </>
        )}
      </div>
      {/* Board grid */}
      <div className="board" role="grid" aria-label="Tic Tac Toe Board">
        {board.map((value, idx) => (
          <button
            key={idx}
            className={"square" + (value === "X" ? " square-x" : value === "O" ? " square-o" : "")}
            onClick={() => handleSquareClick(idx)}
            tabIndex={0}
            aria-label={"Play at row " + (Math.floor(idx / 3) + 1) + ", column " + (idx % 3 + 1)}
            disabled={Boolean(value) || Boolean(winner)}
            data-testid={`square-${idx}`}
          >
            {value}
          </button>
        ))}
      </div>
      {/* Game controls */}
      <div className="controls">
        <button className="btn accent" onClick={handleReset} data-testid="reset-btn">
          Next Round
        </button>
        <button className="btn secondary" onClick={handleFullReset} data-testid="full-reset-btn">
          Reset All
        </button>
      </div>
      {/* Footer */} 
      <footer className="footer">
        <span>
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >Built with React</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
