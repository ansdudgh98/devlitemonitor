FROM gradle:7.6.2-jdk as builder
WORKDIR /build

COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

COPY . /build
RUN gradle build -x test --parallel

# APP
FROM openjdk:17.0-slim
WORKDIR /app

# 빌더 이미지에서 jar 파일만 복사
COPY --from=builder /build/build/libs/devlitemonitor-backend-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar","-Dspring.profiles.active=prod","devlitemonitor-backend-0.0.1-SNAPSHOT.jar", "-Dspring-boot.run.arguments= --rds-host=${rds-host}, --rds-username=${rds-username},--rds-password=${rds-password},--kakao.clientid=${kakao-clientid},--kakao-redirect-uri=${kakao-redirect-uri},--grafana-id=${grafana-id},--grafana-pw=${grafana-pw}"]
