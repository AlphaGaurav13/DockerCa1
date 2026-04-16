---
marp: true
theme: default
paginate: true
size: 16:9
title: Basics of DevOps Infrastructure
description: Beginner-friendly explanation with questions, concepts, and examples for DevOps infrastructure basics
---

# Basics of DevOps Infrastructure
## Beginner-Friendly Detailed Explanation
### With Questions, Examples, and Revision Slides

---

# What questions will this explanation answer?

- What is DevOps infrastructure?
- What are containers and why do we need them?
- How did containers evolve over time?
- What is modern containerization?
- Why are containers important in DevOps?

---

# More questions this explanation will answer

- What is a container runtime?
- What is process isolation?
- What are namespaces?
- What are cgroups?
- What are images, layers, registries, and Docker objects?

---

# Even more questions this explanation will answer

- What is Docker?
- What is Docker architecture?
- What is Docker daemon?
- What is Docker CLI?
- What are container, image, network, and volume objects?

---

# Question 1
## What is DevOps infrastructure?

DevOps infrastructure means:
- the technical foundation
- used to build, test, deploy, and run software
- in a faster and automated way
- with better collaboration between teams

---

# DevOps infrastructure in simple words

Think of DevOps infrastructure as:
- the roads
- the vehicles
- the traffic system
- and the delivery process

that help software move
from developer to user.

---

# Why DevOps infrastructure matters

It matters because it helps teams:
- build software faster
- deploy changes safely
- reduce manual work
- make environments more consistent
- scale systems more easily

---

# Question 2
## What is a container?

A container is:
- a lightweight isolated environment
- used to run an application
- together with its needed dependencies
- in a predictable way

---

# Container in very simple words

A container is like:
- a lunch box

Inside the lunch box,
everything needed for one meal is packed.

Similarly, a container packs:
- app code
- libraries
- runtime dependencies

---

# Why containers are useful

Containers are useful because:
- apps run similarly on different machines
- setup becomes easier
- deployment becomes faster
- dependency conflicts reduce
- isolation improves

---

# Question 3
## What was there before containers?

Before containers became common,
many teams used:
- physical servers
- virtual machines
- manual software installation
- environment-specific setup

This often caused inconsistency.

---

# Problems before containers

Common old problems were:
- “works on my machine” issue
- heavy virtual machines
- slow deployment
- difficult scaling
- dependency mismatch
- repeated manual setup

---

# Question 4
## What is the origin of containers?

The idea of containers did not appear suddenly.

It developed from older concepts such as:
- process isolation
- chroot environments
- jails
- namespaces
- cgroups

These ideas became stronger over time.

---

# Historical idea in simple words

Engineers wanted a way to:
- run multiple apps safely
- keep them separate
- control their resources
- avoid full virtual machines

That need slowly led
to modern containers.

---

# Question 5
## What is modern containerization?

Modern containerization means:
- packaging applications with dependencies
- running them in isolated environments
- using lightweight OS-level separation
- managing them with tools like Docker

---

# Why modern containerization became popular

It became popular because it offers:
- faster startup than VMs
- smaller size
- portability
- easier CI/CD integration
- easier scaling for microservices

---

# Question 6
## How are containers integrated into DevOps?

Containers fit DevOps very well because:
- they standardize environments
- they support automation
- they simplify build and deployment
- they help CI/CD pipelines
- they work well with cloud and microservices

---

# Container + DevOps connection

In DevOps we want:
- fast delivery
- repeatability
- automation
- reliability

Containers support all these goals
by making app environments consistent.

---

# Question 7
## What is a container runtime?

A container runtime is software
that actually runs containers.

It handles:
- starting containers
- stopping containers
- managing isolated processes
- interacting with the operating system

---

# Runtime in simple words

If image is like a recipe,
then runtime is like the cook
who follows that recipe
and prepares the actual running app.

---

# Examples of container runtime ideas

A runtime helps with:
- creating container process
- attaching file system layers
- setting network
- applying limits
- starting the main app process

---

# Question 8
## What is process isolation?

Process isolation means:
- one running process is separated from others
- it cannot freely interfere with other processes
- it sees a limited environment

This is very important for containers.

---

# Why process isolation matters

Without isolation:
- apps may disturb each other
- security risks increase
- debugging becomes messy
- system stability reduces

Isolation helps each app
stay in its own boundary.

---

# Question 9
## What are namespaces?

Namespaces are Linux features
that give a process
its own separate view
of certain system resources.

They are major building blocks of containers.

---

# Namespaces in simple words

Namespaces act like special glasses.

A process wearing those glasses
sees only its own limited world,
not the full host system.

---

# What can namespaces isolate?

Namespaces can isolate things like:
- process IDs
- network interfaces
- mount points
- hostname
- users
- IPC resources

---

# PID namespace

PID namespace isolates:
- process numbering

Inside a container,
a process may think
it is process 1,
even though host sees differently.

---

# Network namespace

Network namespace isolates:
- network interfaces
- IP addresses
- routing tables
- ports

This helps each container
have its own network view.

---

# Mount namespace

Mount namespace isolates:
- file system mount points

This means one container
can have its own file system view
without directly exposing host structure.

---

# UTS namespace

UTS namespace isolates:
- hostname
- domain name

That is why containers
can have their own hostname
different from host machine.

---

# IPC namespace

IPC namespace isolates:
- inter-process communication resources

This helps keep process communication
inside one boundary
instead of mixing with others.

---

# User namespace

User namespace helps isolate:
- user and group IDs

This improves security,
because container root
can be mapped differently on host.

---

# Question 10
## What are cgroups?

cgroups means:
Control Groups

They are Linux features
used to control and limit
resource usage of processes.

---

# cgroups in simple words

Think of cgroups as:
- resource rules

They decide:
- how much CPU a group may use
- how much memory it can take
- how much I/O it can consume

---

# Why cgroups matter in containers

Without cgroups:
- one container may consume too much RAM
- one app may slow down others
- host may become unstable

cgroups help keep resource usage controlled.

---

# Common resources controlled by cgroups

cgroups can help control:
- CPU
- memory
- disk I/O
- process count
- sometimes network-related behavior indirectly

---

# Simple cgroup example idea

Suppose two containers run on one machine.

If one container uses too much memory,
cgroups can enforce a limit
so the second container still works.

---

# Question 11
## What are container images?

A container image is:
- a packaged blueprint
- used to create containers
- includes app code and dependencies
- usually read-only

Containers are created from images.

---

# Image in simple words

Image is like:
- a ready-made recipe card

Container is like:
- the cooked meal

You can create many containers
from one image.

---

# Question 12
## What are image layers?

Docker images are usually made of layers.

Each important build step may create a layer:
- base OS layer
- package install layer
- dependency layer
- app code layer

---

# Why layers are useful

Layers help because:
- repeated data can be reused
- downloads become faster
- caching becomes possible
- image building is more efficient

---

# Layer idea in simple words

Imagine painting a wall:
- first base coat
- then second layer
- then final design

Docker images are also built
step by step in layers.

---

# Question 13
## What are image registries?

An image registry is a place
where container images are stored
and shared.

It is like an online library
for images.

---

# Why registries are needed

Registries help us:
- push images
- pull images
- share across teams
- deploy to servers
- keep versions centrally

---

# Question 14
## What is image distribution?

Image distribution means:
- moving images from one place to another
- usually through registries
- so teams or servers can use them

This is very important in CI/CD and DevOps.

---

# Example of image distribution

A developer builds an image.
Then pushes it to a registry.
A server later pulls that image
and runs it in production.

That is image distribution.

---

# Question 15
## What is Docker?

Docker is a popular platform
used to build, package, share,
and run containers.

It made containers easier
for developers and operations teams.

---

# Why Docker became so popular

Docker became popular because:
- it simplified container usage
- had easy commands
- supported image registries
- helped standardize workflows
- fit DevOps and cloud very well

---

# Question 16
## What is Docker architecture?

Docker architecture means:
- the main parts of Docker
- and how they work together

Important parts include:
- Docker CLI
- Docker daemon
- Docker images
- Docker containers
- registries

---

# Docker architecture in simple words

You type a command.
The Docker CLI sends it.
The Docker daemon receives it.
The daemon does the real work.
It may also talk to registries.

---

# Question 17
## What is Docker daemon?

Docker daemon is the background service
that manages Docker objects.

It handles:
- building images
- running containers
- managing networks
- managing volumes

---

# Daemon in simple words

The daemon is like:
- the engine behind Docker

You usually do not talk to it directly.
Commands go through the CLI,
then the daemon performs the work.

---

# Question 18
## What is Docker CLI?

Docker CLI means:
Command Line Interface

It is the command tool used by users
to interact with Docker.

Examples:
- `docker run`
- `docker build`
- `docker ps`

---

# CLI in simple words

CLI is like:
- the remote control

You press buttons as commands,
and Docker carries out the actions.

---

# Question 19
## What is Docker registry?

A Docker registry is a service
that stores Docker images.

Examples:
- Docker Hub
- GitHub Container Registry
- private company registries

---

# Question 20
## What is Docker Hub?

Docker Hub is the most common
public registry for Docker images.

It contains:
- official images
- community images
- private repositories too

---

# Docker Hub examples

Popular images on Docker Hub include:
- `nginx`
- `mysql`
- `python`
- `node`
- `ubuntu`

These can be pulled easily.

---

# Question 21
## What are Docker object types?

Common Docker object types are:
- container
- image
- network
- volume

These are the main things
Docker manages frequently.

---

# Object type 1: Container

A container is:
- the running app instance
- created from an image
- isolated
- temporary unless persisted with storage

---

# Object type 2: Image

An image is:
- the blueprint
- used to start containers
- usually layered
- reusable many times

---

# Object type 3: Network

A network helps Docker objects communicate.

Networks are used for:
- container-to-container communication
- service isolation
- controlled connectivity

---

# Object type 4: Volume

A volume stores persistent data.

Useful for:
- databases
- uploaded files
- logs
- data that should survive container deletion

---

# Question 22
## What is Docker layering?

Docker layering means:
- building images step by step
- where each step can form a layer
- and unchanged layers can be reused

This improves efficiency.

---

# Why Docker layering matters in DevOps

Layering matters because:
- builds become faster
- CI/CD pipelines become efficient
- common layers are reused
- updates can be smaller and faster

---

# Question 23
## What is Docker filesystem behavior?

Docker containers use:
- image layers
- plus a writable container layer

The image layers are usually read-only.
The container gets a temporary writable layer.

---

# Writable layer in simple words

If a running container changes a file,
that change usually goes
into the container’s writable layer,
not into the shared base image itself.

---

# Why filesystem layering is important

It helps:
- keep images reusable
- keep shared data unchanged
- make containers lightweight
- support multiple containers from same image

---

# Simple example: one image, many containers

Suppose one Python image exists.

From that one image,
you can run:
- container A
- container B
- container C

All can share base image layers,
but each gets its own writable layer.

---

# Question 24
## Why are containers lighter than VMs?

Containers are lighter because:
- they share host OS kernel
- they do not need full guest OS each time
- startup is faster
- resource overhead is lower

---

# Containers vs virtual machines

## Virtual Machine
- full guest OS
- heavier
- slower startup

## Container
- shares host kernel
- lighter
- faster startup

---

# Why DevOps teams like containers

DevOps teams like containers because:
- builds and deployments are repeatable
- CI/CD becomes easier
- scaling is simpler
- rollback is easier
- microservices fit well

---

# Simple beginner workflow

Step 1:
Developer creates application

Step 2:
App is packaged into image

Step 3:
Image is stored in registry

Step 4:
Container runs from image

---

# Workflow continued

Step 5:
Runtime provides execution

Step 6:
Namespaces isolate processes

Step 7:
cgroups control resources

Step 8:
Docker tools manage everything

---

# Practical beginner example

Suppose you have a Python app.

You create an image for it.
Push it to Docker Hub.
Later another machine pulls it.
Then a container runs the app.

This is basic DevOps infrastructure flow.

---

# Useful beginner Docker commands

## Pull image
```bash
docker pull nginx
```

## Run container
```bash
docker run -d nginx
```

## List running containers
```bash
docker ps
```

---

# More useful beginner commands

## List images
```bash
docker images
```

## Stop container
```bash
docker stop <container_id>
```

## Remove container
```bash
docker rm <container_id>
```

---

# More commands related to images

## Remove image
```bash
docker rmi nginx
```

## Inspect container
```bash
docker inspect <container_id>
```

## Show image history
```bash
docker history nginx
```

---

# Commands related to volumes and networks

## List volumes
```bash
docker volume ls
```

## List networks
```bash
docker network ls
```

These help understand Docker objects better.

---

# Practical beginner mistakes to avoid

- confusing image with container
- thinking container is a full VM
- ignoring persistent storage needs
- not understanding resource limits
- forgetting registry role in sharing images

---

# More beginner mistakes

- thinking Docker CLI does all work itself
- not realizing daemon is the worker
- assuming containers do not need isolation
- ignoring namespaces and cgroups
- not understanding image layers

---

# Simple revision comparison

| Topic | Simple Meaning |
|---|---|
| Container | Running isolated app |
| Image | Blueprint for container |
| Runtime | Runs the container |
| Namespace | Isolation view |
| cgroup | Resource control |

---

# More revision comparison

| Topic | Simple Meaning |
|---|---|
| Registry | Image storage place |
| Docker CLI | User command tool |
| Docker daemon | Background engine |
| Network | Connectivity object |
| Volume | Persistent storage |

---

# Final summary

Basics of DevOps infrastructure include:
- containers
- runtimes
- process isolation
- namespaces
- cgroups
- images and layers
- registries and image distribution

---

# Final summary continued

It also includes understanding:
- Docker
- Docker architecture
- Docker daemon
- Docker CLI
- object types like container, image, network, and volume
- layering and filesystem behavior

---

# End-of-topic revision questions

- What is a container?
- What is the difference between image and container?
- Why are containers useful in DevOps?
- What is a runtime?
- Why does process isolation matter?

---

# More revision questions

- What do namespaces do?
- What do cgroups control?
- Why are image layers useful?
- What is a registry?
- What is the role of Docker daemon?

---

# Even more revision questions

- What is the role of Docker CLI?
- What are Docker object types?
- Why are containers lighter than VMs?
- What is image distribution?
- Why is filesystem layering important?

---

# Practice tasks for students

1. Explain image vs container in your own words
2. List three benefits of containers
3. Describe what namespaces do
4. Describe what cgroups do
5. Name four Docker object types

---

# More practice tasks

6. Explain Docker daemon and Docker CLI
7. Give one example of image distribution
8. Explain why layers improve efficiency
9. Compare containers with VMs
10. Explain why volumes are important

---

# Advanced thinking questions

- Why did DevOps benefit so much from containers?
- Why is OS-level isolation lighter than full VM isolation?
- Why are layers useful for CI/CD?
- What may happen without cgroups?
- Why are registries central in modern deployment?

