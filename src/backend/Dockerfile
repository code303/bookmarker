FROM node:18.0.0-alpine3.15 AS build
WORKDIR /app
COPY ../../package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.0.0-alpine3.15 AS backend
WORKDIR /app
COPY --from=build /app/ ./
EXPOSE 3000
CMD ["node", "index.js"]