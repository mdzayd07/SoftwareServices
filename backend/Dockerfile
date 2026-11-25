# Stage 1: Build the Spring Boot application
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN apk add --no-cache tzdata && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && echo "Asia/Kolkata" > /etc/timezone
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /app/target/services-site-api-*.jar app.jar
USER appuser
EXPOSE 8080
ENV TZ=Asia/Kolkata
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -Duser.timezone=Asia/Kolkata"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
