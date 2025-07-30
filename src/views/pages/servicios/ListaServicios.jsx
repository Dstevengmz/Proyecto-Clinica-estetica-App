// src/views/pages/servicios/ListaServicios.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

const ListaServicios = () => {
  const [procedimientos, setProcedimientos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/apiprocedimientos`)
      .then((res) => res.json())
      .then((data) => setProcedimientos(data))
      .catch((error) => console.error('Error al cargar los servicios:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Nuestros Servicios</h2>
      <div className="row">
        {procedimientos.map((proc) => (
          <div className="col-md-4 mb-4" key={proc.id}>
            <div className="card h-100 shadow">
              <img
                src={`${API_URL}/${proc.imagen}`}
                className="card-img-top"
                alt={proc.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{proc.nombre}</h5>
                <p className="card-text text-muted">{proc.descripcion.slice(0, 80)}...</p>
                <Link to={`/servicios/${proc.id}`} className="btn btn-primary w-100">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaServicios;
