import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilNotes,
  cilMedicalCross,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Panel de control',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  
  {
    component: CNavGroup,
    name: 'Historial Medico',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Crear',
        to: '/crearhistorialclinico',
      },

      {
        component: CNavItem,
        name: 'Consultar',
        to: '/consultarhistorialmedico',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Citas',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Crear Cita',
        to: '/crearcita',
      },
      {
        component: CNavItem,
        name: 'Consultar Citas',
        to: '/consultarcitas',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Procedimientos',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Crear Procedimiento',
        to: '/crearprocedimiento',
      },

      {
        component: CNavItem,
        name: 'Consultar Procedimientos',
        to: '/consultarprocedimientos',
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Mas',
  // },

]

export default _nav
