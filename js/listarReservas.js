class ReservaRegistrada {
    constructor(id, fullName, mail, telefono, fecha, horario, food, mesa, persona){
        this.id = id,
        this.fullName = fullName,
        this.email = mail,
        this.telefono = telefono,
        this.fechaHorario = `${fecha} a las ${horario}hs `,
        this.food = food,
        this.mesa = mesa,
        this.persona = persona
    }
};



class UsuarioLogueado {
    constructor(tipoDeUsuario,isLogueado){
        this.tipoDeUsuario = tipoDeUsuario,
        this.isLogueado = isLogueado
    }  
}

let menuesRegistrados = JSON.parse(localStorage.getItem('menuesRegistrados'))

let usuario = new UsuarioLogueado()
let reservas = []

window.addEventListener('DOMContentLoaded', ()=> {
    console.log(menuesRegistrados)
    // Limpiar todas las reservas de la base de datos
    document.getElementById('reservas-clear').addEventListener('click', ()=> {
        let confirmado = confirm('Seguro quieres eliminar TODAS las reservas?')
        if(confirmado){
        localStorage.removeItem('reservas')
        reservas = [];
        localStorage.setItem('reservas', reservas)
        window.location.href = './lista_reservas.html'
        } else {
            return
        }
    })


    const usuarioLogueadoString = localStorage.getItem('usuarioEncontrado');
    if (usuarioLogueadoString) {
        usuario = JSON.parse(usuarioLogueadoString);
        tipoUsuario = usuario.tipoDeUsuario;
    }
    const reservasString = localStorage.getItem('reservas')
    
    if(reservasString){
        const reservasRegistradas = JSON.parse(reservasString)
        reservasRegistradas.map(reserva => {

            let reservacion = new ReservaRegistrada(reservasRegistradas.indexOf(reserva), reserva.fullName, reserva.email, reserva.phone, reserva.date, reserva.horario , reserva.food, reserva.table, reserva.person )
            reservas.push(reservacion)
        })
        
    }

    mostrarElementosPorTipoUsuario(usuario)
    cargarTablaReservas()
    
    
})

function mostrarElementosPorTipoUsuario(usuario) {
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

    closeLink.addEventListener("click", function(event) {
        event.preventDefault();
        limpiarUsuario();
        window.location.href = "../index.html";
    });
    
    
}

function cargarTablaReservas() {
    let tablaReservas = document.getElementById('tablaReservas');
    let tbody = tablaReservas.querySelector('tbody');
    tbody.innerHTML = '';

    reservas.forEach(reserva => {
        console.log(reserva)
        let fila = document.createElement('tr');

        Object.keys(reserva).forEach(key => {
            let cell = document.createElement('td');
            cell.style.textAlign = 'center'

            
            if(key === 'food'){
                let elementoImg = document.createElement('div')
                elementoImg.style.textAlign = 'center'
                let img = document.createElement('img');
                let precio = document.createElement('p');
                
                menuesRegistrados.forEach(menu => {
                    if(reserva.food === menu.nombre){
                        console.log(reserva.food, menu.nombre)
                        img.src = menu.imagen
                        precio.textContent = menu.precio
                    } else {
                        return
                    }
                })
                
                img.alt = 'Imagen de la comida';
                img.style.maxWidth = '100px'
                img.style.aspectRatio = '16/9';
                elementoImg.appendChild(img);
                elementoImg.appendChild(precio);
                cell.appendChild(elementoImg)
            } else {
                cell.textContent = reserva[key];
            }
            cell.style.fontSize = '14px';
            fila.appendChild(cell)
        })

        tbody.appendChild(fila);
    })
}

function limpiarUsuario() {
    localStorage.removeItem('usuarioEncontrado');
}


