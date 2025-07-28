import React, { createContext, useContext, useState, useEffect } from 'react';
import socketfrontend from '../assets/js/socket';
import { useAuth } from './AuthenticaContext';
import ObtenerUserIdFromToken from '../assets/js/ObtenerTokenDelUsuario';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications debe usarse dentro de NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated && (userRole === 'doctor' || userRole === 'Doctor' || userRole === 'DOCTOR')) {
      const userId = ObtenerUserIdFromToken();
      
      if (userId && socketfrontend) {
        // Registrar al doctor en su sala específica
        socketfrontend.emit('registrarDoctor', userId);
        console.log(`Doctor ${userId} registrado en socket`);

        // Escuchar nuevas notificaciones
        socketfrontend.on('nuevaNotificacion', (notificacion) => {
          console.log('Nueva notificación recibida:', notificacion);
          // Asegurar que la nueva notificación tenga el estado correcto
          const nuevaNotificacion = { ...notificacion, leida: false };
          setNotifications(prev => [nuevaNotificacion, ...prev]);
          setUnreadCount(prev => prev + 1);
          
          // Mostrar notificación del navegador si hay permisos
          if (Notification.permission === 'granted') {
            new Notification('Nueva cita registrada', {
              body: notificacion.mensaje,
              icon: '/favicon.ico'
            });
          }
        });

        // Cargar notificaciones almacenadas al conectar
        loadStoredNotifications(userId);

        return () => {
          socketfrontend.off('nuevaNotificacion');
        };
      }
    }
  }, [isAuthenticated, userRole]);

  const loadStoredNotifications = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/apiusuarios/notificaciones/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const storedNotifications = await response.json();
        setNotifications(storedNotifications);
        // Contar las no leídas (asumiendo que las nuevas no tienen propiedad 'leida')
        const unread = storedNotifications.filter(n => !n.leida).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  };

  const markAsRead = async (index) => {
    try {
      const userId = ObtenerUserIdFromToken();
      const token = localStorage.getItem('token');
      
      // Actualizar en el backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/apiusuarios/notificaciones/${userId}/marcar-leida`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ index })
      });
      
      if (response.ok) {
        // Actualizar estado local solo si el backend se actualizó correctamente
        setNotifications(prev => 
          prev.map((notif, i) => 
            i === index ? { ...notif, leida: true } : notif
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        console.error('Error al marcar notificación como leída en el backend');
      }
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const userId = ObtenerUserIdFromToken();
      const token = localStorage.getItem('token');
      
      // Actualizar en el backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/apiusuarios/notificaciones/${userId}/marcar-todas-leidas`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Actualizar estado local solo si el backend se actualizó correctamente
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, leida: true }))
        );
        setUnreadCount(0);
      } else {
        console.error('Error al marcar todas las notificaciones como leídas en el backend');
      }
    } catch (error) {
      console.error('Error al marcar todas las notificaciones como leídas:', error);
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  // Solicitar permisos de notificación al cargar
  useEffect(() => {
    if (isAuthenticated && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, [isAuthenticated]);

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
