import { createContext, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useListarUsuario from "../../../hooks/useListaDeUsuarios";
import useCambiarEstado from "../../../hooks/useCambiarEstadoUsuario";
import {
  CButton,
  CForm,
  CFormInput,
} from "@coreui/react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";

export const ListarUsuariosContext = createContext();
const useListarUsuariosContext = () => useContext(ListarUsuariosContext);

function ConsultarListaUsuarios() {
  const { usuario, refrescarLista } = useListarUsuario();
  const { selectedListarusuarios, setSelectedListarusuarios } = useListarUsuariosContext();
  const { cambiarEstado, cargando, error } = useCambiarEstado();
  const navigate = useNavigate();
  
  // Estado para el buscador
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  // Filtrar usuarios basado en el término de búsqueda
  const usuariosFiltrados = useMemo(() => {
    if (!terminoBusqueda.trim()) {
      return usuario;
    }
    
    const termino = terminoBusqueda.toLowerCase().trim();
    return usuario.filter((user) => {
      return (
        (user.nombre && user.nombre.toLowerCase().includes(termino)) ||
        (user.numerodocumento && user.numerodocumento.toString().includes(termino)) ||
        (user.correo && user.correo.toLowerCase().includes(termino)) ||
        (user.rol && user.rol.toLowerCase().includes(termino)) ||
        (user.tipodocumento && user.tipodocumento.toLowerCase().includes(termino)) ||
        (user.genero && user.genero.toLowerCase().includes(termino)) ||
        (user.id && user.id.toString().includes(termino))
      );
    });
  }, [usuario, terminoBusqueda]);

  // Manejar el cambio en el input de búsqueda
  const handleBusquedaChange = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  // Limpiar búsqueda
  const limpiarBusqueda = () => {
    setTerminoBusqueda("");
  };

  const selectUser = (listausuarios) => {
    setSelectedListarusuarios(listausuarios);
    navigate("/DetallesListarUsuarios");
  };

  const cambiarEstadoUsuario = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === true ? false : true;
    
    const resultado = await cambiarEstado(id, nuevoEstado);
    if (resultado) {
      console.log("Usuario actualizado:", resultado);
      await refrescarLista();
    } else if (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <ListarUsuariosContext.Provider
      value={{ selectedListarusuarios, setSelectedListarusuarios }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="mb-0">Lista De usuarios</h1>
          <CForm className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <CFormInput
              type="search"
              className="me-2"
              placeholder="Buscar por nombre, documento, correo, rol..."
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
        
        {/* Mostrar información de resultados de búsqueda */}
        {terminoBusqueda && (
          <div className="mb-3">
            <div className="alert alert-info d-flex justify-content-between align-items-center">
              <span>
                <i className="bi bi-info-circle me-2"></i>
                Mostrando {usuariosFiltrados.length} de {usuario.length} usuarios
                {terminoBusqueda && ` para "${terminoBusqueda}"`}
              </span>
              {usuariosFiltrados.length === 0 && (
                <span className="text-muted">
                  <i className="bi bi-search me-1"></i>
                  No se encontraron resultados
                </span>
              )}
            </div>
          </div>
        )}
        
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tipo De Documento</CTableHeaderCell>
              <CTableHeaderCell scope="col">#Numero</CTableHeaderCell>
              <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Rol</CTableHeaderCell>
              <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
              <CTableHeaderCell scope="col">Género</CTableHeaderCell>
              <CTableHeaderCell scope="col">Opciones</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {usuariosFiltrados.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan="9" className="text-center text-muted py-4">
                  {terminoBusqueda ? (
                    <>
                      <i className="bi bi-search me-2"></i>
                      No se encontraron usuarios que coincidan con "{terminoBusqueda}"
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-x me-2"></i>
                      No hay usuarios registrados
                    </>
                  )}
                </CTableDataCell>
              </CTableRow>
            ) : (
              usuariosFiltrados.map((usuario) => (
              <CTableRow key={usuario.id}>
                <CTableDataCell>{usuario.id}</CTableDataCell>
                <CTableDataCell>
                  {usuario.nombre || "Sin nombre"}
                </CTableDataCell>
                <CTableDataCell>
                  {usuario.tipodocumento || "Sin Tipo de documento"}
                </CTableDataCell>
                <CTableDataCell>
                  {usuario.numerodocumento || "Sin Numero Documento"}
                </CTableDataCell>
                <CTableDataCell>
                  {usuario.correo || "Sin correo"}
                </CTableDataCell>
                <CTableDataCell>
                  {usuario.rol || "Sin rol"}
                </CTableDataCell>
                <CTableDataCell>
                  <span style={{ fontWeight: "bold" }}>
                    {usuario.estado ? "Activo" : "Inactivo"}
                  </span>
                </CTableDataCell>
                <CTableDataCell>
                  {usuario.genero || "Sin género"}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <a
                      onClick={() => selectUser(usuario)}
                      className="btn btn-sm btn-info"
                      title="Ver detalles"
                    >
                      <i class="bi bi-eye-fill"></i>
                    </a>
                    <a
                      onClick={() => {
                        navigate(`/editarhistorialmedico/${usuario.id}`);
                      }}
                      className="btn btn-sm btn-primary"
                      title="Editar"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <a className="btn btn-sm btn-danger" title="Eliminar">
                      <i class="bi bi-trash"></i>
                    </a>
                    <a
                      onClick={() => cambiarEstadoUsuario(usuario.id, usuario.estado)}
                      className={`btn btn-sm ${cargando ? 'btn-secondary' : 'btn-warning'}`}
                      title="Cambiar Estado"
                      style={{ pointerEvents: cargando ? 'none' : 'auto' }}
                    >
                      {cargando ? (
                        <i className="spinner-border spinner-border-sm"></i>
                      ) : (
                        <i className="bi bi-toggle-on"></i>
                      )}
                    </a>
                  </div>
                </CTableDataCell>
              </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </div>
    </ListarUsuariosContext.Provider>
  );
}

export default ConsultarListaUsuarios;
