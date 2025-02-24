/*
	-- Inserta una fila en la tabla unot_mazos_maz

	Parámetros de entrada
	idPartida INT --> Id de la partida a la que va a pertenecer el mazo

	RETURNS
	resultado INT --> Es 0 si no ha habido nigún error y -1 si sí.
*/
CREATE OR REPLACE FUNCTION unof_crear_mazo(idPartida INT)
RETURNS INT AS $$
DECLARE
	cartas JSONB;
	resultado INT = -1;
BEGIN
	SELECT jsonb_agg(random_cartas) 
	INTO cartas
	FROM (
		SELECT * 
		FROM unot_cartas_car 
		ORDER BY RANDOM()
	) AS random_cartas;
	
	INSERT INTO unot_mazos_maz (maz_cartas, fk_par_maz_id_partida) 
	VALUES(cartas, idPartida);
	resultado = 0;
	RETURN resultado; /* Se crea el mazo correctamente */
END;
$$ LANGUAGE plpgsql;