class Usuario {
    constructor(nombre, apellido, fechaNacimiento, email, contrasena, pregunta, respuesta, tipoDeUsuario, isLogueado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.contrasena = contrasena;
        this.pregunta = pregunta;
        this.respuesta = respuesta;
        this.tipoDeUsuario = tipoDeUsuario;
        this.isLogueado = isLogueado;
    }
}

let usuariosRegistrados = [];
let usuarioEncontrado = new Usuario();
let usuarioAEditar = null;

// Función para manejar el evento de envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();

    let nombre = document.querySelector('input[name="nombre"]').value;
    let apellido = document.querySelector('input[name="apellido"]').value;
    let fechaNacimiento = document.querySelector('input[name="fecha_nacimiento"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let contrasena = document.querySelector('input[name="contrasena"]').value;
    let confirmarContrasena = document.querySelector('input[name="confirmar_contrasena"]').value;
    let pregunta = document.querySelector('select[name="pregunta"]').value;
    let respuesta = document.querySelector('input[name="respuesta"]').value;
    let tipoUsuario = document.querySelector('select[name="userType"]').value;

    if (!validarNombreApellido(nombre, apellido)) {
        alert("Por favor, ingrese un nombre y un apellido válidos.");
        return false;
    }
    if (!validarFecha(fechaNacimiento)) {
        alert("Por favor, ingrese una fecha de nacimiento válida en formato dd/mm/yyyy.");
        return false;
    }
    if (!validarCorreo(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    if (!validarContrasena(contrasena)) {
        alert("La contraseña debe tener entre 6 y 12 caracteres, al menos un número, una letra mayúscula y un carácter especial.");
        return false;
    }
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return false;
    }
    if (!validarPreguntaRespuesta(pregunta, respuesta)) {
        alert("Por favor, seleccione una pregunta y una respuesta válidas.");
        return false;
    }
    if (!validarTipoUsuario(tipoUsuario)) {
        alert("Por favor, seleccione el tipo de Usuario.");
        return false;
    }

    // Encontrar el índice del usuario en el array de usuariosRegistrados
    const index = usuariosRegistrados.findIndex(usuario => usuario.email === email);

    // Si no se encuentra el usuario, salir de la función
    if (index === -1) {
        console.log("Usuario no encontrado en el array de usuariosRegistrados");
        return false;
    }

    // Actualizar los datos del usuario
    usuariosRegistrados[index] = {
        nombre,
        apellido,
        fechaNacimiento,
        email,
        contrasena,
        pregunta,
        respuesta,
        tipoDeUsuario: tipoUsuario
    };

    // Guardar los cambios en el almacenamiento local
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

    // Mostrar mensaje de éxito
    alert("¡Modificación exitosa!");

    // Redireccionar a la lista de usuarios
    window.location.href = "../pages/lista_usuarios.html";

    return false;
}

// Función para cargar los datos en el formulario
function cargarDatosEnFormulario(usuario) {
    if (usuario) {
        document.querySelector('input[name="nombre"]').value = usuario.nombre;
        document.querySelector('input[name="apellido"]').value = usuario.apellido;
        document.querySelector('input[name="fecha_nacimiento"]').value = usuario.fechaNacimiento;
        document.querySelector('input[name="email"]').value = usuario.email;
        document.querySelector('input[name="contrasena"]').value = usuario.contrasena;
        document.querySelector('input[name="confirmar_contrasena"]').value = usuario.contrasena;
        document.querySelector('select[name="pregunta"]').value = usuario.pregunta;
        document.querySelector('input[name="respuesta"]').value = usuario.respuesta;
        document.querySelector('select[name="userType"]').value = usuario.tipoDeUsuario;
    } else {
        console.log("Usuario a editar no encontrado");
    }
}

// Función para limpiar los elementos del formulario
function limpiarDatosEnFormulario() {
    /* document.querySelector('input[name="nombre"]').value = "";
    document.querySelector('input[name="apellido"]').value = "";
    document.querySelector('input[name="fecha_nacimiento"]').value = "";
    document.querySelector('input[name="email"]').value = "";
    document.querySelector('input[name="contrasena"]').value = "";
    document.querySelector('input[name="confirmar_contrasena"]').value = "";
    document.querySelector('select[name="pregunta"]').value = "";
    document.querySelector('input[name="respuesta"]').value = "";
    document.querySelector('select[name="userType"]').value = ""; */
    const form = document.querySelector('form');

    // Limpiar todos los inputs de tipo texto, email, fecha, y contraseña
    form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"], input[type="password"]').forEach(input => {
        input.value = '';
    });

    // Limpiar todos los selects
    form.querySelectorAll('select').forEach(select => {
        select.value = '';
    });
    location.reload();
}

// Función para editar un usuario por email
function editarUsuario(email) {
    usuarioAEditar = usuariosRegistrados.find(usuario => usuario.email === email);
    if (usuarioAEditar) {
        localStorage.setItem('usuarioAEditar', JSON.stringify(usuarioAEditar));
        cargarDatosEnFormulario(usuarioAEditar);
    } else {
        console.log("Usuario no encontrado");
    }
}

// Recuperar datos del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    const usuarioEncontradoString = localStorage.getItem('usuarioEncontrado');
    if (usuarioEncontradoString) {
        usuarioEncontrado = JSON.parse(usuarioEncontradoString);
        tipoUsuario = usuarioEncontrado.tipoDeUsuario;
    }

    if (!usuarioEncontrado || !usuarioEncontrado.isLogueado || usuarioEncontrado.tipoDeUsuario !== "admin") {
        sesionIniciada();
    }

    let usuariosRegistradosString = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosString) {
        usuariosRegistrados = JSON.parse(usuariosRegistradosString);
    }

    let usuarioAEditarString = localStorage.getItem('usuarioAEditar');
    if (usuarioAEditarString) {
        usuarioAEditar = JSON.parse(usuarioAEditarString);
        cargarDatosEnFormulario(usuarioAEditar);
    }
    
    // Añadir el evento al formulario*/
    document.querySelector('form').addEventListener('submit', handleFormSubmit);
});

// Array para almacenar usuarios registrados
window.addEventListener('beforeunload', function() {
    if (usuarioEncontrado.isLogueado && usuarioEncontrado.tipoDeUsuario==="admin") {
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
    }
});

// Función para validar el nombre y apellido
function validarNombreApellido(nombre, apellido) {
    return nombre.trim() !== '' && apellido.trim() !== '';
}

// Función para validar el formato de fecha (dd/mm/yyyy)
function validarFecha(fecha) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(fecha);
}

// Función para validar el formato de correo electrónico
function validarCorreo(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar la contraseña
function validarContrasena(contrasena) {
    if (contrasena.length < 6 || contrasena.length > 12) {
        return false;
    }
    if (!/\d/.test(contrasena)) {
        return false;
    }
    if (!/[A-Z]/.test(contrasena)) {
        return false;
    }
    if (!/[!#$%&/()=?¡¿@]/.test(contrasena)) {
        return false;
    }
    return true;
}

// Función para validar pregunta y respuesta
function validarPreguntaRespuesta(pregunta, respuesta) {
    return pregunta.trim() !== '' && respuesta.trim() !== '';
}

// Función para validar tipo de usuario
function validarTipoUsuario(tipoUsuario) {
    return tipoUsuario.trim() !== '';
}

// Función para validar que el usuario sea único
function validarUsuarioUnico(email, usuariosRegistrados) {
    return usuariosRegistrados.some(usuario => usuario.email === email);
}

function sesionIniciada() {
    cambiarFondo();
    alert("No acceso sin autorización. Se redireccionará al Inicio.");
    limpiarDatosEnFormulario();
    //event.target.reset();
    window.location.href = "../index.html";
}

function cambiarFondo(){
    var elemento = document.getElementById("miDiv");
    
    // Cambia el fondo usando CSS a través de JavaScript
    elemento.style.backgroundImage = "url('../assets/imagenes/Noaccess01.jpeg')";
    elemento.style.backgroundSize = "cover"; // Esto asegura que la imagen cubra todo el div
    elemento.style.backgroundPosition = "center"; // Centra la imagen en el div
    elemento.style.height = "100vh"; // Ajusta la altura del div si es necesario
}