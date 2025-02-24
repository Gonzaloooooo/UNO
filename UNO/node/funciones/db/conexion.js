const pgpLib = require('pg-promise'); // Importa la librería pg-promise

let pgp; // Variable para la instancia de pg-promise
let db;  // Variable para la conexión a la base de datos

// Verifica si ya existe una instancia global de la base de datos
if (!global.dbInstance) {
    pgp = pgpLib(); // Crea una nueva instancia de pg-promise
    
    // Configura la conexión a la base de datos con los parámetros de conexión
    db = pgp({
        host: 'localhost',   // Servidor de la base de datos
        port: 5432,          // Puerto por defecto de PostgreSQL
        database: 'uno',     // Nombre de la base de datos
        user: 'db_user',     // Usuario de la base de datos
        password: 'db_user', // Contraseña del usuario
    });
    
    global.dbInstance = db; // Guarda la instancia en global para reutilizarla
} else {
    db = global.dbInstance; // Si ya existe, reutiliza la conexión existente
}

module.exports = db; // Exporta la conexión para usarla en otros módulos
