import $ from "jquery";
const GAMEDATA = {
  ai: false,
  currentPlayer: 1,
  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  score: [0, 0],
  gameOver: false,
  winner: "",
  loser: ""
}

$(document).ready(() => {
  $("span").on("click", boardClicked);
});

function boardClicked() {
  const posClicked = $(this).attr("id");
  const posX = posClicked.slice(0, 1);
  const posY = posClicked.slice(1, 2);

  if (!(GAMEDATA.gameOver)) {
    if (GAMEDATA.gameBoard[posX][posY] === "") {
      if (GAMEDATA.currentPlayer === 1) {
        $(this).text("X");
        GAMEDATA.gameBoard[posX][posY] = "X";
        GAMEDATA.currentPlayer = 2;
        $("#p1").removeClass("display-curPlayer");
        $("#p2").addClass("display-curPlayer");
      } else {
        $(this).text("O");
        GAMEDATA.gameBoard[posX][posY] = "O";
        GAMEDATA.currentPlayer = 1;
        $("#p1").addClass("display-curPlayer");
        $("#p2").removeClass("display-curPlayer");
      }
    }

    if (checkWinCondition("X")) {
      GAMEDATA.gameOver = true;
      GAMEDATA.winner = "#p1";
      GAMEDATA.loser = "#p2";
      GAMEDATA.score[0]++;
    } else if (checkWinCondition("O")) {
      GAMEDATA.gameOver = true;
      GAMEDATA.winner = "#p2";
      GAMEDATA.loser = "#p1";
      GAMEDATA.score[1]++;
    }

    if (GAMEDATA.gameOver) {
      endGame();
    }
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

function endGame() {
  $(GAMEDATA.winner).addClass("display-winner");
  $(GAMEDATA.loser).addClass("display-loser");
  $("#p1Score").text(GAMEDATA.score[0]);
  $("#p2Score").text(GAMEDATA.score[1]);

  setTimeout(function() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        GAMEDATA.gameBoard[i][j] = "";
        let cord = "#" + i + j;
        $(cord).text(GAMEDATA.gameBoard[i][j]);
      }
    }
    $(GAMEDATA.winner).removeClass("display-winner");
    $(GAMEDATA.loser).removeClass("display-loser");
    GAMEDATA.gameOver = false;
    GAMEDATA.winner = "";
    GAMEDATA.loser = "";
  }, 3000);
}