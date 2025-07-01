import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
} from "@coreui/react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

export const HistorialClinicoContext = createContext();
const useHistorialClinicoContext = () => useContext(HistorialClinicoContext);

function ConsultaHistorialMedico() {
  const [historialmedico, setHistorialmedico] = useState([]);
  const { selectedHistorialclinico, setSelectedHistorialclinico } =
    useHistorialClinicoContext();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Error", "No estás autenticado", "error");
      return;
    }
    axios
      .get("http://localhost:2100/apihistorialmedico/listarhistorialclinico", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Respuesta del backend:", response.data);

        setHistorialmedico(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar historialmedico:", error);
        alert("Error", "No se pudieron cargar los historialmedico", "error");
      });
  }, []);

  const selectUser = (historialmedico) => {
    setSelectedHistorialclinico(historialmedico);
    navigate("/DetallesHistorialMedico");
  };

  return (
    <HistorialClinicoContext.Provider
      value={{ selectedHistorialclinico, setSelectedHistorialclinico }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="mb-0">Historial Médico</h1>
          <CForm className="d-flex" role="search">
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Buscar..."
            />
            <CButton type="submit" color="success" variant="outline">
              Buscar
            </CButton>
          </CForm>
        </div>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
              <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rol</CTableHeaderCell>
              <CTableHeaderCell scope="col">Género</CTableHeaderCell>
              <CTableHeaderCell scope="col">Opciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {historialmedico.map((historialmedico) => (
              <CTableRow key={historialmedico.id}>
                <CTableDataCell>{historialmedico.id}</CTableDataCell>
                <CTableDataCell>
                  {historialmedico.usuario?.nombre || "Sin nombre"}
                </CTableDataCell>
                <CTableDataCell>
                  {historialmedico.usuario?.correo || "Sin correo"}
                </CTableDataCell>
                <CTableDataCell>
                  {historialmedico.usuario?.rol || "Sin rol"}
                </CTableDataCell>
                <CTableDataCell>
                  {historialmedico.usuario?.genero || "Sin género"}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <a
                      onClick={() => selectUser(historialmedico)}
                      className="btn btn-sm btn-info"
                      title="Ver detalles"
                    >
                      <i class="bi bi-eye-fill"></i>
                    </a>
                    <a
                      onClick={() => {
                        console.log(
                          "ID que se va a enviar:",
                          historialmedico.id
                        );
                        navigate(
                          `/editarhistorialmedico/${historialmedico.id}`
                        );
                      }}
                      className="btn btn-sm btn-primary"
                      title="Editar"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <a className="btn btn-sm btn-danger" title="Eliminar">
                      <i class="bi bi-trash"></i>
                    </a>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </HistorialClinicoContext.Provider>
  );
}
export default ConsultaHistorialMedico;
