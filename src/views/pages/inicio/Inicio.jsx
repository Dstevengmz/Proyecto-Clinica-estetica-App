import React from "react";
import ChatWidget from "../chat/Chat";
import ImplementoValores from "./ValoresClinica";
import MapaConRuta from "../mapa/mapa";
import Servicioss from "./Serviciosinicio";


const Inicio = () => {
  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          {/* Indicadores */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to="2"
            ></button>
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://www.esneca.com/wp-content/uploads/clinica-estetica.jpg"
                className="d-block w-100"
                alt="slide1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://gestaods.com.br/wp-content/uploads/2023/12/gerenciar-clinica-estetica.png"
                className="d-block w-100"
                alt="slide2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://iamat.org.br/wp-content/uploads/2025/01/Post-de-blog-abrir-clinica-estetica-1068x562.jpg"
                className="d-block w-100"
                alt="slide3"
              />
            </div>
          </div>

          {/* Controles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      {/* QUIÉNES SOMOS */}
      <div className="container-fluid px-5 my-5">
        <h2 className="text-center mb-4">¿Quiénes somos?</h2>
        <p className="text-center">
          Somos una clínica especializada en tratamientos estéticos para tu
          bienestar. Ofrecemos servicios de alta calidad para revitalizar cuerpo
          y mente.
        </p>
      </div>
      <ImplementoValores />
      {/* SERVICIOS */}
      <div className="container-fluid px-5 my-5">
        <Servicioss />
      </div>
      {/* Ubicacion */}

      {/* Aparatos */}
      <div className="container-fluid px-5 my-5">
  <h2 className="text-center mb-4">Nuestros Equipos de Alta Tecnología</h2>
  <p className="text-center mb-5">
    Contamos con equipos de última generación que garantizan seguridad,
    precisión y resultados efectivos en cada procedimiento estético y médico.
  </p>

  <div className="row text-center">
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src="https://www.clinicapremiumestetica.com/wp-content/uploads/2024/12/Laser-CO2-El-Secreto-para-Reducir-Arrugas-y-Manchas-Faciales-Clinica-Premium-Estetica.jpg"
          className="card-img-top"
          alt="Equipo Láser"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">Láser Médico Estético</h5>
          <p className="text-muted">
            Tecnología avanzada para depilación, rejuvenecimiento y tratamientos
            dermatológicos con máxima seguridad.
          </p>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src="https://healtechmedic.com/cdn/shop/products/Disenosintitulo_8.png?v=1666376033&width=600"
          className="card-img-top"
          alt="Cavitación"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">Equipo de Cavitación</h5>
          <p className="text-muted">
            Tratamiento no invasivo para la reducción de grasa localizada mediante
            ultrasonido de alta frecuencia.
          </p>
        </div>
      </div>
    </div>

    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src="https://dramarialucchesi.com/wp-content/uploads/2016/09/Screen-Shot-2016-09-16-at-11.00.11.png"
          className="card-img-top"
          alt="Radiofrecuencia"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title fw-bold">Radiofrecuencia Facial y Corporal</h5>
          <p className="text-muted">
            Mejora la firmeza de la piel y estimula la producción natural de colágeno
            para resultados visibles y duraderos.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Aparatos */}
      {/* MAPA DE LA CLÍNICA */}
      <div className="container my-5">
        <h2 className="text-center mb-4">¿Cómo llegar a nuestra clínica?</h2>
        <MapaConRuta />
      </div>
      <ChatWidget />
    </div>
  );
};
export default Inicio;
