import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertaCitas from "../assets/js/alertas/citas/AlertaCitas";

const API_URL = import.meta.env.VITE_API_URL;

const useActualizarCita = (id, formulario, hora, token) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 const actualizarCita = async (e) => {
  e.preventDefault();
  const alertas = new AlertaCitas();

  if (!formulario.id_doctor) {
    await alertas.alertaValidacionDoctor();
    return;
  }
  if (!formulario.tipo) {
    await alertas.alertaValidacionTipo();
    return;
  }

  // Construir payload dinámico
  const payload = {
    id_usuario: formulario.id_usuario,
    id_doctor: formulario.id_doctor,
    estado: formulario.estado,
    tipo: formulario.tipo,
    observaciones: formulario.observaciones,
    examenes_requeridos: formulario.examenes_requeridos,
    nota_evolucion: formulario.nota_evolucion,
  };

  // Solo enviar fecha si el usuario realmente la seleccionó
  if (formulario.fecha && hora) {
    payload.fecha = `${formulario.fecha} ${hora}:00`;
  }

  try {
    setCargando(true);
    await axios.patch(`${API_URL}/apicitas/editarcitas/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await alertas.alertaCitaActualizada();
    navigate("/consultarcitas");
  } catch (err) {
    console.error("Error al actualizar cita:", err);
    const errorMessage =
      err.response?.data?.message || "No se pudo actualizar la cita";
    setError(errorMessage);
    await alertas.alertaErrorActualizarCita(errorMessage);
  } finally {
    setCargando(false);
  }
};

  return {
    actualizarCita,
    cargando,
    error,
  };
};

export default useActualizarCita;