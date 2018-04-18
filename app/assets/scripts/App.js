import $ from "jquery";
const GAMEDATA = {
  currentPlayer: 1,
  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  gameOver: false,
  gameWinner: ""
}

$(document).ready(() => {
  $("span").on("click", boardClicked);
});

function boardClicked() {
  const posClicked = $(this).attr("id");
  const posX = posClicked.slice(0, 1);
  const posY = posClicked.slice(2, 3);

  if (!(GAMEDATA.gameOver)) {
    if (GAMEDATA.gameBoard[posX][posY] === "") {
      if (GAMEDATA.currentPlayer === 1) {
        $(this).text("X");
        GAMEDATA.gameBoard[posX][posY] = "X";
        GAMEDATA.currentPlayer = 2;
      } else {
        $(this).text("O");
        GAMEDATA.gameBoard[posX][posY] = "O";
        GAMEDATA.currentPlayer = 1;
      }
    }

    if (checkWinCondition("X")) {
      GAMEDATA.gameOver = true;
      GAMEDATA.gameWinner = "Player One";
    } else if (checkWinCondition("O")) {
      GAMEDATA.gameOver = true;
      GAMEDATA.gameWinner = "Player Two";
    }
    console.log(GAMEDATA.gameOver);
    console.log(GAMEDATA.gameWinner);
  }
}


function checkWinCondition(val) {
  let gameOver = false;
  // Horizontal check
  for (var i = 0; i < 3; i++) {
    if (!(gameOver)) {
      gameOver = GAMEDATA.gameBoard[i].every((curVal) => {
        return curVal === val;
      });
    }
  }
  // Vertical check
  for (var i = 0; i < 3; i++) {
    let colCheck = [];
    for (var j = 0; j < 3; j++) {
      colCheck.push(GAMEDATA.gameBoard[j][i])
    }
    if (!(gameOver)) {
      gameOver = colCheck.every((curVal) => {
        return curVal === val;
      });
    }
  }
  // Diagonal check
  if (!(gameOver)) {
    if (GAMEDATA.gameBoard[1][1] === val) {
      if (GAMEDATA.gameBoard[0][0] === val && GAMEDATA.gameBoard[2][2] === val) {
        gameOver = true;
      }
      if (GAMEDATA.gameBoard[0][2] === val && GAMEDATA.gameBoard[2][0] === val) {
        gameOver = true;
      }
    }
  }
  return gameOver;
}