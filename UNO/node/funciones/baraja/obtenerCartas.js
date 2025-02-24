const db = require('../db/conexion');
/**
 * Función para obtener un número específico de cartas de la base de datos.
 * Si no hay suficientes cartas en el mazo principal, usa el mazo de descartes.
 * 
 * @param {number} numCartas - Número de cartas a obtener.
 * @param {number} partidaId - ID de la partida.
 * @returns {Promise<array>} - Cartas seleccionadas.
 */
async function obtenerCartas (numCartas, partidaId) {
    try {
        // Obtener el mazo actual
        const mazo  = await db.any(
            'SELECT maz_cartas, maz_cartas_descartes FROM unot_mazos_maz WHERE fk_par_maz_id_partida = $1',
            [partidaId]
        );

        if (mazo.length === 0) {
            throw new Error('No se encontró el mazo para la partida especificada.');
        }
        
        let mazoCartas = mazo[0].maz_cartas || [];
        let mazoDescartes = mazo[0].maz_cartas_descartes || [];

        // Verificar si hay suficientes cartas en el mazo principal
        if (mazoCartas.length < numCartas) {
            if (mazoDescartes.length === 0) {
                throw new Error('No hay suficientes cartas en el mazo ni en el mazo de descartes.');
            }

            // Mover cartas del mazo de descartes al principal
            const ultimaCarta = mazoDescartes.pop(); // Retener la última carta jugada
            mazoCartas = [...mazoCartas, ...mazoDescartes.sort(() => Math.random() - 0.5)]; // Barajar descartes
            mazoDescartes = [ultimaCarta];

            //console.log('Cartas movidas del mazo de descartes al principal.');
        }

        // Seleccionar las cartas solicitadas
        const cartasSeleccionadas = mazoCartas.splice(0, numCartas);

        // Actualizar los mazos en la base de datos
        await db.query(
            `UPDATE unot_mazos_maz
             SET maz_cartas = $1, maz_cartas_descartes = $2
             WHERE fk_par_maz_id_partida = $3`,
            [JSON.stringify(mazoCartas), JSON.stringify(mazoDescartes), partidaId]
        );

        //console.log(`Cartas seleccionadas:`, cartasSeleccionadas);
        return cartasSeleccionadas;
    } catch (error) {
        //console.error('Error al obtener cartas:', error.message);
        console.log(error);
        throw error;
    }
};

module.exports = obtenerCartas;