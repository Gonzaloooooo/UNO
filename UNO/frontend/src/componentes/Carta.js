import "../styles/carta.css"

function Carta(props) {
    return (
        <div 
            onClick={props.func} 
            style={{
                width: "12vh",
                height: "18vh",
                display: "flex",
                justifyContent: "center",
                fontSize: "small",
                color: "white",
                margin: "-1.2vw", // Reducido para que las cartas estén más juntas
                transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) translateX(-20px)"; // Sube y se mueve a la izquierda
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) translateX(0)"; // Vuelve a su posición original
            }}
        >
            <img
                src={`/${props.carUrl.replace(/\\/g, "/").replace("UNO/frontend/public/", "")}`}
                alt={`Carta ${props.carNumber}`}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
                onError={(e) => {
                    console.error("Error cargando imagen:", props.carUrl);
                    e.target.src = "/Imagenes-Cartas/cartas_negras/reverso.png"; // Imagen de respaldo
                }}
            />
        </div>
    );
}

export default Carta;
