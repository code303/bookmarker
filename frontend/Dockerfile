FROM node:18.0.0-alpine3.15 AS build
WORKDIR /app
COPY bookmarker/package*.json ./
RUN npm ci
COPY bookmarker/* .
RUN npm run build --prod

#FROM node:18.0.0-alpine3.15 AS backend
#WORKDIR /app
#COPY --from=build /app/dist ./dist
#COPY --from=build /app/package*.json ./
#RUN npm ci --only=production
#EXPOSE 3000
#CMD ["node", "dist/index.js"]


FROM nginx:alpine AS web-frontend
COPY --from=build /app/dist/bookmarker/browser /usr/share/nginx/html
#COPY /frontend/bookmarker/dist/bookmarker/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
