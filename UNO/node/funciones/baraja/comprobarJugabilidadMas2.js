/**
 * Comprueba si hay una carta "+2" en la mano del jugador.
 * 
 * @param {Array} cartas - Lista de cartas en la mano del jugador.
 * @returns {boolean} - Devuelve `true` si hay una carta "+2", `false` en caso contrario.
 */
async function comprobarJugabilidadMas2(cartas) {
    let jugabilidad = false;

    // Recorrer todas las cartas del jugador
    for (let index = 0; index < cartas.length; index++) {
        let carta = cartas[index];

        // Verificar si la carta es de tipo "roba2"
        if (carta.car_class == "roba2") {
            jugabilidad = true;
            break; // Detener la búsqueda en cuanto se encuentre una carta "+2"
        }
    }

    // Devolver el resultado de la verificación
    return jugabilidad;
}

// Exportar la función para su uso en otros módulos
module.exports = comprobarJugabilidadMas2;
