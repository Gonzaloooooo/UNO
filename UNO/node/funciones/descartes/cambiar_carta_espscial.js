const determinarTipoDeCarta = (ultimaCarta) => {
    if (!ultimaCarta || !ultimaCarta[0] || !ultimaCarta[0].car_class) {
        return 'No se proporcionó información válida sobre la carta.';
    }

    const tipoCarta = ultimaCarta[0].car_class;

    // Clasificación del tipo de carta
    switch (tipoCarta) {
        case 'numerica':
            return 'normal';
        case 'roba2':
            return 'coger2';
        case 'roba4':
            return 'coger4.';
        case 'saltoturno':
            return 'saltarTurno';
        default:
            return 'La carta tiene un tipo desconocido.';
    }
};

// Ejemplo de uso
const ultimaCarta = [
    {
        car_class: 'roba2', // Cambia este valor para probar diferentes tipos de cartas
    },
];

const resultado = determinarTipoDeCarta(ultimaCarta);
console.log(resultado);


