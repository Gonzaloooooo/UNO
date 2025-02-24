import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de usar useNavigate

export function useCardSelection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  // Maneja el clic en la carta
  const handleCardClick = (number) => {
    setSelectedCard(number);
  };

  // Maneja el clic en el botón "Continuar"
  const handleContinueWithSelection = () => {
    if (selectedCard) {
      // Redirige a la página de InicioSesion con el estado de selectedCard
      navigate("/InicioSesion", { state: { selectedCard } });
    } else {
      alert("Por favor, selecciona el número de jugadores");
    }
  };

  return { selectedCard, handleCardClick, handleContinueWithSelection };
}
