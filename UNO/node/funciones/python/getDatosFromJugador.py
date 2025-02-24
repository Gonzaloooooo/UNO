import psycopg2
import json
import sys

def get_partidas_jugadas(apodo):
    try:
        conn = psycopg2.connect(
            dbname="uno",
            user="db_user",
            password="db_user",
            port=5432,
            host="localhost"
        )
        cursor = conn.cursor()

        query = """
            SELECT COUNT(DISTINCT p.pk_par_id) 
            FROM unot_partidas_par p
            JOIN unot_partidasjugadores_pju pj ON p.pk_par_id = pj.fk_par_pju_id_partida
            JOIN unot_jugadores_jug j ON pj.fk_jug_pju_id_jugador = j.pk_jug_id
            WHERE j.jug_apodo = %s;
        """
        cursor.execute(query, (apodo,))
        partidas_jugadas = cursor.fetchone()[0]

        cursor.close()
        conn.close()

        return json.dumps({"partidasJugadas": partidas_jugadas})

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No se proporcionó un apodo"}))
        sys.exit(1)

    apodo = sys.argv[1]
    print(get_partidas_jugadas(apodo))
