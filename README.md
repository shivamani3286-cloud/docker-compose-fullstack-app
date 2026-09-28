# Docker Compose Full-Stack Message Board

A simple full-stack message board application containerized using **Docker** and **Docker Compose**.

The project demonstrates how to containerize a Node.js/Express application and connect it to MongoDB using Docker Compose, environment variables, health checks, networking, and persistent storage.

## Project Overview

* **Frontend:** HTML, CSS, and JavaScript
* **Backend:** Node.js + Express
* **Database:** MongoDB 8
* **Containerization:** Docker
* **Orchestration:** Docker Compose
* **Database Persistence:** Named Docker volume
* **Application Port:** 3000

## Architecture

```text
                         Browser
                            |
                            | HTTP :3000
                            v
                 +----------------------+
                 |    fullstack-app     |
                 |   Node.js + Express  |
                 |      Port 3000       |
                 +----------+-----------+
                            |
                            | MongoDB
                            | Docker network
                            v
                 +----------------------+
                 |    fullstack-mongo   |
                 |      MongoDB 8       |
                 |      Port 27017      |
                 +----------+-----------+
                            |
                            v
                 +----------------------+
                 | fullstack-mongo-data |
                 |   Docker Named       |
                 |      Volume          |
                 +----------------------+
```

The browser communicates with the Node.js/Express application through port `3000`.

The application communicates with MongoDB using the Docker Compose service name `mongo` over the private Docker network.

MongoDB stores its data in the named volume `fullstack-mongo-data`, allowing database data to persist when containers are stopped or recreated.

## Project Structure

```text
docker-compose-fullstack-app/
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── screenshots/
│   ├── browser-docker.png
│   ├── docker-compose.png
│   └── docker-ps.png
├── src/
│   └── server.js
├── .dockerignore
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Install the following:

* Docker Desktop on Windows/macOS, or Docker Engine with Docker Compose on Linux
* Git

Verify the installation:

```bash
docker --version
docker compose version
git --version
```

## Environment Variables

The project uses environment variables through a `.env` file.

Create the `.env` file from the provided example:

```bash
cp .env.example .env
```

Edit `.env` and set a strong MongoDB password:

```env
change password
```
