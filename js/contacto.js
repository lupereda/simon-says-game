'use strict';

// Referencias a elementos del DOM
var formulario;
var inputNombre;
var inputEmail;
var inputMensaje;
var nombreError;
var emailError;
var mensajeError;

// Valida que el nombre sea alfanumérico y tenga al menos 3 caracteres
function validarNombre(nombre) {
    if (nombre.length < 3) {
        return false;
    }
    for (var i = 0; i < nombre.length; i++) {
        var caracter = nombre[i];
        var esLetra = (caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z');
        var esNumero = caracter >= '0' && caracter <= '9';
        var esEspacio = caracter === ' ';
        if (!esLetra && !esNumero && !esEspacio) {
            return false;
        }
    }
    return true;
}

// Valida que el email tenga formato válido con arroba y punto
function validarEmail(email) {
    var tieneArroba = email.indexOf('@') > 0;
    var tienePunto = email.indexOf('.') > email.indexOf('@');
    return tieneArroba && tienePunto && email.length > 5;
}

// Valida que el mensaje tenga más de 5 caracteres
function validarMensaje(mensaje) {
    return mensaje.length > 5;
}

// Limpia todos los mensajes de error y estilos
function limpiarErrores() {
    inputNombre.classList.remove('error');
    inputEmail.classList.remove('error');
    inputMensaje.classList.remove('error');
    nombreError.textContent = '';
    emailError.textContent = '';
    mensajeError.textContent = '';
}

// Muestra un mensaje de error en un campo especifico
function mostrarError(input, mensajeElemento, mensaje) {
    input.classList.add('error');
    mensajeElemento.textContent = mensaje;
}

// Maneja el envio del formulario validando los campos y mostrando errores visuales
function manejarEnvio(evento) {
    evento.preventDefault();
    limpiarErrores();
    var nombre = inputNombre.value.trim();
    var email = inputEmail.value.trim();
    var mensaje = inputMensaje.value.trim();
    var hayErrores = false;
    if (!validarNombre(nombre)) {
        mostrarError(inputNombre, nombreError, 'El nombre debe ser alfanumérico y tener al menos 3 caracteres');
        hayErrores = true;
    }
    if (!validarEmail(email)) {
        mostrarError(inputEmail, emailError, 'Por favor ingresa un email válido (ejemplo: usuario@dominio.com)');
        hayErrores = true;
    }
    if (!validarMensaje(mensaje)) {
        mostrarError(inputMensaje, mensajeError, 'El mensaje debe tener más de 5 caracteres');
        hayErrores = true;
    }
    if (hayErrores) {
        return;
    }
    var asunto = 'Contacto desde Simon Says';
    var cuerpo = 'Nombre: ' + nombre + '\n\nMensaje:\n' + mensaje;
    var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
    window.location.href = mailtoLink;
}

// Inicializa el formulario y configura el evento de envio
function inicializar() {
    formulario = document.getElementById('contactForm');
    inputNombre = document.getElementById('nombre');
    inputEmail = document.getElementById('email');
    inputMensaje = document.getElementById('mensaje');
    nombreError = document.getElementById('nombreError');
    emailError = document.getElementById('emailError');
    mensajeError = document.getElementById('mensajeError');
    formulario.addEventListener('submit', manejarEnvio);
}

document.addEventListener('DOMContentLoaded', inicializar);