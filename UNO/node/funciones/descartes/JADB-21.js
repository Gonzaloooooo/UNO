const db = require('./conexion');

async function insertarPartida(idjug1, idjug2, idjug3 = null, idjug4 = null) {
    try{
        const idPartida = await db.func('unof_ingresarPartida', [idjug1, idjug2, idjug3, idjug4]);
        console.log("Partida insertada correctamente, con ID: ", idPartida);
    }catch(err){
        console.log("Error al insertar la partida:", err);
    }
}
