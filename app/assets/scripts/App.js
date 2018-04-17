import $ from "jquery";
const GAMEDATA = {
  currentPlayer: 1,
  gameBoard: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
}
$(document).ready(() => {
  $("span").on("click", boardClicked);
});

function boardClicked() {
  if (GAMEDATA.currentPlayer === 1) {
    $(this).text("X");
    GAMEDATA.currentPlayer = 2;
  } else {
    $(this).text("O");
    GAMEDATA.currentPlayer = 1;
  }
  let posClicked = $(this).attr("id");
  const posX = posClicked.slice(0, 1);
  const posY = posClicked.slice(2, 3);
  GAMEDATA.gameBoard[posX][posY] = "X";
  console.log(GAMEDATA.gameBoard);

}