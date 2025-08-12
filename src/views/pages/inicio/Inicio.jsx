import React from "react";
import MapaConRuta from "../mapa/mapa";
const Inicio = () => {
  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://picsum.photos/1200/400?random=1"
              className="d-block w-100"
              alt="slide1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/1200/400?random=2"
              className="d-block w-100"
              alt="slide2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://picsum.photos/1200/400?random=3"
              className="d-block w-100"
              alt="slide3"
            />
          </div>
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
      
<div className="container-fluid px-4 py-5 my-5 bg-dark text-light rounded">
  <h2 className="text-center mb-4 text-light">¿Quiénes somos?</h2>
  <p className="text-center mb-5">
    Somos una clínica estética especializada en procedimientos faciales no quirúrgicos como lipopapada, blefaroplastia sin cirugía y aplicación de toxina botulínica. Nuestro equipo está conformado por profesionales del área de la salud con formación en medicina estética, comprometidos con ofrecer tratamientos personalizados, seguros y basados en evidencia científica. Aplicamos protocolos clínicos rigurosos que garantizan resultados naturales, cuidando siempre la armonía facial, la bioseguridad y el bienestar integral del paciente.
  </p>

  <div className="row g-4">
    <div className="col-md-6 col-lg-4">
      <div className="border border-secondary rounded p-4 h-100 bg-transparent">
        <h4 className="text-info">Misión</h4>
        <p>
          Brindar servicios médico-estéticos integrales orientados al mejoramiento facial, mediante el uso de tecnología avanzada, personal especializado y estrictos protocolos clínicos, garantizando seguridad, efectividad y satisfacción del paciente.
        </p>
      </div>
    </div>

    <div className="col-md-6 col-lg-4">
      <div className="border border-secondary rounded p-4 h-100 bg-transparent">
        <h4 className="text-info">Visión</h4>
        <p>
          Ser líderes en el sector de medicina estética facial en la region, destacándonos por la innovación, calidad asistencial, ética profesional y atención humanizada, siendo referentes de excelencia a nivel regional y nacional.
        </p>
      </div>
    </div>

    <div className="col-md-12 col-lg-4">
      <div className="border border-secondary rounded p-4 h-100 bg-transparent">
        <h4 className="text-info">Valores</h4>
        <ul>
          <li>Ética profesional</li>
          <li>Calidez humana</li>
          <li>Innovación constante</li>
          <li>Calidad y seguridad</li>
          <li>Compromiso con el paciente</li>
        </ul>
      </div>
    </div>
  </div>
</div>

      {/* NUESTRO EQUIPO MÉDICO */}
      <div className="container-fluid px-5 my-5">
        <h2 className="text-center mb-4">Nuestro Equipo Médico</h2>
        <p className="text-center mb-5">
          El trabajo en equipo y la comunicación efectiva entre nuestros
          profesionales son clave para brindar atención médica de calidad y
          lograr resultados positivos en la salud.
        </p>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src="/doctores/doctor1.png"
                className="card-img-top"
                alt="Dr. Andrés Blanco"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Andrés Blanco, 32</h5>
                <p className="text-muted">Ortopedista</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src="/doctores/doctor2.png"
                className="card-img-top"
                alt="Dra. Michelle Gris"
              />
              <div className="card-body">
                <h5 className="card-title">Dra. Michelle Gris, 40</h5>
                <p className="text-muted">Neuróloga</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src="/doctores/doctor3.png"
                className="card-img-top"
                alt="Dr. Esteban Johnson"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Esteban Johnson, 49</h5>
                <p className="text-muted">Pediatra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SERVICIOS */}
      <div className="container-fluid px-5 my-5">
        <h2 className="text-center mb-4">Nuestros Servicios</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0-iy041g9q7HJpISBH5mMUDr1aKPs5ZeZLw&s/400/200?random=4"
                className="card-img-top"
                alt="servicio1"
              />
              <div className="card-body">
                <h5 className="card-title">Lipopapada</h5>
                <p className="card-text">
                  es un procedimiento quirúrgico estético, también conocido como liposucción de papada, que tiene como objetivo eliminar el exceso de grasa acumulada en la zona debajo del mentón y en el cuello, mejorando así el contorno facial y la definición de la mandíbula. Es una intervención mínimamente invasiva que busca un aspecto más estilizado y juvenil. .
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbc3wkweCL-WSxTuwCZUay4cj_MlMP-B6YpA&s/400/200?random=5"
                className="card-img-top"
                alt="servicio2"
              />
              <div className="card-body">
                <h5 className="card-title">Blefaroplastia</h5>
                <p className="card-text">
                  Procedimiento quirúrgico para eliminar el exceso de piel, grasa y músculo de los párpados superiores e inferiores. Este procedimiento puede mejorar la apariencia de los párpados caídos, las bolsas debajo de los ojos y la piel flácida, dando una apariencia más juvenil y descansada. También puede mejorar la visión en casos donde el exceso de piel del párpado superior dificulta la vista. .
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU5-gEi6kEdd_yXJYXup7VzxSjeAQ3srizCg&s/400/200?random=6"
                className="card-img-top"
                alt="servicio3"
              />
              <div className="card-body">
                <h5 className="card-title">Toxina botulinica</h5>
                <p className="card-text">
                  comúnmente conocida como Botox, es una neurotoxina producida por la bacteria Clostridium botulinum. Se utiliza en medicina y estética para tratar diversas condiciones médicas y para reducir temporalmente las arrugas faciales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ubicacion */}
      {/* MAPA DE LA CLÍNICA */}
      <div className="container my-5">
        <h2 className="text-center mb-4">¿Cómo llegar a nuestra clínica?</h2>
        <MapaConRuta />
      </div>
      <div className="container-fluid bg-dark px-5 py-5">
        <h2 className="text-center mb-4">Contáctanos</h2>
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre completo"
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
              />
            </div>
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="4" placeholder="Mensaje" />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Inicio;
