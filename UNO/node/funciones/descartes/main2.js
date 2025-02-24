//2ª Parte del main acontinuación del primer main
const cogerEstados = require('../partida/cogerEstado');
const comprobarEfecto = require('../baraja/comprobarEfecto');
const verCarta = require('./funciones/baraja/verCarta');
const turnoActual =require('./funciones/jugadores/turnoActual')
const compararCartas = require('../baraja/compararCartas');
const jugarCarta = require('../baraja/jugarCarta');
const contarCartasJugador = require('./funciones/jugadores/contarCartasJugador');
const repetirMas2 = require('./funciones/baraja/repetirMas2');
const verificarNumeroCartas =require('./funciones/jugadores/verificarNumeroCartas');
const efectoCarta = require('./funciones/baraja/efectoCarta');

async function partida() {
    do{
        let estado = await cogerEstados(idPartida);//Coge el estado de la partida
        console.log(estado);
        let posTurnoActual = estado[0].est_turno_actual//Posicion en el array de turno
        let idJugador = turnoActual(posTurnoActual, idPartida)
        console.log(idJugador);
        let efecto = estado[0].est_efecto//Efecto de la partida
        console.log(efecto);
        let camino = await comprobarEfecto(estado, idPartida, idJugador);
        let color;
        let direccionTurno = estado[0].est_invertir_orden;
        let repMas2 = 0;
        if(!camino){
            console.log("El flujo de la partida continua")
            let idUltimaCarta = estado[0].est_ultima_carta;
            let ultimaCarta = await verCarta(idUltimaCarta);
            let cartaSeleccionada;
            let compararCartas;
            do {
                cartaSeleccionada = await cartaSeleccionada();//Trae la carta seleccionada por el jugador frontend
                compararCartas = await compararCartas(ultimaCarta, cartaSeleccionada, efecto, estado[0].est_colorultimaCarta)
            } while (!compararCartas);
            
            jugarCarta(posicion, idJugador, idPartida); //Con la posicion del array de la mano del jugador, el id de la partida y el id del jugador llamaremos a la funcion jugarCarta()
                
            efectoCarta(cartaSeleccionada)

            let cartasRestantes = contarCartasJugador(idJugador, idPartida);
            verificarNumeroCartas(cartasRestantes);//Revisar Funcion
            saltarTurno(direccionTurno,efecto)
            saltarTurno();//Corregir esta funcion
            upsertEstado();//Actualizar a los valores de la ultima tabla estado

            
            //Si la carta es cambio de sentido el estado cambiara y pondra el sentido inverso como true o false
            //Si la carta es +4, +2 o prohido se cambiara la columna efecto en estado
            //Si la carta es +4 o cambiodecolor pedira que cambiemos de color
            //Una vez comprobada que carta es y que efecto hace contariamos cuantas cartas tiene el jugador y dependiendo de la respuesta hara una accion distinta
            //Saltariamos al siguiente turno
            //Luego actualizariamos el estado

        }
    }while(ganador==null);
}

partida();


async function echarCarta(ultimaCarta, cartaSeleccionada, efecto, colorEstado, idJugador, idPartida){
    let compararCartas = await compararCartas(ultimaCarta, cartaSeleccionada, efecto, colorEstado);
    if(compararCartas==true){
        jugarCarta(posicion, idJugador, idPartida);
        return true;
    }else{
        return false;
    }
}

echarCarta()

//Actualizar Estado
/*const estado ={

}*/