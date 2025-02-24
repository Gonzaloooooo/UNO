import { useState, useEffect } from "react";
import '../styles/ordenturno.css';

function OrdenTurnos(props) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    if (props.jugadoresInfo) {
      setJugadores(props.jugadoresInfo);
    }
  }, [props.jugadoresInfo]);

  return (
    <div id="OrdenTurno">
      <h2>Orden de Turnos</h2>
      {jugadores.length > 0 ? (
          jugadores.map((jugador) => (
            <div id={(jugador.selected)?'selected':'notselected'} className="wrapperJugador">
              <div className="jugador" id={'jugador'+jugador.id}>
                <div className="left">{jugador.username}</div>
                <div className="right">{'Cartas: '+jugador.cartas}</div>
              </div>
              
            </div>
          ))
      ) : (
        <p>Cargando jugadores...</p>
      )}  
    </div>
  );
}

export default OrdenTurnos;
