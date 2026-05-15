FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY pom.xml .
COPY schooldomain ./schooldomain
COPY infraestructuredomain ./infraestructuredomain

RUN mvn clean package -DskipTests

EXPOSE 8761 9091 9092 9093 8080 9000

CMD ["mvn", "spring-boot:run"]