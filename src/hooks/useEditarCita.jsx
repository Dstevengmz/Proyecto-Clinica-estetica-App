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
    if (!formulario.fecha) {
      await alertas.alertaValidacionFecha();
      return;
    }
    if (!hora) {
      await alertas.alertaValidacionHora();
      return;
    }

    setCargando(true);
    const fechaCompleta = `${formulario.fecha} ${hora}:00`;

    try {
      await axios.patch(
        `${API_URL}/apicitas/editarcitas/${id}`,
        { ...formulario, fecha: fechaCompleta },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await alertas.alertaCitaActualizada();
      navigate("/consultarcitas");
    } catch (err) {
      console.error("Error al actualizar cita:", err);
      const errorMessage = err.response?.data?.message || "No se pudo actualizar la cita";
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