import $ from "jquery";
const GAMEDATA = {
  ai: true,
  p1Char: "",
  p2Char: "",
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
  $(".game").hide();
  selectXO();
  $(".button").on("click", updateSelection);
  $("span").on("click", boardClicked);
});

function boardClicked() {
  $("span").unbind("click");
  const posClicked = $(this).attr("id");
  const posX = posClicked.slice(0, 1);
  const posY = posClicked.slice(1, 2);

  if (!(GAMEDATA.gameOver)) {
    placement($(this), posX, posY);
    winCheck();
    if (GAMEDATA.currentPlayer === 2 && GAMEDATA.ai && !(GAMEDATA.gameOver)) {
      setTimeout(function() {
        if (checkBoard()) {
          aiTurn();
          winCheck();
        }
      }, 1000);
    }
  }
  setTimeout(function() {
    $("span").bind("click", boardClicked);
  }, 1000);
}

function placement(zone, x, y) {
  if (GAMEDATA.gameBoard[x][y] === "") {
    if (GAMEDATA.currentPlayer === 1) {
      zone.text(GAMEDATA.p1Char);
      GAMEDATA.gameBoard[x][y] = GAMEDATA.p1Char;
      GAMEDATA.currentPlayer = 2;
      $("#p1").removeClass("display-curPlayer");
      $("#p2").addClass("display-curPlayer");
    } else if (!(GAMEDATA.ai)) {
      zone.text(GAMEDATA.p2Char);
      GAMEDATA.gameBoard[x][y] = GAMEDATA.p2Char;
      GAMEDATA.currentPlayer = 1;
      $("#p1").addClass("display-curPlayer");
      $("#p2").removeClass("display-curPlayer");
    }
  }
}

function checkBoard() {
  let arr = GAMEDATA.gameBoard.reduce(function(acc, curVal) {
    return acc.concat(curVal);
  }, []);
  return arr.some((elm) => {
    return elm === "";
  });
}

function aiTurn() {
  let zoneFound = false;

  while (!(zoneFound)) {
    let posX = Math.floor(Math.random() * Math.floor(3));
    let posY = Math.floor(Math.random() * Math.floor(3));
    let zone = GAMEDATA.gameBoard[posX][posY];

    let cord = "#" + posX + posY;
    if (zone === "") {
      GAMEDATA.gameBoard[posX][posY] = GAMEDATA.p2Char;
      $(cord).text(GAMEDATA.p2Char);
      GAMEDATA.currentPlayer = 1;
      zoneFound = true;
      $(cord).trigger("click");
      $("#p1").addClass("display-curPlayer");
      $("#p2").removeClass("display-curPlayer");
    }
  }
}

function winCheck() {
  if (winLogic(GAMEDATA.p1Char)) {
    GAMEDATA.gameOver = true;
    GAMEDATA.winner = "#p1";
    GAMEDATA.loser = "#p2";
    GAMEDATA.score[0]++;
  } else if (winLogic(GAMEDATA.p2Char)) {
    GAMEDATA.gameOver = true;
    GAMEDATA.winner = "#p2";
    GAMEDATA.loser = "#p1";
    GAMEDATA.score[1]++;
  } else if (winLogic("tie")) {
    GAMEDATA.gameOver = true;
  }
  if (GAMEDATA.gameOver) {
    endGame();
  }
}

function winLogic(val) {
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
  if (!(gameOver) && val === "tie") {
    const arr = GAMEDATA.gameBoard.reduce(function(acc, curVal) {
      return acc.concat(curVal);
    }, []);
    gameOver = arr.every((curVal) => {
      return curVal !== "";
    });
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
    if (GAMEDATA.currentPlayer === 2 && GAMEDATA.ai) {
      aiTurn();
    }
  }, 3000);
}

function selectXO() {
  let $title = $("<h2>").text("Do you want to play as X or O?");
  let $x = $("<button>").addClass("button").text("X");
  let $o = $("<button>").addClass("button").text("O");
  let $choices = $("<div>").addClass("container-selection");
  $choices.append($title).append($x).append($o);
  $("body").append($choices);
}

function updateSelection() {
  let choice = $(this).text();

  if (choice === "X") {
    GAMEDATA.p1Char = "X";
    GAMEDATA.p2Char = "O";
  } else {
    GAMEDATA.p1Char = "O";
    GAMEDATA.p2Char = "X";
  }
  $(".container-selection").hide();
  $(".game").show();
}