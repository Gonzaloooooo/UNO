import { useState } from 'react';

// Esta función maneja el apodo y la imagen seleccionada
export function useNicknameAndAvatar() {
  const [nickname, setNickname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // Maneja el cambio del apodo
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // Maneja el cambio de la imagen seleccionada
  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !selectedImage) {
      alert("Por favor, ingresa un apodo y selecciona una imagen.");
    } else {
      alert(`¡Bienvenido, ${nickname}! Has seleccionado la imagen: ${selectedImage}`);
    }
  };

  return { nickname, selectedImage, handleNicknameChange, handleImageChange, handleSubmit };
}
