import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const useActualizarCita = (id, formulario, hora, token) => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const actualizarCita = async (e) => {
    e.preventDefault();

    if (!formulario.id_doctor) {
      alert("Por favor seleccione un doctor");
      return;
    }
    if (!formulario.tipo) {
      alert("Por favor seleccione el tipo de cita");
      return;
    }
    if (!formulario.fecha) {
      alert("Por favor seleccione una fecha");
      return;
    }
    if (!hora) {
      alert("Por favor seleccione una hora");
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
      alert("Cita actualizada correctamente");
      navigate("/consultarcitas");
    } catch (err) {
      console.error("Error al actualizar cita:", err);
      const errorMessage = err.response?.data?.message || "No se pudo actualizar la cita";
      setError(errorMessage);
      alert(errorMessage);
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
