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
        playerName = playerName.trim(); //Elimina espacios en blanco al principio y al final del nombre del jugador
        playerNameSelector.textContent = playerName; //Actualiza el contenido del playerNameSelector con el nombre del jugador después de que se eliminen los espacios en blanco
        playerNameSelector.setAttribute("readonly", "true"); //Hace que el campo de entrada de nombre sea solo de lectura, o sea que ya no se podrá editar el nombre puesto
        resetGame();
    }
});

playerScoreSelector.textContent = scorePlayer;
pcScoreSelector.textContent = pcScore;




//Utiliza combinaciones ganadoras para verificar el estado actual del tablero y actualiza los puntajes y el resultado en consecuencia
const checkWinner = () => {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    // Verifica si hay un ganador o si hay un empate, y suma los puntos
    for (const combo of combinacionesGanadoras) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;
            
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

            // Simular jugada de la PC (aleatoria)
            if (player === "O") {
                
                const emptyCells = board.reduce((acc, val, index) => { //Crea el array "emptyCells" con índices de celdas vacías (acc es acumulador)(val es valor actual en el array)(index es indice actual en el array)
                    if (val === "") acc.push(index);
                    return acc; //"reduce" itera sobre el array "board" y agregar los índices de las celdas vacías al array "acc". "emptyCells" almacena estos índices
                }, []);
                const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Esto selecciona un índice aleatorio de las celdas vacías en el tablero
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
    cellsSelector.forEach(cell => cell.textContent = ""); //Limpia el contenido de todas las celdas del tablero en el DOM
}

// Event Listeners adicionales
cellsSelector.forEach(cell => cell.addEventListener("click", handleCellClick)); // Responde cuando el usuario haga clic en una celda
resetButtonSelector.addEventListener("click", resetGame); //Para restablecer el juego cuando se hace clic en él