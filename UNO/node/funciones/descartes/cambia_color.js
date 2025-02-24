function obtenerColor(color) {
    switch (color) {
        case 1:
            return 'rojo';
        case 2:
            return 'amarillo';
        case 3:
            return 'verde';
        case 4:
            return 'azul'; 
        default:
            return 'se ha seleccionado un color no existente';
    }
}

// Ejemplo de uso
const colorSeleccionado = 3; // Cambia este valor para probar
console.log(obtenerColor(colorSeleccionado));