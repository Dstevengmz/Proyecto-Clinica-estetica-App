import React from "react";
import { Link } from "react-router-dom";
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CFormSelect,} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilBook, cilClipboard } from "@coreui/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import useRegistrarUsuario from "../../../hooks/useRegistrarUsuario";

const Register = () => {
  const {
    phone, nombre, tipodocumento, numerodocumento, correo, contrasena, confirmar, genero, terminos, cargando,
    setPhone,
    setNombre,
    setTipodocumento,
    setNumerodocumento,
    setCorreo,
    setContrasena,
    setConfirmar,
    setGenero,
    setTerminos,
    registrarUsuario,
  } = useRegistrarUsuario();
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={registrarUsuario}>
                  <h1>Registro</h1>
                  <p className="text-body-secondary">Complete los campos</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nombre"
                      autoComplete="Nombre completo"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilBook} />
                    </CInputGroupText>
                    <CFormSelect
                      value={tipodocumento}
                      required
                      aria-label="Seleccione su documento"
                      onChange={(e) => setTipodocumento(e.target.value)}
                      options={[
                        {
                          label: "Seleccione su documento",
                          value: "",
                          disabled: true,
                        },
                        {
                          label: "Cédula de Ciudadanía",
                          value: "Cédula de Ciudadanía",
                        },
                        { label: "Pasaporte", value: "Pasaporte" },
                        {
                          label: "Documento de Identificación Extranjero",
                          value: "Documento de Identificación Extranjero ",
                        },
                        {
                          label: "Permiso Especial de Permanencia",
                          value: "Permiso Especial de Permanencia",
                        },
                      ]}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilClipboard} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Numero de documento"
                      autoComplete="Numero de documento"
                      maxLength={10}
                      pattern="[0-9]*"
                      required
                      value={numerodocumento}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 10) {
                          setNumerodocumento(value);
                        }
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      required
                      value={correo}
                      placeholder="Correo Electrónico"
                      autoComplete="email"
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="Contraseña"
                      required
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirmar Contraseña"
                      autoComplete="Confirmar Contraseña"
                      required
                      value={confirmar}
                      onChange={(e) => setConfirmar(e.target.value)}
                    />
                  </CInputGroup>
                  {/* Rol oculto: se envía por defecto como 'usuario' desde el hook */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>

                    <div style={{ flex: 1 }}>
                      <PhoneInput
                        required
                        country={"co"}
                        value={phone}
                        onChange={setPhone}
                        inputProps={{ name: "phone", required: true }}
                        inputStyle={{
                          width: "100%",
                          height: "38px",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                          backgroundColor: "#212631",
                          color: "white",
                        }}
                      />
                    </div>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect
                      value={genero}
                      required
                      aria-label="Seleccione su género"
                      onChange={(e) => setGenero(e.target.value)}
                      options={[
                        {
                          label: "Seleccione su género",
                          value: "",
                          disabled: true,
                        },
                        { label: "Masculino", value: "Masculino" },
                        { label: "Femenino", value: "Femenino" },
                        { label: "Otro", value: "Otro" },
                      ]}
                    />
                  </CInputGroup>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terminos"
                      checked={terminos}
                      onChange={(e) => setTerminos(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="terminos">
                      Acepto los{" "}
                      <Link to="/terminoscondiciones" target="_blank">términos y condiciones</Link>
                    </label>
                  </div>
                  <div className="d-grid">
                    <CButton type="submit" color="success" disabled={cargando}>
                      {cargando ? "Creando cuenta..." : "Crear cuenta"}
                    </CButton>
                    <CCol xs={8} className="text-right">
                      <Link to="/iniciarsesion">
                        <CButton color="link" className="px-0">
                          ¿Ya tengo una cuenta?
                        </CButton>
                      </Link>
                    </CCol>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};
export default Register;