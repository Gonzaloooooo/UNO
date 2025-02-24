import Carta from "../componentes/Carta"
import OrdenTurnos from "../componentes/OrdenTurno";
import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/vistaingame.css";
/*const cambiarImagen = require('../Animaciones/')*/

function VistaInGame() {
    const [jugadoresInfo, setJugadoresInfo] = useState(JSON.parse(localStorage.getItem('jugadoresInfo')));
    const idPartida = localStorage.getItem('idPartida');
    const navigate = useNavigate();

    // Estado para toda la información
    const [playerInfo, setPlayerInfo] = useState([]);

    // Estado para rederizar la mano cuando se roba
    const[cartaRobar, setcartaRobar] =useState(false);

    // Estado para la última carta jugada
    const [lastCardPlayed, setLastCardPlayed] = useState(null);

    // Estado de la partida
    const [estado, setEstado] = useState(null);

    // Orden de la partida
    const [orden, setOrden] = useState([]);

    // Estado para la mano del jugador
    const [hand, setHand] = useState([]);

    // Estado para la visibilidad del botón UNO
    const [visible, setVisible] = useState(false);

    // Estado para guardar el color seleccionado
    const [mostrarSelectorColor, setMostrarSelectorColor] = useState(false);
    const [colorSeleccionado, setColorSeleccionado] = useState(null);

    const [invertido, setInvertido] = useState(false);

    // Timer para cuando aparezca el botón UNO
    let unoButtonTimer = useRef(null);

    // Start timer
    const startUnoButtonTimer = () => {
        unoButtonTimer.current = setTimeout(async () => {
            try {
                const idPlayer = orden.at(estado.est_turno_actual);
                await axios.put(`http://localhost:3001/robarCarta2/${idPlayer}/${idPartida}`);
                await axios.put(`http://localhost:3001/robarCarta2/${idPlayer}/${idPartida}`);
            } catch (error) {
                console.error("Error al robar una carta:", error);
                alert("Error al robar una carta.");
            } finally{
                setVisible(false);
                setcartaRobar(!cartaRobar);
            }
        }, 2500);
    }

    // Reset timer
    const clearUnotButtonTimer = async() => {
        if(unoButtonTimer.current){
            clearTimeout(unoButtonTimer.current);
        }
    }
    

    // Función para robar una carta
    const robarCarta = useCallback(async () => {
        const idPlayer = orden.at(estado.est_turno_actual);
        try {
            await axios.put(`http://localhost:3001/robarCarta2/${idPlayer}/${idPartida}`);
        } catch (error) {
            console.error("Error al robar una carta:", error);
            alert("Error al robar una carta.");
        } finally{
            setcartaRobar(!cartaRobar);
        }
    });

    // 
    useEffect(() => {
        
    }, []);

    // Orden y estado de la partida
    useEffect(() => {
        if (!idPartida) return;
        const fetchData = async () => {
            try {
                let ordenResponse = await axios.get(`http://localhost:3001/getOrdenFromGame/${idPartida}`);
                let response = await axios.get(`http://localhost:3001/getEstadoFromGame/${idPartida}`);
                setOrden(ordenResponse.data);
                setEstado(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [idPartida])

    // Mano del jugador y última carta
    useEffect(() => {
        if (!idPartida || !estado || !orden) return;
        const idPlayer = orden.at(estado.est_turno_actual);
        const fetchData = async () => {
            try {
                
                // Comprobar si puede jugar (comprobar efecto)
                // Comprobar si hay un efecto activo
                let efectoResponse = await axios.post(
                    `http://localhost:3001/checkEffect/${idPlayer}/${idPartida}`,
                    { estado }
                );                
                if (efectoResponse.data.efectoActivo) {  
                    //await esperar(4000);
                    const turno = await avanzaTurno(estado.est_turno_actual,estado.est_invertir_orden);
                    const nuevoEstado = { 
                        fk_par_est_id_partida: idPartida,
                        est_cogerdosrep: 0,
                        est_efecto: 'normal',
                        est_turno_actual: turno,
                        est_colorultimaCarta: estado.est_colorultimaCarta
                    };
                    await axios.post(`http://localhost:3001/updateEstado`, nuevoEstado);
                    setEstado(nuevoEstado);
                }  else{
                    // Mano del jugador 
                    let manoResponse = await axios.get(`http://localhost:3001/getCardsFromPlayer/${idPlayer}/${idPartida}`);
                    setHand(manoResponse.data);
                    
                    // Última carta jugada
                    let ultCartaResponse = await axios.get(`http://localhost:3001/getLastCardPlayedFromGameOrm/${idPartida}`);
                    setLastCardPlayed(ultCartaResponse.data);
                    
                    // Botón Uno
                    if(manoResponse.data.length == 1){
                        setVisible(true);
                        startUnoButtonTimer();
                    }

                    const jugadores = jugadoresInfo.map((element) => element);
                    for(let i = 0; i<jugadores.length; i++){
                        if(jugadores[i].id===idPlayer){
                            jugadores[i].selected = true;
                            jugadores[i].cartas = manoResponse.data.length;
                        }
                    }
                    setJugadoresInfo(jugadores);
                }  
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    }, [idPartida, estado, orden, cartaRobar])

    function esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Animación del fondo
    useEffect(() => {
        const cargarFlechas = async () => {
            try {
                let response;
                if(invertido){
                    response = await fetch('/flechasInv.html');
                } else{
                    response = await fetch('/flechas.html');
                }
                const html = await response.text();
                document.getElementById('contenedor-flechas').innerHTML = html;
            } catch (error) {
                console.error("Error al cargar flechas.html:", error);
            }
        };

        cargarFlechas();
    }, [invertido]);  // Este useEffect solo se ejecuta una vez al montar el componente
    
    let resolverColorSeleccionado = null;

    async function esperarColorSeleccionado() {
        return new Promise((resolve) => {
            resolverColorSeleccionado = resolve;
            setMostrarSelectorColor(true);
        });
    }

    async function elegirColor() {
        return new Promise((resolve) => {
            const coloresValidos = ["rojo", "azul", "amarillo", "verde"];
    
            function recibirMensaje(event) {
                if (coloresValidos.includes(event.data)) {
                    window.removeEventListener("message", recibirMensaje);
                    setMostrarSelectorColor(false);
                    resolve(event.data);
                }
            }
    
            window.addEventListener("message", recibirMensaje);
            setMostrarSelectorColor(true);
        });
    }

    useEffect(() => {
        if (colorSeleccionado) {
            console.log("Nuevo color seleccionado:", colorSeleccionado);
            // Aquí podrías llamar a una función async si lo necesitas
        }
    }, [colorSeleccionado]);

    // Click en carta
    const playCard = useCallback(async (index) => {
        try {
            let turnoActual = estado.est_turno_actual;
            let efectillo;
            if(lastCardPlayed.car_class==="roba2"){
                efectillo="coger2";
            };
            console.log("efectillo: ",efectillo);
            let cartaValida = await axios.post("http://localhost:3001/compareCards", {
                lastCard: lastCardPlayed,
                newCard: hand[index],  
                efect: efectillo,
                colorEstado: hand[index].car_color
            });
            console.log(estado.est_efecto)

            if(cartaValida.data){
                // Jugar la carta seleccionado
                await axios.put(`http://localhost:3001/playCardFromPlayer/${orden[estado.est_turno_actual]}/${idPartida}/${index}`);
                
                // Esconder el botón de UNO si está activo
                setVisible(false); 
                
                //Efecto que causa la carta
                let efecto;
                let coger2 = estado.est_cogerdosrep;
                let sentidoInverso = estado.est_invertir_orden;
                let color;

                if(hand[index].car_class==="roba2"){
                    efecto = "coger2";
                    coger2++;
                    color=hand[index].car_color;
                }else if(hand[index].car_class==="roba4"){
                    efecto = "coger4";
                    color = await elegirColor();
                    console.log("el color de ahora es el: ",color);
                }else if(hand[index].car_class==="cambiocolor"){
                    efecto = "normal";
                    color = await elegirColor();
                    console.log("el color de ahora es el: ",color);
                }else if(hand[index].car_class==="cambiosentido"){
                    efecto = "normal";
                    color=hand[index].car_color;
                    sentidoInverso = !sentidoInverso;
                    setInvertido(!invertido);
                }else if(hand[index].car_class==="saltoturno"){
                    efecto = "saltarTurno";
                    color=hand[index].car_color;
                }else{
                    efecto = "normal";
                    color=hand[index].car_color;
                }

                // Avanza el turno (cambiar por la funcion cuando este corregida)
                const nuevoTurno = await avanzaTurno(turnoActual, sentidoInverso);

                const jugadores = jugadoresInfo.map((element) => element);
                    for(let i = 0; i<jugadores.length; i++){
                        if(jugadores[i].id===orden[estado.est_turno_actual]){
                            jugadores[i].selected = false;
                            jugadores[i].cartas = hand.length-1;
                        }
                    }
                setJugadoresInfo(jugadores);

                // Actualizar la tabla estado(añadir efecto para la siguiente)
                const newEstado = { 
                    ...estado,
                    est_colorultimaCarta: color,
                    est_turno_actual: nuevoTurno, 
                    est_efecto: efecto,
                    est_cogerdosrep: coger2,
                    est_ultima_carta: hand[index].pk_car_id, 
                    est_invertir_orden: sentidoInverso
                };

                setEstado(newEstado);
                
                // Enviar el estado como JSON en el cuerpo (NO en la URL)
                await axios.post("http://localhost:3001/updateEstado", newEstado);
                
                

                // Fin del juego
                if(hand.length == 1){
                    await axios.post(`http://localhost:3001/finishGame/${idPartida}/${orden[estado.est_turno_actual]}`);
                    for (const element of jugadoresInfo) {
                        const response = await axios.get(`http://localhost:3001/getScoreFromPlayer/${idPartida}/${element.id}`);
                        element.puntos = response.data.puntuacion;
                    }
                    localStorage.setItem('jugadoresInfo', JSON.stringify(jugadoresInfo));
                    navigate('/VistaFinal');
                }

                setEstado(newEstado);
            }
        } catch(error){
            console.log(error);
        }
    });


    async function avanzaTurno(turnoActual, sentidoInverso) {
        if(!sentidoInverso){
            if(turnoActual<jugadoresInfo.length-1){
                turnoActual++;
            } else{
                turnoActual = 0;
            };
        }else{
            if(turnoActual!==0){
                turnoActual--;
            } else{
                turnoActual = jugadoresInfo.length-1;
            };
        }
        return turnoActual
    };

    const handleJugarCarta = async (index) => {
        await playCard(index);
    }

    const handleClickBotonUno = async () => {
        clearUnotButtonTimer();
        setVisible(false);
    }

    return (
        <div className="tablero">
            <OrdenTurnos jugadoresInfo={jugadoresInfo}/>
            <div className="botonUno" onClick={handleClickBotonUno}
            style={{
                backgroundImage:"url(/Fotos/Boton_Uno.png)",
                backgroundSize:"cover",
                backgroundPosition:"center",
                width:"10vw",
                height:"10vw",
                position:"absolute",
                visibility: (visible)?'visible':'hidden',
                left: "80vw",
                top: "45vh"
            }}></div>

            <div className="animacion-fondo">
                <div id="contenedor-flechas"></div> {/* Aquí se cargará la animación */}
            </div>
            <div className="descartes">
                {lastCardPlayed ? <Carta carUrl={lastCardPlayed.car_url} carNumber={lastCardPlayed.car_number} colorCode={lastCardPlayed.car_color_code} /> : <p>Cargando...</p>}
            </div>
            <div className="hand">
                {hand.length > 0 ? (
                    hand.map((element, index) => (
                        <Carta
                            key={index}
                            carUrl={element.car_url}
                            carNumber={element.car_number}
                            colorCode={element.car_color_code}
                            class={element.car_class}
                            func={() => handleJugarCarta(index)}
                        />
                    ))
                ) : (
                    <p>Cargando cartas...</p>
                )}

                {mostrarSelectorColor && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                        <iframe 
                            src="/color.html" 
                            width="400" 
                            height="500" 
                            border="none"
                        />
                        </div>
                    </div>
                )}
            </div>
            {/* Añadir la imagen para robar una carta */}
            <div className="robar-carta" onClick={robarCarta}>
                <img src="/Imagenes-Cartas/cartas_negras/reverso.png" alt="Robar Carta" />
            </div>
        </div>
    );
}

export default VistaInGame;