import { useState, useEffect, useCallback } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function useEditarUsuario(id) {
  const [usuario, setUsuario] = useState(null); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Obtener datos del usuario
  const obtenerUsuario = useCallback(async () => {
    if (!token || !id) {
      setUsuario(null);
      setCargando(false);
      return;
    }
    try {
      setCargando(true);
  const response = await axios.get(`${API_URL}/apiusuarios/buscarusuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(response.data);
    } catch (err) {
      console.error("Error al obtener el usuario", err);
      setError(err);
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  }, [id, token]);

  // Función para editar el usuario
  const editarUsuario = async (datosActualizados) => {
    if (!token || !id) return;
    try {
      setCargando(true);
  const response = await axios.patch(
        `${API_URL}/apiusuarios/editarusuarios/${id}`,
        datosActualizados,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsuario(response.data); 
      return response.data;
    } catch (err) {
      console.error("Error al editar el usuario", err);
      setError(err);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, [obtenerUsuario]);

  return { usuario, cargando, error, obtenerUsuario, editarUsuario };
}

export default useEditarUsuario;