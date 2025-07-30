import React from 'react';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// Importa tus componentes de servicios
import ListaServicios from './views/pages/servicios/ListaServicios';
import VistaServicios from './views/pages/servicios/VistaServicios';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: <Dashboard /> },
  { path: '/servicios', name: 'Servicios', element: <ListaServicios /> },
  { path: '/servicios/:id', name: 'VistaServicio', element: <VistaServicios /> }
];

export default routes;
