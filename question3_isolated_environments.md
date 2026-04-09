# Question 3: Two Student Teams Need Isolated Environments on the Same Host

## 1. Scenario Overview

### Real-life situation
Two project teams are using the same lab computer:

- **Team A** needs **Python 3.12**
- **Team B** needs **Node.js**
- Both teams work on the **same host machine**
- They must **not disturb each other's setup**

### Student task
Design an isolated solution using containers and explain why containers are better than installing everything directly on the host.

### Expected implementation
Run separate containers for both teams and show that each has its own runtime and dependencies.

### Syllabus mapping
- Origin of containers
- Modern containerization
- Process isolation
- Namespaces
- Container runtime

---

## 2. What problem are we solving?

If both teams install everything directly on the host machine, many problems can happen:

- Python and Node.js versions may conflict
- One team may upgrade or remove software needed by the other team
- Project-specific packages may break another project
- The lab computer becomes messy and difficult to maintain
- Reproducing the same setup on another system becomes difficult

So the goal is to create **two isolated environments** on one physical machine.

---

## 3. Why containers are the right solution

Containers solve this problem by packaging:

- the application
- the runtime
- the dependencies
- the startup command

inside one isolated unit.

This means:

- Team A can run Python 3.12 in one container
- Team B can run Node.js in another container
- both can run on the same host at the same time
- neither team changes the host environment for the other

In simple words, containers behave like **separate rooms inside the same building**.  
The building is the host system, but each room has its own setup.

---

## 4. Conceptual background for beginners

### 4.1 What is the host?
The **host** is the real computer where Docker is installed.  
It may be a laptop, desktop, lab machine, or server.

### 4.2 What is a container?
A **container** is a lightweight isolated running environment created from an image.

### 4.3 What is an image?
An **image** is a read-only template that contains:

- base operating system layer
- runtime
- dependencies
- project files
- startup instructions

### 4.4 Why is this called isolation?
Because each container has:

- its own filesystem view
- its own processes
- its own runtime
- its own installed packages

The containers still share the host kernel, but from the user perspective they behave like separate isolated environments.

---

## 5. Why containers are better than installing directly on the host

| Direct installation on host | Container-based approach |
|---|---|
| Software versions may conflict | Each team gets its own version |
| Host machine becomes cluttered | Host stays cleaner |
| One team may break another team's setup | Teams stay isolated |
| Difficult to reproduce environment | Easy to rebuild from Dockerfile |
| Removing software may affect others | Deleting container removes only that environment |
| Hard to standardize across lab systems | Same image can run anywhere Docker is installed |

### Simple conclusion
Containers are better because they provide **consistency, isolation, portability, and easy cleanup**.

---

## 6. Demonstration design

We will create two separate solutions:

- **Team A container** using Python 3.12
- **Team B container** using Node.js

Each team will have its own folder, Dockerfile, code, and running container.

---

## 7. Folder structure

Create a project structure like this:

```text
lab-isolation-demo/
|
|-- team-python/
|   |-- app.py
|   `-- Dockerfile
|
`-- team-node/
    |-- app.js
    `-- Dockerfile
```

### Why this structure is good
This structure keeps both teams separate even at the file level.  
A beginner can clearly see that each project has its own source code and Dockerfile.

---

## 8. Team A implementation - Python 3.12 container

### Step 1: Create Team A folder
Open terminal and run:

```bash
mkdir -p lab-isolation-demo/team-python
cd lab-isolation-demo/team-python
```

### Reasoning
We first create a dedicated folder for Team A so its files remain separate from Team B.  
This avoids confusion and teaches good project organization.

---

### Step 2: Create Team A application file

Create a file named `app.py` with this content:

```python
import sys

print("Hello from Team A")
print("Runtime:", sys.version)
```

### Reasoning
This is a very small Python program.  
It prints:

- a team-specific message
- the Python runtime version inside the container

This proves that Team A is using its own Python environment.

---

### Step 3: Create Team A Dockerfile

Create a file named `Dockerfile` with this content:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app.py .

CMD ["python", "app.py"]
```

### Reasoning for every line

#### `FROM python:3.12-slim`
This tells Docker to start from a base image that already contains Python 3.12.

Why this matters:
- Team A specifically requires Python 3.12
- the `slim` variant is smaller than the full image
- smaller images download faster and use less storage

#### `WORKDIR /app`
This sets the working directory inside the container.

Why this matters:
- all following commands run inside `/app`
- keeps files organized
- beginners can clearly understand where the code is placed

#### `COPY app.py .`
This copies the local `app.py` file into the container working directory.

Why this matters:
- without copying the file, the container would not have the program to run

#### `CMD ["python", "app.py"]`
This defines the default command the container runs when it starts.

Why this matters:
- the application starts automatically
- no extra manual command is needed every time

---

### Step 4: Build Team A image

Run:

```bash
docker build -t teama-python:1.0 .
```

### Reasoning
This command creates an image from the Dockerfile.

- `docker build` means create image
- `-t teama-python:1.0` gives the image a readable name and version tag
- `.` means use the current folder as the build context

---

### Step 5: Run Team A container

Run:

```bash
docker run --name teama-container teama-python:1.0
```

### Reasoning
This starts a container from the image we just built.

- `docker run` starts a container
- `--name teama-container` gives the container a readable name
- `teama-python:1.0` is the image being used

### Expected output
You should see something like:

```text
Hello from Team A
Runtime: 3.12.x ...
```

This proves Team A is running with Python 3.12 inside its own isolated container.

---

## 9. Team B implementation - Node.js container

### Step 1: Create Team B folder

Open terminal and run:

```bash
cd ..
mkdir -p team-node
cd team-node
```

### Reasoning
Now we move to the lab demo root and create a completely separate folder for Team B.

---

### Step 2: Create Team B application file

Create a file named `app.js` with this content:

```javascript
console.log("Hello from Team B");
console.log("Node version:", process.version);
```

### Reasoning
This small Node.js program prints:

- a team-specific message
- the Node.js version inside the container

This proves Team B has its own JavaScript runtime.

---

### Step 3: Create Team B Dockerfile

Create a file named `Dockerfile` with this content:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY app.js .

CMD ["node", "app.js"]
```

### Reasoning for every line

#### `FROM node:20-alpine`
This starts from an image that already contains Node.js 20.

Why this matters:
- Team B specifically needs Node.js
- `alpine` is very lightweight
- image size stays smaller

#### `WORKDIR /app`
Sets the working directory inside the container.

#### `COPY app.js .`
Copies the Node.js source file into the container.

#### `CMD ["node", "app.js"]`
Runs the Node.js application automatically when the container starts.

---

### Step 4: Build Team B image

Run:

```bash
docker build -t teamb-node:1.0 .
```

### Reasoning
This builds the Node.js image for Team B using its own Dockerfile and code.

---

### Step 5: Run Team B container

Run:

```bash
docker run --name teamb-container teamb-node:1.0
```

### Expected output
You should see something like:

```text
Hello from Team B
Node version: v20.x.x
```

This proves Team B is running with Node.js inside its own isolated container.

---

## 10. Proving both environments are isolated

Now we have two separate images and two separate containers:

- Team A image: `teama-python:1.0`
- Team B image: `teamb-node:1.0`

To view available images:

```bash
docker images
```

To view containers:

```bash
docker ps -a
```

### What this demonstrates
Even though both teams use the same physical computer:

- Team A has Python 3.12
- Team B has Node.js
- both are separate
- one does not replace or uninstall the other

---

## 11. Stronger proof using interactive containers

To inspect the Python container interactively, run:

```bash
docker run -it --name teama-shell teama-python:1.0 sh
```

Inside the container, run:

```sh
python --version
node --version
```

### Expected understanding
- `python --version` should work
- `node --version` may fail because Node.js is not installed in the Python container

Exit using:

```sh
exit
```

Now inspect the Node.js container:

```bash
docker run -it --name teamb-shell teamb-node:1.0 sh
```

Inside the container, run:

```sh
node --version
python --version
```

### Expected understanding
- `node --version` should work
- `python --version` may fail or may not show Python 3.12 application environment the same way

This experiment helps beginners see that each container carries its own toolset.

---

## 12. Optional demonstration with dependency isolation

To make isolation even clearer, Team A can install a Python package and Team B can install a Node package.

### Team A improved Dockerfile

```dockerfile
FROM python:3.12-slim

WORKDIR /app

RUN pip install requests

COPY app.py .

CMD ["python", "app.py"]
```

### Team B improved Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

RUN npm install -g cowsay

COPY app.js .

CMD ["node", "app.js"]
```

### Reasoning
This shows that:

- Python-specific packages stay in Team A environment
- Node-specific packages stay in Team B environment
- packages do not mix into the host machine or into each other

---

## 13. Why the host is protected

If software is installed directly on the host:

- PATH variables may change
- package versions may clash
- system cleanup becomes difficult

With containers:

- the host only needs Docker
- team-specific software stays inside containers
- deleting a container removes only that isolated environment

This is a major operational advantage in labs, training centers, and shared servers.

---

## 14. Relation to syllabus concepts

### 14.1 Origin of containers
Containers emerged to solve the problem of packaging software with everything it needs so it runs consistently on different systems.

### 14.2 Modern containerization
Modern container platforms like Docker made containers easy to build, distribute, and run.

### 14.3 Process isolation
Each container runs processes in isolation from other containers and from much of the host environment.

### 14.4 Namespaces
Linux namespaces help isolate:

- process IDs
- network view
- filesystem mounts
- hostname
- users in some setups

### 14.5 Container runtime
The container runtime is responsible for actually starting and managing the container processes.

For beginners, the simple idea is:
Docker prepares and runs isolated application environments on top of the same host.

---

## 15. Full command sequence in one place

### Team A
```bash
mkdir -p lab-isolation-demo/team-python
cd lab-isolation-demo/team-python
```

Create `app.py`:

```python
import sys

print("Hello from Team A")
print("Runtime:", sys.version)
```

Create `Dockerfile`:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

Build and run:

```bash
docker build -t teama-python:1.0 .
docker run --name teama-container teama-python:1.0
```

---

### Team B
```bash
cd ..
mkdir -p team-node
cd team-node
```

Create `app.js`:

```javascript
console.log("Hello from Team B");
console.log("Node version:", process.version);
```

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY app.js .
CMD ["node", "app.js"]
```

Build and run:

```bash
docker build -t teamb-node:1.0 .
docker run --name teamb-container teamb-node:1.0
```

---

### Verification
```bash
docker images
docker ps -a
```

Interactive verification:
```bash
docker run -it --name teama-shell teama-python:1.0 sh
docker run -it --name teamb-shell teamb-node:1.0 sh
```

---

## 16. Expected output summary

### Team A
```text
Hello from Team A
Runtime: 3.12.x
```

### Team B
```text
Hello from Team B
Node version: v20.x.x
```

### What this proves
It proves that two student teams can use different runtimes on the same host without disturbing each other.

---

## 17. Common mistakes and why they happen

### Mistake 1: Both teams use the same folder
This causes confusion and file mixing.

### Mistake 2: Forgetting `COPY`
Then the source file is not available inside the container.

### Mistake 3: Wrong `CMD`
If the runtime command is wrong, the container will start and fail immediately.

### Mistake 4: Expecting host-installed software inside every container
Containers only contain what is included in their image.

### Mistake 5: Using host setup instead of container setup
The purpose of this experiment is to avoid host-level dependency conflicts.

---

## 18. Why this is a strong lab answer

This solution is strong because it demonstrates:

- runtime isolation
- dependency separation
- repeatable builds
- clean host management
- practical application of container concepts from the syllabus

It is not only theoretical.  
It gives a working implementation that students can run and verify.

---

## 19. Viva-style questions with answers

### Q1. Why should Team A and Team B use containers?
Because containers give each team its own isolated environment with separate runtimes and dependencies.

### Q2. Why not install Python and Node.js directly on the host?
Direct installation may create version conflicts, clutter the host, and make maintenance difficult.

### Q3. What is the purpose of `FROM` in Dockerfile?
It selects the base image from which the new image is built.

### Q4. What is the purpose of `WORKDIR`?
It sets the working directory inside the container.

### Q5. What is the purpose of `COPY`?
It copies files from the local machine into the image.

### Q6. What is the purpose of `CMD`?
It defines the default command that runs when the container starts.

### Q7. How does this relate to process isolation?
Each container runs its own processes independently from others.

---

## 20. Final conclusion

The best solution for two student teams needing isolated environments on the same host is to run separate containers for each team. Team A can use a Python 3.12 image, while Team B can use a Node.js image. This keeps runtimes, dependencies, and execution environments separate. Containers are better than direct host installation because they prevent conflicts, improve reproducibility, simplify cleanup, and support modern containerization principles such as isolation and controlled runtime environments.

## 21. One-line takeaway

**Containers let multiple teams safely use different software environments on the same host without breaking each other's setup.**
