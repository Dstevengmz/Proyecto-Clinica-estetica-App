import React from "react";
import { Clock } from "lucide-react";

  function TotalCitasPendientesHoyCard({ total }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
      <Clock className="mx-auto h-10 w-10 text-yellow-500" />
      <h2 className="text-xl font-bold text-gray-700 mt-2">
        Citas Canceladas Hoy
      </h2>
      <p className="text-4xl font-extrabold text-yellow-600 mt-4">{total}</p>
      <p className="text-sm text-gray-500 mt-2">Actualizado en tiempo real</p>
    </div>
  );
}
export default TotalCitasPendientesHoyCard;