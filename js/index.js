class Usuario {
    constructor(nombre, apellido, fechaNacimiento, email, contrasena, tipoDeUsuario,isLogueado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.contrasena = contrasena;
        this.tipoDeUsuario = tipoDeUsuario;
        this.isLogueado = isLogueado;
    }
}

// Variables globales para usuario y tipo de usuario
let usuarioEncontrado = null; //let usuarioEncontrado = new Usuario();
let tipoUsuario = "user"; // Por defecto, el tipo de usuario es "user"

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el usuario almacenado en el localStorage
    const usuarioEncontradoString = localStorage.getItem('usuarioEncontrado');
    if (usuarioEncontradoString) {
        usuarioEncontrado = JSON.parse(usuarioEncontradoString);
        tipoUsuario = usuarioEncontrado.tipoDeUsuario;
    }

    // Función para mostrar u ocultar elementos dependiendo del tipo de usuario y si está logueado
    function mostrarElementosPorTipoUsuario() {
        const loginLink = document.getElementById("loginLink");
        const registerLink = document.getElementById("registerLink");
        const adminDropdown = document.getElementById("adminDropdown");
        const reservaLink = document.getElementById("reservaLink");
        const closeLink = document.getElementById("closeLink");

        // Ocultar todos los elementos primero
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        adminDropdown.style.display = "none";
        reservaLink.style.display = "none";
        closeLink.style.display = "none";

        if (tipoUsuario === "admin") {
            adminDropdown.style.display = "block"; // Mostrar el menú de administrador
            closeLink.style.display = "block";
        } else {
            loginLink.style.display = "block"; // Mostrar el botón de iniciar sesión
            registerLink.style.display = "block"; // Mostrar el botón de registrarse
            if (usuarioEncontrado && usuarioEncontrado.isLogueado) {
                reservaLink.style.display = "block"; // Mostrar el enlace de reserva solo si está logueado
                closeLink.style.display = "block";
                loginLink.style.display = "none"; // Oculta el botón de iniciar sesión
                registerLink.style.display = "none"; // Oculta el botón de registrarse
            }
        }
    }

    // Llamar a la función al cargar la página
    mostrarElementosPorTipoUsuario();

    // Agregar un evento de clic al elemento closeLink
    const closeLink = document.getElementById("closeLink");
    closeLink.addEventListener("click", function(event) {
        // Prevenir el comportamiento predeterminado del enlace
        event.preventDefault();

        // Llamar a la función limpiarUsuario
        limpiarUsuario();
        window.location.href = "../index.html";
    });
});

function limpiarUsuario() {
    // Limpiar la variable de usuarioEncontrado
    usuarioEncontrado = null;

    // Limpiar el almacenamiento local
    localStorage.removeItem('usuarioEncontrado');

    // Mostrar mensaje de éxito o realizar otras acciones necesarias
    alert("¡Se cerro exitosamente la sesión!");
}