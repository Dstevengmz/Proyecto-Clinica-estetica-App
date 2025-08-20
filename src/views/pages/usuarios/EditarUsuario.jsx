import { Form, Row, Col, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cargando from "../../../components/Cargando";
import useUsuarioPorId from "../../../hooks/useBuscarUsuario";
import useActualizarUsuario from "../../../hooks/useEditarUsuario";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    rol: "",
    
  });

  const { usuario, cargando: cargandoUsuario, error } = useUsuarioPorId(id, token);
  const { editarUsuario, cargando: cargandoActualizacion } = useActualizarUsuario(id);

  useEffect(() => {
    if (usuario) {
      setFormulario({
        nombre: usuario.nombre || "",
        correo: usuario.correo || "",
        rol: usuario.rol || "",
      });
    }
  }, [usuario]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      await editarUsuario(formulario);
      alert("Usuario actualizado correctamente");
      navigate("/listarusuarios"); 
    } catch (err) {
      alert("Error al actualizar usuario",err);
    }
  };

  if (cargandoUsuario) {
    return <Cargando texto="Cargando datos del usuario..." />;
  }

  if (error) {
    return (
      <Container>
        <div className="alert alert-danger mt-4">
          <h4>Error al cargar el usuario</h4>
          <p>{error.message || error}</p>
          <button className="btn btn-outline-danger" onClick={() => navigate("/listarusuarios")}>
            Volver a la lista de usuarios
          </button>
        </div>
      </Container>
    );
  }

  if (!usuario) {
    return (
      <Container>
        <div className="alert alert-warning mt-4">
          <h4>Usuario no encontrado</h4>
          <p>El usuario que intentas editar no existe o no tienes permisos para verlo.</p>
          <button className="btn btn-outline-warning" onClick={() => navigate("/listarusuarios")}>
            Volver a la lista de usuarios
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mt-4">Editar Usuario</h2>
      <Card className="mb-4">
        <Card.Body>
          <h5>Información Actual del Usuario</h5>
          <Row>
            <Col md={4}>
              <p><strong>Nombre:</strong> {formulario.nombre}</p>
            </Col>
            <Col md={4}>
              <p><strong>correo:</strong> {formulario.correo}</p>
            </Col>
            <Col md={4}>
              <p><strong>Rol:</strong> {formulario.rol}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Form onSubmit={manejarSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} required/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" name="email" value={formulario.correo} onChange={manejarCambio} required/>
        </Form.Group>
        <button type="submit" className="btn btn-success me-2" disabled={cargandoActualizacion}>
          {cargandoActualizacion ? "Actualizando..." : "Actualizar"}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")} disabled={cargandoActualizacion}>
          Cancelar
        </button>
      </Form>
    </Container>
  );
}

export default EditarUsuario;