import React, { useEffect, useState } from "react";
import socketfrontend from "../../../assets/js/socket";
import TotalCitasCard from "./TotalCitasCard";

export default function DashboardDoctorPage({ doctorId }) {
  const [totalCitas, setTotalCitas] = useState(0);

  useEffect(() => {
    if (!doctorId) return;

    // Se registra en su sala privada
    socketfrontend.emit("registrarDoctor", doctorId);

    // Escucha actualizaciones en tiempo real
    socketfrontend.on("totalCitas", (data) => {
      setTotalCitas(data.total);
    });

    // Cleanup
    return () => {
      socketfrontend.off("totalCitas");
    };
  }, [doctorId]);

  // Carga inicial desde la API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/apicitas/listarcitas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTotalCitas(data.length))
      .catch(() => setTotalCitas(0));
  }, [doctorId]);

  return (
    <div className="flex justify-center mb-10">
      <TotalCitasCard total={totalCitas} />
    </div>
  );
}
