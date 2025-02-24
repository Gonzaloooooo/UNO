/**
*/
CREATE OR REPLACE FUNCTION unof_crear_estado(idPartida INT)
RETURNS INT AS $$
DECLARE
	resultado INT = -1;
BEGIN
	INSERT INTO unot_estado_est(fk_par_est_id_partida) VALUES (idPartida);
	resultado = 0;
	RETURN resultado;
END;
$$ LANGUAGE plpgsql;