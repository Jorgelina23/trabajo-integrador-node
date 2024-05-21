let formData = document.getElementById('form');
let tables = document.querySelectorAll('.table')
document.querySelector('.dateSelector').addEventListener('change', ()=> {
    console.log('algo')
    disponibilidadMesas()
})

console.log(tables)

class Reserva {
    constructor(fullName, email, phone, table, food, date, person){
        this.fullName = fullName,
        this.email = email,
        this.phone = phone,
        this.table = table,
        this.food = food,
        this.date = date,
        this.person = person
    }
}

let mesasDisponibles = [...tables]

function obtenerValorSeleccionado(elements, msj) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
    return alert(msj); // Si ningún elemento está seleccionado
}

function disponibilidadMesas(){
    
    for(let i = 0; i<mesasDisponibles.length ; i++){
        let random = Math.trunc(Math.random()*10)
        random > 2 ? mesasDisponibles[i] = true :  mesasDisponibles[i] = false
    }

    for(let i = 0; i < tables.length; i++){
        if(mesasDisponibles[i] === false ){
            tables[i].classList.add('isReserved') 
            tables[i].innerHTML = `Mesa ${i + 1} <br/> Reservado, lo siento`
        }else {
            tables[i].classList.remove('isReserved')
            tables[i].innerHTML = `Mesa ${i + 1} <br/> Disponible`
        } 
    }
}

function limpiarCampos(){
    const elementos = formData.elements;
    for (let i = 0; i < elementos.length; i++) {
        const elemento = elementos[i];
        if (elemento.type === 'text' || elemento.type === 'textarea') {
            elemento.value = '';
        } else if (elemento.type === 'checkbox' || elemento.type === 'radio') {
            elemento.checked = false;
        } else if (elemento.tagName.toLowerCase() === 'select') {
            elemento.selectedIndex = 0;
        }
    }
}


window.addEventListener('DOMContentLoaded', ()=>{
    let usuarioEncontrado = JSON.parse(localStorage.getItem('usuarioEncontrado'))

    console.log()
    
    document.getElementById('name').value = usuarioEncontrado.nombre
    document.getElementById('email').value = usuarioEncontrado.email;

    disponibilidadMesas()
})


const guardarReserva = reserva => {
    // Obtener la lista de reservas del localStorage
    let listaReservasJSON = localStorage.getItem('reservas');
    let listaReservas = [];
    // Si hay una lista de reservas en el localStorage, convertirla a un arreglo JavaScript
    if (listaReservasJSON) {
        listaReservas = JSON.parse(listaReservasJSON);
    }

    // Agregar la nueva reserva a la lista

    if(listaReservas.some(elemento => elemento.email == reserva.email)){
            console.log(listaReservas)
            return alert('Este mail ya tiene una reserva')
        }
    if(listaReservas.some(elemento =>( elemento.date == reserva.date &&  elemento.table == reserva.table))){
            return alert('Mesa no disponible en esa fecha')
    }
    let confirmado = confirm(`Datos de la reserva, deseas confirmar?
        Nombre: ${reserva.fullName}
        Email: ${reserva.email}
        Comida: ${reserva.food}
        Fecha: ${reserva.date}
        Quien asiste: ${reserva.person}
        Mesa: ${parseInt(reserva.table) + 1}`)
    if(confirmado) {
        alert('Reserva realizada correctamente')
        limpiarCampos()
    }
        
    // Guardar la lista de reservas actualizada en el localStorage
    localStorage.setItem('reservas', JSON.stringify(listaReservas));
}

formData.addEventListener('submit', (e) => {
    
    let fullName = document.getElementById('name').value
    let mail = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let table = document.getElementById('tableSelector').value
    let foodChoice = obtenerValorSeleccionado(document.getElementsByName('foodSelector'), 'No se eligió una comida');
    let horario = document.getElementById('horarioReserva').value
    let fecha = document.getElementById('fechaReserva').value
    let personChoice = obtenerValorSeleccionado(document.getElementsByName('personChoice'), 'No se eligió quién asiste a la reserva');
    console.log(fecha, horario)
     // Verificar si algún campo está vacío
    if (!fullName || !mail || !phone || !foodChoice || !fecha || !personChoice || !horario || !table) {
        alert('Por favor complete todos los campos del formulario.');
        return; // Salir de la función si algún campo está vacío
    }

    // Verificar si la mesa seleccionada está disponible
    if (!mesasDisponibles[table]) {
        alert('Lo sentimos, la mesa seleccionada no está disponible.');
        return; // Salir de la función si la mesa no está disponible
    }

    

    let newReserva = new Reserva(fullName, mail, phone, table, foodChoice, fecha, personChoice, horario);

    guardarReserva(newReserva);
});

