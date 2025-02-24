/*
	-- Comprueba que un jugador exista en la base de datos y si no existe lo inserta en la base de datos y devuelve false. Si existe devuelve true--

	Parámetros de entrada
	apodo TEXT --> Apodo del jugador que se quiere buscar en la base de datos.

	Return
	jugador_existe BOOLEAN --> Indica si el jugador buscado existe. 
*/
CREATE OR REPLACE FUNCTION unof_registrar_jugador(apodo TEXT)
RETURNS BOOLEAN AS $$
DECLARE
	jugador_existe BOOLEAN DEFAULT FALSE;
	id_jugador INT;
BEGIN
	SELECT pk_jug_id FROM unot_jugadores_jug INTO id_jugador WHERE jug_apodo = apodo;
	IF id_jugador IS NOT NULL THEN
		/*Jugador existe*/
		jugador_existe = TRUE;
	ELSE
		INSERT INTO unot_jugadores_jug(jug_apodo) VALUES(apodo);
	END IF;
	RETURN jugador_existe;
END;
$$ LANGUAGE plpgsql;