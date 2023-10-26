let player = "X"; // Cambiar a "O" si la PC va primeroo
let playerName = "";
document.getElementById("player-name").addEventListener("input", function () {
    playerName = this.value;
});

let playerScore = 0;
let pcScore = 0;

document.getElementById("player-score").textContent = playerScore;
document.getElementById("pc-score").textContent = pcScore;

let tablero = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const resultado = document.getElementById("resultado");
const resetButton = document.getElementById("reset");

function checkWinner() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (const combo of combinacionesGanadoras) {
        const [a, b, c] = combo;
        if (tablero[a] && tablero[a] === tablero[b] && tablero[b] === tablero[c]) {
            gameOver = true;
            resultado.textContent = ${player} ha ganado!;

            if (player === "X") {
                playerScore += 10;
            } else {
                pcScore += 10;
            }
            document.getElementById("player-score").textContent = playerScore;
            document.getElementById("pc-score").textContent = pcScore;
            return;
        }
    }

    if (tablero.every(cell => cell !== "")) {
        gameOver = true;
        resultado.textContent = "Empate!";
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.id.split("-")[1];

    if (tablero[cellIndex] === "" && !gameOver) {
        tablero[cellIndex] = player;
        cell.textContent = player;
        checkWinner();

        if (!gameOver) {
            player = player === "X" ? "O" : "X";

            if (player === "O") {
                // Simular jugada de la PC (aleatoria)
                const emptyCells = tablero.reduce((acc, val, index) => {
                    if (val === "") acc.push(index);
                    return acc;
                }, []);
                const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                setTimeout(() => {
                    const pcCell = document.getElementById(cell-${randomCellIndex});
                    pcCell.click();
                }, 500);
            }
        }
    }
}

function resetGame() {
    player = "X"; // Restablecer al jugador humano
    tablero = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    resultado.textContent = "";
    cells.forEach(cell => cell.textContent = "");
}

document.getElementById("start-game").addEventListener("click", function () {
    if (playerName.trim() === "") {
        alert("Por favor, ingrese su nombre antes de comenzar el juego.");
    } else {
        playerName = playerName.trim();
        document.getElementById("player-name").value = playerName;
        document.getElementById("player-name").setAttribute("readonly", "true");
        resetGame();
    }
});

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);