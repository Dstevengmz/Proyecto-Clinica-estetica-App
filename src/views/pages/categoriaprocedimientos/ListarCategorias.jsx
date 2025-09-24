import React from "react";
import { useNavigate } from "react-router-dom";
import useCategorias from "../../../hooks/useListarCategorias";
import usePaginacion from "../../../hooks/usePaginacion";
import PaginacionComponents from "../../../components/PaginacionComponents";
import { useContext } from "react";
import { CategoriaContext } from "../../../contexts/CategoriaContext";
import {
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CButton,
} from "@coreui/react";
const useCategoriaContext = () => useContext(CategoriaContext);

function ListarCategorias() {
  const navigate = useNavigate();
  const { categorias, error } = useCategorias();
  const { setSelectedCategoria } = useCategoriaContext();
  const { currentPage, totalPages, currentData, goToPage, prevPage, nextPage } =
    usePaginacion({
      data: categorias || [],
      itemsPerPage: 8,
    });

  return (
    <div className="card-body">
      <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-center justify-content-md-between mb-3 gap-2 mt-3">
        <h1 className="mb-0">Categorías de Procedimientos</h1>
        <div>
          <CButton
            color="primary"
            size="sm"
            onClick={() => navigate("/categoriaprocedimientoscrear")}
          >
            <i className="bi bi-plus-circle me-1"></i> Crear Categoría
          </CButton>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">Error al cargar categorías</div>
      )}

      <CTable striped bordered hover responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Nombre</CTableHeaderCell>
            <CTableHeaderCell>Descripción</CTableHeaderCell>
            <CTableHeaderCell>Estado</CTableHeaderCell>
            <CTableHeaderCell># Procedimientos</CTableHeaderCell>
            <CTableHeaderCell>Opciones</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {!categorias || categorias.length === 0 ? (
            <CTableRow>
              <CTableDataCell
                colSpan={6}
                className="text-center text-muted py-4"
              >
                {"No hay categorías registradas"}
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentData.map((cat) => (
              <CTableRow key={cat.id}>
                <CTableDataCell>{cat.id}</CTableDataCell>
                <CTableDataCell>{cat.nombre}</CTableDataCell>
                <CTableDataCell>{cat.descripcion || "—"}</CTableDataCell>
                <CTableDataCell>
                  {cat.estado ? (
                    <span className="badge bg-success">Activa</span>
                  ) : (
                    <span className="badge bg-secondary">Inactiva</span>
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {Array.isArray(cat.procedimientos)
                    ? cat.procedimientos.length
                    : 0}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex gap-2 justify-content-center">
                    <CButton
                      color="info"
                      size="sm"
                      title="Ver detalles"
                      onClick={() => {
                        setSelectedCategoria?.(cat);
                        navigate(`/detallescategorias/${cat.id}`);
                      }}
                    >
                      <i className="bi bi-eye-fill"></i>
                    </CButton>
                    <CButton
                      color="primary"
                      size="sm"
                      title="Editar"
                      onClick={() => {
                        setSelectedCategoria?.(cat);
                        navigate(`/editarcategoriaprocedimientos/${cat.id}`);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      title="Eliminar (próximamente)"
                      disabled
                    >
                      <i className="bi bi-trash"></i>
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>

      <PaginacionComponents
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </div>
  );
}

export default ListarCategorias;
