import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/iniciosesion.css";

function InicioSesion() {
    const location = useLocation();
    const { selectedCard } = location.state || {};

    const [nickname, setNickname] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [addedPlayers, setAddedPlayers] = useState([]); // Lista de jugadores añadidos
    const navigate = useNavigate();
    const [jugadoresInfo, setJugadoresInfo] = useState([]);

    // Manejar el cambio de imagen seleccionada
    const handleImageChange = (e) => {
        setSelectedImage(e.target.value);
    };

    // Función para registrar un jugador en la base de datos
    const registerPlayer = async (nickname) => {
        try {
            const response = await axios.post(`http://localhost:3001/login/${nickname}`);
            const newPlayer = { 
                id: response.data[0].id, 
                username: response.data[0].username, 
                cartas: 0, 
                selected: false,
                puntos: -1 
            };
            
            setJugadoresInfo(prevJugadores => [...prevJugadores, newPlayer]);
        } catch (error) {
            console.log(error);
            alert("Hubo un error al registrar el jugador.");
        }
    };

    // Función para obtener las partidas jugadas por un jugador
    const getPartidasJugadas = async (apodo) => {
        try {
            const response = await axios.get(`http://localhost:3001/getPartidasJugadas/${apodo}`);
            return response.data.partidasJugadas || 0; 

        } catch (error) {
            console.log(error);
            return 0; // Si hay un error, devolvemos 0 partidas jugadas
        }
    };

    // Guarda los nombres e IDs de los jugadores en el localStorage
    async function savePlayersInfo(idPartida) {
        try {
            const response = await axios.get(`http://localhost:3001/getOrdenFromGame/${idPartida}`);
            const orden = response.data;
            let sortedArray = [];
            for(let i=0; i<orden.length; i++){
                let item = jugadoresInfo.find(element => element.id===orden[i]);
                sortedArray.push(item);
            }
            setJugadoresInfo([]);
            sortedArray.forEach(element => {
                setJugadoresInfo(prevJugadores => [...prevJugadores, element]);
            });
            localStorage.setItem('jugadoresInfo', JSON.stringify(jugadoresInfo));
        } catch (error) {
            console.log(error);
        }
    }

    // Construye la URL para la petición de creación de partida
    async function buildStartGamePetition() {
        let peticion = `http://localhost:3001/createGame/${jugadoresInfo[0].id}/${jugadoresInfo[1].id}`;
        if (jugadoresInfo.length === 4) {
            peticion += `/${jugadoresInfo[2].id}/${jugadoresInfo[3].id}`;
        } else if (jugadoresInfo.length === 3) {
            peticion += `/${jugadoresInfo[2].id}`;
        }
        return peticion;
    }

    // Hace la petición para crear una partida
    const startGame = async () => {
        try {
            const peticion = await buildStartGamePetition();
            const response = await axios.put(peticion);
            const idPartida = response.data[0].idPartida;
            await savePlayersInfo(idPartida);
            localStorage.setItem('idPartida', idPartida);
            navigate("/VistaInGame");
        } catch (error) {
            console.log(error);
        }
    };

    // Añadir jugador
    const handleAddPlayer = async () => {
        if (!nickname.trim()) {
            alert("El apodo no puede estar vacío.");
            return;
        }

        if (addedPlayers.some((player) => player.nickname === nickname)) {
            alert("Este apodo ya ha sido usado. Introduce uno diferente.");
            return;
        }

        if (selectedImage && addedPlayers.some((player) => player.avatar === selectedImage)) {
            alert("Este avatar ya ha sido seleccionado. Elige uno diferente.");
            return;
        }

        if (addedPlayers.length < selectedCard) {
            const partidasJugadas = await getPartidasJugadas(nickname);
            setAddedPlayers((prevPlayers) => [
                ...prevPlayers,
                { nickname, avatar: selectedImage || "Sin avatar", partidasJugadas },
            ]);
            await registerPlayer(nickname); // Registrar el jugador en la base de datos
            setNickname(""); // Limpiar el campo de apodo
            setSelectedImage(""); // Limpiar la selección de avatar
        } else {
            alert("Ya se han añadido todos los jugadores.");
        }
    };

    // Obtener avatares disponibles
    const getAvailableAvatars = () => {
        const usedAvatars = addedPlayers.map((player) => player.avatar);
        return ["Azul", "Verde", "Rojo", "Amarillo"].filter((avatar) => !usedAvatars.includes(avatar));
    };

    return (
        <div className="inicio-sesion-wrapper">
            <div className="inicio-sesion-container">
                <h1>Bienvenido al juego</h1>
                {selectedCard && <h2>Número de jugadores: {selectedCard}</h2>}
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label htmlFor="nickname">Apodo:</label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Introduce tu apodo"
                        />
                    </div>

                    <div className="image-selector">
                        <label>Selecciona tu avatar:</label>
                        <select value={selectedImage} onChange={handleImageChange}>
                            <option value="">Elige una imagen</option>
                            {getAvailableAvatars().map((avatar) => (
                                <option key={avatar} value={avatar}>
                                    {avatar.charAt(0).toUpperCase() + avatar.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <button type="button" onClick={handleAddPlayer} disabled={addedPlayers.length >= selectedCard}>
                            Añadir Jugador
                        </button>
                        <span>
                            {addedPlayers.length} / {selectedCard} jugadores añadidos
                        </span>
                    </div>

                    <button type="button" disabled={addedPlayers.length < selectedCard} onClick={startGame}>
                        Iniciar Juego
                    </button>
                </form>

                {/* Lista de jugadores añadidos */}
                <div className="players-list">
                    <h2>Jugadores añadidos:</h2>
                    <ul>
                        {addedPlayers.map((player, index) => (
                            <li key={index}>
                                {player.nickname} - Avatar: {player.avatar} - Partidas Jugadas: {player.partidasJugadas}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default InicioSesion;
