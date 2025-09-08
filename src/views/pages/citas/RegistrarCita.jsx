import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCarrito } from "../../../contexts/CarritoContext";
import { usePerfilUsuario } from "../../../hooks/usePerfilUsuario";
import useListarDoctores from "../../../hooks/useListarDoctores";
import useHorariosDisponible from "../../../hooks/useHorariosDisponible";
import horariosDisponibles from "../../../assets/js/HorariosDisponibles";
import estaOcupado from "../../../assets/js/HorarioEstaOcupado";
import Cargando from "../../../components/Cargando";
import InformacionUsuario from "../../../views/pages/usuarios/InformacionUsuario";
import useMisCitas from "../../../hooks/useMisCitas";

const API_URL = import.meta.env.VITE_API_URL;

function RegistrarCitas() {
  const { carrito, limpiarCarrito } = useCarrito();
  const { usuario, cargando } = usePerfilUsuario();
  const navigate = useNavigate();
  const {
    doctores,
    cargando: cargandoDoctores,
    error: errorDoctores,
  } = useListarDoctores();
  const token = localStorage.getItem("token");
  const {
    citas,
    cargando: cargandoCitas,
  } = useMisCitas(usuario?.id);

  const [esPrimeraCita, setEsPrimeraCita] = useState(false);
  const [tieneEvaluacion, setTieneEvaluacion] = useState(false);

  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [formData, setFormData] = useState({ id_usuario: "", id_doctor: "", fecha: "", estado: "pendiente", tipo: "",
  });

  useEffect(() => {
    if (!cargandoCitas && citas) {
      setEsPrimeraCita(citas.length === 0);
      setTieneEvaluacion(citas.some((cita) => cita.tipo === "evaluacion"));
    }
  }, [citas, cargandoCitas]);

  const {
    horariosOcupados,
    cargando: cargandoHorarios,
    error,
  } = useHorariosDisponible(formData.fecha, formData.tipo, token);

  useEffect(() => {}, [
    formData.fecha,
    formData.tipo,
    horariosOcupados,
    cargandoHorarios,
    error,
    token,
  ]);

  useEffect(() => {
    if (usuario?.id && !cargando) {
      setFormData((prev) => ({
        ...prev,
        id_usuario: usuario.id,
      }));
    }
  }, [usuario?.id, cargando]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name === "fecha" || name === "tipo") {
      setHoraSeleccionada("");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Estado para exámenes opcionales
  const [archivosExamenes, setArchivosExamenes] = useState([]); // Array<File>
  const fileInputRef = useRef(null);

  const handleAddFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setArchivosExamenes((prev) => {
      const merged = [...prev, ...files];
      // Limite opcional de 10
      return merged.slice(0, 10);
    });
    // Reset para permitir volver a seleccionar el mismo archivo si se desea
    e.target.value = '';
  };

  const handleRemoveFile = (index) => {
    setArchivosExamenes((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const ManejarEnvio = async (e) => {
    e.preventDefault();

    if (!formData.fecha || !horaSeleccionada || !formData.tipo) {
      alert("Debe seleccionar la fecha, hora y tipo de cita.");
      return;
    }

    if (esPrimeraCita && formData.tipo !== "evaluacion") {
      Swal.fire(
        "Advertencia",
        "Tu primera cita debe ser de evaluación.",
        "warning"
      );
      return;
    }

    if (formData.tipo === "procedimiento" && !tieneEvaluacion) {
      Swal.fire(
        "Advertencia",
        "Debes tener una cita de evaluación antes de agendar un procedimiento.",
        "warning"
      );
      return;
    }
    if (formData.tipo === "procedimiento" && carrito.length === 0) {
      Swal.fire(
        "Advertencia",
        "Debes seleccionar un procedimiento (agregar al carrito) antes de agendar esta cita.",
        "warning"
      );
      return;
    }

    const fechaFormateada = `${formData.fecha}T${horaSeleccionada}:00`;

    try {
      const resp = await axios.post(
        `${API_URL}/apicitas/crearcitas`,
        { ...formData, fecha: fechaFormateada },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const citaCreada = resp.data; // debe contener id

      // Subir exámenes si el usuario seleccionó archivos
  if (citaCreada?.id && archivosExamenes && archivosExamenes.length > 0) {
        const fd = new FormData();
        [...archivosExamenes].forEach((f) => fd.append("archivos", f));
        try {
          await axios.post(`${API_URL}/apiexamenes/subir/${citaCreada.id}` , fd, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (subErr) {
          console.error("Error subiendo exámenes:", subErr);
          Swal.fire("Advertencia", "La cita se creó pero los exámenes no se pudieron subir.", "warning");
        }
      }

      Swal.fire(
        "Éxito",
        "Tu orden y cita han sido registradas Correctamente",
        "success"
      );
      limpiarCarrito();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al registrar cita/orden:", error);
      Swal.fire(
        "Error",
        "Hubo un error al registrar la orden o la cita",
        "error"
      );
    }
  };

  if (cargando || cargandoDoctores || cargandoHorarios) {
    return <Cargando texto="Cargando Informacion" />;
  }

  if (!usuario || !usuario.id) {
    return (
      <Cargando texto=" No se pudo cargar la información del usuario. Por favor, inicie sesión nuevamente." />
    );
  }

  return (
    <Container>
      <h1 className="mt-4">Registrar Cita</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {errorDoctores && (
        <div className="alert alert-warning">{errorDoctores}</div>
      )}
      <InformacionUsuario usuario={usuario} />
      <Form onSubmit={ManejarEnvio}>
        <input type="hidden" name="id_usuario" value={formData.id_usuario} />
        <div className="mb-3">
          <label className="form-label">Doctor:</label>
          <select
            name="id_doctor"
            className="form-select"
            value={formData.id_doctor}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione un Doctor</option>
            {doctores && doctores.length > 0 ? (
              doctores.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.nombre}
                </option>
              ))
            ) : (
              <option disabled>No hay doctores disponibles</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo:</label>
          <select
            className="form-select"
            name="tipo"
            value={formData.tipo}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione tipo</option>
            <option value="evaluacion">Evaluación</option>
            <option value="procedimiento" disabled={esPrimeraCita || !tieneEvaluacion}>
              Procedimiento{" "} {esPrimeraCita ? "(Primero evaluación)" : !tieneEvaluacion ? "(Requiere evaluación)" : ""}
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            name="fecha"
            className="form-control"
            value={formData.fecha}
            onChange={manejarCambio}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora:</label>
          <select
            className="form-select"
            value={horaSeleccionada}
            onChange={(e) => setHoraSeleccionada(e.target.value)}
            required
            disabled={!formData.fecha || !formData.tipo || cargandoHorarios}
          >
            <option value="">
              {!formData.fecha || !formData.tipo
                ? "Primero seleccione fecha y tipo"
                : cargandoHorarios
                ? "Cargando horarios disponibles..."
                : "Seleccione una hora"}
            </option>
            {formData.fecha &&
              formData.tipo &&
              !cargandoHorarios &&
              horariosDisponibles.map((hora) => (
                <option
                  key={hora}
                  value={hora}
                  disabled={estaOcupado(
                    hora,
                    horariosOcupados,
                    cargandoHorarios,
                    formData
                  )}
                >
                  {hora}{" "}
                  {estaOcupado(
                    hora,
                    horariosOcupados,
                    cargandoHorarios,
                    formData
                  )
                    ? "🟥 Ocupado"
                    : "🟩 Disponible"}
                </option>
              ))}
          </select>
          {error && <div className="text-danger small mt-1">{error}</div>}
        </div>
        {/* Sección opcional de subida de exámenes */}
        <hr />
        <div className="mb-3">
          <label className="form-label">Exámenes (opcional):</label>
          <div className="d-flex gap-2 mb-2">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={triggerFileDialog}>
              Agregar Archivo
            </button>
            {archivosExamenes.length > 0 && (
              <span className="text-success small align-self-center">{archivosExamenes.length} archivo(s) listos</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            className="d-none"
            onChange={handleAddFiles}
          />
          {archivosExamenes.length > 0 && (
            <ul className="list-group mb-2">
              {archivosExamenes.map((f, i) => (
                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="text-truncate" style={{maxWidth:'70%'}} title={f.name}>{f.name}</span>
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveFile(i)}>X</button>
                </li>
              ))}
            </ul>
          )}
          <small className="text-muted d-block">Formatos: Imágenes o PDF. Máx 10 archivos (10MB c/u).</small>
        </div>
  {/* Eliminados campos de nombre y observaciones según solicitud */}

        <div className="d-flex gap-2 mt-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              !formData.id_doctor ||
              !formData.fecha ||
              !horaSeleccionada ||
              !formData.tipo ||
              cargandoHorarios
            }
          >
            {cargandoHorarios ? "Verificando horarios..." : "Registrar Cita"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default RegistrarCitas;
