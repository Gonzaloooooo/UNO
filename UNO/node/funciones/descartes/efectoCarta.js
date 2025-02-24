//Importar y corregir

async function efectoCarta(cartaSeleccionada) {
    if(cartaSeleccionada.car_class=="roba2"){
        efecto = "coger2";
        color = cartaSeleccionada.car_color;
        repMas2 = repetirMas2(idPartida);//Despues si la carta es +2 se sumara 1 a la columna del estado repmas2
    }else if(cartaSeleccionada.car_class=="roba4"){
        color = cambioColor();
        efecto = "coger4";
    }else if(cartaSeleccionada.car_class=="cambiocolor"){
        efecto = "normal";
        color = cambioColor();
    }else if(cartaSeleccionada.car_class=="cambiosentido"){
        direccionTurno = invertirOrdenPartida(idPartida);
        color = cartaSeleccionada.car_color;
        efecto = "normal";
    }else if(cartaSeleccionada.car_class=="saltoturno"){
        efecto = "saltarTurno";
        color = cartaSeleccionada.car_color;
    }else{
        color = cartaSeleccionada.car_color;
        efecto = "normal";
    }
}

module.exports = efectoCarta;