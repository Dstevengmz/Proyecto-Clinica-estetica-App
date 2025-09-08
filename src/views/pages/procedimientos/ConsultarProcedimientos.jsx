import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";
import { useProcedimientoContext } from "../../../contexts/ProcedimientoContext";

function ConsultarProcedimientos() {
  const [procedimientos, setProcedimientos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const { setSelectedProcedimiento } = useProcedimientoContext();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Error", "No estás autenticado", "error");
      return;
    }
    axios
      .get(`${API_URL}/apiprocedimientos/listarprocedimiento`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProcedimientos(response.data);
        console.log("Respuesta del backend:", response.data);
      })
      .catch((error) => {
        console.error("Error al cargar procedimientos:", error);
        alert(
          "Error",
          "No se pudieron cargar los procedimientos",
          "error",
          error
        );
      });
  }, []);

  // Filtrado de procedimientos (nombre, precio, categoria, id)
  const procedimientosFiltrados = useMemo(() => {
    if (!terminoBusqueda.trim()) return procedimientos;
    const termino = terminoBusqueda.toLowerCase().trim();
    return procedimientos.filter((p) => {
      return (
        (p.nombre && p.nombre.toLowerCase().includes(termino)) ||
        (p.categoria && p.categoria.toLowerCase().includes(termino)) ||
        (p.id && p.id.toString().includes(termino)) ||
        (p.precio && p.precio.toString().includes(termino))
      );
    });
  }, [procedimientos, terminoBusqueda]);

  const handleBusquedaChange = (e) => setTerminoBusqueda(e.target.value);
  const limpiarBusqueda = () => setTerminoBusqueda("");

  const selectUser = (procedimiento) => {
    setSelectedProcedimiento(procedimiento);
    navigate("/detallesprocedimientos");
  };

  return (
  <div className="card-body">
        <h1 className="mb-0 text-center">Lista de Procedimientos</h1>
        <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-center justify-content-md-between mb-3 gap-2 mt-3">
          <div className="d-flex justify-content-center justify-content-md-start">
            <CButton
              color="primary"
              size="sm"
              onClick={() => navigate("/crearprocedimiento")}
            >
              <i className="bi bi-plus-circle me-1"></i> Crear Procedimiento
            </CButton>
          </div>
          <CForm
            className="d-flex justify-content-center justify-content-md-end"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Buscar por nombre, categoría, precio o ID..."
              value={terminoBusqueda}
              onChange={handleBusquedaChange}
              style={{ minWidth: "300px" }}
            />
            {terminoBusqueda && (
              <CButton
                type="button"
                color="secondary"
                variant="outline"
                className="me-2"
                onClick={limpiarBusqueda}
                title="Limpiar búsqueda"
              >
                <i className="bi bi-x-lg"></i>
              </CButton>
            )}
            <CButton type="button" color="success" variant="outline">
              <i className="bi bi-search"></i>
            </CButton>
          </CForm>
        </div>

        {terminoBusqueda && (
          <div className="mb-3">
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-info-circle me-2"></i>
                Mostrando {procedimientosFiltrados.length} de {procedimientos.length} procedimientos
                {terminoBusqueda && ` para "${terminoBusqueda}"`}
              </span>
              {procedimientosFiltrados.length === 0 && (
                <span className="text-muted">
                  <i className="bi bi-search me-1"></i>
                  No se encontraron resultados
                </span>
              )}
            </div>
          </div>
        )}

        <CTable striped bordered hover responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Nombre</CTableHeaderCell>
              <CTableHeaderCell>Precio</CTableHeaderCell>
              <CTableHeaderCell>Categoria</CTableHeaderCell>
              <CTableHeaderCell>Opciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {procedimientosFiltrados.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center text-muted py-4">
                  {terminoBusqueda ? (
                    <>
                      <i className="bi bi-search me-2"></i>
                      No se encontraron procedimientos que coincidan con "{terminoBusqueda}"
                    </>
                  ) : (
                    <>
                      <i className="bi bi-x-circle me-2"></i>
                      No hay procedimientos registrados
                    </>
                  )}
                </CTableDataCell>
              </CTableRow>
            ) : (
              procedimientosFiltrados.map((procedimiento) => (
                <CTableRow key={procedimiento.id}>
                  <CTableDataCell>{procedimiento.id}</CTableDataCell>
                  <CTableDataCell>{procedimiento.nombre}</CTableDataCell>
                  <CTableDataCell>
                    {Number(procedimiento.precio).toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                      minimumFractionDigits: 0,
                    })}
                  </CTableDataCell>
                  <CTableDataCell>{procedimiento.categoria}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <a
                        onClick={() => selectUser(procedimiento)}
                        className="btn btn-sm btn-info"
                        title="Ver detalles"
                      >
                        <i className="bi bi-eye-fill"></i>
                      </a>
                      <a
                        onClick={() => navigate(`/editarprocedimientos/${procedimiento.id}`)}
                        className="btn btn-sm btn-primary"
                        title="Editar"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </a>
                      <a className="btn btn-sm btn-danger" title="Eliminar">
                        <i className="bi bi-trash"></i>
                      </a>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
  </div>
  );
}
export default ConsultarProcedimientos;
