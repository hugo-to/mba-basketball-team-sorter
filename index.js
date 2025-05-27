// Variables globales
let jugadoresPorEquipo = 0;
let cantidadJugadores = 0;
let nombresJugadores = [];

// Mostrar el modal al hacer submit en el formulario principal
const form = document.getElementById('sorteo-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    cantidadJugadores = parseInt(document.getElementById('num-jugadores').value);
    jugadoresPorEquipo = parseInt(document.getElementById('jugadores-equipo').value);
    if (isNaN(cantidadJugadores) || isNaN(jugadoresPorEquipo) || cantidadJugadores < 2 || jugadoresPorEquipo < 1) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }
    // Mostrar modal
    document.getElementById('modal-jugadores').style.display = 'flex';
    // Prellenar el textarea
    const textarea = document.getElementById('nombres-jugadores');
    textarea.value = Array.from({length: cantidadJugadores}, (_, i) => `Jugador ${i+1}`).join(', ');
});

// Confirmar nombres y sortear
const btnConfirmar = document.getElementById('confirmar-jugadores');
btnConfirmar.addEventListener('click', function() {
    const raw = document.getElementById('nombres-jugadores').value;
    // Separar por comas o saltos de línea
    nombresJugadores = raw.split(/,|\n/).map(j => j.trim()).filter(j => j);
    if (nombresJugadores.length !== cantidadJugadores) {
        alert(`Debes ingresar exactamente ${cantidadJugadores} nombres.`);
        return;
    }
    document.getElementById('modal-jugadores').style.display = 'none';
    sortearEquipos();
});

function sortearEquipos() {
    // Barajar los nombres
    const nombres = [...nombresJugadores];
    for (let i = nombres.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nombres[i], nombres[j]] = [nombres[j], nombres[i]];
    }
    // Crear los equipos
    const equipos = [];
    let equipoActual = [];
    for (const nombre of nombres) {
        equipoActual.push(nombre);
        if (equipoActual.length === jugadoresPorEquipo) {
            equipos.push(equipoActual);
            equipoActual = [];
        }
    }
    if (equipoActual.length > 0) {
        equipos.push(equipoActual);
    }
    mostrarEquipos(equipos);
}

function mostrarEquipos(equipos) {
    const grid = document.getElementById('equipos');
    grid.innerHTML = '';
    equipos.forEach((equipo, idx) => {
        const box = document.createElement('div');
        box.className = 'equipo-box';
        box.innerHTML = `<div class=\"equipo-titulo\">Equipo ${idx + 1}</div><div class=\"equipo-jugadores\">${equipo.map(j => `<div>${j}</div>`).join('')}</div>`;
        grid.appendChild(box);
        // Animación secuencial
        setTimeout(() => {
            box.classList.add('visible');
        }, 200 * idx);
    });
} 