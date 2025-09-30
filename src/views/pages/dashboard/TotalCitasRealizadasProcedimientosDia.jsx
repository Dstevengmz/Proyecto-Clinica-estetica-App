import React from "react";
import { ClipboardCheck } from "lucide-react";

function TotalCitasRealizadasProcedimientoHoyCard({ total }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
      <ClipboardCheck className="mx-auto h-10 w-10 text-blue-500" />
      <h2 className="text-xl font-bold text-gray-700 mt-2">
        Citas Realizadas (Procedimiento) Hoy
      </h2>
      <p className="text-4xl font-extrabold text-blue-600 mt-4">{total}</p>
      <p className="text-sm text-gray-500 mt-2">Actualizado en tiempo real</p>
    </div>
  );
}

export default TotalCitasRealizadasProcedimientoHoyCard;
