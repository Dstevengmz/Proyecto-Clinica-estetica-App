import { useContext, useMemo } from "react";
import { Row, Col, Card, Alert, Badge, CardBody } from "react-bootstrap";
import { CitasContext } from "../../../contexts/CitasContext";
import { useAuth } from "../../../contexts/AuthenticaContext";
import { useLocation } from "react-router-dom";

function DetallesCitas() {
  const { selectedCitas } = useContext(CitasContext);
  const location = useLocation();
  const { userRole } = useAuth();
  const cita = selectedCitas || location.state?.cita || null;
  const historial = cita?.usuario?.historial_medico || {};
  const orden = cita?.orden || null;

  const fechaFormateada = useMemo(() => {
    if (!cita?.fecha) return "—";
    try {
      return new Date(cita.fecha).toLocaleString();
    } catch {
      return String(cita.fecha);
    }
  }, [cita?.fecha]);

  const renderBool = (val) =>
    val === true ? "Sí" : val === false ? "No" : "No registrado";

  if (!cita) {
    return (
      <Alert variant="info" className="mt-4 text-center">
        Selecciona una cita para ver los detalles.
      </Alert>
    );
  }
  return (
    <div>
      <h3 className="mb-4 text-center">Detalles de la Cita</h3>

      {/* Card de Detalles del Paciente */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="text-primary mb-3">Paciente</h5>
          <Row>
            <Col md={6} className="mb-3">
              <strong>Nombre:</strong> {cita.usuario?.nombre || "—"}
            </Col>
            <Col md={6} className="mb-3">
              <strong>Teléfono:</strong> {cita.usuario?.telefono || "—"}
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <strong>Dirección:</strong>{" "}
              {cita.usuario?.direccion || "No registrada"}
            </Col>
            <Col md={6} className="mb-3">
              <strong>Rol:</strong> {cita.usuario?.rol || "—"}
            </Col>
          </Row>

          <hr />
          <h5 className="text-primary mb-3">Doctor</h5>
          <Row>
            <Col md={6} className="mb-3">
              <strong>Nombre:</strong> {cita.doctor?.nombre || "—"}
            </Col>
            <Col md={6} className="mb-3">
              <strong>Ocupación:</strong>{" "}
              {cita.doctor?.ocupacion || "No registrada"}
            </Col>
          </Row>

          <hr />
          <h5 className="text-primary mb-3">Información de la Cita</h5>
          <Row>
            <Col md={6} className="mb-3">
              <strong>Fecha:</strong> {fechaFormateada}
            </Col>
            <Col md={6} className="mb-3">
              <strong>Tipo de cita:</strong>{" "}
              {cita.tipo ? (
                <Badge bg={cita.tipo === "evaluacion" ? "info" : "success"}>
                  {cita.tipo}
                </Badge>
              ) : (
                "—"
              )}
            </Col>
          </Row>

          {cita.observaciones && (
            <>
              <hr />
              <h5 className="text-primary mb-3">Observaciones</h5>
              <Row>
                <Col md={12}>{cita.observaciones}</Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>

      {userRole === "doctor" && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h5 className="text-primary mb-3">Historial Médico del Paciente</h5>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Enfermedades:</strong>{" "}
                {historial.enfermedades || "No registradas"}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Alergias:</strong>{" "}
                {historial.alergias || "No registradas"}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Cirugías previas:</strong>{" "}
                {historial.cirugias_previas || "No registradas"}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Condiciones de piel:</strong>{" "}
                {historial.condiciones_piel || "No registradas"}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Embarazo/Lactancia:</strong>{" "}
                {renderBool(historial.embarazo_lactancia)}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Medicamentos:</strong>{" "}
                {historial.medicamentos || "No registrados"}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Consume tabaco:</strong>{" "}
                {renderBool(historial.consume_tabaco)}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Consume alcohol:</strong>{" "}
                {renderBool(historial.consume_alcohol)}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Usa anticonceptivos:</strong>{" "}
                {renderBool(historial.usa_anticonceptivos)}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Detalles anticonceptivos:</strong>{" "}
                {historial.detalles_anticonceptivos || "—"}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Diabetes:</strong> {renderBool(historial.diabetes)}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Hipertensión:</strong>{" "}
                {renderBool(historial.hipertension)}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Historial de cáncer:</strong>{" "}
                {renderBool(historial.historial_cancer)}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Problemas de coagulación:</strong>{" "}
                {renderBool(historial.problemas_coagulacion)}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <strong>Epilepsia:</strong> {renderBool(historial.epilepsia)}
              </Col>
              <Col md={6} className="mb-3">
                <strong>Otras condiciones:</strong>{" "}
                {historial.otras_condiciones || "—"}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {userRole === "usuario" && (
     
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="text-primary mb-3">
            Procedimientos Asociados a esta Cita
          </h5>
          {orden ? (
            <>
              <p>
                <strong>Orden #{orden.id}</strong>
              </p>
              <p>
                <strong>Fecha de creación:</strong>{" "}
                {new Date(orden.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Estado:</strong> {orden.estado || "No registrado"}
              </p>

              {Array.isArray(orden.procedimientos) &&
              orden.procedimientos.length > 0 ? (
                <ul>
                  {orden.procedimientos.map((procedimiento) => (
                    <li key={procedimiento.id}>
                      <strong>{procedimiento.nombre}</strong> - $
                      {procedimiento.precio?.toFixed(2)}
                      <br />
                      <em>{procedimiento.descripcion || "Sin descripción"}</em>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay procedimientos en esta orden.</p>
              )}
            </>
          ) : (
            <p>Esta cita no tiene una orden asociada.</p>
          )}
        </Card.Body>
      </Card>
       )}
    </div>
  );
}

export default DetallesCitas;
