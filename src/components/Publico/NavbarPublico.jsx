import React, { useState } from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import manejarCerrarSesion from "../../assets/js/AlertaCerrarSesion";
import { useAuth } from "../../contexts/AuthenticaContext";
import {
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
const NavbarPublico = () => {
  const { logout ,isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const [visible, setVisible] = useState(false);

  return (
    <CNavbar expand="lg" className="bg-body-tertiary">
      <CContainer fluid>
        <CNavbarBrand as={Link} to="/inicio">
          Mi Clínica
        </CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="me-auto">
            <CNavItem>
              <CNavLink as={Link} to="/inicio" active>
                Inicio
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink as={Link} to="/servicios">
                Servicios
              </CNavLink>
            </CNavItem>
             <CNavItem>
              <CNavLink as={Link} to="/carrito">
                Carrito
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
          <CNavbarNav className="ms-auto">
            {!isAuthenticated  ? (
              <CNavItem>
                <CNavLink as={Link} to="/iniciarsesion">
                  Iniciar Sesión
                </CNavLink>
              </CNavItem>
            ) : (
              <CDropdown alignment="end">
                <CDropdownToggle color="secondary">
                  👤 Mi cuenta
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem as={Link} to="/perfil">
                    Perfil
                  </CDropdownItem>
                  <CDropdownDivider />
                  <CDropdownItem onClick={() => manejarCerrarSesion(navigate,logout,location)}>
                    Cerrar Sesión
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            )}
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default NavbarPublico;
