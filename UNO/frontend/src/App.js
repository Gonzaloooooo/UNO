import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Rutas de React Router
import Presentacion from "./Paginas/Presentacion"; // Importa el componente Presentacion
import EleccJug from "./Paginas/Eleccjug"; // Importa el componente EleccJug
import InicioSesion from "./Paginas/Iniciosesion"; // Importa el componente InicioSesion
import VistaInGame from "./Paginas/VistaInGame";
import VistaFinal from "./Paginas/VistaFinal";

function App() {
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje del backend

  // Realizar la solicitud al backend cuando se monta el componente
  /*
  useEffect(() => {
    axios
      .post("http://localhost:3000/login/:username") // Solicitud al backend
      .then((response) => {
        setMessage(response.data.message); // Establecer el mensaje del backend
      })
      .catch((error) => {
        console.error("Error al conectar con el backend:", error);
      });
  }, []);
  */
  return (
    <Router> {/* Router para manejar las rutas */}
      <div>
        {/* Rutas para las páginas */}
        <Routes>
          <Route path="/" element={<Presentacion />} /> {/* Página de presentación */}
          <Route path="/EleccJug" element={<EleccJug />} /> {/* Página de elección de jugadores */}
          <Route path="/InicioSesion" element={<InicioSesion />} /> {/* Página de inicio de sesión */}
          <Route path="/VistaInGame" element={<VistaInGame/>}/>
          <Route path="/VistaFinal" element={<VistaFinal/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
