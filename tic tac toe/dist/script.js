const cells = document.querySelectorAll("#cellContainer > div");
const statusText = document.getElementById("statusText");
const playAgainBtn = document.getElementById("playAgainBtn");
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let placeholder = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();

function initializeGame() {
    // Attach event listeners to each cell
    cells.forEach((cell, index) => {
        cell.setAttribute("cellIndex", index); // Add cellIndex attribute
        cell.addEventListener("click", cellClicked);
    });

    playAgainBtn.addEventListener("click", playAgain);
    statusText.textContent = `${currentPlayer}'s turn!`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (placeholder[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    placeholder[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn!`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < win.length; i++) {
        const condition = win[i];
        const cellA = placeholder[condition[0]];
        const cellB = placeholder[condition[1]];
        const cellC = placeholder[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} WON!`;
        running = false; // Stop the game
    } else if (!placeholder.includes("")) {
        statusText.textContent = `DRAW!`;
        running = false; // Stop the game
    } else {
        changePlayer();
    }
}

function playAgain() {
    currentPlayer = "X";
    placeholder = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}