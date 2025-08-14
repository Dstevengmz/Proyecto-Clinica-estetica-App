import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { usePerfilUsuario } from "../../../hooks/usePerfilUsuario";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function HistorialMedico() {
  const navigate = useNavigate();
  const { usuario } = usePerfilUsuario();
  const [formulario, setFormulario] = useState({
    enfermedades: "",
    alergias: "",
    cirugias_previas: "",
    condiciones_piel: "",
    embarazo_lactancia: false,
    medicamentos: "",
    consume_tabaco: false,
    consume_alcohol: false,
    usa_anticonceptivos: false,
    detalles_anticonceptivos: "",
    diabetes: false,
    hipertension: false,
    historial_cancer: false,
    problemas_coagulacion: false,
    epilepsia: false,
    otras_condiciones: "",
  });
  

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${API_URL}/apihistorialmedico/buscarhistorialclinicoporusuario/${usuario.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        alert("Ya Tienes un historial médico registrado");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          await axios.post(
            `${API_URL}/apihistorialmedico/crearhistorialclinico`,
            {
              ...formulario,
              id_usuario: usuario.id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          alert("Historial médico guardado correctamente");
          navigate("/crearcita");
          setFormulario({
            enfermedades: "",
            alergias: "",
            cirugias_previas: "",
            condiciones_piel: "",
            embarazo_lactancia: false,
            medicamentos: "",
            consume_tabaco: false,
            consume_alcohol: false,
            usa_anticonceptivos: false,
            detalles_anticonceptivos: "",
            diabetes: false,
            hipertension: false,
            historial_cancer: false,
            problemas_coagulacion: false,
            epilepsia: false,
            otras_condiciones: "",
          });
        } catch (postError) {
          console.error("Error al guardar historial médico", postError);
          alert("Error al guardar historial médico");
        }
      } else {
        console.error("Error al verificar existencia del historial", error);
        alert("Error al verificar historial médico existente");
      }
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Historial Médico</h1>
<Card className="mb-4">
  <Card.Body>
    <h4>Detalles del Usuario</h4>
    <Row>
      <Col md={6}>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
      </Col>
      <Col md={6}>
        <p><strong>Correo:</strong> {usuario.correo}</p>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
      </Col>
      <Col md={6}>
        <p><strong>Dirección:</strong> {usuario.direccion}</p>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </Col>
    </Row>
  </Card.Body>
</Card>

<Form onSubmit={handleSubmit}>

  {/* 1. Enfermedades actuales */}
  <Row className="mb-3">
    <Col md={8}>
      <Form.Group controlId="formEnfermedades">
        <Form.Label>¿Actualmente presenta alguna enfermedad diagnosticada?</Form.Label>
        <Form.Control
          type="text"
          name="enfermedades"
          value={formulario.enfermedades}
          onChange={handleChange}
          placeholder="Ej: Asma, Gastritis..."
        />
      </Form.Group>
    </Col>
    <Col md={4} className="d-flex align-items-center">
      <Form.Check
        type="checkbox"
        label="Ninguna"
        name="sin_enfermedades"
        checked={formulario.sin_enfermedades}
        onChange={handleChange}
      />
    </Col>
  </Row>

  {/* 2. Alergias */}
  <Row className="mb-3">
    <Col md={6}>
      <Form.Group controlId="formTipoAlergias">
        <Form.Label>¿Presenta alergias?</Form.Label>
        <Form.Select
          multiple
          name="tipo_alergias"
          value={formulario.tipo_alergias}
          onChange={handleChange}
        >
          <option value="Medicamentos">Medicamentos</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Sustancias químicas">Sustancias químicas</option>
          <option value="Cosméticos">Cosméticos</option>
          <option value="Otros">Otros</option>
        </Form.Select>
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group controlId="formDetalleAlergias">
        <Form.Label>Especifique</Form.Label>
        <Form.Control
          type="text"
          name="detalle_alergias"
          value={formulario.detalle_alergias}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  </Row>

  {/* 3. Cirugías previas */}
  <Row className="mb-3">
    <Col>
      <Form.Group controlId="formCirugiasPrevias">
        <Form.Label>Cirugías previas (indique cuáles y año)</Form.Label>
        <Form.Control
          type="text"
          name="cirugias_previas"
          value={formulario.cirugias_previas}
          onChange={handleChange}
          placeholder="Ej: Apendicectomía - 2015"
        />
      </Form.Group>
    </Col>
  </Row>

  {/* 4. Medicamentos actuales */}
  <Row className="mb-3">
    <Col>
      <Form.Group controlId="formMedicamentos">
        <Form.Label>Medicamentos actuales (nombre, dosis, frecuencia)</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="medicamentos"
          value={formulario.medicamentos}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  </Row>

  {/* 5. Antecedentes personales */}
  {/* 5. Antecedentes personales */}
<hr className="my-4" />
<h5>Antecedentes Personales</h5>
<Row className="mb-3">
  <Col md={6}>
    <Form.Check
      type="checkbox"
      label="Consumo habitual de alcohol"
      name="consumo_alcohol"
      checked={formulario.consumo_alcohol}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Consumo de tabaco"
      name="consumo_tabaco"
      checked={formulario.consumo_tabaco}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Consumo de sustancias psicoactivas"
      name="sustancias_psicoactivas"
      checked={formulario.sustancias_psicoactivas}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Trastornos psiquiátricos"
      name="trastornos_psiquiatricos"
      checked={formulario.trastornos_psiquiatricos}
      onChange={handleChange}
    />
  </Col>
  <Col md={6}>
    <Form.Group controlId="formOtrasPersonales">
      <Form.Label>Otras condiciones personales</Form.Label>
      <Form.Control
        type="text"
        name="otras_personales"
        value={formulario.otras_personales}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>

{/* 6. Antecedentes familiares */}
<hr className="my-4" />
<h5>Antecedentes Familiares</h5>
<Row className="mb-3">
  <Col md={6}>
    <Form.Check
      type="checkbox"
      label="Hipertensión arterial"
      name="hipertension_familia"
      checked={formulario.hipertension_familia}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Diabetes mellitus"
      name="diabetes_familia"
      checked={formulario.diabetes_familia}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Cáncer"
      name="cancer_familia"
      checked={formulario.cancer_familia}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Enfermedades cardíacas"
      name="cardiacas_familia"
      checked={formulario.cardiacas_familia}
      onChange={handleChange}
    />
    <Form.Check
      type="checkbox"
      label="Enfermedades dermatológicas hereditarias"
      name="dermatologicas_familia"
      checked={formulario.dermatologicas_familia}
      onChange={handleChange}
    />
  </Col>
  <Col md={6}>
    <Form.Group controlId="formOtrasFamilia">
      <Form.Label>Otras condiciones familiares</Form.Label>
      <Form.Control
        type="text"
        name="otras_familia"
        value={formulario.otras_familia}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>


  {/* 7. Otros datos relevantes */}
  <Row className="mb-3">
    <Col>
      <Form.Group controlId="formOtrosDatos">
        <Form.Label>¿Alguna condición médica o restricción que debamos conocer?</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="otros_datos"
          value={formulario.otros_datos}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  </Row>

  <Button type="submit" variant="primary">
    Guardar Historial
  </Button>
</Form>

    </Container>
  );
}

export default HistorialMedico;
