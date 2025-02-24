//Para que esto funcione debe existir una partida con el mismo id que vamos a insertar en la fk de mazos
//INSERT INTO unot_partidas_par (pk_par_id) VALUES (1);

const db = require('./conexion');

async function cogerCartas() {
    try {
        let cartas = await db.any('SELECT * FROM unot_cartas_car');
        let cartasDesordenadas = barajarCartas(cartas);
        let cartasJSON = JSON.stringify(cartasDesordenadas);
        console.log("Se han barajado las cartas");
        return cartasJSON;
    } catch (err) {
        console.log("Error al barajar las cartas",err);
    }
}

function barajarCartas(array) {
    return array.sort(() => Math.random() - 0.5);
}

async function insertarCartas(cartas, idPartida) {
    try{
        await db.none(
            'INSERT INTO unot_mazos_maz (fk_par_maz_id_partida, maz_cartas) VALUES ($1, $2)',
            [idPartida, cartas]
        );
        console.log("Cartas insertadas correctamente.");
    }catch(err){
        console.log("Error al insertar cartas:", err);
    }
}

async function main() {
    try{
        const cartasJSON1 = await cogerCartas();
        if (cartasJSON1) {
            await insertarCartas(cartasJSON1,1); // Cambiar el id cuando alguien cree la partida
        }
    }catch(err){
        console.log("Error:", err);
    }finally{
        pgp.end();
    }
}

main();