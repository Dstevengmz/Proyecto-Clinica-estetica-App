import { useCarrito } from "../../../contexts/CarritoContext";
import { useNavigate } from "react-router-dom";
import { usePerfilUsuario } from "../../../hooks/usePerfilUsuario";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
function Carrito() {
  const { usuario } = usePerfilUsuario();
  const { carrito, eliminarDelCarrito, limpiarCarrito } = useCarrito();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const verificarHistorialMedico = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/apihistorialmedico/buscarhistorialclinicoporusuario/${usuario.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data ? true : false;
    } catch (error) {
      console.log("Error al verificar el historial médico:", error);
      return false;
    }
  };
  const irACita = async () => {
    const tieneHistorial = await verificarHistorialMedico();
    if (tieneHistorial) {
      navigate("/crearcita");
    } else {
      navigate("/crearhistorialclinico");
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Mi Carrito</h2>
      {carrito.length === 0 ? (
        <p>No tienes procedimientos en tu carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>Nombre: {item.procedimiento?.nombre}</strong>
                  <br />
                  <strong>Precio: {item.procedimiento?.precio}</strong>
                  <br />
                  <span className="text-muted">
                    Descripcion : {item.procedimiento?.descripcion}
                  </span>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button onClick={limpiarCarrito} className="btn btn-warning">
            Limpiar carrito
          </button>
          <button className="btn btn-primary ms-4" onClick={irACita}>
            Realizar Cita
          </button>
        </>
      )}
    </div>
  );
}

export default Carrito;