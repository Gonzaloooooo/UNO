const pgp = require('pg-promise')();

// Configuración de la conexión a la base de datos
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'uno',
    user: 'root',
    password: 'root',
});

const invertirOrdenPartida = async (idPartida) => {
    try {
        // Leer el valor actual de la columna 'invertir orden'
        const result = await db.oneOrNone(
            'SELECT est_efecto AS invertirOrden FROM unot_estado_est WHERE fk_par_est_id_partida = $1',
            [idPartida]
        );

        if (!result) {
            throw new Error(`No se encontró el estado para la partida con ID ${idPartida}.`);
        }

        const valorActual = result.invertirorden;

        // Calcular el nuevo valor (lo contrario)
        const nuevoValor = !valorActual;

        console.log(` ${nuevoValor}`);
        return nuevoValor;
    } catch (error) {
        console.error('Error al invertir el orden de la partida:', error.message);
        throw error;
    }
};

(async () => {
    try {
        const idPartida = 1; // Cambia por el ID de tu partida
        const nuevoEstado = await invertirOrdenPartida(idPartida);
        console.log(`${nuevoEstado}`);
    } catch (err) {
        console.error('Error en el flujo principal:', err.message);
    } finally {
        pgp.end();
    }
})();