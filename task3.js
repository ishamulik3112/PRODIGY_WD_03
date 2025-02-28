let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const gameBoardDiv = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Function to initialize the game
function initGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Player X's turn`;
    gameBoardDiv.innerHTML = ''; // Clear the game board

    // Create the game board grid
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoardDiv.appendChild(cell);
    }
}

// Function to handle cell click
function handleCellClick(index) {
    if (gameBoard[index] !== '' || !gameActive) return; // Ignore click if cell is already filled or game is over

    gameBoard[index] = currentPlayer;
    updateBoard();
    checkWinner();

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to update the board UI
function updateBoard() {
    const cells = gameBoardDiv.children;
    for (let i = 0; i < 9; i++) {
        cells[i].textContent = gameBoard[i];
    }
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusText.textContent = `Player ${gameBoard[a]} wins!`;
            return;
        }
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        gameActive = false;
        statusText.textContent = 'It\'s a draw!';
    }
}

// Reset game function
resetBtn.addEventListener('click', initGame);

// Initialize the game when the page loads
initGame();
