import React from "react";

const Inicio = () => {
  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="data:image/jpeg;base64,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"
                className="d-block w-100"
                alt="slide1"
              />
            </div>
            <div className="carousel-item">
              <img
                src="data:image/jpeg;base64,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"
                className="d-block w-100"
                alt="slide2"
              />
            </div>
            <div className="carousel-item">
              <img
                src="data:image/jpeg;base64,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"
                className="d-block w-100"
                alt="slide3"
              />
            </div>
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
      <div className="container-fluid px-5 my-5">
        <h2 className="text-center mb-4">¿Quiénes somos?</h2>
        <p className="text-center">
          Somos una clínica especializada en tratamientos estéticos para tu
          bienestar. Ofrecemos servicios de alta calidad para revitalizar cuerpo
          y mente.
        </p>
      </div>
      {/* NUESTRO EQUIPO MÉDICO */}
      
<div className="row text-center">
  <div className="col-md-4 mb-4">
    <div className="card h-100 card-profile-small">
      <img
        src="https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
        className="card-img-top img-profile-small"
        alt="Dr. Andrés Blanco"
        style={{ width: "120px", height: "120px", objectFit: "cover", margin: "0 auto", borderRadius: "50%" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1.1rem" }}>Dr. Andrés Blanco, 32</h5>
        <p className="text-muted" style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>Ortopedista</p>
        <p className="text-muted" style={{ fontSize: "0.85rem" }}>
          Especialista en: Cirugía de Huesos y Articulaciones<br />
          Lesiones Deportivas<br />
          Reemplazo Articular<br />
          Fracturas y Rehabilitación<br />
          Columna Vertebral<br />
          <span role="img" aria-label="ubicación">📍</span> Clínica Santa María<br />
          Consultorio 203<br />
          <span role="img" aria-label="teléfono">📞</span> Tel: (55) 1234-5678<br />
          <span role="img" aria-label="correo">📧</span> contacto@drjuanperez.com<br />
          <span role="img" aria-label="web">🌐</span> www.drjuanperez.com<br />
          Atención con cita previa
        </p>
      </div>
    </div>
  </div>
  <div className="col-md-4 mb-4">
    <div className="card h-100 card-profile-small">
      <img
        src="https://t3.ftcdn.net/jpg/03/13/77/82/240_F_313778250_Y0o5can6MA490Nt7G6p03Zfu5fKmWCIv.jpg"
        className="card-img-top img-profile-small"
        alt="Dra. Michelle Gris"
        style={{ width: "120px", height: "120px", objectFit: "cover", margin: "0 auto", borderRadius: "50%" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1.1rem" }}>Dra. Michelle Gris, 40</h5>
        <p className="text-muted" style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>Neuróloga</p>
        <p className="text-muted" style={{ fontSize: "0.85rem" }}>
          Especialista en: Trastornos neurológicos<br />
          Diagnóstico y tratamiento de epilepsia<br />
          Enfermedades neurodegenerativas<br />
          <span role="img" aria-label="ubicación">📍</span> Clínica Central<br />
          Consultorio 110<br />
          <span role="img" aria-label="teléfono">📞</span> Tel: (55) 8765-4321<br />
          <span role="img" aria-label="correo">📧</span> michelle.gris@clinicacentral.com<br />
          <span role="img" aria-label="web">🌐</span> www.clinicacentral.com<br />
          Atención con cita previa
        </p>
      </div>
    </div>
  </div>
  <div className="col-md-4 mb-4">
    <div className="card h-100 card-profile-small">
      <img
        src="https://t3.ftcdn.net/jpg/04/42/01/92/240_F_442019265_2kB8Jxz6G8cUuJHQb5n63ab8Qx0Neycz.jpg"
        className="card-img-top img-profile-small"
        alt="Dr. Esteban Johnson"
        style={{ width: "120px", height: "120px", objectFit: "cover", margin: "0 auto", borderRadius: "50%" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: "1.1rem" }}>Dr. Esteban Johnson, 49</h5>
        <p className="text-muted" style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>Pediatra</p>
        <p className="text-muted" style={{ fontSize: "0.85rem" }}>
          Especialista en: Salud infantil<br />
          Vacunación y control del niño sano<br />
          Enfermedades respiratorias y digestivas<br />
          <span role="img" aria-label="ubicación">📍</span> Clínica Infantil<br />
          Consultorio 305<br />
          <span role="img" aria-label="teléfono">📞</span> Tel: (55) 2468-1357<br />
          <span role="img" aria-label="correo">📧</span> esteban.johnson@clinicainfantil.com<br />
          <span role="img" aria-label="web">🌐</span> www.clinicainfantil.com<br />
          Atención con cita previa
        </p>
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
                src="https://renewsteticspa.com/wp-content/uploads/2022/01/foto-limpieza-facial-pagina-1024x682.png"
                className="card-img-top"
                alt="servicio1"
              />
              <div className="card-body">
                <h5 className="card-title">Limpieza Facial</h5>
                <p className="card-text">
                  Tratamientos para revitalizar tu piel y dejarla luminosa.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNas_ErSqfomrqsZ0CihUNm9GF77MBlwTTcQ&s"
                className="card-img-top"
                alt="servicio2"
              />
              <div className="card-body">
                <h5 className="card-title">Depilación Láser</h5>
                <p className="card-text">
                  Eliminación del vello de forma segura y efectiva.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img
                src="data:image/jpeg;base64,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"
                className="card-img-top"
                alt="servicio3"
              />
              <div className="card-body">
                <h5 className="card-title">Masajes Relajantes</h5>
                <p className="card-text">
                  Libérate del estrés con nuestras terapias personalizadas.
                </p>
              </div>
            </div>
          </div>
        </div>
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

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 w-100">
        <p className="mb-0">
          © 2025 Clínica Estética. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};
export default Inicio;
