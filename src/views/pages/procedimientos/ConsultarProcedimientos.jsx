import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";
export const ProcedimientoContext = createContext();
const useProcedimientoContext = () => useContext(ProcedimientoContext);

function ConsultarProcedimientos() {
  const [procedimientos, setProcedimientos] = useState([]);
  const { selectedProcedimiento, setSelectedProcedimiento } =
    useProcedimientoContext();
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
          // "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Respuesta del backend:", response.data);
        setProcedimientos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar procedimientos:", error);
        alert("Error", "No se pudieron cargar los procedimientos", "error");
      });
  }, []);

  const selectUser = (procedimiento) => {
    setSelectedProcedimiento(procedimiento);
    navigate("/detallesprocedimientos");
  };

  return (
    <ProcedimientoContext.Provider
      value={{ selectedProcedimiento, setSelectedProcedimiento }}
    >
      <div className="card-body">
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
            {procedimientos.map((procedimiento) => (
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
                      onClick={() =>
                        navigate(`/editarprocedimientos/${procedimiento.id}`)
                      }
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
            ))}
          </CTableBody>
        </CTable>
      </div>
    </ProcedimientoContext.Provider>
  );
}
export default ConsultarProcedimientos;
