const db = require('../db/conexion');

async function verCarta(idCarta) {
    let carta;
    try {
        carta = await db.any('SELECT * FROM unot_cartas_car WHERE pk_car_id = $1',
            [idCarta]
        );    
    } catch (err) {
        console.log("Error al coger la carta",err);
    }
    return carta;
}

module.exports = verCarta;
