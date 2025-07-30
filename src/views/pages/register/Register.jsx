import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilBook, cilClipboard } from "@coreui/icons";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipodocumento, setTipodocumento] = useState("");
  const [numerodocumento, setNumerodocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [rol, setRol] = useState("");
  const [genero, setGenero] = useState("");
  const [terminos,setTerminos] = useState(false);

  const mostrarErrores = (errores) => {
    const lista = errores.map((e) => `<li>${e}</li>`).join("");
    Swal.fire({
      icon: "error",
      title: "Error al registrar el usuario Complete todos los campos",
      html: `<ul style="text-align:left;">${lista}</ul>`,
      confirmButtonText: "Entendido",
    });
  };
  const validarFormulario = () => {
    const errores = [];

    if (!nombre.trim()) errores.push("El nombre es obligatorio");
    else {
      if (nombre.trim().length < 5)
        errores.push("El nombre debe tener al menos 5 caracteres");
      if (/\d/.test(nombre)) errores.push("El nombre no debe contener números");
    }

    if (!tipodocumento) errores.push("Debe seleccionar un tipo de documento");
    if (!numerodocumento.trim())
      errores.push("El número de documento es obligatorio");
    else if (numerodocumento.trim().length < 7)
      errores.push("El número de documento debe tener al menos 7 caracteres");
    else if (numerodocumento.trim().length > 10)
      errores.push("El número de documento no puede tener más de 10 caracteres");

    if (!correo.trim()) errores.push("El correo electrónico es obligatorio");
    else if (!/\S+@\S+\.\S+/.test(correo))
      errores.push("El correo electrónico no es válido");

    if (!contrasena.trim()) errores.push("La contraseña es obligatoria");
    else if (contrasena.length < 6)
      errores.push("La contraseña debe tener al menos 6 caracteres");

    if (contrasena !== confirmar) errores.push("Las contraseñas no coinciden");

    if (!rol) errores.push("Debe seleccionar un rol");
    if (!phone.trim()) errores.push("El número de teléfono es obligatorio");
    else if (!/^\+?[0-9\s]+$/.test(phone))
      errores.push("El número de teléfono no es válido");

    if (!genero) errores.push("Debe seleccionar un género");
    if (!terminos) errores.push("Debe aceptar los términos y condiciones");

    return errores;
  };
  const enviarFormulario = async (e) => {
    e.preventDefault();
    const errores = validarFormulario();
    if (errores.length > 0) {
      mostrarErrores(errores);
      return;
    }
    try {
      await axios.post(`${API_URL}/apiusuarios/crearusuarios`, {
        nombre,
        tipodocumento,
        numerodocumento,
        correo,
        contrasena,
        rol,
        telefono: phone,
        genero,
        terminos_condiciones: terminos,
      });

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Tu cuenta ha sido creada correctamente",
        confirmButtonText: "Iniciar sesión",
      }).then(() => navigate("/iniciarsesion"));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario. Intenta más tarde.",
      });
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={enviarFormulario}>
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
                      maxlength="10"
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
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect
                      value={rol}
                      required
                      aria-label="Seleccione su rol"
                      onChange={(e) => setRol(e.target.value)}
                      options={[
                        {
                          label: "Seleccione su rol",
                          value: "",
                          disabled: true,
                        },
                        { label: "Doctor", value: "doctor" },
                        { label: "Usuario", value: "Usuario" },
                        {
                          label: "Asistente",
                          value: "asistente",
                          disabled: true,
                        },
                      ]}
                    />
                  </CInputGroup>
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
                      <Link to="/terminoscondiciones">términos y condiciones</Link>
                    </label>
                  </div>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Crear cuenta
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
