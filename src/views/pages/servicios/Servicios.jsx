import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { cilFilter } from "@coreui/icons";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import useListarCategorias from "../../../hooks/useListarCategorias";
import useListaProcedimientos from "../../../hooks/useProcedimientoCategoria";
import Cargando from "../../../components/Cargando";
import ErrorCargando from "../../../components/ErrorCargar";

function Servicios() {
  const {
    categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = useListarCategorias();

  const [categoriaId, setCategoriaId] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const {
    procedimientos,
    loading: loadingProcedimientos,
    error: errorProcedimientos,
  } = useListaProcedimientos(categoriaId);

  if (loadingCategorias) return <Cargando texto="Cargando categorías..." />;
  if (errorCategorias)
    return <ErrorCargando texto="Error al cargar las categorías." />;
  if (errorProcedimientos)
    return <ErrorCargando texto="Error al cargar los procedimientos." />;

  // 🔎 Filtrar procedimientos según búsqueda
  const procedimientosFiltrados = procedimientos.filter((proc) =>
    proc.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container className="my-5">
      {/* Buscador arriba */}
      <div className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar procedimiento..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-100"
        />
      </div>

      {/* Categorías tal cual estaba */}
      <div className="d-flex flex-row-reverse bd-highlight mb-4">
        <div
          className="d-flex align-items-center"
          style={{ gap: 12, minWidth: 280 }}
        >
          <Form.Select
            aria-label="Filtrar por categoría"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </Form.Select>
          <CButton
            color="secondary"
            variant="outline"
            className="d-flex align-items-center"
            onClick={() => setCategoriaId("")}
            title="Limpiar filtro"
          >
            <CIcon icon={cilFilter} className="me-2" />
            {categoriaId ? "Limpiar" : "Filtrar"}
          </CButton>
        </div>
      </div>

      {/* Listado de procedimientos */}
      {loadingProcedimientos ? (
        <Cargando texto="Cargando procedimientos..." />
      ) : procedimientosFiltrados.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p>No se encontraron procedimientos.</p>
        </div>
      ) : (
        <Row className="g-4">
          {procedimientosFiltrados.map((proc) => (
            <Col key={proc.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow border-0 rounded-4 overflow-hidden">
                <div
                  style={{
                    height: "180px",
                    overflow: "hidden",
                    background: "#f8f9fa",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={proc.imagen}
                    alt={proc.nombre}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column p-4">
                  <Card.Title
                    className="mb-2 fw-bold text-primary"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {proc.nombre}
                  </Card.Title>
                  <ul className="list-unstyled mb-4">
                    <li>
                      <span className="fw-semibold">💲 Precio:</span>{" "}
                      {Number(proc.precio).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      })}
                    </li>
                  </ul>
                  <div className="mt-auto">
                    <Link
                      to={`/reservar/${proc.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="primary"
                        className="w-100 rounded-pill fw-semibold"
                        style={{ letterSpacing: "1px" }}
                      >
                        Ver más
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Servicios;
