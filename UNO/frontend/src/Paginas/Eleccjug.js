import React from "react";
import { useCardSelection } from "../Funciones/seleccioncarta"; // Usa el hook para manejar la selección de cartas
import "../styles/elecc_jug.css"; // Importa los estilos CSS
import ContenedorCarta from "../Funciones/ContenedorCarta"; // Asegúrate de que esta ruta sea correcta

function EleccJug() {
  const { selectedCard, handleCardClick, handleContinueWithSelection } = useCardSelection(); // Usamos el hook

  return (
    <ContenedorCarta>
      <h1>Selecciona el número de jugadores</h1>
      <div className="cards-container">
        <div 
          className={`card ${selectedCard === 2 ? 'selected' : ''}`} 
          onClick={() => handleCardClick(2)}
          data-number="2"
        ></div>
        <div 
          className={`card ${selectedCard === 3 ? 'selected' : ''}`} 
          onClick={() => handleCardClick(3)}
          data-number="3"
        ></div>
        <div 
          className={`card ${selectedCard === 4 ? 'selected' : ''}`} 
          onClick={() => handleCardClick(4)}
          data-number="4"
        ></div>
      </div>
      <button onClick={handleContinueWithSelection}>Continuar</button>
    </ContenedorCarta>
  );
}

export default EleccJug;
