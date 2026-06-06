# 1단계: 빌드
FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# 2단계: 서빙
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80