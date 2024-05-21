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

class Menu {
    constructor(id, nombre, precio, imagen, descripcion, isDisponible) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.isDisponible = isDisponible;
    }
}

let usuarioEncontrado = new Usuario();
let menuesRegistrados = [];

window.addEventListener('DOMContentLoaded', function() {
    const usuarioEncontradoString = localStorage.getItem('usuarioEncontrado');
    if (usuarioEncontradoString) {
        usuarioEncontrado = JSON.parse(usuarioEncontradoString);
        tipoUsuario = usuarioEncontrado.tipoDeUsuario;
    }
    if (!usuarioEncontrado || !usuarioEncontrado.isLogueado || usuarioEncontrado.tipoDeUsuario !== "admin") {
        sesionIniciada();
    }
    let menuesRegistradosString = localStorage.getItem('menuesRegistrados');
    if (menuesRegistradosString) {
        menuesRegistrados = JSON.parse(menuesRegistradosString);
    }
    cargarTablaMenues();
    mostrarElementosPorTipoUsuario();

    function mostrarElementosPorTipoUsuario() {
        const loginLink = document.getElementById("loginLink");
        const registerLink = document.getElementById("registerLink");
        const adminDropdown = document.getElementById("adminDropdown");
        const reservaLink = document.getElementById("reservaLink");
        const closeLink = document.getElementById("closeLink");

        loginLink.style.display = "none";
        registerLink.style.display = "none";
        adminDropdown.style.display = "none";
        reservaLink.style.display = "none";
        closeLink.style.display = "none";

        if (tipoUsuario === "admin") {
            adminDropdown.style.display = "block";
            closeLink.style.display = "block";
        } else {
            if (usuarioEncontrado && usuarioEncontrado.isLogueado) {
                reservaLink.style.display = "block";
                closeLink.style.display = "block";
            }
        }
    }
    const closeLink = document.getElementById("closeLink");
    closeLink.addEventListener("click", function(event) {
        event.preventDefault();
        limpiarUsuario();
        window.location.href = "../index.html";
    });
});

window.addEventListener('beforeunload', function() {
    if (usuarioEncontrado.isLogueado && usuarioEncontrado.tipoDeUsuario === "admin") {
        localStorage.setItem('menuesRegistrados', JSON.stringify(menuesRegistrados));
    }
});

function cargarTablaMenues() {
    let tablaMenues = document.getElementById('tablaMenues');
    let tbody = tablaMenues.querySelector('tbody');
    tbody.innerHTML = '';

    menuesRegistrados.forEach(menu => {
        let fila = document.createElement('tr');

        Object.keys(menu).forEach(key => {
            if (key !== 'isDisponible') {
                let cell = document.createElement('td');
                if (key === 'imagen') {
                    let img = document.createElement('img');
                    img.src = menu.imagen;
                    img.alt = 'Imagen del menú';
                    img.style.maxWidth = '100px';
                    cell.appendChild(img);
                } else {
                    cell.textContent = menu[key];
                }
                fila.appendChild(cell);
            }
        });

        let accionesCell = document.createElement('td');

        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar ';
        let iconoEditar = document.createElement('i');
        iconoEditar.classList.add('fas', 'fa-edit');
        editarBtn.appendChild(iconoEditar);
        editarBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'mr-2');
        editarBtn.addEventListener('click', function () {
            editarMenu(menu.id);
        });
        accionesCell.appendChild(editarBtn);

        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar ';
        let iconoEliminar = document.createElement('i');
        iconoEliminar.classList.add('fas', 'fa-trash-alt');
        eliminarBtn.appendChild(iconoEliminar);
        eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        eliminarBtn.addEventListener('click', function () {
            eliminarMenu(menu.id);
        });
        accionesCell.appendChild(eliminarBtn);

        fila.appendChild(accionesCell);
        tbody.appendChild(fila);
    });
}

function limpiarUsuario() {
    localStorage.removeItem('usuarioEncontrado');
}

function agregarMenu() {
    window.location.href = "./nuevo_menu.html";
}

function editarMenu(menuId) {
    let menu = menuesRegistrados.find(menu => menu.id === menuId);
    if (menu) {
        let nuevoNombre = prompt("Ingrese el nuevo nombre del menú:", menu.nombre);
        if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
            menu.nombre = nuevoNombre;
        }
        let nuevoPrecio = prompt("Ingrese el nuevo precio del menú:", menu.precio);
        if (nuevoPrecio !== null && nuevoPrecio.trim() !== '') {
            menu.precio = nuevoPrecio;
        }
        let nuevaDescripcion = prompt("Ingrese la nueva descripción del menú:", menu.descripcion);
        if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== '') {
            menu.descripcion = nuevaDescripcion;
        }
        localStorage.setItem('menuesRegistrados', JSON.stringify(menuesRegistrados));
        cargarTablaMenues();
        alert("¡Menú actualizado exitosamente!");
    }
}

function eliminarMenu(menuId) {
    if (confirm("¿Está seguro de que desea eliminar este menú?")) {
        menuesRegistrados = menuesRegistrados.filter(menu => menu.id !== menuId);
        localStorage.setItem('menuesRegistrados', JSON.stringify(menuesRegistrados));
        cargarTablaMenues();
        alert("¡Menú eliminado exitosamente!");
    }
}