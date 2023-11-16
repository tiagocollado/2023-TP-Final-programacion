// Selectores DOM
const instructionsSelector = document.getElementById("instructions");
const playerNameSelector = document.getElementById("player-nombre");
const cellsSelector = document.querySelectorAll(".cell");
const resultSelector = document.getElementById("result");
const resetButtonSelector = document.getElementById("reset");
const playerScoreSelector = document.getElementById("player-score");
const pcScoreSelector = document.getElementById("pc-score");
const startGameButtonSelector = document.getElementById("start-game");
const PUNTAJE_GANADOR = 50;


// Inicializacion de variables
let player = "X"; // Cambiar a "O" si la PC va primeroo
let playerName = "";
let winner = "";
let scorePlayer = 0;
let pcScore = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let gameStarted = false;

// Instrucciones
instructionsSelector.onclick = function () {
alert('Bienvenido al juego del Ta-te-ti. \nCada jugador (usuario y PC) tiene turnos para colocar sus símbolos ("X" y "O") en un tablero de 3x3. Por turnos, cada jugador coloca su símbolo en un espacio vacío. El objetivo es lograr tener tres de tus símbolos en línea, ya sea horizontal, vertical o diagonal, antes que tu oponente. Si el tablero se llena sin un ganador, es un empate. \n¡Gana el primero que complete la línea, y llegue a 50 puntos! ');
}

// Creacion de todos los eventListener
playerNameSelector.addEventListener("input", (e) => { //Cuando el usuario ingresa su nombre
    playerName = e.target.value; //Obtiene el nombre ingresado por el usuario
    winner = playerName //Establece al jugador ingresado como el posible ganador
    document.getElementById("nombre-jugadorpuesto").innerHTML = playerName //Muestra el nombre del jugador en un elemento del DOM
});

//Inicia el juego
startGameButtonSelector.onclick = function () {
    if (playerName.trim() === "") {
        alert("Por favor, ingrese su nombre antes de comenzar el juego."); // Chequea que nombreJugador no este vacía, si lo esta le pide el nombre
    } else {
        playerName = playerName.trim(); //Elimina espacios en blanco al principio y al final del nombre del jugador
        playerNameSelector.textContent = playerName; //Actualiza el contenido del playerNameSelector con el nombre del jugador después de que se eliminen los espacios en blanco
        playerNameSelector.setAttribute("readonly", "true"); //Hace que el campo de entrada de nombre sea solo de lectura, o sea que ya no se podrá editar el nombre puesto
        resetBoard();

        gameStarted = true; // Indicamos que el juego ha comenzado
    }
}


playerScoreSelector.textContent = scorePlayer;
pcScoreSelector.textContent = pcScore;

//Funcion del ganador


function checkWinner() {
    //Agregar límite de 50 puntos y definir al ganador
    if (scorePlayer >= PUNTAJE_GANADOR) {
        gameOver = true;
        resultSelector.textContent = `${playerName} ha ganado el juego!`;

        resetButtonSelector.innerHTML = "Reiniciar Juego"
    }

    if (pcScore >= PUNTAJE_GANADOR) {
        gameOver = true;
        resultSelector.textContent = "PC ha ganado el juego!";

        resetButtonSelector.innerHTML = "Reiniciar Juego"
    }
}

//Utiliza combinaciones ganadoras para verificar el estado actual del tablero y actualiza los puntajes y el resultado en consecuencia
const checkWinnerRound = () => {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    // Verifica si hay un ganador o si hay un empate, y suma los puntos
    combinacionesGanadoras.forEach(combo => {
        const [a, b, c] = combo; //En cada iteración del bucle, se desestructura la combinación actual en las variables a, b y c. Estos valores representan los índices de las celdas en el tablero que están siendo evaluadas en esa combinación particular.

        //Verifica si las celdas en los índices a, b y c del tablero contienen el mismo valor ("X" o "O"). Si todas estas celdas contienen el mismo valor y no están vacías("board[a]" verifica si "board[a]" no es una cadena vacía), significa que un jugador ha ganado.
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;

            if (player === "X") {
                scorePlayer += 10;
                resultSelector.innerHTML = `${playerName} ha ganado!`;
            } else {
                pcScore += 10;
                resultSelector.innerHTML = "PC ha ganado!";
            }
            playerScoreSelector.innerHTML = scorePlayer;
            pcScoreSelector.innerHTML = pcScore;
        }
    })

    //"every" verifica si todos los elementos de un array cumplen con cierta condición. Significa que se verifica si cada "cell" en el array "board" no es una cadena vacía
    if (board.every(cell => cell !== "") && gameOver === false) {
        gameOver = true;
        resultSelector.innerHTML = "Empate!";
    }

    checkWinner();
}


const handleCellClick = (e) => {
    if (!gameStarted) {
        alert("Por favor, presiona 'Comenzar Juego' antes de seleccionar una celda.");
        return;
    }

    const cell = e.target;
    const cellIndex = cell.id.split("-")[1]; //Se activa cuando se hace click en una celda

    //Verifica si la celda esta vacía y que no haya terminado el juego
    if (board[cellIndex] === "" && !gameOver) {
        board[cellIndex] = player; // Si se cumplen estas condiciones la celda se marca con el símbolo del jugador (X)
        cell.textContent = player;
        checkWinnerRound(); //Despues de marcar la celda se verifíca si hay un ganador

        if (!gameOver) {
            player = player === "X" ? "O" : "X"; //Si el juego no terminó, cambia al siguiente jugador, y si este es "O", el código selecciona una celda al azar en el tablero y la marca con "O" despues de un breve retraso

            // Simular jugada de la PC (aleatoria)
            if (player === "O") {

                const emptyCells = [];
                board.forEach((val, index) => {
                    if (val === "") {
                        emptyCells.push(index);
                    }
                });

                const randomCellIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Esto selecciona un índice aleatorio de las celdas vacías en el tablero
                setTimeout(() => {
                    const pcCell = document.getElementById(`cell-${randomCellIndex}`);
                    pcCell.click();
                }, 500); //Selecciona la celda vacia aleatoria, despues de un retraso de 500 milisegundos, y cada celda se marca como 0
            }
        }
    }
}

const resetBoard = () => {
    player = "X"; // Restablecer al player humano
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    resultSelector.textContent = "";
    cellsSelector.forEach(cell => cell.textContent = ""); //Limpia el contenido de todas las celdas del tablero en el DOM
}

cellsSelector.forEach(cell => cell.addEventListener("click", handleCellClick)); // Responde cuando el usuario haga clic en una celda

//Para restablecer el juego cuando se hace clic en él
resetButtonSelector.onclick = function () {
    if (resetButtonSelector.textContent === "Reiniciar Juego") {
        scorePlayer = 0;
        pcScore = 0;
        playerScoreSelector.innerHTML = 0;
        pcScoreSelector.innerHTML = 0;
        resetButtonSelector.innerHTML = "Reiniciar Ronda";
    }
    resetBoard();
}