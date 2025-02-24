const db = require('../db/conexion');

/**
 * 
 * @param idPartida Id de la partida a la que está asociada el mazo 
 *                  del que se quiere sacar la primer carta.
 * 
 * @returns         Busca una carta que no sea especial(+2, +4, cambio de sentido, 
 *                  cambio de color o salto turno) en el mazo de una partida, 
 *                  actualiza el mazo sin la carta y devuelve la carta.
 */

async function getPrimeraCarta(idPartida){
    try{
        const result = await db.oneOrNone(`SELECT maz_cartas FROM unot_mazos_maz WHERE fk_par_maz_id_partida = $1`,[idPartida]);
        const mazo = result.maz_cartas;

        // Primera carta
        let primeraCarta;
        let mazoDescartes = [];
        for(i=0; i<mazo.length; i++){
            if(mazo[i].car_special != true){ 
                primeraCarta = mazo[i];
                mazoDescartes.push(mazo[i]);
                break;
            }
        }

        // Mazo actualizado sin la carta
        let updatedMazo = JSON.stringify(mazo.filter(carta => carta.pk_car_id != primeraCarta.pk_car_id));

        // Se actualiza el mazo en la base de datos
        let r = await db.any(`UPDATE unot_mazos_maz 
                        SET maz_cartas = $1
                        WHERE fk_par_maz_id_partida = $2`, [updatedMazo, idPartida]);

        // Se actualiza el mazo de descartes con la primera carta
        await db.any(`UPDATE unot_mazos_maz
                        SET maz_cartas_descartes = $1
                        WHERE fk_par_maz_id_partida = $2`, [JSON.stringify(mazoDescartes), idPartida]);
        
        // Se actualiza el la tabla estado de la partida con la primera carta
        db.func('unof_set_ultima_carta_jugada', [primeraCarta.pk_car_id, idPartida]);   

        return(primeraCarta);        
    } catch(error){
        if(error instanceof TypeError){ // El mazo es undefined o null
            console.error('No se ha podido recuperar el mazo de la base de datos.', error);
        } else{
            console.error('Error al obtener la primera carta:', error);
        }
    }
}

module.exports = getPrimeraCarta;