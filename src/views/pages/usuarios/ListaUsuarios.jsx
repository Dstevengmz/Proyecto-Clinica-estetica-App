import { createContext, useContext } from "react";
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
            {usuario.map((usuario) => (
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
            ))}
          </CTableBody>
        </CTable>
      </div>
    </ListarUsuariosContext.Provider>
  );
}

export default ConsultarListaUsuarios;
