const db = require('../db/conexion'); // Importa la conexión a la base de datos
const { Sequelize } = require("sequelize"); // Importa Sequelize para manejar la base de datos

// Conexión con la base de datos usando Sequelize
const sequelize = new Sequelize(db.$cn.database, db.$cn.user, db.$cn.password, {
    host: db.$cn.host, // Servidor de la base de datos
    port: db.$cn.port, // Puerto de la base de datos
    dialect: "postgres", // Especifica PostgreSQL como el motor de la base de datos
    logging: false // Desactiva logs de SQL en la consola para evitar ruido innecesario
});

const initModels = require("../../models/init-models"); // Importa la inicialización de modelos de Sequelize
const models = initModels(sequelize); // Inicializa los modelos con la conexión establecida

/**
 * Obtiene la última carta jugada en una partida usando Sequelize
 * @param {number} idPartida - Id de la partida
 * @returns {Object} - Devuelve el objeto de la última carta jugada en la partida
 */
async function getUltimaCartaJugadaOrm(idPartida) {
    try {
        await sequelize.authenticate(); // Verifica que la conexión con la base de datos es válida
        
        // Busca el estado de la partida basado en su ID
        const estado = await models.unot_estado_est.findOne({
            where: { fk_par_est_id_partida: idPartida }
        });
        
        if (!estado) {
            throw new Error("No se encontró el estado de la partida.");
        }

        const idUltimaCarta = estado.dataValues.est_ultima_carta; // Obtiene el ID de la última carta jugada
        
        // Busca la carta en la base de datos según su ID
        const ultmCarta = await models.unot_cartas_car.findOne({
            where: { pk_car_id: idUltimaCarta }
        });
        
        if (!ultmCarta) {
            throw new Error("No se encontró la última carta jugada.");
        }

        return ultmCarta.dataValues; // Retorna los datos de la última carta jugada
    } catch (error) {
        console.error("Error obteniendo la última carta jugada:", error);
        throw error; // Lanza el error para que pueda ser manejado por quien llame a la función
    }
}

module.exports = getUltimaCartaJugadaOrm; // Exporta la función para su uso en otros módulos
