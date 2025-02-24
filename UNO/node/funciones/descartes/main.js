try{
    const getNumeroDeJugadores = require('./funciones/jugadores/getNumeroDeJugadores');
    const pedirDatosJugadores = require('./funciones/jugadores/pedirDatosJugadores');
    const insertarPartida = require('../partida/insertarPartida');
    const getPrimeraCarta = require('../baraja/getPrimeraCarta');
    const repartirCartas = require('../baraja/repartirCartas');
    const determinarOrdenJugadores = require('../jugadores/determinarOrdenJugadores');
    const guardarOrden = require('../jugadores/guardarOrden');
    
    // Funciones para el bucle de la partida
    const cogerEstados = require('../partida/cogerEstado');
    const turnoActual = require('./funciones/jugadores/turnoActual');
    const comprobarEfecto = require('../baraja/comprobarEfecto');
    
    //Conexión de la base de datos
    const db = require('../db/conexion');
    
    function getIds(jugadores){
        let ids = [];
        for(let i=0; i<4; i++){
            try{
                ids[i] = jugadores.at(i).id; 
            }catch(err){
                //console.log('jugador nulo');
                ids[i] = null;
            }
        }
        return ids;
    }

    async function main(){
        try{
            // Comprobación de la conexión con la base de datos
            await db.connect(true);

            // Mensaje de Bienvenida
            console.log('Bienvenido al juego de UNO');

            // 1. Preguntamos el número de jugadores por consola
            const numJugadores = await getNumeroDeJugadores();
            
            // 2. Pregunta los nombres de los jugadores por consola y los damos de alta en la base de datos
            const jugadores = await pedirDatosJugadores(numJugadores);
                    
            //3.Insertar partida, creación del mazo y cartas barajadas
            const ids = getIds(jugadores);
            const idPartida = await insertarPartida(ids[0], ids[1], ids[2], ids[3]);
            console.log('id partida : '+idPartida);

            // 4. Primera carta jugable
            await getPrimeraCarta(idPartida);
            
            // 5. Repartir cartas
            await repartirCartas(ids, idPartida);
            
            // 6. Determinar orden de jugadores
            const ordenJugadores = determinarOrdenJugadores(jugadores);
            
            //console.log('Orden de los jugadores:', ordenJugadores);

            // Bucle de la partida
            console.log('¡Comienza la partida!');

            let estado = await cogerEstados(idPartida);
            let posTurnoActual = estado[0].est_turno_actual;
            
            let idJugador = await turnoActual(posTurnoActual, idPartida);
            
            let efecto = estado[0].est_efecto;
            
            let camino = await comprobarEfecto(estado, idPartida, idJugador);

            console.log(camino);
            
        } catch (err) {
            if(err.code === 'ECONNREFUSED'){
                console.log('No se pudo conectar con la base de datos:');
                console.log(`Comprueba que Postgres está funcionando.\nComprueba en 'UNO\\db\\conexion.js' que la configuración coincide con la de la base de datos a la que quieres conectarte`);
            } else{
                console.error(err);
            }
        }
    }
    main();
}catch(err){
    if(err.code==='MODULE_NOT_FOUND'){
        if(err.message.startsWith(`Cannot find module 'pg-promise'`)){
            console.log(`No se encuentra la librería 'pg-promise'`);
            console.log(`Para instalarla ejecute el comando 'npm install pg-promise' en la ubicación del proyecto 'UNO\\node\\'`);
            //console.log(err);
        } else{
            console.log(err.message);
        }
    } else{
        console.log(err.message);
    }
}

