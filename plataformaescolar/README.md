# Backend - Plataforma de Gestión Escolar

## Tecnologías

- Java 17
- Spring Boot 3.2.5
- Spring Cloud 2023.0.0
- Spring Data JPA
- MySQL 8.0
- Maven
- Docker

## 📁 Estructura del proyecto

```
plataformaescolar/
├── pom.xml
├── schooldomain/
│   ├── estudiante/
│   ├── asistencia/
│   └── evaluacion/
└── infraestructuredomain/
    ├── eurekaServer/
    ├── apigateway/
    ├── bff/
    └── keycloakadapter/
```

## 🎯 Microservicios

| Servicio | Puerto | Función |
|----------|--------|---------|
| 🧭 Eureka Server | 8761 | Descubrimiento de servicios |
| 👨‍🎓 Estudiante | 9091 | CRUD de estudiantes |
| 📋 Asistencia | 9093 | Gestión de asistencias |
| 📝 Evaluacion | 9092 | Gestión de evaluaciones y notas |
| 🚪 API Gateway | 8080 | Punto de entrada único |
| 🔗 BFF | 9000 | Backend For Frontend |

### 1. 📦 Clonar el repositorio

```
git clone https://github.com/bjscripta/Colegio-Bernardo.git
cd Colegio-Bernardo
```
### 2. 🚀 Levantar todos los servicios
```
docker-compose up --build
```

### 3. ✅ Verificar que todos los contenedores estén corriendo
```
docker ps
```
Deberías ver:

 - colegio-mysql
 - colegio-eureka
 - colegio-estudiante
 - colegio-asistencia
 - colegio-evaluacion
 - colegio-gateway
 - colegio-bff

### 4. Acceder a los servicios
```
Eureka Dashboard	http://localhost:8761
Swagger Estudiante	http://localhost:9091/swagger-ui.html
Swagger Asistencia	http://localhost:9093/swagger-ui.html
Swagger Evaluacion	http://localhost:9092/swagger-ui.html
BFF Health	http://localhost:9000/bff/health
BFF Dashboard	http://localhost:9000/bff/dashboard/1
API Gateway	http://localhost:8080/estudiante
```
### 5. Detener todos los servicios
```
docker-compose down
```

### 🔗 Endpoints principales

Endpoint	                Método	  Descripción
/estudiante	              GET	      Listar estudiantes
/estudiante	              POST	    Crear estudiante
/estudiante/{id}	        GET	      Buscar estudiante
/asistencia	              GET	      Listar asistencias
/asistencia	              POST	    Crear asistencia
/asistencia/estudiante/{id}	GET	    Asistencias por estudiante
/evaluacion	              GET	      Listar evaluaciones
/evaluacion	              POST	    Crear evaluacion
/calificacion	            POST	    Registrar nota
/calificacion/estudiante/{id}	GET	  Notas por estudiante
/bff/dashboard/{id}	      GET	      Dashboard completo

### 🧪 Pruebas unitarias
```
cd plataformaescolar/schooldomain/NOMBRE-MICROSERVICIO
mvn test
```
