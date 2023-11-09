let jugador = "X"; // Cambiar a "O" si la PC va primeroo
let nombreJugador = "";
let ganador= "";

document.getElementById("jugador-nombre").addEventListener("input", function () {
    nombreJugador = this.value;
    ganador = nombreJugador
    document.getElementById("nombre-jugadorpuesto").innerHTML = nombreJugador
});

let scoreJugador = 0;
let pcScore = 0;

document.getElementById("jugador-score").textContent = scoreJugador;
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
           

           

            if (jugador === "X") {
                scoreJugador += 10;
                resultado.textContent = `${nombreJugador} ha ganado!`;
            } else {
                pcScore += 10;
                resultado.textContent = "PC ha ganado!";
            }
            document.getElementById("jugador-score").textContent = scoreJugador;
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
    const cellIndex = cell.id.split("-")[1]; //Se activa cuando se hace click en una celda

    if (tablero[cellIndex] === "" && !gameOver) { //Verifica si la celda esta vacía y que no haya terminado el juego
        tablero[cellIndex] = jugador; // Si se cumplen estas condiciones la celda se marca con el símbolo del jugador (X)
        cell.textContent = jugador;
        checkWinner(); //Despues de marcar la celda se verifíca si hay un ganador

        if (!gameOver) {
            jugador = jugador === "X" ? "O" : "X"; //Si el juego no terminó, cambia al siguiente jugador, y si este es "O", el código selecciona una celda al azar en el tablero y la marca con "O" despues de un breve retraso

            if (jugador === "O") {
                // Simular jugada de la PC (aleatoria)
                const emptyCells = tablero.reduce((acc, val, index) => {
                    if (val === "") acc.push(index);
                    return acc;
                }, []);
                const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                setTimeout(() => {
                    const pcCell = document.getElementById(`cell-${randomCellIndex}`);
                    pcCell.click();
                }, 500);
            }
        }
    }
}

function resetGame() {
    jugador = "X"; // Restablecer al jugador humano
    tablero = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    resultado.textContent = "";
    cells.forEach(cell => cell.textContent = "");
}

document.getElementById("start-game").addEventListener("click", function () {
    if (nombreJugador.trim() === "") {
        alert("Por favor, ingrese su nombre antes de comenzar el juego."); // Chequea que nombreJugador no este vacía, si lo esta le pide el nombre
    } else {
        nombreJugador = nombreJugador.trim();
        document.getElementById("jugador-nombre").value = nombreJugador;
        document.getElementById("jugador-nombre").setAttribute("readonly", "true");
        resetGame();
    }
});

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);