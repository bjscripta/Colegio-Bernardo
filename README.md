### Plataforma de Gestión Escolar - Colegio Bernardo O'Higgins

Sistema de gestión escolar basado en microservicios con Spring Boot y React.

### Autores
- Solange Labbé
- Benjamín Candia

### 🚀 Ejecución rápida

### Requisitos
- Docker Desktop
- Node.js (para frontend local)
- Git

### Tecnologías
- Java 17
- Spring Boot 
- Spring Cloud 
- Spring Data JPA
- MySQL 
- Maven
- Docker

📁 Estructura
```
Colegio-Bernardo/
├── plataformaescolar/      # Backend (microservicios)
│   ├── schooldomain/       # Estudiante, Asistencia, Evaluacion
│   └── infraestructuredomain/ # Eureka, Gateway, BFF
├── frontend-app/           # React
└── docker-compose.yml
```

### Levantar el backend (Docker)

```bash
cd E:\Colegio-Bernardo
docker-compose up --build
```
### Levantar el frontend

```
cd frontend-app
npm install
npm start
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

