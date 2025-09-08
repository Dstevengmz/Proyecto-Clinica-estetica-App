import { createContext, useState, useEffect, useContext, useRef, useCallback } from "react"

const AuthContext = createContext()
const getUserRoleFromToken = (token) => {
  try {
    if (!token) return null
    const tokenParts = token.split('.')
    if (tokenParts.length !== 3) {
      console.error('Token JWT inválido: formato incorrecto')
      return null
    }
    // Decodificar el payload del JWT (parte del medio)
    const payload = JSON.parse(atob(tokenParts[1]))
    // Buscar el rol en diferentes posibles campos
    const role = payload.rol || payload.role || payload.tipoUsuario || payload.tipo_usuario || payload.userRole || null
    console.log('Rol extraído del token:', role)
    return role
  } catch (error) {
    console.error('Error al decodificar el token:', error)
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const logoutTimerRef = useRef(null)

  const clearLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
      logoutTimerRef.current = null
    }
  }

  const scheduleAutoLogout = useCallback((token) => {
    clearLogoutTimer()
    try {
      if (!token) return
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (!payload.exp) return
      const expMs = payload.exp * 1000
      const delay = expMs - Date.now()
      if (delay <= 0) {
        // Ya expiró
        logout()
        return
      }
      logoutTimerRef.current = setTimeout(() => {
        logout()
        // Opcional: podríamos disparar un evento custom para mostrar modal fuera del contexto
        window.dispatchEvent(new CustomEvent('token-expired'))
      }, delay)
    } catch (e) {
      console.error('No se pudo programar el auto-logout:', e)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
      const role = getUserRoleFromToken(token)
      setUserRole(role)
      scheduleAutoLogout(token)
    } else {
      setIsAuthenticated(false)
      setUserRole(null)
    }
  }, [scheduleAutoLogout])

  // Escuchar cambios externos al localStorage (otra pestaña) y evento de expiración
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'token') {
        const newToken = e.newValue
        if (!newToken) {
          // Eliminado
          logout()
        } else {
          setIsAuthenticated(true)
          setUserRole(getUserRoleFromToken(newToken))
          scheduleAutoLogout(newToken)
        }
      }
    }
    const handleExpired = () => {
      // Ya se ejecutó logout en timeout, aquí podríamos mostrar algo adicional si se quiere.
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('token-expired', handleExpired)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('token-expired', handleExpired)
      clearLogoutTimer()
    }
  }, [scheduleAutoLogout])

  const login = (token) => {
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
    const role = getUserRoleFromToken(token)
    setUserRole(role)
  scheduleAutoLogout(token)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUserRole(null)
  clearLogoutTimer()
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);