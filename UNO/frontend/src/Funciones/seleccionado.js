const handleContinueWithSelection = () => {
    if (selectedCard) {
      // Si hay una selección válida, redirige a la página de inicio de sesión
      navigate("/InicioSesion", { state: { selectedCard } });
    } else {
      // Si no se ha seleccionado un número de jugadores, muestra un mensaje de alerta
      alert("Por favor, selecciona el número de jugadores");
    }
  };
  