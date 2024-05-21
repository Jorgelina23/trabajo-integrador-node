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

let usuarioEncontrado=new Usuario();
let menuesRegistrados = [];

function handleFormSubmit(event) {
    event.preventDefault();

    let nombre = document.querySelector('input[name="nombre"]').value;
    let precio = document.querySelector('input[name="precio"]').value;
    let imagenMenu = document.querySelector('input[name="imagenMenu"]').files[0];
    let descripcion = document.querySelector('textarea[name="comentarios"]').value;

    if (!validarNombre(nombre)) {
        alert("Por favor, ingrese un nombre al menú.");
        return false;
    }
    if (!validarComentario(descripcion)) {
        alert("Por favor, ingrese la descripción del menú.");
        return false;
    }
    if (validarMenuUnico(nombre, menuesRegistrados)) {
        alert("El Menú ya está cargado");
    } else {
        let reader = new FileReader();
        reader.onload = function() {
            let imagenBase64 = reader.result;

            let nuevoMenu = new Menu(menuesRegistrados.length + 1, nombre, precio, imagenBase64, descripcion, true);
            menuesRegistrados.push(nuevoMenu);

            event.target.reset();
            alert("¡Registro exitoso!");
            window.location.href = "../pages/lista_menues.html";
            console.log("Menues registrados:", menuesRegistrados);
        };
        reader.readAsDataURL(imagenMenu);
    }

    return false;
}

window.addEventListener('beforeunload', function () {
    if(usuarioEncontrado.isLogueado && usuarioEncontrado.tipoDeUsuario==="admin"){
        localStorage.setItem('menuesRegistrados', JSON.stringify(menuesRegistrados));
    }
});

window.addEventListener('DOMContentLoaded', function () {
    const usuarioEncontradoString = localStorage.getItem('usuarioEncontrado');
    if (usuarioEncontradoString) {
        usuarioEncontrado = JSON.parse(usuarioEncontradoString);
    }
    if (!usuarioEncontrado || !usuarioEncontrado.isLogueado || usuarioEncontrado.tipoDeUsuario!=="admin") {
        sesionIniciada();
    }

    let menuesRegistradosString = localStorage.getItem('menuesRegistrados');
    if (menuesRegistradosString) {
        menuesRegistrados = JSON.parse(menuesRegistradosString);
    }
    mostrarMenues(menuesRegistrados);
});

function validarMenuUnico(nombre, menuesRegistrados) {
    for (let menu of menuesRegistrados) {
        if (menu.nombre === nombre) {
            return true;
        }
    }
    return false;
}

function validarNombre(nombre) {
    if (nombre.trim() === '') {
        return false;
    }
    return true;
}

function validarComentario(descripcion) {
    if (descripcion.trim() === '') {
        return false;
    }
    return true;
}

function validateCurrency() {
    var input = document.getElementById("currencyInput").value;
    var message = document.getElementById("currencyMessage");

    var currencyRegex = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/;

    if (currencyRegex.test(input) && parseFloat(input.replace(/[$,]/g, '')) > 0) {
        message.style.color = "green";
        message.textContent = "El formato de moneda es válido y positivo.";
    } else {
        message.style.color = "red";
        message.textContent = "El formato de moneda no es válido o no es positivo.";
    }
}

function limpiarMenues() {
    menuesRegistrados = [];
    localStorage.removeItem('menuesRegistrados');
    alert("¡Se han limpiado los menús registrados!");
}

function mostrarMenues(menuesRegistrados) {
    for (let menu of menuesRegistrados) {
        console.log(menu);
    }
}

function mostrarImagen(event) {
    let input = event.target;
    let reader = new FileReader();

    reader.onload = function () {
        let dataURL = reader.result;
        let output = document.querySelector('.imagenCargadaMenu');
        output.innerHTML = '<img src="' + dataURL + '" alt="Imagen del menú" style="max-width: 100%; max-height: 200px;">';
    };
    reader.readAsDataURL(input.files[0]);
}

document.querySelector('input[name="imagenMenu"]').addEventListener('change', mostrarImagen);

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

