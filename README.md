# bookmarker
a bookmark utility to save and retrieve URLs for later.

## How to build a Docker image for the application

```
    docker build -t bookmarker -f src/Docerfile .
```

```
docker run -d -p 80:80 --name bookmarker-container bookmarker
```