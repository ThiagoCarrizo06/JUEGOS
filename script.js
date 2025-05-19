let jugador = '';
let puntajes = { jugador: 0, computadora: 0 };

function iniciarJuego() {
  jugador = document.getElementById('nombreJugador').value.trim() || 'Jugador';
  document.getElementById('juego').style.display = 'block';
  mostrarPuntajes();
}

function jugar(eleccionJugador) {
  const opciones = ['piedra', 'papel', 'tijeras'];
  const eleccionPC = opciones[Math.floor(Math.random() * 3)];
  let resultado = '';

  if (eleccionJugador === eleccionPC) {
    resultado = '¡Empate!';
  } else if (
    (eleccionJugador === 'piedra' && eleccionPC === 'tijeras') ||
    (eleccionJugador === 'papel' && eleccionPC === 'piedra') ||
    (eleccionJugador === 'tijeras' && eleccionPC === 'papel')
  ) {
    resultado = `¡${jugador} gana!`;
    puntajes.jugador++;
  } else {
    resultado = '¡La computadora gana!';
    puntajes.computadora++;
  }

  document.getElementById('resultado').innerText = `${jugador}: ${eleccionJugador} - PC: ${eleccionPC}\n${resultado}`;
  guardarPuntajes();
  mostrarPuntajes();
}

function guardarPuntajes() {
  const data = JSON.parse(localStorage.getItem('ppt-jugadores') || '{}');
  data[jugador] = puntajes.jugador;
  localStorage.setItem('ppt-jugadores', JSON.stringify(data));
}

function mostrarPuntajes() {
  document.getElementById('puntajes').innerText = `${jugador}: ${puntajes.jugador} | Computadora: ${puntajes.computadora}`;
}