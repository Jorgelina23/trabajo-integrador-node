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

    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return false; // Retorna false para evitar el envío del formulario
    }
    let nuevoUsuario;
    if(usuariosRegistrados.length===0){
        nuevoUsuario= new Usuario("admin", "SuperAdmin", "29/09/1977","admin@lodetito.com.ar","admin123","admin");
        usuariosRegistrados.push(nuevoUsuario);
    }
    // Crear una nueva instancia de Usuario con los datos del formulario
    nuevoUsuario = new Usuario(nombre, apellido, fechaNacimiento, email, contrasena, "user");

    // Agregar el nuevo usuario al array de usuarios registrados
    usuariosRegistrados.push(nuevoUsuario);

    // Restablecer el formulario
    event.target.reset();

    // Mostrar mensaje de éxito o realizar otras acciones necesarias
    alert("¡Registro exitoso!");

    // Puedes imprimir los usuarios registrados en la consola para verificar
    console.log("Usuarios registrados:", usuariosRegistrados);

    return false; // Retorna false para evitar el envío del formulario
};

// Función para guardar los datos en el almacenamiento local antes de salir de la página
window.addEventListener('beforeunload', function() {
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
});

// Recuperar los datos del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    let usuariosRegistradosString = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosString) {
        usuariosRegistrados = JSON.parse(usuariosRegistradosString);
    }
});

//var  usuario1 = new Usuario("Juan", "Perez", "25/07/1996", "juan@gmail.com", "1234");
//console.log(usuario1.mostrarInformacion());
// Juan Perez es de 25