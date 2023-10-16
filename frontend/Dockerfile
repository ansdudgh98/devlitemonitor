# base image 설정(as build 로 완료된 파일을 밑에서 사용할 수 있다.)
FROM node:18 as build

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

# 패키지 설치
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# 작업폴더로 복사하고 빌드
COPY . /app
RUN npm run build

# 2단계: Nginx로 빌드된 React 앱 서빙하기
FROM nginx:alpine

# Nginx 설정 파일을 복사하여 컨테이너 내부에 배치
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# React 앱 빌드 결과물을 Nginx 웹 루트로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 80 포트를 외부로 노출
EXPOSE 80

# 컨테이너 시작 시 Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]