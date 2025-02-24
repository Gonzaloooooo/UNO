const comprobarEfecto = require('../baraja/comprobarEfecto.js');  // Importamos la función a testear
const obtenerCartas = require('../baraja/obtenerCartas.js'); // Función que obtiene cartas del mazo
const actualizarManoJugador = require('../jugadores/actualizarManoJugador.js'); // Función que actualiza la mano del jugador
const verCartasJugador = require('../jugadores/verCartasJugador.js'); // Función que permite ver las cartas de un jugador
const comprobarJugabilidadMas2 = require('../baraja/comprobarJugabilidadMas2.js'); // Función que verifica si un jugador tiene un +2 en su mano

// Mockeamos (simulamos) las funciones externas para simular su comportamiento sin ejecutarlas realmente
jest.mock('../baraja/obtenerCartas.js'); // Simulamos obtenerCartas para evitar que acceda a la base de datos o lógica real
jest.mock('../jugadores/actualizarManoJugador.js'); // Simulamos actualizarManoJugador para evitar modificar datos reales
jest.mock('../jugadores/verCartasJugador.js'); // Simulamos verCartasJugador para controlar la información de la mano del jugador
jest.mock('../baraja/comprobarJugabilidadMas2.js'); // Simulamos comprobarJugabilidadMas2 para testear la lógica de respuesta sin ejecutarla

// Describimos el conjunto de pruebas para la función comprobarEfecto
describe('comprobarEfecto', () => {
    const idPartida = 'partida123'; // ID de prueba para la partida
    const idJugador = 'jugador456'; // ID de prueba para el jugador

    // Antes de cada test, limpiamos los mocks para evitar contaminación entre pruebas
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Caso de prueba: Si el efecto es "saltarTurno", la función debe devolver true
    test('debe devolver true si el efecto es "saltarTurno"', async () => {
        const estado = { est_efecto: 'saltarTurno' }; // Simulamos un estado con efecto "saltarTurno"
        const resultado = await comprobarEfecto(estado, idPartida, idJugador);
        expect(resultado).toBe(true); // Validamos que el resultado sea true
    });

    // Caso de prueba: Si el efecto es "coger4", se deben añadir 4 cartas y devolver true
    test('debe añadir 4 cartas y devolver true si el efecto es "coger4"', async () => {
        obtenerCartas.mockResolvedValue(['carta1', 'carta2', 'carta3', 'carta4']); // Simulamos la obtención de 4 cartas
        actualizarManoJugador.mockResolvedValue(); // Simulamos la actualización de la mano del jugador

        const estado = { est_efecto: 'coger4' }; // Definimos el estado con efecto "coger4"
        const resultado = await comprobarEfecto(estado, idPartida, idJugador);

        expect(obtenerCartas).toHaveBeenCalledWith(4, idPartida); // Validamos que se pidieron 4 cartas
        expect(actualizarManoJugador).toHaveBeenCalledTimes(4); // La función debe haberse llamado 4 veces (una por carta)
        expect(resultado).toBe(true); // La función debe devolver true
    });

    // Caso de prueba: Si el efecto es "coger2" y el jugador NO tiene un +2, debe añadir cartas y devolver true
    test('si el efecto es "coger2" y el jugador NO tiene +2, debe añadir cartas y devolver true', async () => {
        verCartasJugador.mockResolvedValue(['cartaNormal']); // Simulamos que el jugador no tiene un +2
        comprobarJugabilidadMas2.mockResolvedValue(false); // Se simula que el jugador no puede encadenar +2
        obtenerCartas.mockResolvedValue(['carta1', 'carta2']); // Se simula la obtención de 2 cartas
        actualizarManoJugador.mockResolvedValue(); // Se simula la actualización de la mano

        const estado = { est_efecto: 'coger2', est_cogerdosrep: 1 }; // Definimos estado con "coger2" y 1 repetición
        const resultado = await comprobarEfecto(estado, idPartida, idJugador);

        expect(verCartasJugador).toHaveBeenCalledWith(idJugador, idPartida); // Validamos que se consultaron las cartas del jugador
        expect(comprobarJugabilidadMas2).toHaveBeenCalledWith(['cartaNormal']); // Se verificó si tenía un +2
        expect(obtenerCartas).toHaveBeenCalledWith(2, idPartida); // Se pidieron 2 cartas
        expect(actualizarManoJugador).toHaveBeenCalledTimes(2); // Se añadieron 2 cartas
        expect(resultado).toBe(true); // La función debe devolver true
    });

    // Caso de prueba: Si el efecto es "coger2" y el jugador tiene un +2, NO debe añadir cartas y debe devolver false
    test('si el efecto es "coger2" y el jugador tiene +2, NO debe añadir cartas y debe devolver false', async () => {
        verCartasJugador.mockResolvedValue(['+2']); // Simulamos que el jugador tiene un +2 en su mano
        comprobarJugabilidadMas2.mockResolvedValue(true); // Simulamos que el jugador puede encadenar el +2

        const estado = { est_efecto: 'coger2', est_cogerdosrep: 1 }; // Definimos estado con efecto "coger2"
        const resultado = await comprobarEfecto(estado, idPartida, idJugador);

        expect(verCartasJugador).toHaveBeenCalledWith(idJugador, idPartida); // Se verificó que se consultaron las cartas del jugador
        expect(comprobarJugabilidadMas2).toHaveBeenCalledWith(['+2']); // Se revisó si tenía un +2
        expect(obtenerCartas).not.toHaveBeenCalled(); // No se deben obtener cartas
        expect(actualizarManoJugador).not.toHaveBeenCalled(); // No se debe actualizar la mano
        expect(resultado).toBe(false); // La función debe devolver false
    });

    // Caso de prueba: Si no hay efecto especial, la función debe devolver false
    test('debe devolver false si no hay efecto especial', async () => {
        const estado = { est_efecto: 'ninguno' }; // Estado sin efecto especial
        const resultado = await comprobarEfecto(estado, idPartida, idJugador);
        expect(resultado).toBe(false); // La función debe devolver false
    });
});
