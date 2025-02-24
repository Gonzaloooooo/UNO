//Sumar el car_value de las cartas de los jugadores
//si tiene cartas con valor 0 entre todas las de su mano de cartas, se cambiaria a 1 pues solo el ganador tendria el valor de 0
//si el array.lenght de las manos del jugador que no sea el ganador sumara 0, se le cambiara el valor a 1

const db = require('../db/conexion'); // Importamos el módulo de conexión

// Función para calcular la puntuación del jugador basada en sus cartas
async function calcularPuntuacionJugador(jugadorId, partidaId, esGanador = false) {
    try {
        // Consulta para obtener las cartas del jugador en la partida actual
        const res = await db.query(
            `SELECT pju_cartas 
             FROM unot_partidasjugadores_pju
             WHERE fk_jug_pju_id_jugador = ${jugadorId}
             AND fk_par_pju_id_partida = ${partidaId}`,
        );

        if (res.length === 0) {
            throw new Error(
                `No se encontraron cartas para el jugador con ID ${jugadorId} en la partida ${partidaId}.`
            );
        }

        // Obtenemos las cartas del jugador
        const cartasJugador = res[0].pju_cartas;

        // Sumar el valor total de las cartas
        let sumaValores = cartasJugador.reduce((total, carta) => total + carta.car_value, 0);

        // Ajustar si el jugador no es el ganador y su puntuación es 0
        if (!esGanador && sumaValores === 0) {
            sumaValores = 0;
        }

        if(!sumaValores){
            sumaValores = 0;
        }

        // console.log('ID: ', jugadorId, 'Puntuacion: ', sumaValores);
        return sumaValores; // Retorna la suma ajustada
    } catch (error) {
        console.error("Error al calcular la puntuación del jugador:", error);
        throw error;
    }
}

module.exports = calcularPuntuacionJugador;
