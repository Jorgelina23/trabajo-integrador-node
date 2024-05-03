class Usuario {
    constructor(nombre, apellido, fechaNacimiento, email, contrasena, tipoDeUsuario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.email = email;
        this.contrasena = contrasena;
        this.tipoDeUsuario = tipoDeUsuario;
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

let usuariosRegistrados = []; // Definir usuariosRegistrados fuera de la función handleFormSubmit
let usuario=new Usuario();
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
        console.log(obtenerDatosUsuario(email,contrasena,usuariosRegistrados));
        console.log("Ingreso como: "+identificarTipoUsuario(email, contrasena, usuariosRegistrados));
        if(identificarTipoUsuario(email,contrasena,usuariosRegistrados)==="admin"){
            //window.location.href = "../index.html";//index dashboard Admin
        }else{
            //window.location.href = "../index.html";//index user
        }
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