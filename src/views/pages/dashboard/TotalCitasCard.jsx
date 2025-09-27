import React from "react";
import { Calendar } from "lucide-react"; 

export default function TotalCitasCard({ total }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center border border-gray-200">
      <div className="flex justify-center items-center mb-4">
        <Calendar className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">Total de Citas</h2>
      <p className="text-5xl font-bold text-green-700 mt-2">{total}</p>
      <span className="text-sm text-gray-500 mt-2 block">
        Actualizado en tiempo real
      </span>
    </div>
  );
}
