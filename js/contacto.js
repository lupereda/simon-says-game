'use strict';

var formulario;

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

function validarEmail(email) {
    var tieneArroba = email.indexOf('@') > 0;
    var tienePunto = email.indexOf('.') > email.indexOf('@');
    return tieneArroba && tienePunto && email.length > 5;
}

function validarMensaje(mensaje) {
    return mensaje.length > 5;
}

function manejarEnvio(evento) {
    evento.preventDefault();
    
    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    
    if (!validarNombre(nombre)) {
        alert('El nombre debe ser alfanumérico y tener al menos 3 caracteres');
        return;
    }
    
    if (!validarEmail(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }
    
    if (!validarMensaje(mensaje)) {
        alert('El mensaje debe tener más de 5 caracteres');
        return;
    }
    
    var asunto = 'Contacto desde Simon Says';
    var cuerpo = 'Nombre: ' + nombre + '\n\nMensaje:\n' + mensaje;
    var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
    
    window.location.href = mailtoLink;
}

function inicializar() {
    formulario = document.getElementById('contactForm');
    formulario.addEventListener('submit', manejarEnvio);
}

document.addEventListener('DOMContentLoaded', inicializar);'use strict';

var formulario;

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

function validarEmail(email) {
    var tieneArroba = email.indexOf('@') > 0;
    var tienePunto = email.indexOf('.') > email.indexOf('@');
    return tieneArroba && tienePunto && email.length > 5;
}

function validarMensaje(mensaje) {
    return mensaje.length > 5;
}

function manejarEnvio(evento) {
    evento.preventDefault();
    
    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    
    if (!validarNombre(nombre)) {
        alert('El nombre debe ser alfanumérico y tener al menos 3 caracteres');
        return;
    }
    
    if (!validarEmail(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }
    
    if (!validarMensaje(mensaje)) {
        alert('El mensaje debe tener más de 5 caracteres');
        return;
    }
    
    var asunto = 'Contacto desde Simon Says';
    var cuerpo = 'Nombre: ' + nombre + '\n\nMensaje:\n' + mensaje;
    var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
    
    window.location.href = mailtoLink;
}

function inicializar() {
    formulario = document.getElementById('contactForm');
    formulario.addEventListener('submit', manejarEnvio);
}

document.addEventListener('DOMContentLoaded', inicializar);