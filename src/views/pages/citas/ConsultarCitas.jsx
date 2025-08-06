import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Container} from "react-bootstrap";
import { CitasContext, useCitasContext } from "../../../contexts/CitasContext";
import { cibCassandra, cilPenAlt, cilXCircle, cilCalendarCheck, cilCalendar, cilList, cilX } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import useListarCitas from "../../../hooks/useListarCitas";
import useCitasPorDiaDoctor from "../../../hooks/useCitasPorDiaDoctor";
import useCitasPorRangoDoctor from "../../../hooks/useCitasPorRangoDoctor";
import useCitasPorTipoDoctor from "../../../hooks/useCitasPorTipoDoctor";
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CButton,
  CButtonGroup,
  CCol,
  CRow,
} from "@coreui/react";

function Consultarcitas() {
  const { citas: todasLasCitas, cargando: cargandoCitas } = useListarCitas();
  const { selectedCitas, setSelectedCitas } = useCitasContext();
  const navigate = useNavigate();
  
  // Estados para los filtros
  const [tipoFiltro, setTipoFiltro] = useState('todas'); // 'todas', 'dia', 'rango', 'tipo'
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [fechaTipo, setFechaTipo] = useState('');
  
  // Hook para obtener citas por día 
  const { 
    citas: citasPorDia, 
    loading: cargandoCitasDia 
  } = useCitasPorDiaDoctor(tipoFiltro === 'dia' ? fechaSeleccionada : '');

  // Hook para obtener citas por rango
  const { 
    citas: citasPorRango, 
    loading: cargandoCitasRango 
  } = useCitasPorRangoDoctor(
    tipoFiltro === 'rango' ? fechaDesde : '', 
    tipoFiltro === 'rango' ? fechaHasta : ''
  );

  // Hook para obtener citas por tipo
  const { 
    citas: citasPorTipo, 
    loading: cargandoCitasTipo 
  } = useCitasPorTipoDoctor(
    tipoFiltro === 'tipo' ? tipoSeleccionado : '', 
    tipoFiltro === 'tipo' ? fechaTipo : ''
  );

  // Determinar qué citas mostrar
  const citasAMostrar = 
    tipoFiltro === 'dia' ? citasPorDia : 
    tipoFiltro === 'rango' ? citasPorRango : 
    tipoFiltro === 'tipo' ? citasPorTipo :
    todasLasCitas;

  const estasCargando = 
    tipoFiltro === 'dia' ? cargandoCitasDia : 
    tipoFiltro === 'rango' ? cargandoCitasRango : 
    tipoFiltro === 'tipo' ? cargandoCitasTipo :
    cargandoCitas;

  const selectCitas = (citas) => {
    setSelectedCitas(citas);
    navigate("/detallesCitas");
  };

  const handleFiltrarPorDia = () => {
    if (!fechaSeleccionada) {
      alert('Por favor selecciona una fecha');
      return;
    }
    setTipoFiltro('dia');
  };

  const handleFiltrarPorRango = () => {
    if (!fechaDesde || !fechaHasta) {
      alert('Por favor selecciona ambas fechas del rango');
      return;
    }
    if (new Date(fechaDesde) > new Date(fechaHasta)) {
      alert('La fecha "desde" no puede ser mayor que la fecha "hasta"');
      return;
    }
    setTipoFiltro('rango');
  };

  const handleFiltrarPorTipo = () => {
    if (!tipoSeleccionado || !fechaTipo) {
      alert('Por favor selecciona el tipo de cita y la fecha');
      return;
    }
    setTipoFiltro('tipo');
  };

  const handleMostrarTodasLasCitas = () => {
    setTipoFiltro('todas');
    setFechaSeleccionada('');
    setFechaDesde('');
    setFechaHasta('');
    setTipoSeleccionado('');
    setFechaTipo('');
  };

    if ( estasCargando ) {
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
            <h5>No hay citas disponibles{tipoFiltro !== 'todas' ? ' para el filtro seleccionado' : ''}</h5>
            {tipoFiltro !== 'todas' && (
              <p className="text-muted">
                Intenta con otra fecha o tipo de cita, o ve todas las citas disponibles.
              </p>
            )}
          </div>
          {tipoFiltro !== 'todas' && (
            <CButton 
              color="primary" 
              onClick={handleMostrarTodasLasCitas}
            >
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
        {/* Filtros */}
        <CRow className="mb-3">
          <CCol md={12}>
            <h5 className="mb-3">Filtros de Consulta</h5>
            
            {/* Filtro por día */}
            <div className="border rounded p-3 mb-3">
              <h6 className="text-primary mb-2">
                <CIcon icon={cilCalendarCheck} className="me-1" />
                Consultar por Día
              </h6>
              <div className="d-flex flex-wrap align-items-end gap-3">
                <div>
                  <CFormLabel htmlFor="fechaFiltro">Seleccionar fecha:</CFormLabel>
                  <CFormInput
                    type="date"
                    id="fechaFiltro"
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                  />
                </div>
                <CButton 
                  color="primary" 
                  onClick={handleFiltrarPorDia}
                  disabled={!fechaSeleccionada}
                >
                  <CIcon icon={cilCalendarCheck} className="me-1" />
                  Consultar día
                </CButton>
                {fechaSeleccionada && (
                  <CButton 
                    color="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setFechaSeleccionada('');
                      if (tipoFiltro === 'dia') setTipoFiltro('todas');
                    }}
                    title="Limpiar fecha"
                  >
                    <CIcon icon={cilX} />
                  </CButton>
                )}
              </div>
            </div>

            {/* Filtro por rango */}
            <div className="border rounded p-3 mb-3">
              <h6 className="text-success mb-2">
                <CIcon icon={cilCalendar} className="me-1" />
                Consultar por Rango de Fechas
              </h6>
              <div className="d-flex flex-wrap align-items-end gap-3">
                <div>
                  <CFormLabel htmlFor="fechaDesde">Desde:</CFormLabel>
                  <CFormInput
                    type="date"
                    id="fechaDesde"
                    value={fechaDesde}
                    onChange={(e) => setFechaDesde(e.target.value)}
                  />
                </div>
                <div>
                  <CFormLabel htmlFor="fechaHasta">Hasta:</CFormLabel>
                  <CFormInput
                    type="date"
                    id="fechaHasta"
                    value={fechaHasta}
                    onChange={(e) => setFechaHasta(e.target.value)}
                    min={fechaDesde}
                  />
                </div>
                <CButton 
                  color="success" 
                  onClick={handleFiltrarPorRango}
                  disabled={!fechaDesde || !fechaHasta}
                >
                  <CIcon icon={cilCalendar} className="me-1" />
                  Consultar rango
                </CButton>
                {(fechaDesde || fechaHasta) && (
                  <CButton 
                    color="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setFechaDesde('');
                      setFechaHasta('');
                      if (tipoFiltro === 'rango') setTipoFiltro('todas');
                    }}
                    title="Limpiar rango"
                  >
                    <CIcon icon={cilX} />
                  </CButton>
                )}
              </div>
            </div>

            {/* Filtro por tipo */}
            <div className="border rounded p-3 mb-3">
              <h6 className="text-warning mb-2">
                <CIcon icon={cilList} className="me-1" />
                Consultar por Tipo de Cita
              </h6>
              <div className="d-flex flex-wrap align-items-end gap-3">
                <div>
                  <CFormLabel htmlFor="tipoSelect">Tipo de cita:</CFormLabel>
                  <CFormSelect
                    id="tipoSelect"
                    value={tipoSeleccionado}
                    onChange={(e) => setTipoSeleccionado(e.target.value)}
                  >
                    <option value="">Seleccionar tipo...</option>
                    <option value="evaluacion">Evaluación</option>
                    <option value="procedimiento">Procedimiento</option>
                  </CFormSelect>
                </div>
                <div>
                  <CFormLabel htmlFor="fechaTipo">Fecha:</CFormLabel>
                  <CFormInput
                    type="date"
                    id="fechaTipo"
                    value={fechaTipo}
                    onChange={(e) => setFechaTipo(e.target.value)}
                  />
                </div>
                <CButton 
                  color="warning" 
                  onClick={handleFiltrarPorTipo}
                  disabled={!tipoSeleccionado || !fechaTipo}
                >
                  <CIcon icon={cilList} className="me-1" />
                  Consultar tipo
                </CButton>
                {(tipoSeleccionado || fechaTipo) && (
                  <CButton 
                    color="outline-secondary" 
                    size="sm"
                    onClick={() => {
                      setTipoSeleccionado('');
                      setFechaTipo('');
                      if (tipoFiltro === 'tipo') setTipoFiltro('todas');
                    }}
                    title="Limpiar tipo"
                  >
                    <CIcon icon={cilX} />
                  </CButton>
                )}
              </div>
            </div>

            {/* Botón para mostrar todas */}
            <div className="text-center">
              <CButton 
                color="secondary" 
                onClick={handleMostrarTodasLasCitas}
                disabled={tipoFiltro === 'todas'}
              >
                Mostrar todas las citas
              </CButton>
            </div>
          </CCol>
        </CRow>

        {/* Información del filtro activo */}
        {tipoFiltro === 'dia' && (
          <div className="alert alert-info mb-3">
            <strong>Mostrando citas del día:</strong> {fechaSeleccionada}
          </div>
        )}
        
        {tipoFiltro === 'rango' && (
          <div className="alert alert-success mb-3">
            <strong>Mostrando citas del rango:</strong> {fechaDesde} al {fechaHasta}
          </div>
        )}

        {tipoFiltro === 'tipo' && (
          <div className="alert alert-warning mb-3">
            <strong>Mostrando citas de tipo "{tipoSeleccionado}" del día:</strong> {fechaTipo}
          </div>
        )}

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
                  <CTableDataCell>
                    {cita.usuario?.nombre || "N/A"}
                  </CTableDataCell>
                  <CTableDataCell>
                    {cita.doctor?.nombre || "N/A"}
                  </CTableDataCell>
                  <CTableDataCell>
                    {new Date(cita.fecha).toLocaleString('es-CO', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className={`badge ${cita.tipo === 'evaluacion' ? 'bg-info' : 'bg-success'}`}>
                      {cita.tipo || 'N/A'}
                    </span>
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className={`badge ${
                      cita.estado === 'confirmada' ? 'bg-success' : 
                      cita.estado === 'pendiente' ? 'bg-warning' : 
                      'bg-danger'
                    }`}>
                      {cita.estado || 'N/A'}
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
