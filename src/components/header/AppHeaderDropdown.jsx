import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

import {
  cilCreditCard,
  cilFile,
  cilAccountLogout,
  cilSettings,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import manejarCerrarSesion from "../../assets/js/alertas/logout/AlertaCerrarSesion";
import { useAuth } from "../../contexts/AuthenticaContext";
import ObtenerUsuarioIToken from "../../assets/js/ObtenerTokenDelUsuario";


import { useNavigate,useLocation } from "react-router-dom";
import avatar8 from "./../../assets/images/avatars/8.jpg";
const AppHeaderDropdown = () => {
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation()
  const userId = ObtenerUsuarioIToken();

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 pe-0"
        caret={false}
      >
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          Configuraciones
        </CDropdownHeader>
        <CDropdownItem
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (userId) {
              navigate(`/editarusuario/${userId}`);
            } else {
              navigate("/iniciarsesion");
            }
          }}
        >
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem
          href="#"
          className="nav-link"
          onClick={() => manejarCerrarSesion(navigate,logout,location)}
        >
          <CIcon icon={cilAccountLogout} className="me-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
