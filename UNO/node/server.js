const insertarPartida = require('./funciones/partida/insertarPartida');
const getPrimeraCarta = require('./funciones/baraja/getPrimeraCarta');
const repartirCartas = require('./funciones/baraja/repartirCartas');
const determinarOrdenJugadores = require('./funciones/jugadores/determinarOrdenJugadores');
const verCartasJugador = require('./funciones/jugadores/verCartasJugador');
const jugarCarta = require('./funciones/baraja/jugarCarta');
const getUltimaCartaJugada = require('./funciones/partida/getUltimaCartaJugada');
const getUltimaCartaJugadaOrm = require('./funciones/orm/getUltimaCartaJugadaOrm');
const cogerEstado = require('./funciones/partida/cogerEstado');
const updateEstado = require('./funciones/partida/updateEstado')
const comprobarEfecto = require('./funciones/baraja/comprobarEfecto')
const compararCartas = require('./funciones/baraja/compararCartas')
const getOrdenFromGame = require('./funciones/partida/getOrdenFromGame');
const robarCarta2 = require('./funciones/baraja/robarCarta2');
const calcularPuntuacionJugador = require('./funciones/jugadores/calcularPuntuacionJugador');
const getScoreFromPlayer = require('./funciones/jugadores/getScoreFromPlayer');
const setEndDateForGame = require('./funciones/partida/setEndDateForGame');

const { spawn } = require("child_process");

const db = require('./funciones/db/conexion');

try {
    const cors = require('cors');
    const express = require('express');
    const app = express();
    const path = require('path');
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000', // IP del proyecto de React
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    }));

    // Parsea los id de cadenas a enteros
    function parseIdsToInt(idsIn) {
        let idsOut = [];
        for (let i = 0; i < idsIn.length; i++) {
            let id = parseInt(idsIn[i]);
            if (!isNaN(id)) {
                idsOut.push(id);
            }
        }
        return idsOut;
    }

    // Login de un jugador
    app.post('/login/:username', async (req, res) => {
        const apodo = req.params.username;
        // Se comprueba que exista en la base de datos
        await db.func('unof_registrar_jugador', [apodo]).then(result => {
            const existe = result[0].unof_registrar_jugador;
        });

        // Se recupera el id
        await db.func('unof_login', [apodo]).then(result => {
            let id = result[0].unof_login;
            // Si existe, devuelve el id
            if (id !== -1) {
                res.status(200).send([{ "id": id, "username": apodo }]);
            } else {
                res.status(404).send([{ "message": "No existe un jugador con ese apodo en la base de datos" }]);
            }
        });
    });

    // Crea una partida con los ids de los jugadores
    app.put('/createGame/:id1/:id2/:id3?/:id4?', async (req, res) => {
        try {
            const ids = [req.params.id1, req.params.id2, (req.params.id3 === undefined) ? null : req.params.id3, (req.params.id4 === undefined) ? null : req.params.id4];
            const idPartida = await insertarPartida(ids[0], ids[1], ids[2], ids[3]);

            // Primera carta jugable
            let primeraCarta = await getPrimeraCarta(idPartida);

            // Repartición de las cartas entre los jugadores
            await repartirCartas(ids, idPartida);

            // Obtención y guardado del orden de los jugadores en la partida 
            await determinarOrdenJugadores(parseIdsToInt(ids), idPartida);

            // Estado inicial de la partida
            let estadoNuevo = {
                fk_par_est_id_partida: idPartida,
                est_ultima_carta: primeraCarta.pk_car_id,
                est_colorultimaCarta: primeraCarta.car_color,
                est_cogerdosrep: 0
            };      

            // Actualiza con todos los datos el estado
            await updateEstado(estadoNuevo);

            res.status(201).send([{ "idPartida": idPartida }]);
        } catch (err) {
            console.log(err);
            res.status(500).send([{ "message": "Error en el servidor al intentar crear la partida" }]);
        }
    });

    // Estado de la partida
    app.get('/getEstadoFromGame/:idGame', async (req, res) => {
        try {
            let idGame = req.params.idGame;
            const response = await cogerEstado(idGame);
            const estadoJson = response[0];
            res.status(200).send(estadoJson);
        } catch (error) {
            res.status(500).send([{ 'message': 'Error al recuperar el estado de la partida' }]);
        }
    });

    // Orden de los jugadores en la partida
    app.get('/getOrdenFromGame/:idGame', async (req, res) => {
        try {
            let idGame = req.params.idGame;
            const orden = await getOrdenFromGame(idGame);
            res.status(200).send(orden);
        } catch (error) {
            res.status(500).send([{ 'message': 'Error al recuperar el estado de la partida' }]);
        }
    });

    // Devuelve las cartas de un jugador en una partida
    app.get('/getCardsFromPlayer/:idPlayer/:idGame', async (req, res) => {
        try {
            const idPlayer = req.params.idPlayer;
            const idGame = req.params.idGame;
            const mano = await verCartasJugador(idPlayer, idGame);
            res.status(200).send(mano);
        } catch (error) {
            console.log(error);
            res.status(500).send([{ 'message': 'Error al intentar recuperar las cartas del jugador' }]);
        }
    });

    // Obtiene la última carta jugada en una partida
    app.get('/getLastCardPlayedFromGame/:idGame', async (req, res) => {
        const idGame = req.params.idGame;
        try {
            const ultimaCarta = await getUltimaCartaJugada(idGame);
            res.status(200).send(ultimaCarta);
        } catch (error) {
            console.log(error);
            res.status(500).send([{ 'message': 'Error al intentar recuperar la última carta jugadaa' }]);
        }
    });

    app.get('/getLastCardPlayedFromGameOrm/:idGame', async(req, res) => {
        const idGame = req.params.idGame;
        try{
            const ultimaCarta = await getUltimaCartaJugadaOrm(idGame);
            res.status(200).send(ultimaCarta);
        } catch(error){
            console.log(error);
            res.status(500).send([{ 'message': 'Error al intentar recuperar la última carta jugadaa' }]);
        }
    });

    //robarCarta2
    app.put('/robarCarta2/:idPlayer/:idGame', async (req, res) => {
        const idPlayer = parseInt(req.params.idPlayer);
        const idGame = parseInt(req.params.idGame);
        try {
            const nuevaCarta = await robarCarta2(idPlayer, idGame);
            res.status(200).json("Carta añadida");
        } catch (error) {
            console.error("Error al robar carta:", error);
            res.status(500).json({ 'message': 'Error al robar una carta' });
        }
    });

    // Juega la carta de un jugador en una partida
    app.put('/playCardFromPlayer/:idPlayer/:idGame/:cardIndex', async (req, res) => {
        const idPlayer = parseInt(req.params.idPlayer);
        const idGame = parseInt(req.params.idGame);
        const cardIndex = parseInt(req.params.cardIndex);
        try {
            const response = await jugarCarta(cardIndex, idPlayer, idGame);
            res.status(200).send(response);
        } catch (error) {
            console.log(error);
        }
    });

    // Actualiza el estado de una partida
    app.post('/updateEstado/:estado', async (req, res) => {
        try {
            const estado = JSON.parse(req.params.estado);
            await updateEstado(estado);
            res.status(200).send();
        } catch (error) {
            console.log(error);
        }
    });

    // Obtiene las partidas jugadas por un jugador
    app.get('/getPartidasJugadas/:apodo', async (req, res) => {
        const apodo = req.params.apodo;
        const scriptPath = path.join(__dirname, 'funciones', 'python', 'getDatosFromJugador.py');
    
        // Ejecutar Python asegurando que el apodo se pase correctamente
        const pythonProcess = spawn("python", [scriptPath, apodo]);
    
        let datosPython = "";
    
        pythonProcess.stdout.on("data", (data) => {
            datosPython += data.toString();
        });
    
        pythonProcess.stderr.on("data", (data) => {
            console.error(`Error en el script de Python: ${data}`);
            res.status(500).json({ error: "Error en el script de Python", details: data.toString() });
        });
    
        pythonProcess.on("close", (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(datosPython.trim());
                    res.status(200).json(result);
                } catch (error) {
                    console.error("Error al procesar la respuesta de Python:", error.message);
                    res.status(500).json({ error: "Error procesando la respuesta de Python" });
                }
            } else {
                console.error(`El script de Python finalizó con código de error ${code}`);
                res.status(500).json({ error: "El script de Python terminó con error" });
            }
        });
    });


    app.post('/updateEstado', async (req, res) => {
        try {
            const estado = req.body; // Ahora se obtiene el JSON correctamente
            await updateEstado(estado);
            res.status(200).send({ message: "Estado actualizado correctamente" });
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            res.status(500).send({ error: "Error interno del servidor" });
        }
    });

    // Devuelve el efecto activo en una partida (+4, +2, cambio de color...)
    app.post('/checkEffect/:idPlayer/:idGame', async (req, res) => {
        try {
            const { idPlayer, idGame } = req.params;
            const { estado } = req.body;

            if (!estado) {
                return res.status(400).send({ message: "Estado no proporcionado" });
            }

            const response = await comprobarEfecto(estado, idGame, idPlayer);
            res.status(200).send({ efectoActivo: response });
        } catch (error) {
            console.error("Error en checkEffect:", error);
            res.status(500).send({ message: "Error al comprobar efecto" });
        }
    });

    // Indica si una carta es jugable
    app.post('/compareCards', async (req, res) => {
        try {
            const { lastCard, newCard, efect, colorEstado } = req.body;

            if (!lastCard || !newCard) {
                return res.status(400).send({ message: "Faltan datos de cartas" });
            }

            const response = await compararCartas(lastCard, newCard, efect, colorEstado);
            res.status(200).send(response);
        } catch (error) {
            console.error("Error en compareCards:", error);
            res.status(500).send({ message: "Error al comparar cartas" });
        }
    });

    // Cuenta las cartas de cada jugador y actualiza su puntuación en la BBDD
    app.post('/finishGame/:idGame/:idWinner', async (req, res) => {
        try{
            const idGame = req.params.idGame;
            const idWinner = req.params.idWinner;
            const idPlayers = await getOrdenFromGame(idGame);
            idPlayers.forEach(id => {
                const calcula = async () => {
                    let puntuacion
                    if(id === idWinner){
                        puntuacion = await calcularPuntuacionJugador(id, idGame, true)
                    } else{
                        puntuacion = await calcularPuntuacionJugador(id, idGame, false)
                    }
                    //console.log('ID ', id, ': ', puntuacion);
                    await db.query(`UPDATE unot_partidasjugadores_pju
                        SET pju_puntuacion = $1
                        WHERE fk_jug_pju_id_jugador = $2 AND fk_par_pju_id_partida = $3`, 
                        [puntuacion, id, idGame]);
                };
                calcula();
            });

            await setEndDateForGame(idGame, new Date());
            
            res.status(200).send({ message: "Partida finalizada correctamente" });
        } catch(error){
            console.log(error);
            res.status(500).send({ message: "Error al intentar finalizar la partida" });
        }
    });

    // Devuelve la puntuación de un jugador en una partida
    app.get('/getScoreFromPlayer/:idGame/:idPlayer', async(req, res) => {
        try{
            const idGame = req.params.idGame;
            const idPlayer = req.params.idPlayer;
            const result = await getScoreFromPlayer(idPlayer, idGame);
            res.status(200).send({puntuacion:result});
        } catch(error){
            console.log(error);
            res.status(200).send({message:`Error en el servidor mientras se recuperaba la puntuación de un jugador`});
        }
    });

    console.log('Servidor escuchando por el puerto 3001...');
    app.listen(3001);

} catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
        if (err.message.startsWith(`Cannot find module 'express'`)) {
            console.log(`No se encuentra la librería 'express'`);
            console.log(`Para instalarla ejecute el comando 'npm install express' en la ubicación del proyecto 'UNO\\node\\'`);
        } if (err.message.startsWith(`Cannot find module 'cors'`)) {
            console.log(`No se encuentra la librería 'cors'`);
            console.log(`Para instalarla ejecute el comando 'npm install express' en la ubicación del proyecto 'UNO\\node\\'`);
        } else {
            console.log(err);
        }
    } else {
        console.log(err);
    }
}