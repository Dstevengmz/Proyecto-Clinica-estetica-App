import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()
// Función para decodificar el token JWT y extraer el rol
const getUserRoleFromToken = (token) => {
  try {
    if (!token) return null
    // Verificar que el token tenga el formato correcto (3 partes separadas por puntos)
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
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
      const role = getUserRoleFromToken(token)
      setUserRole(role)
    } else {
      setIsAuthenticated(false)
      setUserRole(null)
    }
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
    const role = getUserRoleFromToken(token)
    setUserRole(role)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);