import { useState } from "react";

/**
 * The Square component represents an individual square on the tic-tac-toe board.
 * It displays a value and responds to user clicks.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string|null} props.value - The value to display in the square, either "X", "O", or null.
 * @param {Function} props.onSquareClick - The callback function to handle the square's click event.
 * @returns {JSX.Element} A button element representing the square.
 */
function Square({ value, onSquareClick }) {
   return (
       <button className="square" onClick={onSquareClick}>
          {value}
       </button>
   );
}


/**
 * The Board component represents a tic-tac-toe game board.
 * It manages the state of the squares, determines the winner,
 * and tracks the current player (X or O).
 *
 * @component
 * @returns {JSX.Element} The rendered Board component with 9 squares and game status.
 */

export default function Board() {
   const [xIsNext, setXIsNext] = useState(true); // Tracks which player's turn it is.
   const [squares, setSquares] = useState(Array(9).fill(null)); // Holds the state of the 9 squares.

   /**
    * Handles the click event on a square. Updates the state of the board
    * and alternates the player's turn if the game is not over.
    *
    * @param {number} i - The index of the square that was clicked.
    */
   function handleClick(i) {
      if (squares[i] || calculateWinner(squares)) {
         return; // Exit if the square is already filled or the game has a winner.
      }
      const nextSquares = squares.slice(); // Create a copy of the current squares.
      nextSquares[i] = xIsNext ? "X" : "O"; // Set the current player's marker.
      setSquares(nextSquares); // Update the board state.
      setXIsNext(!xIsNext); // Switch to the next player.
   }

   const winner = calculateWinner(squares); // Determines the winner, if any.
   let status;
   if (winner) {
      status = `${winner} a gagné`; // Displays the winner.
   } else {
      status = `Prochain tour : ${xIsNext ? "X" : "O"}`; // Indicates whose turn it is.
   }

   return (
       <>
          <div className="status">{status}</div>
          <div className="board-row">
             <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
             <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
             <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
             <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
             <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
             <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
             <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
             <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
             <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
       </>
   );
}


   /**
    * Determine the winner of a tic-tac-toe game.
    * @function
    * @param {Array} squares - An array representing the state of the board, where each element is either 'X', 'O', or null.
    * @returns {string|null} - Returns 'X' or 'O' if a winner is found, otherwise null.
    */
   function calculateWinner(squares) {
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
      for (let i = 0; i < lines.length; i++) {
         const [a, b, c] = lines[i];
         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
         }
      }
      return null;
}
