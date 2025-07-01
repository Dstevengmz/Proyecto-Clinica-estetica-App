import React from 'react'

const Inicio = () => {
  return (
    <div>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://picsum.photos/1200/400?random=1" className="d-block w-100" alt="slide1" />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1200/400?random=2" className="d-block w-100" alt="slide2" />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1200/400?random=3" className="d-block w-100" alt="slide3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>

      {/* QUIÉNES SOMOS */}
      <div className="container-fluid px-5 my-5">
        <h2 className="text-center mb-4">¿Quiénes somos?</h2>
        <p className="text-center">
          Somos una clínica especializada en tratamientos estéticos para tu bienestar.
          Ofrecemos servicios de alta calidad para revitalizar cuerpo y mente.
        </p>
      </div>
            {/* NUESTRO EQUIPO MÉDICO */}
      <div className="container-fluid px-5 my-5">
        <h2 className="text-center mb-4">Nuestro Equipo Médico</h2>
        <p className="text-center mb-5">
          El trabajo en equipo y la comunicación efectiva entre nuestros profesionales son clave
          para brindar atención médica de calidad y lograr resultados positivos en la salud.
        </p>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="/doctores/doctor1.png" className="card-img-top" alt="Dr. Andrés Blanco" />
              <div className="card-body">
                <h5 className="card-title">Dr. Andrés Blanco, 32</h5>
                <p className="text-muted">Ortopedista</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="/doctores/doctor2.png" className="card-img-top" alt="Dra. Michelle Gris" />
              <div className="card-body">
                <h5 className="card-title">Dra. Michelle Gris, 40</h5>
                <p className="text-muted">Neuróloga</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <img src="/doctores/doctor3.png" className="card-img-top" alt="Dr. Esteban Johnson" />
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
              <img src="https://picsum.photos/400/200?random=4" className="card-img-top" alt="servicio1" />
              <div className="card-body">
                <h5 className="card-title">Limpieza Facial</h5>
                <p className="card-text">Tratamientos para revitalizar tu piel y dejarla luminosa.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img src="https://picsum.photos/400/200?random=5" className="card-img-top" alt="servicio2" />
              <div className="card-body">
                <h5 className="card-title">Depilación Láser</h5>
                <p className="card-text">Eliminación del vello de forma segura y efectiva.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100">
              <img src="https://picsum.photos/400/200?random=6" className="card-img-top" alt="servicio3" />
              <div className="card-body">
                <h5 className="card-title">Masajes Relajantes</h5>
                <p className="card-text">Libérate del estrés con nuestras terapias personalizadas.</p>
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
              <input type="text" className="form-control" placeholder="Nombre completo" />
            </div>
            <div className="col-md-6">
              <input type="email" className="form-control" placeholder="Correo electrónico" />
            </div>
          </div>
          <div className="mb-3">
            <textarea className="form-control" rows="4" placeholder="Mensaje" />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
          </div>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-4 w-100">
        <p className="mb-0">© 2025 Clínica Estética. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};
export default Inicio;