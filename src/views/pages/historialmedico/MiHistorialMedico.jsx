import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

function MiHistorialMedico() {
  const { id } = useParams();
  const [mihistorialmedico, setMihistorialmedico] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Error", "No estás autenticado", "error");
      return;
    }

axios
  .get(`${API_URL}/apihistorialmedico/mihistorialclinico/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((response) => {
    setMihistorialmedico(response.data);
  })
  .catch((error) => {
    console.error("Error al cargar mi historial médico:", error);
    alert("No tienes permiso para realizar esta acción", error);
  });
  }, [id]);
  if (!mihistorialmedico) {
    return (
      <div>
        <h1>Mi Historial Médico</h1>
        <p>No hay datos disponibles.</p>
      </div>
    );
  }

  return (
    <Container>
      <h1 className="mt-4">Mi Historial Médico</h1>
      <Card>
        <Card.Body>
          <Row className="mb-3">
            <Col>
              <Card.Text><strong>Enfermedades:</strong> {mihistorialmedico.enfermedades}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>Alergias:</strong> {mihistorialmedico.alergias}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>Cirugías Previas:</strong> {mihistorialmedico.cirugias_previas}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>Condiciones de la Piel:</strong> {mihistorialmedico.condiciones_piel}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>Medicamentos Actuales:</strong> {mihistorialmedico.medicamentos}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>¿Usa Anticonceptivos?</strong> {mihistorialmedico.usa_anticonceptivos ? "Sí" : "No"}</Card.Text>
              {mihistorialmedico.usa_anticonceptivos && (
                <Card.Text><strong>Detalles de Anticonceptivos:</strong> {mihistorialmedico.detalles_anticonceptivos}</Card.Text>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>¿Diabetes?</strong> {mihistorialmedico.diabetes ? "Sí" : "No"}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>¿Hipertensión?</strong> {mihistorialmedico.hipertension ? "Sí" : "No"}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>¿Historial de Cáncer?</strong> {mihistorialmedico.historial_cancer ? "Sí" : "No"}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>¿Problemas de Coagulación?</strong> {mihistorialmedico.problemas_coagulacion ? "Sí" : "No"}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>¿Epilepsia?</strong> {mihistorialmedico.epilepsia ? "Sí" : "No"}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>¿Está Embarazada o Lactando?</strong> {mihistorialmedico.embarazo_lactancia ? "Sí" : "No"}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>¿Consume Tabaco?</strong> {mihistorialmedico.consume_tabaco ? "Sí" : "No"}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>¿Consume Alcohol?</strong> {mihistorialmedico.consume_alcohol ? "Sí" : "No"}</Card.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Card.Text><strong>Otras Condiciones:</strong> {mihistorialmedico.otras_condiciones}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MiHistorialMedico;
