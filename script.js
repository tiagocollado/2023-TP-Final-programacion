// Selectores DOM
const playerNameSelector = document.getElementById("player-nombre")
const cellsSelector = document.querySelectorAll(".cell");
const resultSelector = document.getElementById("result");
const resetButtonSelector = document.getElementById("reset");
const playerScoreSelector = document.getElementById("player-score")
const pcScoreSelector = document.getElementById("pc-score")
const startGameButtonSelector = document.getElementById("start-game")


// Inicializacion de variables
let player = "X"; // Cambiar a "O" si la PC va primeroo
let playerName = "";
let winner= "";
let scorePlayer = 0;
let pcScore = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// Creacion de todos los eventListener
playerNameSelector.addEventListener("input",  (e) => { //Cuando el usuario ingresa su nombre
    playerName = e.target.value; //Obtiene el nombre ingresado por el usuario
    winner = playerName //Establece al jugador ingresado como el posible ganador
    document.getElementById("nombre-jugadorpuesto").innerHTML = playerName //Muestra el nombre del jugador en un elemento del DOM
});

startGameButtonSelector.addEventListener("click", () => { //Inicia el juego
    if (playerName.trim() === "") {
        alert("Por favor, ingrese su nombre antes de comenzar el juego."); // Chequea que nombreJugador no este vacía, si lo esta le pide el nombre
    } else {
        playerName = playerName.trim();
        playerNameSelector.textContent = playerName;
        playerNameSelector.setAttribute("readonly", "true");
        resetGame();
    }
});

playerScoreSelector.textContent = scorePlayer;
pcScoreSelector.textContent = pcScore;




//Utiliza combinaciones ganadoras para verificar el estado actual del tablero y actualiza los puntajes y el resultado en consecuencia.
const checkWinner = () => {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    for (const combo of combinacionesGanadoras) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
           

           
            // Verifica si hay un ganador o si hay un empate, y suma los puntos
            if (player === "X") {
                scorePlayer += 10;
                resultSelector.textContent = `${playerName} ha ganado!`;
            } else {
                pcScore += 10;
                resultSelector.textContent = "PC ha ganado!";
            }
            playerScoreSelector.textContent = scorePlayer;
            pcScoreSelector.textContent = pcScore;
            return;
        }
    }

    if (board.every(cell => cell !== "")) {
        gameOver = true;
        resultSelector.textContent = "Empate!";
    }
}

const handleCellClick = e => {
    const cell = e.target;
    const cellIndex = cell.id.split("-")[1]; //Se activa cuando se hace click en una celda

    if (board[cellIndex] === "" && !gameOver) { //Verifica si la celda esta vacía y que no haya terminado el juego
        board[cellIndex] = player; // Si se cumplen estas condiciones la celda se marca con el símbolo del jugador (X)
        cell.textContent = player;
        checkWinner(); //Despues de marcar la celda se verifíca si hay un ganador

        if (!gameOver) {
            player = player === "X" ? "O" : "X"; //Si el juego no terminó, cambia al siguiente jugador, y si este es "O", el código selecciona una celda al azar en el tablero y la marca con "O" despues de un breve retraso

            if (player === "O") {
                // Simular jugada de la PC (aleatoria)
                const emptyCells = board.reduce((acc, val, index) => {
                    if (val === "") acc.push(index);
                    return acc;
                }, []);
                const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                setTimeout(() => {
                    const pcCell = document.getElementById(`cell-${randomCellIndex}`);
                    pcCell.click();
                }, 500); //Selecciona la celda vacia aleatoria, despues de un retraso de 500 milisegundos, y cada celda se marca como 0
            }
        }
    }
}

const resetGame = () => { 
    player = "X"; // Restablecer al player humano
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    resultSelector.textContent = "";
    cellsSelector.forEach(cell => cell.textContent = "");
}

cellsSelector.forEach(cell => cell.addEventListener("click", handleCellClick)); // Responde cuando se hace clic en una celda
resetButtonSelector.addEventListener("click", resetGame); //Para restablecer el juego cuando se hace clic en él