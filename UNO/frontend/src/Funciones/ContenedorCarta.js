import React from 'react';
import "../styles/presentacion.css"; // Asegúrate de que el CSS esté importado

// Componente reutilizable para el contenedor cuadrado
function ContenedorCarta({ children }) {
  return (
    <div className="contenedor-carta">
      {children} {/* Aquí se insertan los elementos hijos como el logo y el botón */}
    </div>
  );
}

export default ContenedorCarta;
