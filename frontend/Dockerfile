FROM nginx:alpine AS web-frontend
COPY /frontend/bookmarker/dist/bookmarker/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
