'use strict';

// Variables del estado del juego
var secuencia;
var secuenciaJugador;
var nivel;
var puntaje;
var nombreJugador;
var esperandoInput;
var tiempoInicio;
var tiempoTranscurrido;
var intervaloTimer;

// Referencias a elementos del DOM
var startScreen;
var gameContainer;
var gameInfo;
var gameOverModal;
var playerNameInput;
var startButton;
var restartButton;
var playerNameDisplay;
var scoreDisplay;
var finalScoreDisplay;
var timerDisplay;
var playerNameError;

// Configuración del juego
var colores;
var botonesColor;

// Reinicia todas las variables del estado del juego a sus valores iniciales
function inicializarVariables() {
    secuencia = [];
    secuenciaJugador = [];
    nivel = 0;
    puntaje = 0;
    esperandoInput = false;
    tiempoTranscurrido = 0;
}

// Obtiene y guarda referencias a todos los elementos del DOM necesarios
function obtenerElementos() {
    startScreen = document.getElementById('startScreen');
    gameContainer = document.getElementById('gameContainer');
    gameInfo = document.getElementById('gameInfo');
    gameOverModal = document.getElementById('gameOverModal');
    playerNameInput = document.getElementById('playerNameInput');
    startButton = document.getElementById('startButton');
    restartButton = document.getElementById('restartButton');
    playerNameDisplay = document.getElementById('playerName');
    scoreDisplay = document.getElementById('score');
    finalScoreDisplay = document.getElementById('finalScore');
    timerDisplay = document.getElementById('timer');
    playerNameError = document.getElementById('playerNameError');
    colores = ['green', 'red', 'yellow', 'blue'];
    botonesColor = {
        green: document.getElementById('green'),
        red: document.getElementById('red'),
        yellow: document.getElementById('yellow'),
        blue: document.getElementById('blue')
    };
}

// Valida que el nombre del jugador tenga al menos 3 caracteres
function validarNombre(nombre) {
    return nombre.length >= 3;
}

// Actualiza el display del timer cada segundo
function actualizarTimer() {
    tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    timerDisplay.textContent = tiempoTranscurrido + 's';
}

// Inicia el contador de tiempo
function iniciarTimer() {
    tiempoInicio = Date.now();
    tiempoTranscurrido = 0;
    intervaloTimer = setInterval(actualizarTimer, 1000);
}

// Detiene el contador de tiempo
function detenerTimer() {
    if (intervaloTimer) {
        clearInterval(intervaloTimer);
    }
}

// Calcula el puntaje final con penalización por tiempo (1 punto cada 3 segundos)
function calcularPuntajeFinal() {
    var penalizacion = Math.floor(tiempoTranscurrido / 3);
    var puntajeFinal = puntaje - penalizacion;
    return puntajeFinal > 0 ? puntajeFinal : 0;
}

// Guarda una partida en LocalStorage
function guardarPartida() {
    var fecha = new Date();
    var partidaActual = {
        nombre: nombreJugador,
        puntaje: calcularPuntajeFinal(),
        nivel: nivel,
        fecha: fecha.toLocaleDateString('es-AR'),
        hora: fecha.toLocaleTimeString('es-AR')
    };
    var partidas = obtenerPartidas();
    partidas.push(partidaActual);
    localStorage.setItem('partidasSimonSays', JSON.stringify(partidas));
}

// Obtiene todas las partidas guardadas del LocalStorage
function obtenerPartidas() {
    var partidasJSON = localStorage.getItem('partidasSimonSays');
    if (partidasJSON) {
        return JSON.parse(partidasJSON);
    }
    return [];
}

// Aplica efecto visual de iluminación a un botón de color
function iluminarBoton(color) {
    var boton = botonesColor[color];
    boton.classList.add('active');
    setTimeout(function() {
        boton.classList.remove('active');
    }, 400);
}

// Muestra la secuencia completa al jugador con intervalos de tiempo
function mostrarSecuencia() {
    esperandoInput = false;
    var i = 0;
    var intervalo = setInterval(function() {
        if (i >= secuencia.length) {
            clearInterval(intervalo);
            esperandoInput = true;
            return;
        }
        iluminarBoton(secuencia[i]);
        i = i + 1;
    }, 800);
}

// Incrementa el nivel y agrega un nuevo color aleatorio a la secuencia
function siguienteNivel() {
    nivel = nivel + 1;
    secuenciaJugador = [];
    var colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(colorAleatorio);
    mostrarSecuencia();
}
// Guarda una partida en LocalStorage
function guardarPartida() {
    var fecha = new Date();
    var partidaActual = {
        nombre: nombreJugador,
        puntaje: calcularPuntajeFinal(),
        nivel: nivel,
        fecha: fecha.toLocaleDateString('es-AR'),
        hora: fecha.toLocaleTimeString('es-AR')
    };
    var partidas = obtenerPartidas();
    partidas.push(partidaActual);
    localStorage.setItem('partidasSimonSays', JSON.stringify(partidas));
}

// Obtiene todas las partidas guardadas del LocalStorage
function obtenerPartidas() {
    var partidasJSON = localStorage.getItem('partidasSimonSays');
    if (partidasJSON) {
        return JSON.parse(partidasJSON);
    }
    return [];
}
// Muestra el modal de game over con el puntaje final y guarda la partida
function gameOver() {
    esperandoInput = false;
    detenerTimer();
    var puntajeFinal = calcularPuntajeFinal();
    var penalizacion = puntaje - puntajeFinal;
    finalScoreDisplay.textContent = puntajeFinal + ' (Aciertos: ' + puntaje + ' - Penalización: ' + penalizacion + ')';
    guardarPartida();
    gameOverModal.classList.remove('hidden');
}

// Maneja el click del jugador en un botón de color
function manejarClickBoton(color) {
    if (!esperandoInput) {
        return;
    }
    iluminarBoton(color);
    secuenciaJugador.push(color);
    var indiceActual = secuenciaJugador.length - 1;
    if (secuenciaJugador[indiceActual] !== secuencia[indiceActual]) {
        gameOver();
        return;
    }
    puntaje = puntaje + 1;
    scoreDisplay.textContent = puntaje;
    if (secuenciaJugador.length === secuencia.length) {
        esperandoInput = false;
        setTimeout(siguienteNivel, 1000);
    }
}

// Inicia una nueva partida del juego tras validar el nombre del jugador
function iniciarJuego() {
    nombreJugador = playerNameInput.value.trim();
    if (!validarNombre(nombreJugador)) {
        playerNameInput.classList.add('error');
        playerNameError.textContent = 'El nombre debe tener al menos 3 letras';
        return;
    }
    playerNameInput.classList.remove('error');
    playerNameError.textContent = '';
    inicializarVariables();
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameInfo.classList.remove('hidden');
    playerNameDisplay.textContent = nombreJugador;
    scoreDisplay.textContent = '0';
    timerDisplay.textContent = '0s';
    iniciarTimer();
    siguienteNivel();
}

// Reinicia el juego volviendo a la pantalla de inicio
function reiniciarJuego() {
    detenerTimer();
    gameOverModal.classList.add('hidden');
    gameContainer.classList.add('hidden');
    gameInfo.classList.add('hidden');
    startScreen.classList.remove('hidden');
    playerNameInput.value = '';
    playerNameInput.classList.remove('error');
    playerNameError.textContent = '';
    playerNameInput.placeholder = 'Mínimo 3 letras';
    scoreDisplay.textContent = '0';
    timerDisplay.textContent = '0s';
    inicializarVariables();
}

// Configura todos los event listeners del juego
function configurarEventos() {
    startButton.addEventListener('click', iniciarJuego);
    restartButton.addEventListener('click', reiniciarJuego);
    botonesColor.green.addEventListener('click', function() {
        manejarClickBoton('green');
    });
    botonesColor.red.addEventListener('click', function() {
        manejarClickBoton('red');
    });
    botonesColor.yellow.addEventListener('click', function() {
        manejarClickBoton('yellow');
    });
    botonesColor.blue.addEventListener('click', function() {
        manejarClickBoton('blue');
    });
}

// Inicializa el juego cuando el DOM está completamente cargado
function inicializar() {
    obtenerElementos();
    configurarEventos();
    inicializarVariables();
}

document.addEventListener('DOMContentLoaded', inicializar);