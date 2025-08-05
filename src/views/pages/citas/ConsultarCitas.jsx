import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import {Container} from "react-bootstrap";
export const CitasContext = createContext();
import { cibCassandra, cilPenAlt, cilXCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import useListarCitas from "../../../hooks/useListarCitas";
const useCitasContext = () => useContext(CitasContext);
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

function Consultarcitas() {
  const { citas, cargando: cargandoCitas } = useListarCitas();
  const { selectedCitas, setSelectedCitas } = useCitasContext();
  const navigate = useNavigate();
  const selectCitas = (citas) => {
    setSelectedCitas(citas);
    navigate("/detallesCitas");
  };
    if ( cargandoCitas ) {
      return (
        <Container>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <div>Cargando información...</div>
          </div>
        </Container>
      );
    }
    if (!cargandoCitas && citas.length === 0) {
    return (
      <Container>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div>No hay citas disponibles.</div>
        </div>
      </Container>
    );
  }
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