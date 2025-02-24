const db = require('../db/conexion');
const pgp = require('pg-promise')(); // Asegurar que la conexión se cierre correctamente

const repetirMas2 = async () => {
    try {
        // Consulta para obtener el número de cartas "roba 2" jugadas
        const roba2 = await db.one(
            `SELECT COUNT(*) AS total
             FROM unot_estado_est e
             JOIN unot_cartas_car c ON e.est_ultima_carta = c.pk_car_id
             WHERE c.car_class = 'roba2';`
        );

        // Guardar el resultado en una variable
        let roba2Actualizado = parseInt(roba2.total, 10); // Convertir el resultado a número entero
        roba2Actualizado += 1; // Incrementar el valor en 1

        console.log(`Número de cartas "roba 2" jugadas: ${roba2Actualizado}`);
        return roba2Actualizado; // Devolver el resultado si se necesita
    } catch (error) {
        console.error('Error al obtener o actualizar el número de cartas "roba 2":', error.message);
        throw error; // Relanzar el error si se necesita manejar en otro lado
    }
};

// Exportar la función para que pueda ser usada en otros módulos
module.exports = repetirMas2;
