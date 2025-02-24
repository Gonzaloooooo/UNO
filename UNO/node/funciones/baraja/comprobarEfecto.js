const obtenerCartas = require('../baraja/obtenerCartas.js'); // Importa la función para obtener cartas del mazo
const actualizarManoJugador = require('../jugadores/actualizarManoJugador.js'); // Importa la función para actualizar la mano del jugador
const verCartasJugador = require('../jugadores/verCartasJugador.js'); // Importa la función para ver las cartas del jugador
const comprobarJugabilidadMas2 = require('./comprobarJugabilidadMas2'); // Importa la función para comprobar si el jugador puede responder con un +2

/**
 * Comprueba el efecto de la carta jugada y aplica la acción correspondiente
 * @param {Object} estado - Estado actual de la partida
 * @param {number} idPartida - Id de la partida
 * @param {number} idJugador - Id del jugador actual
 * @returns {boolean} - Indica si el jugador pierde el turno
 */
async function comprobarEfecto(estado, idPartida, idJugador) {
    let nojuega = false; // Indica si el jugador pierde el turno

    switch (estado.est_efecto) {
        case 'saltarTurno':
            nojuega = true; // El jugador pierde el turno
            break;

        case 'coger4':
            // Obtener 4 cartas del mazo
            let mas4 = await obtenerCartas(4, idPartida);
            console.log("Cartas obtenidas para el jugador:", mas4);

            // Agregar cada carta a la mano del jugador
            for (const carta of mas4) {
                await actualizarManoJugador(idJugador, idPartida, carta);
            }
            console.log("Mano del jugador actualizada correctamente.");
            nojuega = true;
            break;

        case 'coger2':
            // Ver las cartas en la mano del jugador
            let cartasJugador = await verCartasJugador(idJugador, idPartida);
            let tieneMas2 = await comprobarJugabilidadMas2(cartasJugador); // Comprobar si el jugador tiene un +2
            nojuega = false;
            
            if (!tieneMas2) {
                // Si no tiene +2, debe robar el doble de cartas
                let mas2 = await obtenerCartas(estado.est_cogerdosrep * 2, idPartida);
                for (const carta of mas2) {
                    await actualizarManoJugador(idJugador, idPartida, carta);
                }
                nojuega = true;
            }
            break;

        default:
            nojuega = false; // No hay efecto especial
            break;
    }
    return nojuega; // Devuelve si el jugador pierde el turno o no
}

module.exports = comprobarEfecto; // Exporta la función para su uso en otros módulos