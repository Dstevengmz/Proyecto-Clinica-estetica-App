import { Form, Row, Col, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import horariosDisponibles from "../../../assets/js/HorariosDisponibles";
import estaOcupado from "../../../assets/js/HorarioEstaOcupado";
import useHorariosDisponible from "../../../hooks/useHorariosDisponible";
const API_URL = import.meta.env.VITE_API_URL;
import  useListarUsuario from "../../../hooks/useListaDeUsuarios"; 
import useCitaPorId from "../../../hooks/useEditarCita"; 
function EditarCitas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cita, hora: horaInicial, cargando: citaidcargando, error: erroridcita } = useCitaPorId(id, token);
  const { usuario, cargando } = useListarUsuario();
  const [cargandoActualizacion, setCargandoActualizacion] = useState(false);
  const [hora, setHora] = useState("");
  const [formulario, setFormulario] = useState({
    id_usuario: "",
    id_doctor: "",
    fecha: "",
    estado: "",
    tipo: "",
    observaciones: "",
    usuario: {},
    doctor: {},
  });
  const {
    horariosOcupados,
    cargando: cargandoHorarios,
    error,
  } = useHorariosDisponible(formulario.fecha, formulario.tipo, token);
  useEffect(() => {
    console.log("Estado del hook:", {
      fecha: formulario.fecha,
      tipo: formulario.tipo,
      horariosOcupados,
      cargandoHorarios,
      error,
      token: token ? "Hay token" : " No hay token",
    });
  }, [
    formulario.fecha,
    formulario.tipo,
    horariosOcupados,
    cargandoHorarios,
    error,
    token,
  ]);

  useEffect(() => {
    if (cita) {
      setFormulario({
        id_usuario: cita.id_usuario || "",
        id_doctor: cita.id_doctor || "",
        fecha: cita.fecha || "",
        estado: cita.estado || "",
        tipo: cita.tipo || "",
        observaciones: cita.observaciones || "",
        usuario: cita.usuario || {},
        doctor: cita.doctor || {},
      });
    }
    if (horaInicial) {
      setHora(horaInicial);
    }
  }, [cita, horaInicial]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    
    if (name === "fecha" || name === "tipo") {
      setHora("");
    }
  };

  const actualizarCita = async (e) => {
    e.preventDefault();

    if (!formulario.id_doctor) {
      alert("Por favor seleccione un doctor");
      return;
    }
    if (!formulario.tipo) {
      alert("Por favor seleccione el tipo de cita");
      return;
    }
    if (!formulario.fecha) {
      alert("Por favor seleccione una fecha");
      return;
    }
    if (!hora) {
      alert("Por favor seleccione una hora");
      return;
    }

    setCargandoActualizacion(true);
    const fechaCompleta = `${formulario.fecha} ${hora}:00`;
    try {
      await axios.patch(
        `${API_URL}/apicitas/editarcitas/${id}`,
        { ...formulario, fecha: fechaCompleta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Cita actualizada correctamente");
      navigate("/consultarcitas");
    } catch (err) {
      console.error("Error al actualizar cita:", err);
      const errorMessage = err.response?.data?.message || "No se pudo actualizar la cita";
      alert(errorMessage);
    } finally {
      setCargandoActualizacion(false);
    }
  };

  if (cargando || citaidcargando) {
    return (
      <Container>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando datos de la cita...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (erroridcita) {
    return (
      <Container>
        <div className="alert alert-danger mt-4" role="alert">
          <h4 className="alert-heading">Error al cargar la cita</h4>
          <p>{erroridcita}</p>
          <hr />
          <button 
            className="btn btn-outline-danger" 
            onClick={() => navigate("/consultarcitas")}
          >
            Volver a la lista de citas
          </button>
        </div>
      </Container>
    );
  }

  if (!cita) {
    return (
      <Container>
        <div className="alert alert-warning mt-4" role="alert">
          <h4 className="alert-heading">Cita no encontrada</h4>
          <p>La cita que intentas editar no existe o no tienes permisos para verla.</p>
          <hr />
          <button 
            className="btn btn-outline-warning" 
            onClick={() => navigate("/consultarcitas")}
          >
            Volver a la lista de citas
          </button>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <h2 className="mt-4">Editar Cita</h2>
      
      {/* Información del Usuario */}
      <Card className="mb-4">
        <Card.Body>
          <h5>Información del Usuario</h5>
          <Row>
            <Col md={6}>
              <p>
                <strong>Nombre:</strong> {formulario.usuario?.nombre || "No disponible"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Teléfono:</strong> {formulario.usuario?.telefono || "No disponible"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Dirección:</strong>{" "}
                {formulario.usuario?.direccion || "No registrada"}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Rol:</strong> {formulario.usuario?.rol || "No disponible"}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5>Información Actual de la Cita</h5>
          <Row>
            <Col md={3}>
              <p><strong>Estado:</strong> {formulario.estado}</p>
            </Col>
            <Col md={3}>
              <p><strong>Tipo:</strong> {formulario.tipo}</p>
            </Col>
            <Col md={3}>
              <p><strong>Fecha:</strong> {formulario.fecha}</p>
            </Col>
            <Col md={3}>
              <p><strong>Hora:</strong> {hora}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Form onSubmit={actualizarCita}>
        <Form.Group className="mb-3">
          <Form.Label>Doctor</Form.Label>
          <Form.Select
            name="id_doctor"
            value={formulario.id_doctor}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione un doctor</option>
            {usuario
              .filter((u) => u.rol === "doctor")
              .map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.nombre}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Select
            name="tipo"
            value={formulario.tipo}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione tipo</option>
            <option value="evaluacion">Evaluación</option>
            <option value="procedimiento">Procedimiento</option>
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={manejarCambio}
                min={new Date().toISOString().split('T')[0]} 
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Select
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              >
                <option value="">Seleccione una hora</option>
                {horariosDisponibles.map((h) => {
                  const horariosOcupadosFiltrados = horariosOcupados.filter(
                    (cita) => cita.id !== parseInt(id)
                  );
                  
                  const ocupado = estaOcupado(
                    h,
                    horariosOcupadosFiltrados,
                    cargandoHorarios,
                    formulario
                  );

                  return (
                    <option key={h} value={h} disabled={ocupado}>
                      {h} {ocupado ? "🟥 Ocupado" : "🟩 Disponible"}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Observaciones</Form.Label>
          <Form.Control
            type="text"
            name="observaciones"
            value={formulario.observaciones}
            onChange={manejarCambio}
          />
        </Form.Group>

        <button 
          type="submit" 
          className="btn btn-success me-2"
          disabled={cargandoActualizacion}
        >
          {cargandoActualizacion ? "Actualizando..." : "Actualizar"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/consultarcitas")}
          disabled={cargandoActualizacion}
        >
          Cancelar
        </button>
      </Form>
    </Container>
  );
}

export default EditarCitas;