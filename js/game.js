'use strict';

var secuencia;
var secuenciaJugador;
var nivel;
var puntaje;
var nombreJugador;
var esperandoInput;

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

var colores;
var botonesColor;

function inicializarVariables() {
    secuencia = [];
    secuenciaJugador = [];
    nivel = 0;
    puntaje = 0;
    esperandoInput = false;
}

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
    
    colores = ['green', 'red', 'yellow', 'blue'];
    botonesColor = {
        green: document.getElementById('green'),
        red: document.getElementById('red'),
        yellow: document.getElementById('yellow'),
        blue: document.getElementById('blue')
    };
    
    
}

function validarNombre(nombre) {
    return nombre.length >= 3;
}

function iniciarJuego() {
    nombreJugador = playerNameInput.value.trim();
    
    if (!validarNombre(nombreJugador)) {
        alert('El nombre debe tener al menos 3 letras');
        return;
    }
    
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    gameInfo.classList.remove('hidden');
    
    playerNameDisplay.textContent = nombreJugador;
    scoreDisplay.textContent = puntaje;
    
    inicializarVariables();
    siguienteNivel();
}

function siguienteNivel() {
    nivel = nivel + 1;
    secuenciaJugador = [];
    
    var colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(colorAleatorio);
    
    mostrarSecuencia();
}

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

function iluminarBoton(color) {
    var boton = botonesColor[color];
    boton.classList.add('active');
    
    setTimeout(function() {
        boton.classList.remove('active');
    }, 400);
}

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

function gameOver() {
    esperandoInput = false;
    finalScoreDisplay.textContent = puntaje;
    gameOverModal.classList.remove('hidden');
}

function reiniciarJuego() {
    gameOverModal.classList.add('hidden');
    gameContainer.classList.add('hidden');
    gameInfo.classList.add('hidden');
    startScreen.classList.remove('hidden');
    
    playerNameInput.value = '';
    scoreDisplay.textContent = '0';
    inicializarVariables();
}

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

function inicializar() {
    obtenerElementos();
    configurarEventos();
    inicializarVariables();
}

document.addEventListener('DOMContentLoaded', inicializar);