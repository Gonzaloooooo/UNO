import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import ContenedorCarta from "../Funciones/ContenedorCarta"; // Ruta corregida

function Presentacion() {
  const navigate = useNavigate();

  const handleJugarClick = () => {
    navigate("/EleccJug"); // Navega a la página de elección de jugadores
  };

  return (
    <ContenedorCarta>
      <div className="logo">
        <img
          src="/Fotos/UNO_Logo.svg.png" // Asegúrate de que la ruta del logo esté correcta
          alt="Logo de UNO"
        />
      </div>
      <button className="boton-jugar" onClick={handleJugarClick}>
        Jugar
      </button>
    </ContenedorCarta>
  );
}

export default Presentacion;
