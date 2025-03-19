# build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY bookmarker/package*.json ./
RUN npm ci
COPY bookmarker/ ./
RUN npm run build --prod

# production stage
FROM nginx:alpine AS web-frontend
COPY --from=build /app/dist/bookmarker/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
