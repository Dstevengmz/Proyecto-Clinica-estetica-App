import React, { Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSpinner, useColorModes } from "@coreui/react";
import "./scss/style.scss";
import "./scss/examples.scss";

//Verificar Token
import VerificarTokenExpirado from "./assets/js/ValidarTokenExpirado";
import TokenExpiradoAlerta from "./assets/js/MensajeTokenEXpirado";

// Layout
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const PublicLayout = React.lazy(() => import("./layout/PublicLayout"));

//Terminos y condiciones ruta
const TerminosyCondiciones = React.lazy(() =>
  import("./views/pages/politicas/terminosycondiciones")
);

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const Inicio = React.lazy(() => import("./views/pages/inicio/Inicio"));
const Servicios = React.lazy(() => import("./views/pages/servicios/Servicios"));
const VistaServicios = React.lazy(() =>
  import("./views/pages/servicios/VistaServicios")
);
//Rutas de usuarios
const ConsultarListausuarios = React.lazy(() =>
  import("./views/pages/usuarios/ListaUsuarios")
);
const CrearUsuario = React.lazy(() =>
  import("./views/pages/usuarios/CrearUsuario")
);
const EditarUsuario = React.lazy(() =>
  import("./views/pages/usuarios/EditarUsuario")
);
import DetallesListarUsuarios from "./views/pages/usuarios/DetallesListaUsuarios";
import { ListarUsuariosContext } from "./contexts/ListarUsuariosContext";

//historialClinico
import { HistorialClinicoContext } from "./views/pages/historialmedico/ConsultarHistorialMedico";
const CrearHistorialClinico = React.lazy(() =>
  import("./views/pages/historialmedico/CrearHistorialMedico")
);
const MiHistorialMedico = React.lazy(() =>
  import("./views/pages/historialmedico/MiHistorialMedico")
);
const ConsultarHistorialMedico = React.lazy(() =>
  import("./views/pages/historialmedico/ConsultarHistorialMedico")
);
const DetallesHistorialMedico = React.lazy(() =>
  import("./views/pages/historialmedico/DetallesHistorialMedico")
);
const EditarHistorialMedico = React.lazy(() =>
  import("./views/pages/historialmedico/EditarHistorialMedico")
);
const HistorialNotificaciones = React.lazy(() =>
  import("./views/pages/notificaciones/HistorialNotificaciones")
);
//citas
import { CitasContext } from "./contexts/CitasContext";
const CrearCita = React.lazy(() => import("./views/pages/citas/RegistrarCita"));
const RegistrarCitaAsistente = React.lazy(() => import("./views/pages/citas/RegistrarCitaAsistente"));

const ConsultarCitas = React.lazy(() =>
  import("./views/pages/citas/ConsultarCitas")
);
const CalendarioCitas = React.lazy(() =>
  import("./views/pages/citas/CalendarioCitas")
);
const DetallesCitas = React.lazy(() =>
  import("./views/pages/citas/DetallesCitas")
);
const Editarcita = React.lazy(() => import("./views/pages/citas/EditarCita"));

const MisCitas = React.lazy(() => import("./views/pages/citas/MisCitas"));

//Procedimientos
const CrearProcedimiento = React.lazy(() =>
  import("./views/pages/procedimientos/CrearProcedimiento")
);
const ConsultarProcedimientos = React.lazy(() =>
  import("./views/pages/procedimientos/ConsultarProcedimientos")
);
const DetallesProcedimientos = React.lazy(() =>
  import("./views/pages/procedimientos/DetallesProcedimientos")
);
import { ProcedimientoContext } from "./views/pages/procedimientos/ConsultarProcedimientos";
const EditarProcedimiento = React.lazy(() =>
  import("./views/pages/procedimientos/EditarProcedimiento")
);
//Carrito
const Carrito = React.lazy(() => import("./views/pages/carrito/carrito"));

import CerrarSesion from "./views/pages/logout/CerrarSesion";
import Control from "./components/control/control";

//seguridad
function RutaProtegida({ children }) {
  const autenticacionValida = localStorage.getItem("token");
  return autenticacionValida ? children : <Navigate to="/iniciarsesion" />;
}
// Rutas internas
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const App = () => {
  const [selectedHistorialclinico, setSelectedHistorialclinico] =
    useState(null);
  const [selectedCitas, setSelectedCitas] = useState(null);
  const [selectedProcedimiento, setSelectedProcedimiento] = useState(null);
  const [selectedListarusuarios, setSelectedListarusuarios] = useState(null);
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const storedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme = urlParams.get("theme")?.match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) setColorMode(theme);
    if (!isColorModeSet()) setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const token = VerificarTokenExpirado.obtenerToken();
    if (token && !VerificarTokenExpirado.tokenEsValido(token)) {
      localStorage.removeItem("token");
      TokenExpiradoAlerta(navigate);
    }
  }, [navigate]);

  return (
    <HistorialClinicoContext.Provider
      value={{ selectedHistorialclinico, setSelectedHistorialclinico }}
    >
      <CitasContext.Provider value={{ selectedCitas, setSelectedCitas }}>
        <ProcedimientoContext.Provider
          value={{ selectedProcedimiento, setSelectedProcedimiento }}
        >
          <ListarUsuariosContext.Provider
            value={{ selectedListarusuarios, setSelectedListarusuarios }}
          >
            <Control />
            <Suspense
              fallback={
                <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Navigate to="/inicio" replace />} />
                {/* Rutas públicas */}
                <Route element={<PublicLayout />}>
                  <Route path="/iniciarsesion" element={<Login />} />
                  <Route path="/inicio" element={<Inicio />} />
                  <Route path="/servicios" element={<Servicios />} />
                  <Route path="/registrar" element={<Register />} />
                  {/* terminos y condiciones */}
                  <Route
                    path="/terminoscondiciones"
                    element={<TerminosyCondiciones />}
                  />
                  <Route
                    path="/carrito"
                    element={
                      <RutaProtegida>
                        <Carrito />
                      </RutaProtegida>
                    }
                  />
                  <Route path="/reservar/:id" element={<VistaServicios />} />
                </Route>

                {/* Rutas protegidas con layout */}
                <Route
                  element={
                    <RutaProtegida>
                      <DefaultLayout />
                    </RutaProtegida>
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/404" element={<Page404 />} />
                  <Route path="/500" element={<Page500 />} />

                  <Route
                    path="/crearhistorialclinico"
                    element={<CrearHistorialClinico />}
                  />

                  {/* USUARIOS */}
                  <Route
                    path="/listarusuarios"
                    element={<ConsultarListausuarios />}
                  />
                  <Route
                    path="/crear-usuario"
                    element={<CrearUsuario />}
                  />
                  <Route
                    path="/editarusuario/:id"
                    element={<EditarUsuario />}
                  />
                  <Route
                    path="/DetallesListarUsuarios"
                    element={<DetallesListarUsuarios />}
                  />

                  <Route
                    path="/consultarhistorialmedico"
                    element={<ConsultarHistorialMedico />}
                  />
                  <Route
                    path="/detalleshistorialmedico"
                    element={<DetallesHistorialMedico />}
                  />
                  <Route
                    path="/editarhistorialmedico/:id"
                    element={<EditarHistorialMedico />}
                  />
                  <Route
                    path="/mihistorialclinico/:id"
                    element={<MiHistorialMedico />}
                  />
                  <Route path="/calendariocitas" element={<CalendarioCitas />} />
                  <Route path="/crearcita" element={<CrearCita />} />
                  <Route path="/crearcitaasistente" element={<RegistrarCitaAsistente />} />
                  <Route path="/consultarcitas" element={<ConsultarCitas />} />
                  <Route path="/detallescitas" element={<DetallesCitas />} />
                  <Route path="/editarcita/:id" element={<Editarcita />} />
                  <Route path="/miscitas" element={<MisCitas />} />
                  <Route path="/miscitas" element={<MisCitas />} />
                  {/* Procedimientos */}
                  <Route
                    path="/crearprocedimiento"
                    element={<CrearProcedimiento />}
                  />
                  <Route
                    path="/consultarprocedimientos"
                    element={<ConsultarProcedimientos />}
                  />
                  <Route
                    path="/detallesprocedimientos"
                    element={<DetallesProcedimientos />}
                  />
                  <Route
                    path="/editarprocedimientos/:id"
                    element={<EditarProcedimiento />}
                  />
                  <Route
                    path="/historial-notificaciones"
                    element={
                      <RutaProtegida>
                        <HistorialNotificaciones />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/historial-notificaciones-usuario"
                    element={
                      <RutaProtegida>
                        <HistorialNotificaciones />
                      </RutaProtegida>
                    }
                  />
                </Route>

                {/* Cierre de sesión */}
                <Route path="/cerrarsesion" element={<CerrarSesion />} />

                {/* Ruta no encontrada */}
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </Suspense>
          </ListarUsuariosContext.Provider>
        </ProcedimientoContext.Provider>
      </CitasContext.Provider>
    </HistorialClinicoContext.Provider>
  );
};

export default App;