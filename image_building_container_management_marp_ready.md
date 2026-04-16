---
marp: true
theme: default
paginate: true
size: 16:9
title: Image Building and Container Management
description: Beginner-friendly explanation with questions, examples, and Docker image management topics
---

# Image Building & Container Management
## Beginner-Friendly Detailed Explanation
### With Questions, Examples, and Use Cases

---

# What questions will this explanation answer?

- What is a Docker image?
- Why do we need images?
- What is a Dockerfile?
- How does `docker build` work?
- Why do layers matter?

---

# More questions this explanation will answer

- What is build context?
- Why is `.dockerignore` needed?
- What do common Dockerfile instructions mean?
- How do networking and storage work?
- What are registries and access tokens?

---

# Question 1
## What is a Docker image?

A Docker image is:
- a packaged blueprint
- used to create containers
- contains app code and dependencies
- includes runtime setup

---

# Very simple meaning of image

Think of an image as:
- a ready-made recipe
- with ingredients and instructions

When Docker runs that recipe,
it creates a live container.

---

# Question 2
## What is a container?

A container is:
- a running instance of an image
- isolated from other containers
- lightweight
- easy to start, stop, and remove

---

# Image vs container

## Image
- read-only template
- stored on disk
- reused many times

## Container
- running instance
- temporary writable layer
- created from image

---

# Question 3
## Why do we need Docker images?

We need images because they help us:
- package apps consistently
- run the same app everywhere
- avoid “works on my machine” problems
- share software easily
- deploy faster

---

# Real-life analogy

Image is like:
- a cake recipe and mould

Container is like:
- the actual cake

Many cakes can be made
from one recipe.

---

# Question 4
## What is a Dockerfile?

A Dockerfile is:
- a text file
- full of step-by-step instructions
- used by Docker to build an image

It tells Docker what to prepare.

---

# Very small Dockerfile example

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

Meaning:
- start from nginx image
- copy website files into web folder

---

# Question 5
## What is image layering?

Docker images are built in layers.

Many instructions create layers:
- `FROM`
- `RUN`
- `COPY`
- `ADD`

Layers help Docker reuse work.

---

# Layering in simple words

Imagine building a sandwich:
- bread
- sauce
- vegetables
- cheese

Each addition is like a layer.

Docker stacks content similarly.

---

# Why layers are useful

Layers are useful because:
- common parts can be reused
- downloading is faster
- builds can use cache
- updates rebuild less work

---

# Question 6
## What is build cache?

Build cache means Docker remembers
previous build steps and reuses them
if nothing important changed.

This makes repeated builds faster.

---

# Example of build caching

If Dockerfile has:
- install Python
- install packages
- copy app code

and only app code changes,
Docker may rebuild only the last step.

---

# Question 7
## What is build context?

Build context means:
- the files/folders sent to Docker
- when `docker build` runs

Usually context is:
- current directory
- or a specific folder

---

# Basic build context command

```bash
docker build .
```

Here `.` means:
use current folder
as the build context.

---

# Why build context matters

If context is too large:
- build becomes slower
- unnecessary files are sent
- secrets may be leaked
- caching becomes less efficient

So context should stay clean.

---

# Question 8
## What is `.dockerignore`?

`.dockerignore` tells Docker:
- which files and folders to ignore
- when sending build context

It works like `.gitignore`
but for Docker builds.

---

# Example `.dockerignore`

```text
node_modules
.git
.env
dist
__pycache__
target
```

These files are not sent
during Docker build.

---

# Why `.dockerignore` is important

It helps:
- reduce build time
- avoid sending useless files
- protect secrets
- keep images cleaner
- improve caching behavior

---

# Question 9
## How do we write a Dockerfile?

A Dockerfile is written:
- line by line
- using Docker instructions
- in the order Docker follows

Common instructions:
`FROM`, `RUN`, `COPY`, `CMD`

---

# Question 10
## What does `FROM` mean?

`FROM` defines the base image.

Example:
```dockerfile
FROM python:3.12-slim
```

Meaning:
start image build
from Python 3.12 slim.

---

# Why `FROM` is important

Without `FROM`,
Docker does not know
which starting environment to use.

Base image may provide:
- Linux tools
- language runtime
- prepared environment

---

# Question 11
## What does `RUN` mean?

`RUN` executes a command
during image build time.

Example:
```dockerfile
RUN apt-get update && apt-get install -y curl
```

This changes the image itself.

---

# `RUN` in simple words

`RUN` means:
while building the image,
do this setup work now.

Use it for:
- installing packages
- making folders
- updating permissions

---

# Question 12
## What does `COPY` mean?

`COPY` copies files
from build context
into the image.

Example:
```dockerfile
COPY app.py /app/app.py
```

---

# `COPY` in simple words

It means:
take file from your computer folder
and place it inside the image.

Use it for:
- app code
- config files
- scripts

---

# Question 13
## What does `ADD` mean?

`ADD` is similar to `COPY`
but has extra features.

It can:
- copy local files
- extract local tar files
- handle remote URLs in some cases

---

# `COPY` vs `ADD`

## Use `COPY`
- for normal file copy
- clearer and safer

## Use `ADD`
- only when extra features are needed

For beginners, prefer `COPY`.

---

# Question 14
## What does `CMD` mean?

`CMD` defines the default command
to run when container starts.

Example:
```dockerfile
CMD ["python", "app.py"]
```

User can override it.

---

# Question 15
## What does `ENTRYPOINT` mean?

`ENTRYPOINT` sets the main executable
that container should always run.

Example:
```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

Together they become:
`python app.py`

---

# `CMD` vs `ENTRYPOINT`

## `CMD`
- default command or arguments
- easy to override

## `ENTRYPOINT`
- fixed main executable
- usually always runs

They often work together.

---

# Question 16
## What does `WORKDIR` mean?

`WORKDIR` sets the working directory
inside image and container.

Example:
```dockerfile
WORKDIR /app
```

After this, commands run in `/app`.

---

# Why `WORKDIR` is useful

Without `WORKDIR`,
paths become long and confusing.

With `WORKDIR`,
Dockerfile becomes cleaner
and easier to understand.

---

# Question 17
## What does `ENV` mean?

`ENV` sets environment variables
inside the image/container.

Example:
```dockerfile
ENV APP_ENV=production
```

App can read this later.

---

# Why `ENV` is useful

It helps:
- define configuration
- avoid hardcoding values
- control app behavior
- make image reusable

---

# Question 18
## What does `EXPOSE` mean?

`EXPOSE` documents which port
the container listens on.

Example:
```dockerfile
EXPOSE 8080
```

It does not publish the port automatically.

---

# Important note about `EXPOSE`

`EXPOSE` means:
this app uses this internal port.

To access from host,
use port mapping such as:
```bash
docker run -p 8080:8080 myapp
```

---

# Question 19
## What does `VOLUME` mean?

`VOLUME` declares a mount point
for persistent data.

Example:
```dockerfile
VOLUME ["/data"]
```

Useful for:
- database files
- uploads
- long-term data

---

# Basic Python Dockerfile example

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

---

# Explanation of Python Dockerfile

## `FROM`
use Python base image

## `WORKDIR`
set folder to `/app`

## `COPY requirements.txt .`
copy dependency list first

---

# Explanation continued

## `RUN pip install -r requirements.txt`
install Python packages

## `COPY . .`
copy app code

## `CMD ["python", "app.py"]`
start app when container runs

---

# Why copy requirements first?

This helps caching.

If source code changes often
but dependencies do not,
Docker can reuse the install layer.

That makes rebuilds faster.

---

# Question 20
## What is the detailed build process?

When `docker build` runs:
1. Docker reads Dockerfile
2. Docker sends build context
3. Docker processes instructions
4. Docker creates layers
5. Docker stores final image

---

# Basic build command

```bash
docker build -t myapp:1.0 .
```

Meaning:
- build an image
- tag it as `myapp:1.0`
- use current folder as context

---

# What does `-t` mean?

`-t` means:
tag the image with a name.

Example:
```bash
docker build -t myapp:1.0 .
```

Without a tag,
image is harder to manage.

---

# Question 21
## What is image tagging?

Tagging means:
- giving image a readable name
- and usually a version

Format:
`repository:tag`

Example:
`myapp:1.0`

---

# Why tagging matters

Without proper tags:
- image management gets confusing
- deployment becomes unclear
- rollback becomes difficult

Tags help identify purpose and version.

---

# Common tagging examples

```text
myapp:latest
myapp:1.0
myapp:v2
mycompany/backend:prod
mycompany/backend:test
```

---

# Question 22
## What is versioning?

Versioning means:
- assigning meaningful versions to images

Examples:
- `1.0`
- `1.1`
- `2.0`
- `dev`
- `staging`
- `prod`

Good versioning improves control.

---

# Question 23
## How do we inspect images?

Docker provides commands to inspect:
- image list
- image history
- metadata
- layers

Useful commands:
- `docker images`
- `docker history`
- `docker inspect`

---

# List images

```bash
docker images
```

This shows:
- repository
- tag
- image ID
- created time
- size

---

# Inspect image history

```bash
docker history myapp:1.0
```

This shows:
- layers
- command history
- size added by steps

Very useful for understanding layers.

---

# Inspect image metadata

```bash
docker inspect myapp:1.0
```

This shows:
- JSON metadata
- env vars
- working directory
- entrypoint
- exposed ports
- more details

---

# Question 24
## What is Docker networking?

Docker networking allows:
- container-to-container communication
- host-to-container communication
- grouped app components to connect

Common network types:
- bridge
- host
- overlay

---

# Question 25
## What is bridge network?

Bridge network is the common
single-host Docker network type.

Containers on the same bridge network
can talk to each other
using IP or sometimes names.

---

# Bridge network example

```bash
docker network create mybridge
docker run -d --name db --network mybridge mysql:8.0
docker run -d --name app --network mybridge myapp:1.0
```

Now `app` and `db`
share the same bridge network.

---

# Question 26
## What is host network?

Host network means:
- container uses host network directly

So normal port isolation is reduced.

Mostly common in Linux environments.
It is less isolated than bridge mode.

---

# Question 27
## What is overlay network?

Overlay network is used for:
- multi-host communication
- Docker Swarm style deployments
- distributed container services

It connects services across hosts
as one logical network.

---

# Question 28
## What is DNS inside Docker?

Docker provides internal DNS
on user-defined networks.

This means one container
can often find another by name.

Example:
app can connect to `db`.

---

# DNS in simple words

Instead of using IP like:
`172.18.0.3`

container can use:
`db`

This is easier and more stable.

---

# Question 29
## What is linking containers?

Older Docker used `--link`
to connect containers by name.

Example:
```bash
docker run --name app --link db:db myapp
```

Today, custom networks are preferred.

---

# Why linking is less preferred now

Modern Docker networking is better because:
- cleaner
- more flexible
- DNS works naturally
- easier to scale and manage

So focus on networks, not links.

---

# Question 30
## What is port mapping?

Port mapping connects:
- host port
to
- container port

Example:
```bash
docker run -p 8080:80 nginx
```

---

# Meaning of `8080:80`

- `8080` = host machine port
- `80` = container internal port

Browser uses:
`http://localhost:8080`

Container listens on port 80.

---

# Question 31
## What is Docker storage?

Docker storage means:
- how data is stored
- inside or outside containers

Important concepts:
- volumes
- bind mounts
- host-backed data
- copy-on-write

---

# Question 32
## What is a volume?

A volume is Docker-managed
persistent storage.

Useful for:
- databases
- logs
- uploads
- long-term app data

---

# Volume example

```bash
docker volume create mydata
docker run -d --name db -v mydata:/var/lib/mysql mysql:8.0
```

Meaning:
database files go into volume `mydata`

---

# Why volumes are useful

Volumes help because:
- data survives container removal
- Docker manages the location
- good for production-style persistence
- better for databases than temporary storage

---

# Question 33
## What is a bind mount?

Bind mount connects:
- a real host folder
to
- a folder inside container

Example:
```bash
docker run -v C:\project:/app myimage
```

---

# Volume vs bind mount

## Volume
- managed by Docker
- good for persistent data
- cleaner for production

## Bind mount
- maps exact host path
- great for development
- uses host files directly

---

# When to use volume

Use volume when:
- data should survive
- Docker should manage storage
- database data is involved
- portability matters more

---

# When to use bind mount

Use bind mount when:
- you want live code editing
- host files must appear instantly
- development speed matters
- exact host path is needed

---

# Question 34
## What is backing data on host?

Backing data on host means:
- data is stored on host machine
- not only in container writable layer

This happens through:
- volumes
- bind mounts

This protects data better.

---

# Question 35
## What is copy-on-write?

Copy-on-write means Docker shares
unchanged image layers across containers.

When a file is modified,
Docker creates a writable copy
instead of changing shared base layer.

---

# Copy-on-write in simple words

If 10 containers use same image,
they can share common base data.

Only changed data becomes separate.

This saves storage and time.

---

# Question 36
## What is a registry?

A registry is a place
where Docker images are stored and shared.

It is like a library
for container images.

---

# Why registries are important

Registries help us:
- push images
- pull images
- share with teams
- deploy on servers
- keep versions centrally

---

# Question 37
## What is Docker Hub?

Docker Hub is the most common
public Docker image registry.

It contains:
- official images
- community images
- private repos too

Examples:
`nginx`, `mysql`, `python`

---

# Docker Hub examples

```bash
docker pull nginx
docker pull mysql:8.0
docker push yourusername/myapp:1.0
```

These use Docker Hub by default
unless another registry is specified.

---

# Question 38
## What is GHCR?

GHCR means:
GitHub Container Registry

It is GitHub’s registry
for storing container images.

Useful when code already lives on GitHub.

---

# GHCR image example

Image name may look like:
```text
ghcr.io/username/myapp:1.0
```

To pull:
```bash
docker pull ghcr.io/username/myapp:1.0
```

---

# Question 39
## What is a private registry?

Private registry means:
- not openly public
- controlled access
- used by organizations

Useful for:
- private apps
- internal services
- enterprise deployments

---

# Examples of private registry ideas

- organization’s own Docker Registry
- Harbor
- Artifactory
- cloud private registry
- self-hosted registry server

---

# Question 40
## What is authentication?

Authentication means proving identity
before pulling or pushing images.

Usually done using:
- username/password
- token
- personal access token

---

# Basic Docker login command

```bash
docker login
```

This asks for Docker Hub credentials
by default.

---

# Login to a specific registry

```bash
docker login ghcr.io
```

Use this when registry is not Docker Hub,
such as GHCR or a private registry.

---

# Question 41
## What are access tokens?

Access tokens are secure credentials
used instead of full passwords
in many registry workflows.

They are safer for automation.

---

# Why tokens are preferred

Tokens are preferred because:
- better security
- limited scope possible
- easier to rotate
- useful in CI/CD
- safer than sharing passwords

---

# Simple image push workflow

Step 1:
Build image
```bash
docker build -t yourusername/myapp:1.0 .
```

Step 2:
Login
```bash
docker login
```

---

# Push workflow continued

Step 3:
Push image
```bash
docker push yourusername/myapp:1.0
```

Now the image becomes available
from registry.

---

# Tagging for another registry

Example for GHCR:
```bash
docker tag myapp:1.0 ghcr.io/username/myapp:1.0
docker push ghcr.io/username/myapp:1.0
```

Same local image gets a new tag
for another registry.

---

# Example 1: Python app Dockerfile

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

---

# Explanation of Python example

- base image has Python
- app folder is `/app`
- requirements installed during build
- code copied into image
- app uses port 5000
- starts with `python app.py`

---

# Example 2: Node.js Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

# Why Node.js Dockerfile copies package first

This improves caching.

If source code changes often
but dependencies do not,
Docker can reuse `npm install` layer.

That speeds rebuilds.

---

# Example 3: Java JAR Dockerfile

```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# Explanation of Java example

- uses Java runtime image
- copies built JAR file
- exposes port 8080
- always runs the JAR

Good for Spring Boot style apps.

---

# Useful image commands

## Build image
```bash
docker build -t myapp:1.0 .
```

## List images
```bash
docker images
```

## Remove image
```bash
docker rmi myapp:1.0
```

---

# Useful inspection commands

## History
```bash
docker history myapp:1.0
```

## Inspect
```bash
docker inspect myapp:1.0
```

## Tag image
```bash
docker tag myapp:1.0 myapp:latest
```

---

# Useful container commands

## Run container
```bash
docker run -d -p 8080:8080 myapp:1.0
```

## List containers
```bash
docker ps
```

## Stop container
```bash
docker stop <container_id>
```

---

# Useful networking commands

## List networks
```bash
docker network ls
```

## Inspect network
```bash
docker network inspect bridge
```

## Create bridge network
```bash
docker network create mybridge
```

---

# Useful volume commands

## List volumes
```bash
docker volume ls
```

## Inspect volume
```bash
docker volume inspect mydata
```

## Remove volume
```bash
docker volume rm mydata
```

---

# Practical beginner mistakes to avoid

- huge build context
- forgetting `.dockerignore`
- copying secret files
- using `ADD` when `COPY` is enough
- bad tag naming
- confusing `EXPOSE` with `-p`

---

# More beginner mistakes

- storing DB only in container layer
- forgetting host port vs container port
- using deprecated linking too much
- putting too much in one image
- not inspecting history and size

---

# Simple learning flow for beginners

Step 1:
Understand image vs container

Step 2:
Write small Dockerfile

Step 3:
Build image with tag

Step 4:
Run container with ports

---

# Learning flow continued

Step 5:
Inspect image history

Step 6:
Use volume and bind mount

Step 7:
Push image to Docker Hub

Step 8:
Try GHCR or private registry

---

# Final summary

Docker image building is about:
- writing Dockerfile
- controlling layers
- using clean build context
- tagging images well
- inspecting and managing them properly

---

# Final summary continued

Container management also includes:
- networking
- port mapping
- volumes and bind mounts
- registries
- authentication
- tokens and secure sharing

---

# End-of-topic revision questions

- What is the difference between image and container?
- Why do layers matter?
- What is build context?
- Why is `.dockerignore` useful?
- What is the difference between `CMD` and `ENTRYPOINT`?

---

# More revision questions

- What is the difference between volume and bind mount?
- What does `EXPOSE` do?
- What does port mapping mean?
- Why is Docker Hub useful?
- Why are access tokens preferred over passwords?

---

# Practice tasks for students

1. Write a Python Dockerfile
2. Build image with tag `myapp:1.0`
3. Add `.dockerignore`
4. Run app on mapped port
5. Inspect image history

---

# More practice tasks

6. Create a Docker volume for MySQL
7. Try a bind mount for source code
8. Create a custom bridge network
9. Push image to Docker Hub
10. Retag image for GHCR

---

# Advanced thinking questions

- Why should big dependency installs appear early in Dockerfile?
- Why can a bad build context be dangerous?
- Why are networks preferred over legacy linking?
- What happens if database data stays only in container layer?
- Why is version tagging important in deployment?

