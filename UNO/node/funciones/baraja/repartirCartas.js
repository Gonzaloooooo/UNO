const db = require('../db/conexion');
const obtenerCartas = require('./obtenerCartas');
const actualizarManoJugador = require('../jugadores/actualizarManoJugador');

/**
 * Saca 7 cartas del mazo de una partida y lo inserta en la mano de un jugador, 
 * para todos los jugadores pasados por parámetro
 * 
 * @param {*} ids - Ids de los jugadores 
 * @param {*} idPartida - Id de la partida
 */
async function repartirCartas(ids, idPartida) {
    for(let i=0; i<4; i++){
        // Si encuentra un id nulo deja de repartir
        if (ids[i] === null){
            break;
        }

        // Mano del jugador
        let mano = await obtenerCartas(7, idPartida);
        //console.log(`Mano del jugador ${ids[i]}: `);

        // Se añaden la cartas de cada jugador en la base de datos
        for(let j=0; j<mano.length; j++){
            await actualizarManoJugador(ids[i], idPartida, mano[j]);
        }
    }
}

module.exports = repartirCartas;
