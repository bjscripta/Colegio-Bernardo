FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY pom.xml .
COPY schooldomain ./schooldomain
COPY infraestructuredomain ./infraestructuredomain

RUN mvn clean package

EXPOSE 8761 9091 9092 9093 8080 9000

CMD ["mvn", "spring-boot:run"]