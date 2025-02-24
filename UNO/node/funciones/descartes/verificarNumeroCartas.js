function verificarNumeroCartas(numeroCartas) {
    if (numeroCartas === 0) {
        console.log('Llamar funcion de fin de partida');
    } else if (numeroCartas === 1) {
        console.log('Llamar funcion boton uno');
    } else {
        console.log('Seguir jugando');
    }
}

// Ejemplo de uso
const numero_cartas = 1; // Cambia el valor para probar diferentes casos
verificarNumeroCartas(numero_cartas);