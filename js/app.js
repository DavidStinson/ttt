/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#msg')
const resetBtnEl = document.querySelector('#reset')

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => square.addEventListener('click', handleClick))
resetBtnEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie = false
  render()
}

init()

function handleClick(evt) {
  const sqIdx = evt.target.id.slice(2)
  const squareIsFull = board[sqIdx] !== null
  if (squareIsFull || winner) return

  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx) {
  board[idx] = turn
}

function checkForTie() {
  if (!board.includes(null)) tie = true
}

function checkForWinner() {
  // More elegant approach:
  // for (let i = 0; i < winningCombos.length; i++) {
  //   if (Math.abs(
  //     board[winningCombos[i][0]] +
  //     board[winningCombos[i][1]] +
  //     board[winningCombos[i][2]]
  //   ) === 3) {
  //     winner = true
  //   }
  // }

  // Even more elegant approach utilizing the `.some()` method
  // winner = winningCombos.some(combo =>
  //   Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3
  // )

  if (
    Math.abs(board[0] + board[1] + board[2]) === 3 ||
    Math.abs(board[3] + board[4] + board[5]) === 3 ||
    Math.abs(board[6] + board[7] + board[8]) === 3 ||
    Math.abs(board[0] + board[3] + board[6]) === 3 ||
    Math.abs(board[1] + board[4] + board[7]) === 3 ||
    Math.abs(board[2] + board[5] + board[8]) === 3 ||
    Math.abs(board[0] + board[4] + board[8]) === 3 ||
    Math.abs(board[2] + board[4] + board[6]) === 3
  ) {
    winner = true
  }
}

function switchPlayerTurn() {
  if (winner) return
  turn *= -1
  // We could do this all at once with:
  // if (!winner) turn *= -1
}

function render() {
  updateBoard()
  updateMessage()
}

function updateBoard() {
  board.forEach((cell, idx) => {
    if (cell === 1) squareEls[idx].textContent = 'X'
    if (cell === -1) squareEls[idx].textContent = 'O'
    if (cell === null) squareEls[idx].textContent = ''
  })
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn > 0 ? 'X' : 'O'}'s turn`
  } else if (!winner && tie) {
    messageEl.textContent = `Tie game`
  } else {
    messageEl.textContent = `${turn > 0 ? 'X' : 'O'} wins`
  }
}