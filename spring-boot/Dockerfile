# FROM openjdk:17-jdk-alpine
# ARG JAR_FILE=target/*.jar
# COPY ./target/demo-0.0.1-SNAPSHOT.jar app.jar
# ENTRYPOINT ["java", "-jar", "/app.jar"]



# Use an official OpenJDK image as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the Spring Boot app's JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot application runs on
EXPOSE 8080

# Add a delay before starting the application (adjust as needed)
CMD ["sh", "-c", "sleep 10 && java -jar app.jar"]
