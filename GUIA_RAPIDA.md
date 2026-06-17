# 🚀 Guía de Ejecución Rápida

## ✅ Pre-requisitos

- [ ] Docker y Docker Compose instalados
- [ ] Node.js 14+ instalado
- [ ] Puerto 3000 disponible (Frontend)
- [ ] Puerto 8080 disponible (API Gateway)
- [ ] Puerto 3306 disponible (MySQL)

## 📋 Pasos para Ejecutar

### 1️⃣ Terminal 1: Backend (Docker)

```bash
cd c:\Users\solla\OneDrive\Desktop\Colegio-Bernardo
docker-compose up -d
```

**Espera ~1 minuto** para que todos los servicios inicien.

#### Verifica que los servicios están corriendo:
```bash
docker ps
```

Deberías ver containers para:
- ✅ colegio-mysql (puerto 3306)
- ✅ colegio-eureka (puerto 8761)
- ✅ colegio-estudiante (puerto 9091)
- ✅ colegio-asistencia (puerto 9093)
- ✅ colegio-evaluacion (puerto 9092)
- ✅ colegio-gateway (puerto 8080)
- ✅ colegio-bff (puerto 9000)

**Para ver logs:**
```bash
docker-compose logs -f
```

---

### 2️⃣ Terminal 2: Frontend (React)

```bash
cd c:\Users\solla\OneDrive\Desktop\Colegio-Bernardo\frontend-app
npm install  # Solo si es la primera vez
npm start
```

El frontend se abrirá automáticamente en `http://localhost:3000`

---

## 🧪 Verificación de Conexión

### ✅ Verificar API Gateway
Abre en el navegador o usa curl:
```
http://localhost:8080/estudiante
```

Deberías ver una lista JSON de estudiantes (puede estar vacía)

### ✅ Verificar Eureka (Service Discovery)
```
http://localhost:8761
```

Deberías ver todos los servicios registrados (con status UP)

### ✅ Verificar MySQL
```bash
docker exec colegio-mysql mysql -uroot -e "use plataforma; show tables;"
```

---

## 🎮 Primeras Acciones en el Frontend

1. **Ve a Inicio (Home)**
   - Deberías ver estadísticas (puede mostrar 0 inicialmente)

2. **Ve a Estudiantes**
   - Click en "+ Nuevo Estudiante"
   - Rellena el formulario:
     - Nombre: Juan
     - Apellido: Pérez
     - RUT: 12345678-9
     - Curso: 10A
     - Teléfono: 912345678
   - Click en "Guardar Estudiante"

3. **Ve a Asistencia**
   - Click en "+ Nueva Asistencia"
   - Selecciona el estudiante que creaste
   - Selecciona fecha y estado
   - Click en "Guardar Asistencia"

4. **Ve a Evaluaciones**
   - Click en "+ Nueva Evaluación"
   - Rellena el formulario:
     - Nombre: Matemática Parcial 1
     - Curso ID: 1
     - Asignatura: Matemática
     - Nota Máxima: 7.0
   - Click en "Guardar Evaluación"

---

## 🛠️ Troubleshooting

### ❌ "Error al cargar los datos"
```bash
# Verifica que el API Gateway está corriendo:
curl http://localhost:8080/estudiante

# Si no funciona, revisa los logs:
docker-compose logs colegio-gateway
```

### ❌ "Connection refused"
```bash
# Asegúrate de que Docker está corriendo:
docker ps

# Si no ves containers, ejecuta:
docker-compose up -d
```

### ❌ Puerto ya en uso
```bash
# Si el puerto 3000 está en uso:
npm start -- --port 3001

# Si el puerto 8080 está en uso, detén Docker y reinicia:
docker-compose down
docker-compose up -d
```

### ❌ Dependencies de Node no instalan
```bash
# Limpia cache y reinstala:
cd frontend-app
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📊 URLs Útiles

| Servicio | URL | Puerto |
|----------|-----|--------|
| Frontend | http://localhost:3000 | 3000 |
| API Gateway | http://localhost:8080 | 8080 |
| Eureka | http://localhost:8761 | 8761 |
| MySQL | localhost:3306 | 3306 |
| BFF | http://localhost:9000 | 9000 |

---

## 🔄 Reiniciar Servicios

### Reiniciar todo el backend:
```bash
docker-compose restart
```

### Detener todo:
```bash
docker-compose down
```

### Reiniciar desde cero (limpiando datos):
```bash
docker-compose down -v
docker-compose up -d
```

---

## 📝 Notas Finales

- ✅ El frontend se **conecta automáticamente** al backend
- ✅ Los datos se **persisten en MySQL**
- ✅ Todas las operaciones CRUD funcionan
- ✅ Los errores se muestran con mensajes claros
- ✅ El diseño es **100% responsivo**

---

## 🎓 ¡Listo para usar!

Tu plataforma escolar está completamente funcional y conectada. 

**Cualquier problema, revisa:**
1. Los logs: `docker-compose logs -f`
2. La consola del navegador: F12 → Console
3. Los archivos de configuración en `frontend-app/src/services/bffService.js`

¡Que disfrutes! 🚀
