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
    let email = document.querySelector('input[name="email"]').value.trim(); // Eliminar espacios en blanco
    let contrasena = document.querySelector('input[name="contrasena"]').value.trim(); // Eliminar espacios en blanco

    // Validar los campos del formulario
    if(buscarUsuario(email, contrasena, usuariosRegistrados)) {
        // Restablecer el formulario
        event.target.reset();
    
        // Mostrar mensaje de éxito o realizar otras acciones necesarias
        alert("¡Logueo exitoso!");
        window.location.href = "../pages/Reservas.html"
        console.log(obtenerDatosUsuario(email,contrasena,usuariosRegistrados));
        console.log("Ingreso como: "+identificarTipoUsuario(email, contrasena, usuariosRegistrados));
        obtenerUsuario(email, contrasena, usuariosRegistrados);
        window.location.href = "../index.html";
    } else {
        // Mostrar mensaje de éxito o realizar otras acciones necesarias
        alert("¡Fracaso en el logueo!. Verificar nuevamente...");
    } 
    
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
    if(usuarioEncontrado.isLogueado){
        localStorage.setItem('usuarioEncontrado', JSON.stringify(usuarioEncontrado));
    }
});

function imprimirUsuarioCargados(usuariosRegistrados) {
    for (let usuario of usuariosRegistrados) {
            console.log(usuario);
    }
}

function buscarUsuario(email, contrasena, usuariosRegistrados){
    for (let usuario of usuariosRegistrados) {
            if (usuario.email === email && usuario.contrasena === contrasena) {
                return true; // Retorna true si encuentra un usuario con el mismo correo electrónico y contraseña
            }
    }
    return false; // Retorna false si no encuentra ningún usuario con el mismo correo electrónico y contraseña
}

function identificarTipoUsuario(email, contrasena, usuariosRegistrados){
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email && usuario.contrasena === contrasena) {
            return usuario.tipoDeUsuario; // Retorna el tipo de usuario (admin o user)
        }
    }
}

function obtenerDatosUsuario(email, contrasena, usuariosRegistrados){
    for (let usuario of usuariosRegistrados) {
        if (usuario.email === email && usuario.contrasena === contrasena) {
            return "Bienvenido "+usuario.nombre +" "+usuario.apellido; // Retorna el Nombre y Apellido del usuario
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