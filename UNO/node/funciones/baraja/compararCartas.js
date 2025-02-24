/**
 * Comprueba si una carta es jugable teniendo en cuenta la última carta jugada y el efecto actual (+2, +4, cambio de color, etc.).
 * 
 * @param {Object} ultimaCarta - Última carta jugada en la partida.
 * @param {Object} cartaSeleccionada - Carta que el jugador quiere jugar.
 * @param {string} efecto - Efecto actual en la partida (por ejemplo, "+2", "cambio de color").
 * @param {string} colorEstado - Color de la última carta jugada.
 * @returns {boolean} - Indica si la carta seleccionada es jugable (`true`) o no (`false`).
 */
async function compararCartas(ultimaCarta, cartaSeleccionada, efecto, colorEstado) {
    let cartaValida = false;
    console.log("Compara la carta asi",ultimaCarta, cartaSeleccionada, efecto, colorEstado)
    // Verifica que las cartas sean válidas
    if (!ultimaCarta || !cartaSeleccionada) return false;

    // 1. Si la última carta es "+2" y el efecto es "coger2", solo se puede jugar otra "+2"
    if (ultimaCarta.car_class === "roba2" && efecto === "coger2" && cartaSeleccionada.car_class === ultimaCarta.car_class) {
        cartaValida = true;

    // 2. Si la carta seleccionada tiene el mismo color que la última carta jugada
    } else if (ultimaCarta.car_color === cartaSeleccionada.car_color && efecto !== "coger2") {
        cartaValida = true;

    // 3. Si la carta seleccionada tiene el mismo número que la última carta jugada
    } else if (ultimaCarta.car_number !== null && ultimaCarta.car_number === cartaSeleccionada.car_number) {
        cartaValida = true;

    // 4. Si la última carta fue "+2" pero el efecto ya no es "coger2", se puede jugar otra "+2" o una carta del mismo color
    } else if (ultimaCarta.car_class === "roba2" && efecto !== "coger2" && 
               (cartaSeleccionada.car_class === ultimaCarta.car_class || cartaSeleccionada.car_color === ultimaCarta.car_color)) {
        cartaValida = true;

    // 5. Si la última carta fue un "cambio de sentido", se puede jugar otra igual o una carta del mismo color
    } else if (ultimaCarta.car_class === "cambiosentido" && 
               (cartaSeleccionada.car_class === ultimaCarta.car_class || cartaSeleccionada.car_color === ultimaCarta.car_color)) {
        cartaValida = true;

    // 6. Si la última carta fue un "salto de turno", se puede jugar otra igual o una carta del mismo color
    } else if (ultimaCarta.car_class === "saltoturno" && 
               (cartaSeleccionada.car_class === ultimaCarta.car_class || cartaSeleccionada.car_color === ultimaCarta.car_color)) {
        cartaValida = true;

    // 7. Si la carta seleccionada es negra (comodín o "+4"), siempre es jugable
    } else if (cartaSeleccionada.car_color === "negro") {
        cartaValida = true;

    // 8. Si la última carta fue un "+4", se puede jugar una carta del color establecido o jugar otro "+4"
    } else if (ultimaCarta.car_class === "roba4" && 
               (cartaSeleccionada.car_color === colorEstado || cartaSeleccionada.car_class === ultimaCarta.car_class)) {
        cartaValida = true;

    // 9. Si la última carta fue un "cambio de color", se puede jugar una carta del color establecido o jugar otro "cambio de color"
    } else if (ultimaCarta.car_class === "cambiocolor" && 
               (cartaSeleccionada.car_color === colorEstado || cartaSeleccionada.car_class === ultimaCarta.car_class)) {
        cartaValida = true;
    }

    // Retorna si la carta es jugable o no
    return cartaValida;
}

// Exporta la función para su uso en otros módulos
module.exports = compararCartas;
