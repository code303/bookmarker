FROM nginx:alpine AS web-frontend
COPY /static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
