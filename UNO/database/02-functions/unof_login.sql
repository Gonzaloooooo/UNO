/*
	-- Devuelve el id de un jugador que exista en la base de datos. Si no existe devuelve -1--

	Parámetros de entrada
	apodo TEXT --> Es el apodo del jugador que se quiere buscar en la base de datos

	Return
	id_jugador INT --> id del jugador
*/
CREATE OR REPLACE FUNCTION unof_login(apodo TEXT)
RETURNS INT AS $$
DECLARE
	id_jugador INT;
BEGIN
	SELECT pk_jug_id FROM unot_jugadores_jug INTO id_jugador WHERE jug_apodo = apodo;
	IF id_jugador IS NULL THEN
		id_jugador = -1;
	END IF;
	RETURN id_jugador;
END;
$$ LANGUAGE plpgsql;