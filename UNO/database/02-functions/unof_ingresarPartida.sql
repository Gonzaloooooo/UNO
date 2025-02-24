/*
    -- Inserta un fila en la tablas unot_partidas_par

    Parámetros de entrada
    jug1 INT, jug2 INT, jug3 INT, jug4 INT --> Ids de los jugadores que van a participar en la partida

    RETURNS
    nuevo_id INT --> Id de la partida
*/
CREATE OR REPLACE FUNCTION unof_ingresarpartida(
    jug1 INT,
    jug2 INT,
    jug3 INT DEFAULT NULL,  -- Los jugadores 3 y 4 son opcionales
    jug4 INT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    nuevo_id INT;  -- ID de la nueva partida
BEGIN
    -- Insertar la nueva partida en la tabla de partidas
    INSERT INTO unot_partidas_par
    DEFAULT VALUES
    RETURNING pk_par_id INTO nuevo_id;

    -- Insertar el primer jugador (jug1) y asociarlo con la nueva partida
    INSERT INTO unot_partidasjugadores_pju (fk_par_pju_id_partida, fk_jug_pju_id_jugador)
    SELECT nuevo_id, jug1;

    -- Insertar el segundo jugador (jug2)
    INSERT INTO unot_partidasjugadores_pju (fk_par_pju_id_partida, fk_jug_pju_id_jugador)
    SELECT nuevo_id, jug2;

    -- Si el jugador 3 es proporcionado, insertarlo
    IF jug3 IS NOT NULL THEN
        INSERT INTO unot_partidasjugadores_pju (fk_par_pju_id_partida, fk_jug_pju_id_jugador)
        SELECT nuevo_id, jug3;
    END IF;

    -- Si el jugador 4 es proporcionado, insertarlo
    IF jug4 IS NOT NULL THEN
        INSERT INTO unot_partidasjugadores_pju (fk_par_pju_id_partida, fk_jug_pju_id_jugador)
        SELECT nuevo_id, jug4;
    END IF;

	-- Se crea un estado para la partida
	PERFORM unof_crear_estado(nuevo_id);
	
	-- Se crea un mazo nuevo para la partida
	PERFORM unof_crear_mazo(nuevo_id);
	
    -- Retornar el ID de la nueva partida
    RETURN nuevo_id;
END;
$$ LANGUAGE plpgsql;