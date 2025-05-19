let turno = 'X';
let celdas;
let jugadorX = '';
let jugadorO = '';
let juegoActivo = false;

function iniciarJuego() {
  jugadorX = document.getElementById('jugador1').value.trim() || 'Jugador X';
  jugadorO = document.getElementById('jugador2').value.trim() || 'Jugador O';
  turno = 'X';
  juegoActivo = true;
  document.getElementById('estado').textContent = `Turno de ${turno === 'X' ? jugadorX : jugadorO}`;
  crearTablero();
}

function crearTablero() {
  const tablero = document.getElementById('tablero');
  tablero.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.className = 'celda';
    div.dataset.index = i;
    div.addEventListener('click', marcarCelda);
    tablero.appendChild(div);
  }
  celdas = Array(9).fill(null);
}

function marcarCelda(e) {
  const index = e.target.dataset.index;
  if (!juegoActivo || celdas[index]) return;

  celdas[index] = turno;
  e.target.textContent = turno;

  if (verificarGanador()) {
    const ganador = turno === 'X' ? jugadorX : jugadorO;
    document.getElementById('estado').textContent = `¡${ganador} gana!`;
    guardarEstadistica(ganador);
    juegoActivo = false;
    return;
  }

  if (!celdas.includes(null)) {
    document.getElementById('estado').textContent = '¡Empate!';
    guardarEstadistica('Empates');
    juegoActivo = false;
    return;
  }

  turno = turno === 'X' ? 'O' : 'X';
  document.getElementById('estado').textContent = `Turno de ${turno === 'X' ? jugadorX : jugadorO}`;
}

function verificarGanador() {
  const combinaciones = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return combinaciones.some(comb => comb.every(i => celdas[i] === turno));
}

function guardarEstadistica(ganador) {
  const estadisticas = JSON.parse(localStorage.getItem('tateti-scores') || '{}');
  estadisticas[ganador] = (estadisticas[ganador] || 0) + 1;
  localStorage.setItem('tateti-scores', JSON.stringify(estadisticas));
  mostrarEstadisticas();
}

function mostrarEstadisticas() {
  const estadisticas = JSON.parse(localStorage.getItem('tateti-scores') || '{}');
  let html = '<h3>Estadísticas:</h3><ul>';
  for (const jugador in estadisticas) {
    html += `<li>${jugador}: ${estadisticas[jugador]} victoria(s)</li>`;
  }
  html += '</ul>';
  document.getElementById('estadisticas').innerHTML = html;
}

function reiniciarJuego() {
  iniciarJuego();
}

window.onload = mostrarEstadisticas;