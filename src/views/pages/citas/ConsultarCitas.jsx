import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
export const CitasContext = createContext();
import { cibCassandra, cilPenAlt, cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
const useCitasContext = () => useContext(CitasContext);
const API_URL = import.meta.env.VITE_API_URL;
// import  obtenerRolDesdeToken  from "../../../assets/js/VerificacionRol";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

function Consultarcitas() {
  const [citas, setCitas] = useState([]);
  const { selectedCitas, setSelectedCitas } = useCitasContext();
  const navigate = useNavigate();
  // const rol = obtenerRolDesdeToken();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Error", "No estás autenticado", "error");
      return;
    }
    axios
      .get(`${API_URL}/apicitas/listarcitas`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Respuesta del backend:", response.data);
        setCitas(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar las citas:", error);
        alert(
          "Error No hay permisos ",
          "No se pudieron cargar las citas",
          "error"
        );
      });
  }, []);

  const selectCitas = (citas) => {
    setSelectedCitas(citas);
    navigate("/detallesCitas");
  };

  return (
    <CitasContext.Provider value={{ selectedCitas, setSelectedCitas }}>
      <div className="card-body">
       
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Usuario</CTableHeaderCell>
                <CTableHeaderCell>Doctor</CTableHeaderCell>
                <CTableHeaderCell>Fecha</CTableHeaderCell>
                <CTableHeaderCell>Opciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {citas.map((cita) => (
                <CTableRow key={cita.id}>
                  <CTableDataCell>{cita.id}</CTableDataCell>
                  <CTableDataCell>
                    {cita.usuario?.nombre || "N/A"}
                  </CTableDataCell>
                  <CTableDataCell>
                    {cita.doctor?.nombre || "N/A"}
                  </CTableDataCell>
                  <CTableDataCell>{cita.fecha}</CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-sm btn-info"
                        title="Ver detalles"
                        onClick={() => selectCitas(cita)}
                      >
                        <CIcon icon={cibCassandra} size="sm" />
                      </button>

                      <button
                        className="btn btn-sm btn-primary"
                        title="Editar"
                        onClick={() => navigate(`/editarcita/${cita.id}`)}
                      >
                        <CIcon icon={cilPenAlt} size="sm" />
                      </button>
                       {/* {rol === "usuario" && ( */}
                      <button
                        className="btn btn-sm btn-danger"
                        title="Eliminar"
                      >
                        <CIcon icon={cilXCircle} size="sm" />
                      </button>
                        {/* )} */}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
      
      </div>
    </CitasContext.Provider>
  );
}
export default Consultarcitas;
