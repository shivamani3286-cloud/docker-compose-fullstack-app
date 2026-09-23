# Container Architecture — One-Page Explanation

## Purpose of Each Container

### `fullstack-app`
The application container runs a Node.js + Express server. It serves the browser UI from the `public/` directory and exposes REST endpoints for creating and reading messages. It listens on port `3000` inside the container.

### `fullstack-mongo`
The MongoDB container provides the persistent database used by the Express application. It uses the official MongoDB image and stores its database files in the named Docker volume `fullstack-mongo-data`.

## How the Containers Communicate

Docker Compose creates a private network named `fullstack-network`. Both services are attached to this network.

The browser reaches the application through the published host port:

```text
Browser → localhost:3000 → fullstack-app:3000
```

The Express application reaches MongoDB using the Compose service name `mongo` rather than an IP address:

```text
fullstack-app → mongo:27017 → MongoDB
```

The connection string is supplied through the `MONGO_URI` environment variable.

MongoDB data is mounted at `/data/db` through the named volume:

```text
fullstack-mongo-data → /data/db
```

This keeps database data available when containers are recreated.

## Why Docker Compose Is Used

Docker Compose defines the complete multi-container application in one `docker-compose.yml` file. It handles:

- Building the application image.
- Pulling and starting the MongoDB image.
- Creating the application network.
- Creating and attaching the persistent database volume.
- Passing environment variables.
- Starting the application after MongoDB passes its health check.
- Publishing the application port.

Therefore, the complete application can be started with one command:

```bash
docker compose up --build
```

This makes the setup reproducible and easier to run on another machine.
