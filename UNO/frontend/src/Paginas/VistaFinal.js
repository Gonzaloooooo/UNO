import React, { useState } from "react";
import '../styles/vistafinal.css';

function VistaFinal(){
    const [jugadoresInfo, setJugadoresInfo] = useState(JSON.parse(localStorage.getItem('jugadoresInfo')));
    
    return(
        <div className="final">
            {jugadoresInfo.map((item)=>(
                <div className={(item.puntos===0)?'winner':'notWinner'}>
                    <div className="jugadorPuntos">
                        <div className="leftPuntos">{item.username}</div>
                        <div className="rightPuntos">{(item.puntos===0)?'Ganador':item.puntos}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VistaFinal;