# Plataforma de Libro de Clases Digital - Colegio Bernardo O'Higgins
**Descripción** Plataforma modular gestionada con Docker Compose para desplegar una arquitectura de microservicios robusta en Spring Boot 3 y Spring Cloud para el Colegio Bernardo O'Higgins:

- Red interna de Docker (`colegio-net`) para aislar la comunicación entre contenedores.

- Un motor de base de datos MySQL 8 que inicializa automáticamente tres esquemas lógicos independientes mediante scripts (`init.sql`).

- Infraestructura de soporte completa: Servidor de descubrimiento (Eureka Server), Enrutador perimetral (API Gateway), Orquestador de cara al cliente (BFF), Adaptador de identidad (Keycloak) y Consola de monitoreo (Spring Boot Admin).

- Tres microservicios de negocio independientes en contenedores: Estudiante (Backend), Asistencia (Backend) y Evaluación (Backend).

- Controladores REST auto-documentados individualmente utilizando Springdoc OpenAPI v2 (Swagger).

- Políticas de control de arranque (`healthcheck` y `depends_on`) en Docker Compose para evitar caídas tempranas por intentos de conexión fallidos a la base de datos o a Eureka.

## Estructura del proyecto
```
Plaintext
plataforma_escuela_libro_digital/
├── docker-compose.yml (Orquestación general, políticas de arranque y redes)
├── init.sql (Creación de bases de datos para cada contexto)
├── .env (Variables de entorno y credenciales de MySQL)
└── plataformaescolar/ (Código fuente general de la aplicación)
├── pom.xml (Parent Global de la solución)
├── infraestructuredomain/ (Módulos de Infraestructura del Sistema)
│   ├── pom.xml
│   ├── eurekaServer/ (Puerto 8761)
│   ├── apigateway/ (Puerto 8080)
│   ├── bff/ (Puerto 9000)
│   ├── keycloakadapter/ (Puerto 8088)
│   └── springBootAdmin/ (Puerto 8062)
└── schooldomain/ (Módulos del Core de Negocio Escolar)
├── pom.xml
├── estudiante/ (Puerto 9091)
├── asistencia/ (Puerto 9093)
└── evaluacion/ (Puerto 9092)
```
## Requisitos
- Java JDK versión >= 17 instalado localmente (para desarrollo o compilación manual)

- Apache Maven versión >= 3.8 o uso de los wrappers del proyecto

- Docker Desktop o Docker Engine instalado localmente en el sistema

- Docker Compose versión >= 2.0 (compatible con la especificación de sintaxis de servicios)

## Flujo de uso manual

1. Clona el repositorio y ubícate en la carpeta raíz del proyecto (donde se encuentran `docker-compose.yml`, `init.sql` y el archivo `.env`).
2. Configura las variables de entorno locales
- Crea o edita el archivo `.env` en la raíz ingresando los parámetros de autenticación requeridos por el motor de datos:
```
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=colegio_db
```
3. Inicializa y despliega la plataforma con Docker Compose
- Compila el código fuente de todos los módulos Java, empaqueta los archivos JAR, construye las imágenes personalizadas y levanta los contenedores en segundo plano:

`|Bash|`
docker-compose up --build -d
- Verifica el estado de ejecución y salud de los contenedores activos:

`|Bash|`
docker ps
- Si necesitas revisar los flujos de inicialización, logs internos de negocio o depurar errores en tiempo real, ejecuta:

`|Bash|`
docker-compose logs -f [nombre-del-servicio]

## ¿Qué despliega este proyecto?
- Capa de Datos (MySQL): Levanta un contenedor oficial de MySQL 8.0. Su volumen ejecuta de forma prioritaria el archivo `init.sql` para dar vida a los tres almacenes aislados: `colegio_estudiante_db`, `colegio_asistencia_db` y `colegio_evaluacion_db`. Posee un comando de `healthcheck` que comprueba mediante comandos de consola internos que el motor esté listo antes de liberar accesos.

- Capa de Soporte e Infraestructura: Despliega de forma secuencial el servidor Eureka en el puerto 8761 para registrar dinámicamente las IPs y nombres lógicos de los servicios. Posteriormente levanta el API Gateway en el puerto 8080 para unificar los puntos de acceso, un componente BFF en el puerto 9000 para procesar y optimizar consultas del frontend, un Keycloak Adapter en el puerto 8088 para autenticación, y Spring Boot Admin en el puerto 8062 para monitoreo de rendimiento.

- Capa de Negocio (Microservicios Core): Levanta tareas independientes basadas en los sub-módulos de negocio de Maven. El servicio de **Evaluación (puerto 9092)** destaca por implementar rigurosas validaciones en su capa lógica (`CalificacionService`): obliga el ingreso del valor de la nota, restringe el límite inferior a notas mayores o iguales a `1.0`, verifica la preexistencia de la actividad académica, y bloquea de manera automática cualquier inserción de nota que supere el parámetro dinámico `notaMaxima` configurado en la entidad de su evaluación raíz.

- Mejores prácticas incluidas
Control estricto de Condiciones de Carrera (Race Conditions): Configuración nativa de dependencias cruzadas mediante cláusulas `depends_on` condicionadas a estados específicos (`condition: service_healthy` para MySQL y `condition: service_started` para Eureka). Esto evita que los backends colapsen con errores críticos al nacer antes de que sus dependencias externas estén completamente preparadas.

- Generación Automática de Tablas Relacionales: Las aplicaciones Spring Boot se enlazan de manera transparente a sus respectivos esquemas y hacen uso de las capacidades de Hibernate a través de `spring.jpa.hibernate.ddl-auto=update` para mapear las clases entidad (`Estudiante`, `Evaluacion`, `Calificacion`) directamente en tablas físicas sin requerir scripts manuales de migración en frío.

- Aislamiento de Redes: El tráfico de datos y peticiones se encapsula dentro de la red privada `colegio-net`, exponiendo hacia el exterior únicamente los puertos estrictamente necesarios para la interacción humana y las herramientas de análisis.

## Cómo extender este proyecto
Integración del Frontend: Diseñar y conectar un desarrollo moderno en React, Angular o Vue. Este frontend consumirá de manera limpia las APIs expuestas a través del puerto del BFF (`9000`), respetando el patrón de desacoplamiento de interfaces de cara al usuario.

Automatización con Pipelines CI/CD: Configurar flujos automáticos mediante GitHub Actions o GitLab CI en el repositorio para ejecutar las fases de prueba (`mvn test`) y compilar empaquetados limpios cada vez que se realice un push a las ramas principales.

Robustecimiento de Seguridad: Configurar roles académicos explícitos (Administrador, Docente, Alumno) vinculando de manera real las peticiones interceptadas por el API Gateway y el adaptador hacia un servidor centralizado de Keycloak en producción con políticas OAuth2 / OpenID Connect.