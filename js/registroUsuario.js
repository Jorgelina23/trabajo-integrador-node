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

    getNombre() { return this.nombre; }
    setNombre(nuevoNombre) { this.nombre = nuevoNombre; }

    getApellido() { return this.apellido; }
    setApellido(nuevoApellido) { this.apellido = nuevoApellido; }

    getFechaNacimiento() { return this.fechaNacimiento; }
    setFechaNacimiento(nuevaFecha) { this.fechaNacimiento = nuevaFecha; }

    getEmail() { return this.email; }

    getContrasena() { return this.contrasena; }
    setContrasena(nuevaContrasena) { this.contrasena = nuevaContrasena; }

    getTipoDeUsuario() { return this.tipoDeUsuario; }
    setTipoDeUsuario(tipoDeUsuario) {
        // Verificar que el tipoDeUsuario sea "admin" o "user"
        if (tipoDeUsuario === "admin" || tipoDeUsuario === "user") {
            this.tipoDeUsuario = tipoDeUsuario;
        } else {
            console.error("Error: tipoDeUsuario debe ser 'admin' o 'user'.");
        }
    }

    validarContrasena(password) { return this.contrasena === password; }

    mostrarInformacion() {
        let informacionDelUsuario = `Nombre: ${this.getNombre()} ${this.getApellido()}\n`;
        informacionDelUsuario += `Fecha de Nacimiento: ${this.getFechaNacimiento()}\n`;
        informacionDelUsuario += `Correo Electrónico: ${this.getEmail()}`;
        return informacionDelUsuario;
    }
}

// Array para almacenar usuarios registrados
var usuariosRegistrados = [];

// Función para manejar el evento de envío del formulario
function handleFormSubmit(event) {
    event.preventDefault(); // Evita que el formulario se envíe de manera predeterminada
    
    // Obtener referencias a los campos de entrada del formulario
    let nombre = document.querySelector('input[name="nombre"]').value;
    let apellido = document.querySelector('input[name="apellido"]').value;
    let fechaNacimiento = document.querySelector('input[name="fecha_nacimiento"]').value;
    let email = document.querySelector('input[name="email"]').value;
    let contrasena = document.querySelector('input[name="contrasena"]').value;
    let confirmarContrasena = document.querySelector('input[name="confirmar_contrasena"]').value;
    let pregunta=document.querySelector('select[name="pregunta"]').value;
    let respuesta=document.querySelector('input[name="respuesta"]').value;

    // Validar los campos del formulario
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
    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return false; // Retorna false para evitar el envío del formulario
    }
    if (!validarPreguntaRespuesta(pregunta, respuesta)) {
        alert("Por favor, seleccione una pregunta y una respuesta válidas.");
        return false;
    }
    if(validarUsuarioUnico(email,usuariosRegistrados)){
        alert("El correo electrónico ya está en uso");
    }else{
        let nuevoUsuario;
        if(usuariosRegistrados.length === 0){
            nuevoUsuario = new Usuario("admin", "SuperAdmin", "29/09/1977", "admin@lodetito.com.ar", "admin123","","", "admin",false);
        } else {
            nuevoUsuario = new Usuario(nombre, apellido, fechaNacimiento, email, contrasena, pregunta, respuesta,"user",false);
        }
        
        // Agregar el nuevo usuario al array de usuarios registrados
        usuariosRegistrados.push(nuevoUsuario);
        
        // Restablecer el formulario
        event.target.reset();
    
        // Mostrar mensaje de éxito o realizar otras acciones necesarias
        alert("¡Registro exitoso!");
        
        // Redirigir a la página index.html después del registro exitoso
        window.location.href = "../pages/login.html"; 
        
        // Puedes imprimir los usuarios registrados en la consola para verificar
        console.log("Usuarios registrados:", usuariosRegistrados);
    }
    
    return false; // Retorna false para evitar el envío del formulario
}

// Función para guardar los datos en el almacenamiento local antes de salir de la página
window.addEventListener('beforeunload', function() {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
    //limpiarUsuarios();
});

// Recuperar los datos del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    let usuariosRegistradosString = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosString) {
        usuariosRegistrados = JSON.parse(usuariosRegistradosString);
    }
});

function validarUsuarioUnico(email, usuariosRegistrados) {
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email) {
            return true; // Retorna true si encuentra un usuario con el mismo correo electrónico
        }
    }
    return false; // Retorna false si no encuentra ningún usuario con el mismo correo electrónico
}

// Función para validar el nombre y apellido
function validarNombreApellido(nombre, apellido) {
    // Verificar si el nombre y el apellido no están vacíos
    if (nombre.trim() === '' || apellido.trim() === '') {
        return false;
    }
    return true;
}

// Función para validar el formato de fecha (dd/mm/yyyy)
function validarFecha(fecha) {
    // Expresión regular para verificar el formato de fecha (dd/mm/yyyy)
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(fecha);
}

// Función para validar el formato de correo electrónico
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

function limpiarUsuarios() {
    // Limpiar el array de usuarios registrados
    usuariosRegistrados = [];
    
    // Limpiar el almacenamiento local
    localStorage.removeItem('usuariosRegistrados');

    // Mostrar mensaje de éxito o realizar otras acciones necesarias
    alert("¡Se han limpiado los usuarios registrados!");
}