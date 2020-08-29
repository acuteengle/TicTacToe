import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tile from "./Tile";

const startingBoard = ["", "", "", "", "", "", "", "", ""];

const rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const columns = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const diagonals = [
  [0, 4, 8],
  [6, 4, 2],
];

const backgroundColor = "#43658b";
const xColor = "#ed6663";
const oColor = "#ffa372";

const TicTacToe = () => {
  const [board, setBoard] = useState(startingBoard);
  const [xMove, setXMove] = useState(true);
  const [continueGame, setContinueGame] = useState(true);
  const [winner, setWinner] = useState("");
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  const checkRows = () => {
    for (const r of rows) {
      if (
        r.every((index) => board[index] !== "" && board[index] === board[r[0]])
      ) {
        return true;
      }
    }
    return false;
  };

  const checkColumns = () => {
    for (const c of columns) {
      if (
        c.every((index) => board[index] !== "" && board[index] === board[c[0]])
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDiagonals = () => {
    for (const d of diagonals) {
      if (
        d.every((index) => board[index] !== "" && board[index] === board[d[0]])
      ) {
        return true;
      }
    }
    return false;
  };

  const checkAllSpacesTaken = () => {
    if (board.every((b) => b !== "")) {
      return true;
    } else {
      return false;
    }
  };

  const handleTileClick = (index) => (event) => {
    if (board[index] !== "") {
      return;
    }
    console.log(index);
    let newBoard = [...board];
    newBoard[index] = xMove ? "X" : "O";
    setBoard(newBoard);
  };

  const handleButtonClick = (event) => {
    setContinueGame(true);
    setWinner("");
    setBoard(startingBoard);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (checkRows() || checkColumns() || checkDiagonals()) {
        setContinueGame(false);
        setWinner(xMove ? "X" : "O");
        if (xMove) {
          setXWins(xWins + 1);
        } else {
          setOWins(oWins + 1);
        }
      } else if (checkAllSpacesTaken()) {
        setContinueGame(false);
      } else {
        setXMove(!xMove);
      }
    }
  }, [board]);

  const style = {
    canvas: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    board: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      width: 600,
      height: 600,
      backgroundColor: backgroundColor,
    },
    scoreboard: {
      width: "30%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  };

  const tie = !continueGame && winner === "";

  let displayText = "";
  if (continueGame) {
    displayText = xMove ? "X's move" : "O's move";
  } else if (winner === "") {
    displayText = "It's a tie";
  } else {
    displayText = winner + " Wins!";
  }

  return (
    <div style={style.canvas}>
      <h1>{displayText}</h1>
      <div style={style.board}>
        {board.map((value, index) => {
          return (
            <Tile
              key={index}
              value={value}
              index={index}
              handleClick={continueGame ? handleTileClick : null}
              xColor={xColor}
              oColor={oColor}
            />
          );
        })}
      </div>
      <button onClick={handleButtonClick} className="btn btn-dark m-3">
        New Game
      </button>
      <h2>Win Counter:</h2>
      {
        <div style={style.scoreboard}>
          <h4>
            <b style={{ color: xColor }}>X:</b> {xWins}
          </h4>
          <h4>
            <b style={{ color: oColor }}>O:</b> {oWins}
          </h4>
        </div>
      }
    </div>
  );
};

export default TicTacToe;
