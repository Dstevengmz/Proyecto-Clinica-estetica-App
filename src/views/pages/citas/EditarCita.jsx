import { Form, Row, Col, Card, Container, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import horariosDisponibles from "../../../assets/js/HorariosDisponibles";
import estaOcupado from "../../../assets/js/HorarioEstaOcupado";
import useHorariosDisponible from "../../../hooks/useHorariosDisponible";
import useListarUsuario from "../../../hooks/useListaDeUsuarios";
import useCitaPorId from "../../../hooks/useBuscarCita";
import Cargando from "../../../components/Cargando";
import InformacionUsuario from "../../../views/pages/usuarios/InformacionUsuario";
import useActualizarCita from "../../../hooks/useEditarCita";
import { useAuth } from "../../../contexts/AuthenticaContext";
import useCambiarEstadoCita from "../../../hooks/useCambiarEstadoCita";
function EditarCitas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { userRole } = useAuth();
  const isDoctor = (userRole || "").toString().toLowerCase() === "doctor";
  const [hora, setHora] = useState("");
  const [formulario, setFormulario] = useState({ id_usuario: "", id_doctor: "", fecha: "", estado: "", tipo: "", observaciones: "", examenes_requeridos: "", usuario: {}, doctor: {},
  });

  const { cita, hora: horaInicial, cargando: citaidcargando, error: erroridcita,
  } = useCitaPorId(id, token);
  const { usuario, cargando } = useListarUsuario();
  const { actualizarCita, cargando: cargandoActualizacion } = useActualizarCita( id, formulario, hora, token
  );
  const { cambiarEstadoCita, cargando: cargandoEstado } = useCambiarEstadoCita();
  const { horariosOcupados, cargando: cargandoHorarios, error,
  } = useHorariosDisponible(formulario.fecha, formulario.tipo, token);
  useEffect(() => {
  }, [ formulario.fecha, formulario.tipo, horariosOcupados, cargandoHorarios, error, token,
  ]);

  useEffect(() => {
    if (cita) {
  setFormulario({id_usuario: cita.id_usuario || "",id_doctor: cita.id_doctor || "",fecha: cita.fecha || "",estado: cita.estado || "",tipo: cita.tipo || "",observaciones: cita.observaciones || "",examenes_requeridos: cita.examenes_requeridos || "",usuario: cita.usuario || {},doctor: cita.doctor || {},
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
      if (name === 'tipo' && value !== 'evaluacion') {
        // Si deja de ser evaluación limpiamos exámenes requeridos
        setFormulario((prev)=>({...prev, examenes_requeridos: ''}));
      }
    }
  };
  if (cargando || citaidcargando) {
      return <Cargando texto="Cargando datos de la cita..." />;
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
            onClick={() => navigate("/consultarcitas")}>
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
          <p>
            La cita que intentas editar no existe o no tienes permisos para
            verla.
          </p>
          <hr />
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/consultarcitas")}>
            Volver a la lista de citas
          </button>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <h2 className="mt-4">Editar Cita</h2>
      <InformacionUsuario usuario={formulario.usuario} />
      <Card className="mb-4">
        <Card.Body>
          <h5>Información Actual de la Cita</h5>
          <Row>
            <Col md={3}>
              <p>
                <strong>Estado:</strong> {formulario.estado}
              </p>
            </Col>
            <Col md={3}>
              <p>
                <strong>Tipo:</strong> {formulario.tipo}
              </p>
            </Col>
            <Col md={3}>
              <p>
                <strong>Fecha:</strong> {formulario.fecha}
              </p>
            </Col>
            <Col md={3}>
              <p>
                <strong>Hora:</strong> {hora}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Form onSubmit={actualizarCita}>
        <Form.Group className="mb-3">
          <Form.Label>Doctor</Form.Label>
          <Form.Select name="id_doctor" value={formulario.id_doctor} onChange={manejarCambio} required disabled={isDoctor}>
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
          <Form.Select name="tipo" value={formulario.tipo} onChange={manejarCambio} required disabled={isDoctor}>
            <option value="">Seleccione tipo</option>
            <option value="evaluacion">Evaluación</option>
            <option value="procedimiento">Procedimiento</option>
          </Form.Select>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" name="fecha" value={formulario.fecha} onChange={manejarCambio} min={new Date().toISOString().split("T")[0]} required disabled={isDoctor}/>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hora</Form.Label>
              <Form.Select value={hora} onChange={(e) => setHora(e.target.value)} required disabled={isDoctor}>
                <option value="">Seleccione una hora</option>
                {horariosDisponibles.map((h) => {
                  const horariosOcupadosFiltrados = horariosOcupados.filter(
                    (cita) => cita.id !== parseInt(id)
                  );
                  const ocupado = estaOcupado(h, horariosOcupadosFiltrados, cargandoHorarios, formulario);
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
          <Form.Label>Motivo Consulta</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="observaciones"
            value={formulario.observaciones}
            onChange={manejarCambio}
            style={{ resize: "vertical" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Exámenes Requeridos</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="examenes_requeridos"
            value={formulario.examenes_requeridos}
            onChange={manejarCambio}
            style={{ resize: "vertical" }}
            placeholder="Escriba los exámenes o estudios que necesita el paciente"
            disabled={!isDoctor || formulario.tipo !== 'evaluacion'}
          />
          {!isDoctor && (
            <Form.Text muted>
              Solo el doctor puede modificar los exámenes requeridos.
            </Form.Text>
          )}
          {isDoctor && formulario.tipo !== 'evaluacion' && (
            <Form.Text muted>
              Solo disponible en citas de evaluación.
            </Form.Text>
          )}
        </Form.Group>
        <button type="submit" className="btn btn-success me-2" disabled={cargandoActualizacion}>
          {cargandoActualizacion ? "Actualizando..." : "Actualizar"}
        </button>
        {isDoctor && (
          <button
            type="button"
            className="btn btn-primary me-2"
            disabled={cargandoEstado || formulario.estado === "realizada"}
            onClick={async () => {
              const resp = await cambiarEstadoCita(id, "realizada");
              if (resp) {
                alert("Cita marcada como realizada");
                setFormulario((prev) => ({ ...prev, estado: "realizada" }));
              }
            }}
          >
            {cargandoEstado ? "Marcando..." : "Marcar como realizada"}
          </button>
        )}
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/consultarcitas")} disabled={cargandoActualizacion}>
          Cancelar
        </button>
      </Form>
    </Container>
  );
}
export default EditarCitas;