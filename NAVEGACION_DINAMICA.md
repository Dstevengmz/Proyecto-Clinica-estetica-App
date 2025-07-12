# 🚀 Sistema de Navegación Dinámico por Rol de Usuario

## 📋 ¿Qué se implementó?

Se creó un sistema inteligente de navegación que **automáticamente** muestra diferentes opciones del menú lateral (sidebar) dependiendo del rol del usuario que haya iniciado sesión. 

### 🎯 Problema solucionado:
- **ANTES**: Tenías que presionar F5 para ver los cambios de menú al cambiar de rol
- **AHORA**: Los cambios se ven inmediatamente sin recargar la página (mantiene la experiencia SPA)

## 📁 Archivos que se modificaron y qué hace cada uno:

### 1. 🔐 `contexts/AuthenticaContext.jsx` (Contexto de Autenticación)
**¿Qué hace?** Maneja toda la información del usuario logueado.

**Cambios realizados:**
- ✅ **Nuevo estado `userRole`**: Ahora guarda el rol del usuario (doctor, usuario, etc.)
- ✅ **Función inteligente**: Decodifica automáticamente el token JWT para extraer el rol
- ✅ **Actualización automática**: Cuando haces login/logout, el rol se actualiza al instante

**¿Por qué es importante?** Es el "cerebro" que sabe qué tipo de usuario eres.

### 2. 🧭 `_nav.jsx` (Configuración del Menú)
**¿Qué hace?** Define qué opciones aparecen en el menú lateral.

**Cambios realizados:**
- ✅ **Ahora es inteligente**: En lugar de un menú fijo, ahora pregunta "¿qué rol tienes?" y muestra el menú apropiado
- ✅ **Menú para usuarios normales**: Solo ven sus citas y perfil
- ✅ **Menú para doctores**: Ven todo (historiales, procedimientos, etc.)
- ✅ **Sistema de respaldo**: Si no reconoce el rol, muestra un menú básico

**¿Por qué es importante?** Es como tener un menú de restaurante diferente para cada tipo de cliente.

### 3. 🔧 `components/AppSidebar.jsx` (Barra Lateral)
**¿Qué hace?** Es la barra lateral donde aparecen las opciones del menú.

**Cambios realizados:**
- ✅ **Conexión inteligente**: Ahora pregunta al contexto "¿qué rol tiene el usuario?"
- ✅ **Actualización en tiempo real**: Cambia inmediatamente cuando cambias de usuario

**¿Por qué es importante?** Es la parte visual que ves en pantalla, ahora es "reactiva".

### 4. 🚪 `views/pages/login/Login.jsx` (Página de Inicio de Sesión)
**¿Qué hace?** Donde los usuarios ingresan sus credenciales.

**Cambios realizados:**
- ✅ **Conexión mejorada**: Ahora no solo guarda el token, también actualiza el rol automáticamente
- ✅ **Experiencia fluida**: Al hacer login, todo se actualiza de una vez

**¿Por qué es importante?** Es el punto de entrada, ahora configura todo correctamente desde el inicio.
### 5. 🚪 `views/pages/logout/CerrarSesion.jsx` (Página de Cierre de Sesión)
**¿Qué hace?** Maneja cuando el usuario quiere salir del sistema.

**Cambios realizados:**
- ✅ **Limpieza completa**: Ahora no solo borra el token, también limpia el rol
- ✅ **Redirección inteligente**: Te lleva a la página correcta según donde estabas

**¿Por qué es importante?** Garantiza que al salir, todo quede limpio para el próximo usuario.

### 6. ⚠️ `assets/js/AlertaCerrarSesion.js` (Alerta de Confirmación)
**¿Qué hace?** Muestra la pregunta "¿Estás seguro de cerrar sesión?"

**Cambios realizados:**
- ✅ **Conexión directa**: Ahora se conecta directamente con el contexto para un cierre más limpio
- ✅ **Menos dependencias**: Código más simple y confiable

**¿Por qué es importante?** Hace que el proceso de cerrar sesión sea más seguro y estable.

### 7. 🆕 `components/UserInfo.jsx` (Nuevo - Indicador de Rol)
**¿Qué hace?** Muestra un pequeño indicador en el header con el rol actual del usuario.

**Funciones:**
- ✅ **Indicador visual**: Ves un badge que dice si eres "Doctor" o "Usuario"
- ✅ **Colores diferentes**: Verde para doctores, azul para usuarios
- ✅ **Solo para usuarios logueados**: No aparece si no has iniciado sesión

**¿Por qué es útil?** Te permite verificar rápidamente que el sistema reconoce tu rol correctamente.

## 🎭 Tipos de Usuario y Sus Menús:

### 👤 Usuario Normal (Paciente):
**¿Qué puede ver?**
- 📊 Panel de control (vista general)
- 📅 Mis Citas
  - Agendar nueva cita
  - Ver mis citas programadas
- 👤 Mi Perfil (información personal)

**¿Por qué solo esto?** Los pacientes no necesitan ver información médica de otros pacientes ni crear procedimientos.

### 👨‍⚕️ Doctor (Personal Médico):
**¿Qué puede ver?**
- 📊 Panel de control (vista completa)
- 📋 Historial Médico
  - Crear historiales
  - Consultar historiales de pacientes
- 📅 Citas
  - Crear citas para pacientes
  - Ver todas las citas
- 🏥 Procedimientos
  - Crear nuevos procedimientos
  - Consultar todos los procedimientos

**¿Por qué todo esto?** Los doctores necesitan acceso completo para atender pacientes.

## 🔄 ¿Cómo funciona paso a paso?

### Paso 1: 🚪 Usuario hace login
1. Ingresa correo y contraseña
2. El servidor responde con un **token JWT** (como una credencial digital)
3. El sistema **automáticamente** decodifica el token y extrae el rol
4. Se guarda tanto el token como el rol en el contexto

### Paso 2: 🧭 Se actualiza la navegación
1. El sidebar pregunta al contexto: "¿Qué rol tiene este usuario?"
2. Según la respuesta, carga el menú apropiado
3. **¡Todo esto pasa en milisegundos!** No hay recarga de página

### Paso 3: 🔄 Cambios en tiempo real
- Al cerrar sesión → Se limpia todo y se ocultan las opciones
- Al iniciar con otro usuario → Inmediatamente aparecen las nuevas opciones
- **Sin F5, sin recargas, sin interrupciones**

### Paso 4: 🚪 Usuario hace logout
1. Se borra el token del navegador
2. Se limpia el rol del contexto
3. Se redirige a la página pública
4. El menú vuelve a su estado inicial

## 🔧 Información Técnica del Token JWT:

### ¿Qué es un token JWT?
Es como una "credencial digital" que contiene información del usuario codificada. Tiene 3 partes separadas por puntos:
```
header.payload.signature
```

### ¿Dónde debe estar el rol en el token?
El sistema busca el rol en cualquiera de estos campos del payload:
- `rol` (recomendado para español)
- `role` (estándar en inglés)
- `tipoUsuario` (alternativo descriptivo)
- `tipo_usuario` (con guión bajo)
- `userRole` (formato camelCase)

### Ejemplo de payload del token:
```json
{
  "id": 123,
  "correo": "doctor@ejemplo.com",
  "rol": "doctor",
  "exp": 1234567890
}
```

## 🏷️ Valores de Rol que Reconoce el Sistema:

### Para Doctores (acceso completo):
El sistema reconoce estos valores como "doctor":
- `doctor` (minúsculas)
- `Doctor` (primera letra mayúscula)
- `DOCTOR` (todo mayúsculas)

### Para Usuarios/Pacientes (acceso limitado):
El sistema reconoce estos valores como "usuario":
- `usuario`, `Usuario`, `USUARIO` (en español)
- `user`, `User`, `USER` (en inglés)

### ¿Qué pasa si el rol es diferente?
- El sistema por defecto muestra el menú de usuario normal
- Esto es una medida de seguridad: mejor mostrar menos opciones que más

## 🎉 Beneficios de Esta Implementación:

### ✅ Para el Usuario:
- **Experiencia fluida**: No más esperas ni recargas
- **Interfaz personalizada**: Solo ves lo que necesitas ver
- **Cambio instantáneo**: Al cambiar de cuenta, todo se actualiza al momento

### ✅ Para el Desarrollador:
- **Código organizado**: Cada archivo tiene una responsabilidad clara
- **Fácil mantenimiento**: Agregar nuevos roles es muy simple
- **Escalable**: Se puede expandir fácilmente para más tipos de usuario

### ✅ Para la Aplicación:
- **Seguridad mejorada**: Los usuarios solo ven sus opciones permitidas
- **Rendimiento**: No se cargan componentes innecesarios
- **SPA mantenido**: La aplicación sigue siendo de una sola página

## 🔍 ¿Cómo verificar que funciona?

1. **Indicador visual**: En el header aparece un badge con tu rol actual
2. **Menú diferente**: Compara las opciones del sidebar según el rol
3. **Cambio inmediato**: Cierra sesión, inicia con otro rol y observa el cambio instantáneo

## 🚀 Próximos pasos recomendados:

1. **Probar con diferentes roles**: Verifica que cada tipo de usuario ve lo correcto
2. **Verificar el backend**: Asegúrate de que el servidor incluya el rol en el token
3. **Personalizar más**: Puedes agregar más tipos de usuario si es necesario

---

**¡Problema resuelto!** 🎊 
Ya no necesitas presionar F5 para ver los cambios de navegación. La aplicación mantiene su funcionalidad SPA y ofrece una experiencia de usuario mucho mejor.
