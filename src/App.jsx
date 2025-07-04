import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { CSpinner, useColorModes } from "@coreui/react";
import "./scss/style.scss";
import "./scss/examples.scss";

// Layout
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const PublicLayout = React.lazy(() => import("./layout/PublicLayout"));

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

//historialClinico
import { HistorialClinicoContext } from "./views/pages/historialmedico/ConsultarHistorialMedico";
const CrearHistorialClinico = React.lazy(() =>
  import("./views/pages/historialmedico/CrearHistorialMedico")
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
//citas
import { CitasContext } from "./views/pages/citas/ConsultarCitas";
const CrearCita = React.lazy(() => import("./views/pages/citas/RegistrarCita"));
const ConsultarCitas = React.lazy(() =>
  import("./views/pages/citas/ConsultarCitas")
);
const DetallesCitas = React.lazy(() =>
  import("./views/pages/citas/DetallesCitas")
);
const Editarcita = React.lazy(() => import("./views/pages/citas/EditarCita"));
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
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme = urlParams.get("theme")?.match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) setColorMode(theme);
    if (!isColorModeSet()) setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HistorialClinicoContext.Provider
      value={{ selectedHistorialclinico, setSelectedHistorialclinico }}
    >
      <CitasContext.Provider value={{ selectedCitas, setSelectedCitas }}>
        <ProcedimientoContext.Provider
          value={{ selectedProcedimiento, setSelectedProcedimiento }}
        >
          <BrowserRouter>
            <Control />
            <Suspense
              fallback={
                <div className="pt-3 text-center">
                  <CSpinner color="primary" variant="grow" />
                </div>
              }
            >
              <Routes>
                {/* Redirección principal */}
                <Route path="/" element={<Navigate to="/inicio" replace />} />

                {/* Rutas públicas */}
                <Route element={<PublicLayout />}>
                  <Route path="/iniciarsesion" element={<Login />} />
                  <Route path="/inicio" element={<Inicio />} />
                  <Route path="/servicios" element={<Servicios />} />
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
                  <Route
                    path="/dashboard"
                    element={
                      <RutaProtegida>
                        <Dashboard />
                      </RutaProtegida>
                    }
                  />
                  <Route path="/404" element={<Page404 />} />
                  <Route path="/500" element={<Page500 />} />

                  <Route
                    path="/crearhistorialclinico"
                    element={
                      <RutaProtegida>
                        <CrearHistorialClinico />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/consultarhistorialmedico"
                    element={
                      <RutaProtegida>
                        <ConsultarHistorialMedico />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/detalleshistorialmedico"
                    element={
                      <RutaProtegida>
                        <DetallesHistorialMedico />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/editarhistorialmedico/:id"
                    element={
                      <RutaProtegida>
                        <EditarHistorialMedico />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/c"
                    element={
                      <RutaProtegida>
                        <CrearCita />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/consultarcitas"
                    element={
                      <RutaProtegida>
                        <ConsultarCitas />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/detallescitas"
                    element={
                      <RutaProtegida>
                        <DetallesCitas />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/editarcita/:id"
                    element={
                      <RutaProtegida>
                        <Editarcita />
                      </RutaProtegida>
                    }
                  />

                  <Route
                    path="/crearprocedimiento"
                    element={
                      <RutaProtegida>
                        <CrearProcedimiento />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/consultarprocedimientos"
                    element={
                      <RutaProtegida>
                        <ConsultarProcedimientos />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/detallesprocedimientos"
                    element={
                      <RutaProtegida>
                        <DetallesProcedimientos />
                      </RutaProtegida>
                    }
                  />
                  <Route
                    path="/editarprocedimientos/:id"
                    element={
                      <RutaProtegida>
                        <EditarProcedimiento />
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
          </BrowserRouter>
        </ProcedimientoContext.Provider>
      </CitasContext.Provider>
    </HistorialClinicoContext.Provider>
  );
};

export default App;
