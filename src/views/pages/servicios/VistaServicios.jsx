import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCarrito } from "../../../contexts/CarritoContext";
const API_URL = import.meta.env.VITE_API_URL;

function VistaServicios() {
  const { id } = useParams();
  const [procedimiento, setProcedimiento] = useState(null);
  const [imagenActiva, setImagenActiva] = useState("");
  const [tabActiva, setTabActiva] = useState("description");
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/apiprocedimientos/buscarprocedimiento/${id}`)
      .then((res) => {
        setProcedimiento(res.data);
        setImagenActiva(`${API_URL}/${res.data.imagen}`);
      })
      .catch((err) => console.error("Error al obtener el procedimiento:", err));
  }, [id]);

  const manejoReserva = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/iniciarsesion");
    } else {
      agregarAlCarrito(procedimiento.id);
      alert("Agregado al carrito ✅");
      navigate("/servicios");
    }
  };
  if (!procedimiento) {
    return <p className="text-center mt-5">Cargando procedimiento...</p>;
  }
  return (
    <div className="container mt-5">
      <div className="card card-solid shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="col-12 mb-3">
                <img
                  src={imagenActiva}
                  className="product-image img-fluid rounded border"
                  alt="Imagen del procedimiento"
                />
              </div>
              <div className="col-12 product-image-thumbs d-flex gap-2">
                <div
                  className={`product-image-thumb border rounded p-1 ${
                    imagenActiva === `${API_URL}/${procedimiento.imagen}`
                      ? "active border-primary"
                      : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setImagenActiva(procedimiento.imagen)}
                >
                  <img
                    src={procedimiento.imagen}
                    // src={`${API_URL}/${procedimiento.imagen}`}
                    alt="Miniatura"
                    className="img-fluid"
                    style={{ height: "60px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <h3 className="my-3">{procedimiento.nombre}</h3>
              <p>{procedimiento.descripcion}</p>

              <h5 className="mt-3">Categoría</h5>
              <p>{procedimiento.categoria}</p>

              <div className="bg-dark  py-2 px-3 mt-4 rounded">
                <h4 className="mb-0 text-success fw-bold">
                  {Number(procedimiento.precio).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                  })}
                </h4>
                <small className="text-muted">
                  Duración: {procedimiento.duracion} minutos
                </small>
              </div>
              <div className="mt-4">
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={manejoReserva}
                >
                  <i className="fas fa-cart-plus me-2" />
                  Reservar Cita
                </button>
              </div>
            </div>
            {procedimiento.examenes_requeridos && (
              <div className="row mt-4">
                <nav className="w-100">
                  <div className="nav nav-tabs" id="product-tab" role="tablist">
                    <button
                      className={`nav-item nav-link ${
                        tabActiva === "description" ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setTabActiva("description")}
                      role="tab"
                    >
                      Examenes
                    </button>
                  </div>
                </nav>
                <div className="tab-content p-3" id="nav-tabContent">
                  {tabActiva === "description" && (
                    <div className="tab-pane fade show active" role="tabpanel">
                      <h5>Examenes Requeridos</h5>
                      <div className="mt-3">
                        <ol>
                          <li>Micronopia</li>
                          <li>Para la piel</li>
                          <li>Eliminacion</li>
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VistaServicios;
