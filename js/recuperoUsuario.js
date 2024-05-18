class Usuario {
    constructor(nombre, apellido, fechaNacimiento, email, contrasena,pregunta,respuesta, tipoDeUsuario,isLogueado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.contrasena = contrasena;
        this.pregunta=pregunta;
        this.respuesta=respuesta;
        this.tipoDeUsuario = tipoDeUsuario;
        this.isLogueado = isLogueado;
    }
}

let usuariosRegistrados = []; // Definir usuariosRegistrados fuera de la función handleFormSubmit
let usuarioEncontrado=new Usuario();
function handleFormSubmit(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    
    // Obtener referencias a los campos de entrada del formulario
    let email = document.querySelector('input[name="email"]').value;
    let contrasena = document.querySelector('input[name="contrasena"]').value;
    let confirmarContrasena = document.querySelector('input[name="confirmar_contrasena"]').value;
    let pregunta=document.querySelector('select[name="pregunta"]').value;
    let respuesta=document.querySelector('input[name="respuesta"]').value;

    // Validar los campos del formulario
    if (!validarCorreo(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    if (!validarContrasena(contrasena)) {
        alert("La contraseña debe tener entre 6 y 12 caracteres, al menos un número, una letra mayúscula y un carácter especial.");
        return false;
    }
    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return false; // Retorna false para evitar el envío del formulario
    }
    if (!validarPreguntaRespuesta(pregunta, respuesta)) {
        alert("Por favor, seleccione una pregunta y una respuesta válidas.");
        return false;
    }
            
    // Buscar y actualizar la contraseña del usuario
    if(!buscarUsuario(email, contrasena, respuesta, usuariosRegistrados)) {
        // Si no se encuentra el usuario o la respuesta no coincide, mostrar un mensaje de error
        alert("No se encontró ningún usuario con el correo electrónico proporcionado o la respuesta incorrecta.");
        return false;
    }
    
    // Restablecer el formulario
    event.target.reset();
    
    // Mostrar mensaje de éxito o realizar otras acciones necesarias
    alert("¡Cambio de contraseña exitoso!");
    
    // Redirigir a la página index.html después del cambio de contraseña exitoso
    window.location.href = "../pages/login.html"; 
    
    // Puedes imprimir los usuarios registrados en la consola para verificar
    console.log("Usuarios registrados:", usuariosRegistrados);
    
    return false; // Retorna false para evitar el envío del formulario
}

// Recuperar los datos del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    let usuariosRegistradosString = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosString) {
        usuariosRegistrados = JSON.parse(usuariosRegistradosString);
    }
    console.log("Usuarios cargados: "+usuariosRegistrados.length)
    imprimirUsuarioCargados(usuariosRegistrados);
});

// Guarda los datos del usuario en el almacenamiento local al salir de la página
window.addEventListener('beforeunload', function() {
    localStorage.setItem('usuarioEncontrado', JSON.stringify(usuarioEncontrado));
});

function asignarPreguntaSeguridad(email) {
    // Buscar el usuario en el array usuariosRegistrados
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email) {
            // Obtener la pregunta de seguridad del usuario encontrado
            let preguntaSeguridad = usuario.pregunta;

            // Asignar el valor de la pregunta al elemento select
            let selectPregunta = document.getElementById("preguntas");
            selectPregunta.value = preguntaSeguridad;

            // Salir del bucle una vez que se encuentra el usuario
            return;
        }
    }

    // Si no se encuentra el usuario, mostrar un mensaje de error
    alert("No se encontró ningún usuario con el correo electrónico proporcionado.");
}

function validarCorreo(email) {
    // Expresión regular para verificar el formato de correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar la contraseña
function validarContrasena(contrasena) {
    // Verificar si la contraseña tiene una longitud mínima de 6 caracteres y máxima de 12
    if (contrasena.length < 6 || contrasena.length > 12) {
        return false;
    }
    // Verificar si la contraseña contiene al menos un número
    if (!/\d/.test(contrasena)) {
        return false;
    }
    // Verificar si la contraseña contiene al menos una letra mayúscula
    if (!/[A-Z]/.test(contrasena)) {
        return false;
    }
    // Verificar si la contraseña contiene al menos un carácter especial
    if (!/[!#$%&/()=?¡¿@]/.test(contrasena)) {
        return false;
    }
    return true;
}
function validarPreguntaRespuesta(pregunta, respuesta) {
    // Verificar si la pregunta y la respuesta no están vacíos
    if (pregunta.trim() === '' || respuesta.trim() === '') {
        return false;
    }
    return true;
}

function imprimirUsuarioCargados(usuariosRegistrados) {
    for (let usuario of usuariosRegistrados) {
            console.log(usuario);
    }
}

function buscarUsuario(email, contrasena, respuesta, usuariosRegistrados){
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email && usuario.respuesta === respuesta) {
            usuario.contrasena = contrasena;
            // Guardar el array actualizado en el almacenamiento local
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
            return true; // Retorna true si encuentra y actualiza correctamente la contraseña
        }
    }
    return false; // Retorna false si no encuentra ningún usuario con el mismo correo electrónico y respuesta
}

function identificarTipoUsuario(email, contrasena, usuariosRegistrados){
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email && usuario.contrasena === contrasena) {
            return usuario.tipoDeUsuario; // Retorna el tipo de usuario (admin o user)
        }
    }
}

function obtenerUsuario(email, contrasena, usuariosRegistrados){
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email && usuario.contrasena === contrasena) {
            usuarioEncontrado=usuario;
            usuarioEncontrado.isLogueado=true;
            console.log(usuarioEncontrado);
            return usuarioEncontrado; // Retorna el usuario que se logueo
        }
    }
}