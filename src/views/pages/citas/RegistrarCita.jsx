import React, { useState, useEffect } from "react";
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

const API_URL = import.meta.env.VITE_API_URL;

function RegistrarCitas() {
  const { limpiarCarrito } = useCarrito();
  const navigate = useNavigate();
  const { usuario, cargando } = usePerfilUsuario();
  const { doctores, cargando: cargandoDoctores, error: errorDoctores } = useListarDoctores();
  const token = localStorage.getItem("token");

  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [formData, setFormData] = useState({ id_usuario: "", id_doctor: "", fecha: "", estado: "pendiente", tipo: "", observaciones: "",
  });

  const { horariosOcupados, cargando: cargandoHorarios, error,
  } = useHorariosDisponible(formData.fecha, formData.tipo, token);

  useEffect(() => {
  }, [ formData.fecha, formData.tipo, horariosOcupados, cargandoHorarios, error, token,
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
  const ManejarEnvio = async (e) => {
    e.preventDefault();

    if (!formData.fecha || !horaSeleccionada || !formData.tipo) {
      alert("Debe seleccionar la fecha, hora y tipo de cita.");
      return;
    }

  const fechaFormateada = `${formData.fecha}T${horaSeleccionada}:00`;

    try {
      const orden = await axios.post(
        `${API_URL}/apicitas/crearordendesdecita`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Orden creada:", orden.data);

      await axios.post(
        `${API_URL}/apicitas/crearcitas`,
        { ...formData, fecha: fechaFormateada },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    return <Cargando texto=" No se pudo cargar la información del usuario. Por favor, inicie sesión nuevamente." />;
  }

  return (
    <Container>
      <h1 className="mt-4">Registrar Cita</h1>
  {error && <div className="alert alert-danger">{error}</div>}
  {errorDoctores && <div className="alert alert-warning">{errorDoctores}</div>}
      <InformacionUsuario usuario={usuario} />
      <Form onSubmit={ManejarEnvio}>
        <input type="hidden" name="id_usuario" value={formData.id_usuario} />
        <div className="mb-3">
          <label className="form-label">Doctor:</label>
          <select name="id_doctor" className="form-select" value={formData.id_doctor} onChange={manejarCambio} required
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
          <select className="form-select" name="tipo" value={formData.tipo} onChange={manejarCambio} required
          >
            <option value="">Seleccione tipo</option>
            <option value="evaluacion">Evaluación</option>
            <option value="procedimiento">Procedimiento</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input type="date" name="fecha" className="form-control" value={formData.fecha} onChange={manejarCambio} min={new Date().toISOString().split("T")[0]} required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora:</label>
          <select className="form-select" value={horaSeleccionada} onChange={(e) => setHoraSeleccionada(e.target.value)} required disabled={!formData.fecha || !formData.tipo || cargandoHorarios}
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
                <option key={hora} value={hora} disabled={estaOcupado( hora, horariosOcupados, cargandoHorarios, formData
                  )}
                >
                  {hora}{" "}
                  {estaOcupado(hora,horariosOcupados,cargandoHorarios,formData)
                    ? "🟥 Ocupado"
                    : "🟩 Disponible"}
                </option>
              ))}
          </select>
          {error && <div className="text-danger small mt-1">{error}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Observaciones:</label>
          <textarea name="observaciones" className="form-control" value={formData.observaciones} onChange={manejarCambio} rows={3} placeholder="Ingrese observaciones adicionales (opcional)"
          />
        </div>

        <div className="d-flex gap-2 mt-4">
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
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default RegistrarCitas;