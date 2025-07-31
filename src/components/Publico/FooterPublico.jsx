import React from 'react'
import { CContainer } from '@coreui/react'

const FooterPublico = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start border-top ">
      <CContainer className="py-4">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0 text-start">
            <h5 className="mb-2">Mi Clínica Estética</h5>
            <p className="mb-0 text-muted">
              Comprometidos con tu bienestar y belleza. Agenda tu cita con nosotros hoy mismo.
            </p>
          </div>
          <div className="col-lg-6 text-lg-end text-center">
            <p className="mb-1">
              <a href="/terminos" className="text-decoration-none text-muted me-3">Términos</a>
              <a href="/privacidad" className="text-decoration-none text-muted me-3">Privacidad</a>
              <a href="/contacto" className="text-decoration-none text-muted">Contacto</a>
            </p>
            <small className="text-muted">
              © {new Date().getFullYear()} Mi Clínica Estética. Todos los derechos reservados.
            </small>
          </div>
        </div>
      </CContainer>
    </footer>
  )
}

export default FooterPublico
