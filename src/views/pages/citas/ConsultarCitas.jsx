import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { CitasContext, useCitasContext } from "../../../contexts/CitasContext";
import FiltrosCitas from "./FiltrosCitas";
import {
  cibCassandra,
  cilPenAlt,
  cilXCircle,
  cilCalendarCheck,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import useListarCitas from "../../../hooks/useListarCitas";
import useCitasPorDiaDoctor from "../../../hooks/useCitasPorDiaDoctor";
import useCitasPorRangoDoctor from "../../../hooks/useCitasPorRangoDoctor";
import useCitasPorTipoDoctor from "../../../hooks/useCitasPorTipoDoctor";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from "@coreui/react";


function Consultarcitas() {
  const { citas: todasLasCitas, cargando: cargandoCitas } = useListarCitas();
  const { selectedCitas, setSelectedCitas } = useCitasContext();
  const navigate = useNavigate();

  // Estados para los filtros
  const [tipoFiltro, setTipoFiltro] = useState("todas");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [fechaTipo, setFechaTipo] = useState("");

  // Hook para obtener citas por día
  const { citas: citasPorDia, loading: cargandoCitasDia } =
    useCitasPorDiaDoctor(tipoFiltro === "dia" ? fechaSeleccionada : "");

  // Hook para obtener citas por rango
  const { citas: citasPorRango, loading: cargandoCitasRango } =
    useCitasPorRangoDoctor(
      tipoFiltro === "rango" ? fechaDesde : "",
      tipoFiltro === "rango" ? fechaHasta : ""
    );

  // Hook para obtener citas por tipo
  const { citas: citasPorTipo, loading: cargandoCitasTipo } =
    useCitasPorTipoDoctor(
      tipoFiltro === "tipo" ? tipoSeleccionado : "",
      tipoFiltro === "tipo" ? fechaTipo : ""
    );

  const citasAMostrar =
    tipoFiltro === "dia"
      ? citasPorDia
      : tipoFiltro === "rango"
      ? citasPorRango
      : tipoFiltro === "tipo"
      ? citasPorTipo
      : todasLasCitas;

  const estasCargando =
    tipoFiltro === "dia"
      ? cargandoCitasDia
      : tipoFiltro === "rango"
      ? cargandoCitasRango
      : tipoFiltro === "tipo"
      ? cargandoCitasTipo
      : cargandoCitas;

  const selectCitas = (citas) => {
    setSelectedCitas(citas);
    navigate("/detallesCitas");
  };


  const handleFiltrarPorDia = () => {
    if (!fechaSeleccionada) {
      alert("Por favor selecciona una fecha");
      return;
    }
    setTipoFiltro("dia");
  };

  const handleFiltrarPorRango = () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Por favor selecciona ambas fechas del rango");
      return;
    }
    if (new Date(fechaDesde) > new Date(fechaHasta)) {
      alert('La fecha "desde" no puede ser mayor que la fecha "hasta"');
      return;
    }
    setTipoFiltro("rango");
  };

  const handleFiltrarPorTipo = () => {
    if (!tipoSeleccionado || !fechaTipo) {
      alert("Por favor selecciona el tipo de cita y la fecha");
      return;
    }
    setTipoFiltro("tipo");
  };

  const handleMostrarTodasLasCitas = () => {
    setTipoFiltro("todas");
    setFechaSeleccionada("");
    setFechaDesde("");
    setFechaHasta("");
    setTipoSeleccionado("");
    setFechaTipo("");
  };

  if (estasCargando) {
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
  if (!estasCargando && citasAMostrar.length === 0) {
    return (
      <Container>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div className="text-center mb-3">
            <h5>
              No hay citas disponibles
              {tipoFiltro !== "todas" ? " para el filtro seleccionado" : ""}
            </h5>
            {tipoFiltro !== "todas" && (
              <p className="text-muted">
                Intenta con otra fecha o tipo de cita, o ve todas las citas
                disponibles.
              </p>
            )}
          </div>
          {tipoFiltro !== "todas" && (
            <CButton color="primary" onClick={handleMostrarTodasLasCitas}>
              <CIcon icon={cilCalendarCheck} className="me-1" />
              Ver todas las citas
            </CButton>
          )}
        </div>
      </Container>
    );
  }
  return (
    <CitasContext.Provider value={{ selectedCitas, setSelectedCitas }}>
      <div className="card-body">
        <FiltrosCitas fechaSeleccionada={fechaSeleccionada} setFechaSeleccionada={setFechaSeleccionada} handleFiltrarPorDia={handleFiltrarPorDia} fechaDesde={fechaDesde} setFechaDesde={setFechaDesde} fechaHasta={fechaHasta} setFechaHasta={setFechaHasta} handleFiltrarPorRango={handleFiltrarPorRango} tipoSeleccionado={tipoSeleccionado} setTipoSeleccionado={setTipoSeleccionado} fechaTipo={fechaTipo} setFechaTipo={setFechaTipo} handleFiltrarPorTipo={handleFiltrarPorTipo} tipoFiltro={tipoFiltro} setTipoFiltro={setTipoFiltro} handleMostrarTodasLasCitas={handleMostrarTodasLasCitas}
        />
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Usuario</CTableHeaderCell>
              <CTableHeaderCell>Doctor</CTableHeaderCell>
              <CTableHeaderCell>Fecha</CTableHeaderCell>
              <CTableHeaderCell>Tipo</CTableHeaderCell>
              <CTableHeaderCell>Estado</CTableHeaderCell>
              <CTableHeaderCell>Opciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {citasAMostrar.map((cita) => (
              <CTableRow key={cita.id}>
                <CTableDataCell>{cita.id}</CTableDataCell>
                <CTableDataCell>{cita.usuario?.nombre || "N/A"}</CTableDataCell>
                <CTableDataCell>{cita.doctor?.nombre || "N/A"}</CTableDataCell>
                <CTableDataCell>
                  {new Date(cita.fecha).toLocaleString("es-CO", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CTableDataCell>
                <CTableDataCell>
                  <span
                    className={`badge ${
                      cita.tipo === "evaluacion" ? "bg-info" : "bg-success"
                    }`}
                  >
                    {cita.tipo || "N/A"}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  <span
                    className={`badge ${
                      cita.estado === "confirmada"
                        ? "bg-success"
                        : cita.estado === "pendiente"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {cita.estado || "N/A"}
                  </span>
                </CTableDataCell>
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
                    <button className="btn btn-sm btn-danger" title="Eliminar">
                      <CIcon icon={cilXCircle} size="sm" />
                    </button>
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