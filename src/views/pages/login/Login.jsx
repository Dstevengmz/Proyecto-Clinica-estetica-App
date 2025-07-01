import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import { cilLockLocked, cilUser } from "@coreui/icons";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    correo: "",
    contrasena: "",
  });
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };
  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post(
        `${API_URL}/apiusuarios/iniciarsesion`,
        formulario
      );
      console.log("Respuesta del servidor:", respuesta.data);
      const { token } = respuesta.data;
      if (token) {
        localStorage.setItem("token", token);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inicio de sesión exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1600);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Token no recibido",
          text: "Redirigiendo a página de error.",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("Error con las credenciales", error);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: "Correo o contraseña incorrectos",
      });
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={manejarEnvio}>
                    <h1>Inicio de Sesión</h1>
                    <p className="text-body-secondary">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="correo"
                        placeholder="Correo Electronico"
                        autoComplete="username"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="contrasena"
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={formulario.contrasena}
                        onChange={manejarCambio}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/registrar">
                        <CButton color="link" className="px-0">
                          ¿Crear una cuenta?
                        </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
