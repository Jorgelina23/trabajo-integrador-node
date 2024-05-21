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
// Array para almacenar usuarios registrados
let usuariosRegistrados = [];
let usuarioEncontrado=new Usuario();

// Recuperar los datos del almacenamiento local al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    const usuarioEncontradoString = localStorage.getItem('usuarioEncontrado');
    if (usuarioEncontradoString) {
        usuarioEncontrado = JSON.parse(usuarioEncontradoString);
        tipoUsuario = usuarioEncontrado.tipoDeUsuario;
    }
    if (!usuarioEncontrado || !usuarioEncontrado.isLogueado || usuarioEncontrado.tipoDeUsuario!=="admin") {
        sesionIniciada();
    }
    let usuariosRegistradosString = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosString) {
        usuariosRegistrados = JSON.parse(usuariosRegistradosString);
    }
    cargarTablaUsuarios();
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
            //loginLink.style.display = "block"; // Mostrar el botón de iniciar sesión
            //registerLink.style.display = "block"; // Mostrar el botón de registrarse
            if (usuarioEncontrado && usuarioEncontrado.isLogueado) {
                reservaLink.style.display = "block"; // Mostrar el enlace de reserva solo si está logueado
                closeLink.style.display = "block";
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

// Función para guardar los datos en el almacenamiento local antes de salir de la página
window.addEventListener('beforeunload', function() {
    if(usuarioEncontrado.isLogueado && usuarioEncontrado.tipoDeUsuario==="admin"){
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
    }
});

function cargarTablaUsuarios() {
    // Obtener referencia a la tabla y el cuerpo de la tabla
    let tablaUsuarios = document.getElementById('tablaUsuarios');
    let tbody = tablaUsuarios.querySelector('tbody');

    // Limpiar contenido existente en el cuerpo de la tabla
    tbody.innerHTML = '';

    // Verificar si hay datos en usuariosRegistrados
    console.log('Datos de usuarios registrados:', usuariosRegistrados);

    // Iterar sobre el array de usuarios registrados
    usuariosRegistrados.forEach(usuario => {
        // Crear nueva fila
        let fila = document.createElement('tr');

        // Crear y agregar celdas para cada atributo del usuario
        for (let key in usuario) {
            // Excluir el campo booleano
            if (typeof usuario[key] !== 'boolean') {
                let cell = document.createElement('td');
                cell.textContent = usuario[key];
                fila.appendChild(cell);
            }
        }

        // Crear celda para los botones de acción
        let accionesCell = document.createElement('td');

        // Crear botón de "Editar" y asignarle un listener
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar ';
        // Agregar el icono de editar al botón
        let iconoEditar = document.createElement('i');
        iconoEditar.classList.add('fas', 'fa-edit'); // Clases de Font Awesome para el icono de editar
        editarBtn.appendChild(iconoEditar);
        editarBtn.addEventListener('click', function() {
            let usuarioEditar = editarUsuario(usuario.email)
            console.log('Editar usuario:', usuario);
            window.location.href = "./editar_usuario.html";
        });
        accionesCell.appendChild(editarBtn);
        editarBtn.classList.add('btn-editar-usuario');

        // Crear botón de "Eliminar" y asignarle un listener
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar ';
        // Agregar el icono de borrar al botón
        let iconoBorrar = document.createElement('i');
        iconoBorrar.classList.add('fas', 'fa-trash-alt'); // Clases de Font Awesome para el icono de borrar
        eliminarBtn.appendChild(iconoBorrar);
        eliminarBtn.addEventListener('click', function() {
            eliminarUsuario(usuario.email);
            console.log('Eliminar usuario:', usuario);
        });
        accionesCell.appendChild(eliminarBtn);

        // Asignar la clase al botón "Eliminar"
        eliminarBtn.classList.add('btn-eliminar-usuario');
        // Agregar celda de acciones a la fila
        fila.appendChild(accionesCell);

        // Agregar fila al cuerpo de la tabla
        tbody.appendChild(fila);
    });

    console.log('Tabla de usuarios cargada');
}

function agregarUsuario(){
    window.location.href ="./nuevo_usuario.html"
}

//
// Función para editar un usuario del array usuariosRegistrados
function editarUsuario(email) {
    let usuario = usuariosRegistrados.find(usuario => usuario.email === email);
    if (usuario) {
        localStorage.setItem('usuarioAEditar', JSON.stringify(usuario));
        window.location.href = "./editar_usuario.html";
    } else {
        console.log("Usuario no encontrado");
    }
}

// Función para eliminar un usuario del array usuariosRegistrados
function eliminarUsuario(email) {
    // Obtener el usuario a eliminar
    const usuarioAEliminar = usuariosRegistrados.find(usuario => usuario.email === email);

    // Construir el mensaje de confirmación con la información del usuario
    const mensajeConfirmacion = `¿Está seguro de que desea eliminar al siguiente usuario?\n\n` +
        `Nombre: ${usuarioAEliminar.nombre}\n` +
        `Apellido: ${usuarioAEliminar.apellido}\n` +
        `Email: ${usuarioAEliminar.email}\n` +
        `Tipo de usuario: ${usuarioAEliminar.tipoDeUsuario}\n`;

    // Mostrar ventana de confirmación
    const confirmacion = confirm(mensajeConfirmacion);

    // Si el usuario hace clic en "Aceptar", eliminar el usuario
    if (confirmacion) {
        // Filtrar el array para eliminar el usuario con el email proporcionado
        usuariosRegistrados = usuariosRegistrados.filter(usuario => usuario.email !== email);

        // Volver a cargar la tabla de usuarios para reflejar los cambios
        cargarTablaUsuarios();

        console.log('Usuario eliminado:', email);
    } else {
        console.log('Operación cancelada');
    }
}
function sesionIniciada() {
    cambiarFondo
    alert("No, acceso sin autorización. Se redireccionará al Inicio.")
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

function limpiarUsuario() {
    // Limpiar la variable de usuarioEncontrado
    usuarioEncontrado = null;

    // Limpiar el almacenamiento local
    localStorage.removeItem('usuarioEncontrado');
    // Mostrar mensaje de éxito o realizar otras acciones necesarias
    alert("¡Se cerro exitosamente la sesión!");
}