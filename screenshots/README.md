# Required Screenshots

After installing Docker and running the project, capture these three screenshots.

## 1. Successful Compose Startup

Run:

```bash
docker compose up --build
```

Capture the terminal after both services have started and the application shows:

```text
Connected to MongoDB
Application listening on port 3000
```

Suggested filename:

```text
01-docker-compose-up.png
```

## 2. Running Containers

In another terminal:

```bash
docker ps
```

Capture the output showing:

```text
fullstack-app
fullstack-mongo
```

Suggested filename:

```text
02-docker-ps.png
```

## 3. Application in Browser

Open:

```text
http://localhost:3000
```

Add a test message so the page visibly demonstrates database functionality.

Suggested filename:

```text
03-browser-app.png
```

Place all three image files in this directory before pushing the repository.
