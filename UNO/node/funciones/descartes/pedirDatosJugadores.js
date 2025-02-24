const readline = require('readline');
const db = require('../db/conexion.js');

function pedirDatosJugadores(numJugadores, idPartida) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const jugadores = [];
        const pedirNombre = (index = 1) => {
            if (index <= numJugadores) {
                rl.question(`Introduce el nombre del jugador ${index}: `, async (nombre) => {
                    try{
                        if (!nombre.trim()) {
                            console.log('El nombre no puede estar vacío.');
                            return pedirNombre(index);
                        }
    
                        // Si no existe un jugador con ese apodo se da de alta en la base de datos 
                        await db.func('unof_registrar_jugador', [nombre.trim()]);
                        
                        // Se obtiene el id del jugador
                        let idValue;
                        await db.func('unof_login', [nombre.trim()]).then( result => (
                            idValue = result[0].unof_login
                        ));
                        
                        // Se guarda el apodo y el id en la lista
                        jugadores.push({ id: idValue, nombre: nombre.trim() });
                        
                        // Se piden los datos del próximo jugador
                        pedirNombre(index + 1);
                        
                        /*Falta que se guarden los nombres en la base de datos y que devuelvan el id. Tambien, en cuyo caso que quiera 
                        hacerse se comprobara si existe para pedir que se ponga otro o que lo tenga en cuenta para la estadística. Deberá
                        guardarse el id DE LA BASE DE DATOS*/
                    }catch(err){
                        console.log('Error capturado en pedirDatosJugadores');
                        reject(new Error('Se perdió la conexión con la base de datos'));
                    }
                });
            } else {
                rl.close();
                resolve(jugadores);
            }
        };
        pedirNombre();
    });
}

module.exports = pedirDatosJugadores;
