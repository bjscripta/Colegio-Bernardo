# Frontend - Plataforma Escolar

Frontend React completamente conectado con tu backend **plataformaescolar**.

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 14+ instalado
- Tu backend corriendo en Docker (puerto 8080)

### Instalación y Ejecución

```bash
cd frontend-app
npm install
npm start
```

El frontend se abrirá en `http://localhost:3000`

## 📋 Características

### ✅ Módulo de Estudiantes
- **Listar** todos los estudiantes
- **Crear** nuevos estudiantes (nombre, apellido, RUT, curso, teléfono)
- **Eliminar** estudiantes
- Integrado con servicio: `GET/POST/PUT/DELETE /estudiante`

### ✅ Módulo de Asistencia
- **Listar** registros de asistencia
- **Crear** nuevos registros (seleccionar estudiante, fecha, estado)
- Estados disponibles: Presente, Ausente, Tardanza, Justificado
- Ver información de estudiantes en los registros
- Integrado con servicio: `GET/POST/PUT /asistencia`

### ✅ Módulo de Evaluaciones
- **Listar** evaluaciones activas
- **Crear** nuevas evaluaciones (nombre, curso, asignatura, nota máxima)
- Ver **calificaciones** asociadas a cada evaluación
- Visualizar notas de estudiantes por evaluación
- Integrado con servicios: `GET/POST/PUT /evaluacion` y `/calificacion`

### 📊 Dashboard (Home)
- **Estadísticas en tiempo real**:
  - Total de estudiantes
  - Registros de asistencia
  - Evaluaciones activas
  - Total de calificaciones
- Descripción de cada módulo

## 🔗 Configuración de Conexión Backend

El frontend está configurado para conectarse a:

```javascript
const API_GATEWAY = 'http://localhost:8080'
```

**Servicios del Backend:**
- Estudiante: `http://localhost:8080/estudiante`
- Asistencia: `http://localhost:8080/asistencia`
- Evaluación: `http://localhost:8080/evaluacion`
- Calificación: `http://localhost:8080/calificacion`

## 📂 Estructura del Proyecto

```
frontend-app/
├── public/                  # Archivos estáticos
├── src/
│   ├── components/
│   │   └── Dashboard.js    # Componente heredado
│   ├── pages/
│   │   ├── Home.jsx        # Dashboard principal con estadísticas
│   │   ├── Estudiantes.jsx # Gestión de estudiantes
│   │   ├── Asistencia.jsx  # Control de asistencia
│   │   └── Evaluaciones.jsx# Gestión de evaluaciones
│   ├── services/
│   │   └── bffService.js   # Servicio centralizado para todas las APIs
│   ├── App.js              # Componente principal con navegación
│   ├── App.css             # Estilos globales
│   └── index.js
├── package.json
└── README.md
```

## 🛠️ Servicio de API (bffService.js)

Todos los llamados al backend se hacen a través de `bffService.js`:

### Estudiantes
```javascript
await bffService.getEstudiantes()           // GET todos
await bffService.getEstudianteById(id)      // GET por ID
await bffService.getEstudiantesByCurso(curso) // GET por curso
await bffService.createEstudiante(data)    // POST
await bffService.updateEstudiante(id, data) // PUT
await bffService.deleteEstudiante(id)      // DELETE
```

### Asistencia
```javascript
await bffService.getAsistencias()           // GET todos
await bffService.getAsistenciasByEstudiante(id) // GET por estudiante
await bffService.createAsistencia(data)    // POST
await bffService.updateAsistencia(id, data) // PUT
```

### Evaluaciones
```javascript
await bffService.getEvaluaciones()          // GET todas
await bffService.createEvaluacion(data)    // POST
await bffService.updateEvaluacion(id, data) // PUT
```

### Calificaciones
```javascript
await bffService.getCalificaciones()        // GET todas
await bffService.getCalificacionesByEstudiante(id) // GET por estudiante
await bffService.createCalificacion(data)  // POST
await bffService.updateCalificacion(id, data) // PUT
```

## 🎨 Interfaz de Usuario

- **Sidebar navegable** con acceso rápido a todos los módulos
- **Formularios dinámicos** para crear y editar registros
- **Tablas responsivas** para visualizar datos
- **Indicadores visuales** con colores y emojis
- **Manejo de errores** con mensajes informativos
- **Estados de carga** con spinners

## 🔧 Personalización

### Cambiar la URL del Backend
En `src/services/bffService.js`, edita:
```javascript
const API_GATEWAY = 'http://localhost:8080' // Cambia aquí si es necesario
```

### Agregar más módulos
1. Crea una nueva página en `src/pages/NuevoModulo.jsx`
2. Importa el servicio `bffService`
3. Agrega la opción de navegación en `App.js`

## 📝 Notas Importantes

- El frontend está configurado para conectarse al **API Gateway** (puerto 8080)
- Todos los formularios incluyen **validación básica**
- Los errores se muestran al usuario de manera clara
- Los datos se cargan de forma **asíncrona** con manejo de estados
- Los registros se pueden **crear, actualizar y eliminar** desde la UI

## 🚨 Troubleshooting

### Error: "Error al cargar los datos"
- Verifica que el backend esté corriendo en docker-compose
- Comprueba que el puerto 8080 esté disponible
- Revisa la consola del navegador (F12) para más detalles

### Error: CORS
Si ves errores de CORS, asegúrate que tu API Gateway tenga CORS habilitado

### La página está lenta
- Revisa los Network Tabs en DevTools (F12)
- Verifica que el backend esté respondiendo correctamente

## 📞 Próximas Mejoras Sugeridas

- [ ] Autenticación y login
- [ ] Búsqueda y filtrado avanzado
- [ ] Exportar reportes a PDF/Excel
- [ ] Gráficos de desempeño académico
- [ ] Notificaciones en tiempo real
- [ ] Sistema de permisos por usuario

---

¡Tu frontend está listo para usar! 🎓
