---
marp: true
theme: default
paginate: true
size: 16:9
title: Microservices with Docker Compose
description: Beginner-friendly explanation with questions, examples, and Docker Compose use cases
---

# Microservices with Docker Compose
## Beginner-Friendly Detailed Explanation
### With Questions, Examples, and Use Cases

---

# What questions will this explanation answer?

- What is a microservice and why do we need it?
- What is the difference between monolithic and microservices?
- Why are scalability, isolation, agility, and API Gateway important?
- What is Docker Compose and how does `docker-compose.yml` work?
- How do we build multi-container applications?

---

# More questions this explanation will answer

- What do `version`, `services`, `volumes`, and `networks` mean?
- How do environment variables, secrets, and configs work?
- What is the difference between `build` and `image`?
- How does service dependency ordering work?
- How do real deployments like WordPress + MySQL work?

---

# Question 1
## What is software architecture?

Software architecture means:
- the high-level structure of an application
- how parts are divided
- how parts talk to each other
- how the system grows over time

---

# Question 2
## What is a monolithic application?

A monolithic application is:
- one big application
- all features inside one codebase
- one build process
- often one deployment unit

Example:
- login, payment, product, admin in one app

---

# Monolithic example in simple words

Imagine one huge shopping website:
- user login
- product listing
- cart
- payment
- admin panel

All are packed into one big application.

If one part changes, often the full app is rebuilt.

---

# Problem with monolithic design

In the beginning, monolithic design feels easy.
Later it becomes hard because:
- code grows too much
- bug fixing becomes difficult
- one failure can affect full app
- scaling one part means scaling everything

---

# Question 3
## What is a microservice?

A microservice is:
- a small service
- focused on one job
- independently developed
- independently deployed
- connected to other services through APIs

Example:
- user service
- product service
- order service
- payment service

---

# Microservices example in simple words

Think of a restaurant:
- one person cooks
- one person takes orders
- one person handles billing
- one person manages delivery

Each person has a separate responsibility.

Microservices work in a similar way.

---

# Monolithic vs microservices

## Monolithic
- one large application
- tightly connected modules
- single deployment

## Microservices
- many small services
- loosely connected
- independent deployment

---

# Beginner comparison table

| Topic | Monolithic | Microservices |
|---|---|---|
| Codebase | One large codebase | Many small codebases |
| Deployment | One unit | Many units |
| Scaling | Whole app | Specific service |
| Failure | Can affect whole app | Usually limited |

---

# Question 4
## Why do we need microservices?

We need microservices when:
- application becomes large
- teams become bigger
- different modules change at different speed
- one part needs more resources than others
- we want better isolation and flexibility

---

# Advantage 1: Scalability

Scalability means:
- increasing capacity when load increases

In monolithic apps:
- whole application is scaled

In microservices:
- only busy service is scaled

Example:
- product search gets heavy traffic
- scale only search service

---

# Advantage 2: Isolation

Isolation means:
- one service remains separate from another

If payment service crashes:
- product service may still work
- login service may still work

This reduces the chance that one bug breaks everything.

---

# Advantage 3: Agility

Agility means:
- ability to change quickly

In microservices:
- one team can update one service
- faster release cycles are possible
- technology choices can differ

Example:
- frontend updated without changing database service

---

# Advantage 4: API Gateway

API Gateway is:
- one common entry point for clients

Instead of user contacting many services directly,
client contacts gateway first.

Gateway can:
- route requests
- handle auth
- manage traffic
- hide internal complexity

---

# Simple API Gateway example

Without gateway:
- frontend calls user service
- frontend calls product service
- frontend calls order service

With gateway:
- frontend calls one gateway
- gateway forwards requests internally

This makes client-side simpler.

---

# Question 5
## What is Docker Compose?

Docker Compose is a tool used to:
- define multi-container applications
- run them together
- manage them with one file
- start all services using one command

Main file:
`docker-compose.yml`

---

# Why Docker Compose is useful

Without Docker Compose:
- run each container manually
- create network manually
- connect containers manually
- remember many commands

With Docker Compose:
- define everything in one YAML file
- run everything using `docker compose up`

---

# Real-life analogy for Docker Compose

Think of a school function.
You need:
- stage
- microphones
- chairs
- lights

Compose is like one plan sheet
that tells where everything goes
and how all parts work together.

---

# Question 6
## What is YAML?

YAML is a simple text format
used to write structured data.

Compose uses YAML because it is:
- readable
- clean
- easy to organize

File name usually:
`docker-compose.yml`

---

# Important YAML rules

- indentation matters
- use spaces, not tabs
- key-value format is common
- lists begin with `-`

Wrong indentation can break the file.

---

# Small YAML example

```yaml
name: demo
services:
  web:
    image: nginx
```

Explanation:
- `name` = project name
- `services` = group of containers
- `web` = service name
- `image` = container image to use

---

# Question 7
## What is the structure of docker-compose.yml?

Common top-level parts are:
- `services`
- `volumes`
- `networks`
- sometimes `configs`
- sometimes `secrets`

The most important section is `services`.

---

# Why `services` is the heart of Compose

Each service usually represents:
- one container
- one role in the application

Examples:
- frontend
- backend
- database
- cache

Compose manages all these together.

---

# Question 8
## What does `version` mean?

Older Compose files often used:
```yaml
version: "3.9"
```

It indicated the compose file format version.

In modern Docker Compose,
version is often optional.

But many teaching examples still show it.

---

# Question 9
## What is a service?

A service is:
- one application component
- usually one container definition
- one reusable run plan

Example services:
- frontend
- backend
- mysql
- mongodb
- redis

---

# Very simple service example

```yaml
services:
  web:
    image: nginx:latest
```

Meaning:
- create one service named `web`
- run it using nginx image

---

# Question 10
## What is the difference between `build` and `image`?

`image` means:
- use an already existing image

`build` means:
- build image from local Dockerfile

This is a very important Compose concept.

---

# Example using `image`

```yaml
services:
  db:
    image: mysql:8.0
```

Meaning:
- Docker pulls `mysql:8.0`
- no local build is needed

Use this when image already exists.

---

# Example using `build`

```yaml
services:
  backend:
    build: .
```

Meaning:
- build image from current folder
- Dockerfile must exist there

Use this for your own app code.

---

# `build` vs `image` in one slide

## Use `image`
- when image is already on Docker Hub
- for MySQL, MongoDB, WordPress, Nginx

## Use `build`
- when you wrote your own app
- for Node.js app, Spring Boot app, custom backend

---

# Question 11
## What are ports in Compose?

Ports allow communication:
- from host machine to container

Example:
```yaml
ports:
  - "8080:80"
```

Meaning:
- host port 8080
- container port 80

---

# Beginner meaning of port mapping

If a web app listens inside container on port 80,
and you map `8080:80`,
then browser should use:

`http://localhost:8080`

---

# Question 12
## What are volumes?

Volumes store data outside container's temporary layer.

Why needed?
- containers can be deleted
- data should survive
- databases need persistence

Volumes are very important for MySQL, PostgreSQL, MongoDB.

---

# Simple volume example

```yaml
services:
  db:
    image: mysql:8.0
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Meaning:
- MySQL data is stored persistently
- deleting container does not delete actual DB data immediately

---

# Question 13
## What are networks?

Networks allow services to talk to each other.

Compose usually creates a default network automatically.

If services are in same Compose project,
they can use service names as hostnames.

Example:
- backend can connect to database using `db`

---

# Network example

```yaml
services:
  backend:
    image: myapp
  db:
    image: mysql:8.0
```

Here `backend` can often reach MySQL using hostname:
`db`

That is much easier than remembering container IPs.

---

# Question 14
## What are environment variables?

Environment variables are configuration values.

They help us avoid hardcoding things such as:
- database host
- database user
- password
- application mode
- port values

---

# Environment variable example

```yaml
services:
  backend:
    image: myapp
    environment:
      DB_HOST: db
      DB_PORT: 3306
```

Meaning:
- inside backend container
- app can read these values
- backend knows where database is

---

# Why environment variables are useful

Without environment variables:
- values are fixed inside code
- changing environment becomes hard

With environment variables:
- same app works in dev, test, prod
- only configuration changes

---

# Question 15
## What are secrets?

Secrets are sensitive values such as:
- passwords
- tokens
- private keys

They should not be exposed openly in code.

Compose supports secrets,
especially in more advanced and Swarm-style workflows.

---

# Simple idea of secrets

Instead of writing password directly in app code:
- store it separately
- inject it when needed
- limit visibility

This improves security.

---

# Question 16
## What are configs?

Configs are non-sensitive configuration files,
such as:
- app configuration
- server config
- feature flags
- templates

Secrets protect sensitive data.
Configs manage normal setup data.

---

# Question 17
## What is service dependency ordering?

Sometimes one service depends on another.

Example:
- backend depends on database
- frontend depends on backend

Compose supports startup ordering using:
`depends_on`

---

# Example of `depends_on`

```yaml
services:
  backend:
    build: ./backend
    depends_on:
      - db

  db:
    image: mysql:8.0
```

Meaning:
- backend should start after db is started

---

# Important beginner note about `depends_on`

`depends_on` helps with start order,
but does not always mean:
- database is fully ready
- service is fully healthy

Real production systems often use:
- healthchecks
- retry logic
- wait-for scripts

---

# Question 18
## What is a multi-container app?

A multi-container app uses more than one container.

Example:
- frontend container
- backend container
- database container

Each service has its own job,
but all work together as one application.

---

# Generic 3-tier architecture

## Frontend
- shows UI to users

## Backend
- handles logic and APIs

## Database
- stores data

Compose is perfect for such architecture.

---

# Example 1: Database + Backend + Frontend

```yaml
version: "3.9"
services:
  frontend:
    image: nginx:alpine
    ports:
      - "3000:80"
```

---

# Same example continued

```yaml
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DB_HOST: db
    depends_on:
      - db
```

---

# Same example continued again

```yaml
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: appdb
    volumes:
      - app_db_data:/var/lib/mysql

volumes:
  app_db_data:
```

---

# Explanation of the 3-tier example

## `frontend`
- serves the UI
- exposed on port 3000

## `backend`
- runs custom app
- uses `DB_HOST=db`

## `db`
- stores application data
- persists data using volume

---

# How containers talk in above example

- frontend may call backend using API URL
- backend talks to database using hostname `db`
- all are connected through Compose network

This is simpler than manual Docker commands.

---

# Example 2: WordPress + MySQL

This is a famous Docker Compose use case.

Why it is good for beginners:
- clear separation of app and database
- real-world deployment
- easy to understand visually

---

# WordPress + MySQL Compose file

```yaml
version: "3.9"
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
```

---

# WordPress + MySQL continued

```yaml
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wpuser
      WORDPRESS_DB_PASSWORD: wppass
      WORDPRESS_DB_NAME: wordpress
    depends_on:
      - db
```

---

# WordPress + MySQL continued again

```yaml
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wpuser
      MYSQL_PASSWORD: wppass
      MYSQL_ROOT_PASSWORD: rootpass
```

---

# WordPress + MySQL final part

```yaml
    volumes:
      - wp_db_data:/var/lib/mysql

volumes:
  wp_db_data:
```

---

# Explanation of WordPress + MySQL

## WordPress service
- runs website application
- exposed on `localhost:8080`

## DB service
- stores all WordPress data
- uses volume to preserve data

## Key idea
- WordPress connects to MySQL using `db`

---

# How to run WordPress + MySQL

Use command:
```bash
docker compose up -d
```

Open browser:
`http://localhost:8080`

To stop:
```bash
docker compose down
```

---

# Example 3: Node.js + MongoDB

This is common for modern web applications.

Why used?
- Node.js handles APIs
- MongoDB stores JSON-like documents
- good for fast backend development

---

# Node.js + MongoDB Compose file

```yaml
version: "3.9"
services:
  app:
    build: ./app
    ports:
      - "3000:3000"
```

---

# Node.js + MongoDB continued

```yaml
    environment:
      MONGO_URL: mongodb://mongo:27017/mydb
    depends_on:
      - mongo
```

---

# Node.js + MongoDB final part

```yaml
  mongo:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

# Explanation of Node.js + MongoDB

## `app`
- custom Node.js app
- built from local code
- connects to MongoDB using `mongo`

## `mongo`
- official MongoDB image
- stores data in persistent volume

---

# Why hostname is `mongo`

Because service name is `mongo`.

In Compose, service names act like DNS names.
So Node.js app can use:
`mongodb://mongo:27017/mydb`

This is easier than hardcoding IP addresses.

---

# Example 4: Spring Boot + PostgreSQL

This is common in Java-based enterprise applications.

Why used?
- Spring Boot for backend APIs
- PostgreSQL for relational database
- good for structured application data

---

# Spring Boot + PostgreSQL Compose file

```yaml
version: "3.9"
services:
  app:
    build: ./app
    ports:
      - "8080:8080"
```

---

# Spring Boot + PostgreSQL continued

```yaml
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydb
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: postgres123
    depends_on:
      - db
```

---

# Spring Boot + PostgreSQL final part

```yaml
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    volumes:
      - pg_data:/var/lib/postgresql/data

volumes:
  pg_data:
```

---

# Explanation of Spring Boot + PostgreSQL

## `app`
- Java backend service
- connects to PostgreSQL through JDBC URL

## `db`
- official PostgreSQL container
- stores database files in persistent volume

---

# How to build and run custom app services

If using `build`, project usually needs:
- source code folder
- Dockerfile
- maybe package files or JAR

Then Compose builds image automatically by:
```bash
docker compose up --build
```

---

# Common Docker Compose commands

## Start services
```bash
docker compose up
```

## Start in background
```bash
docker compose up -d
```

## Stop services
```bash
docker compose down
```

---

# More useful Compose commands

## View running containers
```bash
docker compose ps
```

## View logs
```bash
docker compose logs
```

## Follow logs
```bash
docker compose logs -f
```

---

# Commands for rebuilding

## Rebuild and start
```bash
docker compose up --build
```

## Stop and remove old setup
```bash
docker compose down
```

## Remove volumes too
```bash
docker compose down -v
```

---

# Simple learning flow for beginners

Step 1:
Understand monolithic and microservices

Step 2:
Understand containers

Step 3:
Understand Compose YAML

Step 4:
Run one 2-service or 3-service example

---

# Practical beginner mistakes to avoid

- wrong indentation in YAML
- using tabs instead of spaces
- wrong service name in connection string
- forgetting volume for database
- confusing host port and container port
- thinking `depends_on` means full readiness

---

# Monolithic vs microservices in one real example

## Online store monolith
- login, products, orders, payment in one app

## Online store microservices
- user service
- product service
- order service
- payment service

Microservices are easier to scale selectively.

---

# Why Compose is excellent for learning microservices

Compose helps beginners because:
- one file controls many services
- setup is repeatable
- network is automatic
- commands are simple
- use cases are realistic

---

# Final summary

Microservices divide a large system into small services.

Docker Compose helps run these services together
using one YAML file.

Key concepts:
- services
- volumes
- networks
- environment variables
- dependency ordering
- real use case deployments

---

# End-of-topic questions for revision

- What is the main difference between monolithic and microservices?
- Why do we use Docker Compose?
- What is the role of `services` in YAML?
- What is the difference between `build` and `image`?
- Why are volumes important for databases?

---

# More revision questions

- Why are networks needed in Compose?
- Why do we use environment variables?
- What does `depends_on` do?
- How does backend reach database in Compose?
- Why is Compose useful for WordPress, Node.js, and Spring Boot examples?

---

# Practice tasks for students

1. Create a 2-service app using Nginx + MySQL
2. Create a 3-service app using frontend + backend + db
3. Replace `image` with `build` for a custom service
4. Add a volume to preserve DB data
5. Use environment variables for DB connection

---

# Advanced thinking questions

- When is microservices better than monolithic?
- Can microservices become too complex?
- Why is API Gateway useful in large systems?
- Why is startup order not same as service readiness?
- What happens if database has no persistent volume?

