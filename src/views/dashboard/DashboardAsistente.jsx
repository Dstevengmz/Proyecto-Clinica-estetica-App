import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardAction from './common/CardAction';

export default function DashboardAsistente() {
  const nav = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 30 }}>Panel Asistente</h1>
      <div style={{ display:'flex', flexWrap:'wrap', gap:20 }}>
        <CardAction icon='🗂' title='Citas' description='Gestionar / Filtrar' onClick={()=>nav('/consultarcitas')} />
        <CardAction icon='➕' title='Agendar Cita' description='Para un paciente' onClick={()=>nav('/crearcitaasistente')} />
        <CardAction icon='👥' title='Usuarios' description='Listado general' onClick={()=>nav('/listarusuarios')} />
        <CardAction icon='🧾' title='Procedimientos' description='Servicios disponibles' onClick={()=>nav('/consultarprocedimientos')} />
      </div>
    </div>
  );
}
