import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

 const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const token = localStorage.getItem("token");

const cargarCarritoDesdeBackend = async () => {
  try {
    const res = await axios.get(`${API_URL}/apicarrito/listarmicarrito`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setCarrito(res.data);
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
  }
};

const agregarAlCarrito = async (id_procedimiento) => {
  try {
    const res = await axios.post(
      `${API_URL}/apicarrito/agregaramicarrito`,
      { id_procedimiento },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    setCarrito((prev) => [...prev, res.data]);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  }
};

const eliminarDelCarrito = async (idCarrito) => {
  try {
    await axios.delete(`${API_URL}/apicarrito/eliminardemicarrito/${idCarrito}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setCarrito((prev) => prev.filter((item) => item.id !== idCarrito));
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
  }
};

const limpiarCarrito = async () => {
  try {
    await axios.delete(`${API_URL}/apicarrito/limpiarmicarrito`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setCarrito([]);
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
  }
};

  useEffect(() => {
    if (token) cargarCarritoDesdeBackend();
  }, [token]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cargarCarritoDesdeBackend,
        limpiarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider; 