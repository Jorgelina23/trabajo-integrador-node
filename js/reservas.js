let formData = document.getElementById('form');
let mesasDisponibles = {
    "Mesa1": true,
    "Mesa2": true,
    "Mesa3": false,
    "Mesa4": false,
    "Mesa5": true,
    "Mesa6": false
}
let reservas = []

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

function obtenerValorSeleccionado(elements, msj) {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return elements[i].value;
        }
    }
    return alert(msj); // Si ningún elemento está seleccionado
}

formData.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value
    let mail = document.getElementById('email').value
    let phone = document.getElementById('phone').value
    let table = document.getElementById('tableSelector').value
    let foodChoice = obtenerValorSeleccionado(document.getElementsByName('foodSelector'), 'No se eligió una comida');
    let horario = document.getElementById('horarioReserva').value
    let fecha = document.getElementById('fechaReserva').value
    let personChoice = obtenerValorSeleccionado(document.getElementsByName('personChoice'), 'No se eligió quién asiste a la reserva');

     // Verificar si algún campo está vacío
    if (!name || !mail || !phone || !foodChoice || !fecha || !personChoice) {
        alert('Por favor complete todos los campos del formulario.');
        return; // Salir de la función si algún campo está vacío
    }

    // Verificar si la mesa seleccionada está disponible
    if (!mesasDisponibles[table]) {
        alert('Lo sentimos, la mesa seleccionada no está disponible.');
        return; // Salir de la función si la mesa no está disponible
    }

    let reserva1 = new Reserva(name, mail, phone, table, foodChoice, fecha, personChoice);

    console.log(reserva1)
})