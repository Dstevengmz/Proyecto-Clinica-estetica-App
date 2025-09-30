import React, { useEffect, useState } from "react";
import socketfrontend from "../../../assets/js/socket";
import TotalCitasCanceladasCard from "./TotalCitasCanceladas";
import TotalCitasCard from "./TotalCitasCard";
import TotalCitasPendientesHoyCard from "./TotalCitasDia";
import TotalCitasCanceladasHoyCard from "./TotalCitasCanceladasDia";
import TotalCitasRealizadasEvaluacionHoyCard from "./TotalCitasRealizadasEvaluacionDia";
import TotalCitasRealizadasProcedimientoHoyCard from "./TotalCitasRealizadasProcedimientosDia";

function DashboardDoctorPage({ doctorId }) {
  const [totalCitas, setTotalCitas] = useState(0);
  const [totalCitasCanceladas, setTotalCitasCanceladas] = useState(0);
  const [totalPendientesHoy, setTotalPendientesHoy] = useState(0);
  const [totalCitasCanceladasHoy, setTotalCitasCanceladasHoy] = useState(0);
  const [
    totalCitasRealizadasEvaluacionHoy,
    setTotalCitasRealizadasEvaluacionHoy,
  ] = useState(0);
  const [
    totalCitasRealizadasProcedimientoHoy,
    setTotalCitasRealizadasProcedimientoHoy,
  ] = useState(0);

  useEffect(() => {
    if (!doctorId) return;

    socketfrontend.emit("registrarDoctor", doctorId);

    socketfrontend.on("totalCitas", (data) => {
      setTotalCitas(data.total);
    });

    socketfrontend.on("totalCitasCanceladas", (data) => {
      setTotalCitasCanceladas(data.total);
    });

    socketfrontend.on("totalCitasPendientesHoy", (data) => {
      setTotalPendientesHoy(data.total);
    });

    socketfrontend.on("totalCitasCanceladasHoy", (data) => {
      setTotalCitasCanceladasHoy(data.total);
    });
    socketfrontend.on("totalCitasRealizadasEvaluacionHoy", (data) => {
      setTotalCitasRealizadasEvaluacionHoy(data.total);
    });
    socketfrontend.on("totalCitasRealizadasProcedimientoHoy", (data) => {
      setTotalCitasRealizadasProcedimientoHoy(data.total);
    });

    return () => {
      socketfrontend.off("totalCitas");
      socketfrontend.off("totalCitasCanceladas");
      socketfrontend.off("totalCitasPendientesHoy");
      socketfrontend.off("totalCitasCanceladasHoy");
      socketfrontend.off("totalCitasRealizadasEvaluacionHoy");
      socketfrontend.off("totalCitasRealizadasProcedimientoHoy");
    };
  }, [doctorId]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/apicitas/listarcitas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setTotalCitas(list.length);
        const canceladas = list.filter(
          (cita) => cita?.estado === "cancelada"
        ).length;

        setTotalCitasCanceladas(canceladas);
        const hoy = new Date().toISOString().split("T")[0];
        const pendientesHoy = list.filter(
          (cita) =>
            cita?.estado === "pendiente" &&
            new Date(cita.fecha).toISOString().startsWith(hoy)
        ).length;
        const realizadasProcedimientoHoy = list.filter(
          (cita) =>
            cita?.estado === "realizada" &&
            cita?.tipo === "procedimiento" &&
            new Date(cita.fecha).toISOString().startsWith(hoy)
        ).length;

        const realizadasEvaluacionHoy = list.filter(
          (cita) =>
            cita?.estado === "realizada" &&
            cita?.tipo === "evaluacion" &&
            new Date(cita.fecha).toISOString().startsWith(hoy)
        ).length;
        const canceladasHoy = list.filter(
          (cita) =>
            cita?.estado === "cancelada" &&
            new Date(cita.fecha).toISOString().startsWith(hoy)
        ).length;

        setTotalPendientesHoy(pendientesHoy);
        setTotalCitasRealizadasProcedimientoHoy(realizadasProcedimientoHoy);
        setTotalCitasRealizadasEvaluacionHoy(realizadasEvaluacionHoy);
        setTotalCitasCanceladasHoy(canceladasHoy);
      })

      .catch(() => {
        setTotalCitas(0);
        setTotalCitasCanceladas(0);
        setTotalPendientesHoy(0);
        setTotalCitasRealizadasProcedimientoHoy(0);
      });
  }, [doctorId]);

  return (
    <div className="flex justify-center mb-10">
      <TotalCitasCard total={totalCitas} />
      <TotalCitasCanceladasCard total={totalCitasCanceladas} />
      <TotalCitasPendientesHoyCard total={totalPendientesHoy} />
      <TotalCitasCanceladasHoyCard total={totalCitasCanceladasHoy} />
      <TotalCitasRealizadasEvaluacionHoyCard
        total={totalCitasRealizadasEvaluacionHoy}
      />
      <TotalCitasRealizadasProcedimientoHoyCard
        total={totalCitasRealizadasProcedimientoHoy}
      />
    </div>
  );
}
export default DashboardDoctorPage;
