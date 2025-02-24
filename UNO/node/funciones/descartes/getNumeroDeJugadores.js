const readline = require('readline');

async function getNumeroDeJugadores() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        function preguntarNumero() {
            rl.question('Introduce el número de jugadores (entre 2 y 4): ', (answer) => {
                const num = Number(answer);

                if (isNaN(num) || num < 2 || num > 4) {
                    console.log('El número debe ser entre 2 y 4.');
                    return preguntarNumero();
                }

                rl.close();
                resolve(num);
            });
        }

        preguntarNumero();
    });
}

module.exports = getNumeroDeJugadores;
