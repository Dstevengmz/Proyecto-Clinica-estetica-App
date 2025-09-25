// src/hooks/useCitasPacienteDoctor.js
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function useCitasPacienteDoctor(usuarioId) {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!usuarioId || !token) return;

    const fetchData = async () => {
      try {
        setCargando(true);
        const res = await axios.get(`${API_URL}/apicitas/citasusuario/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCitas(res.data || []);
      } catch (err) {
        console.error("Error al listar citas del paciente:", err);
        setError("No se pudieron cargar las citas");
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [usuarioId, token]);

  return { citas, cargando, error };
}

export default useCitasPacienteDoctor;
