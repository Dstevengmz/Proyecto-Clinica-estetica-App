import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCalendar,
  cilNotes,
  cilMedicalCross,
  cilSpeedometer,
  // cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import ObtenerUserIdFromToken from "./assets/js/ObtenerTokenDelUsuario";

const getUserNavigation = () => {
  const userId = ObtenerUserIdFromToken();

  return [
    {
      component: CNavItem,
      name: "Panel de control",
      to: "/dashboard",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: "Historial Médico",
      icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: "Crear",
          to: "/crearhistorialclinico",
        },
        {
          component: CNavItem,
          name: "Mi Historial Medico",
          to: `/mihistorialclinico/${userId}`,
        },
      ],
    },
        {
      component: CNavGroup,
      name: "Mis Citas",
      icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: "Agendar Cita",
          to: "/crearcita",
        },
        {
          component: CNavItem,
          name: "Mis Citas",
          to: "/miscitas",
        },
      ],
    },
  ];
};

// Navegación para doctores
const getDoctorNavigation = () => [
  {
    component: CNavItem,
    name: "Panel de control",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Historial Médico",
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Crear",
        to: "/crearhistorialclinico",
      },
      {
        component: CNavItem,
        name: "Consultar",
        to: "/consultarhistorialmedico",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Citas",
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Crear Cita",
        to: "/crearcita",
      },
      {
        component: CNavItem,
        name: "Consultar Citas",
        to: "/consultarcitas",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Servicio",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Crear Servicio",
        to: "/crearprocedimiento",
      },
      {
        component: CNavItem,
        name: "Consultar Servicio",
        to: "/consultarprocedimientos",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Usuarios",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "lista de Usuarios",
        to: "/listarusuarios",
      },
    ],
  },
];

// Función principal que retorna la navegación según el rol
const getNavigationByRole = (userRole) => {
  switch (userRole) {
    case "doctor":
    case "Doctor":
    case "DOCTOR":
      return getDoctorNavigation();
    case "usuario":
    case "Usuario":
    case "USUARIO":
    case "user":
    case "User":
    case "USER":
      return getUserNavigation();
    default:
      // Si no hay rol o es desconocido, mostrar navegación básica
      return getUserNavigation();
  }
};

export default getNavigationByRole;
