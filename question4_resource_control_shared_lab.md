
# Question 4: A Container Consumes Too Much RAM on a Shared Lab Machine

## 1. Scenario Overview

### Real-life situation
One student's analytics container on a shared lab computer starts consuming too much RAM and CPU. As a result, the machine becomes slow for everyone else.

### Student task
Implement resource control so the container cannot exceed a fixed memory and CPU limit.

### Expected implementation
- Run a container with memory and CPU limits
- Monitor it using `docker stats`
- Explain the role of cgroups in Docker resource control

### Syllabus mapping
- Control groups (cgroups)
- Docker CLI
- Container runtime
- Resource limits

---

## 2. Learning Goal in Very Simple Language

This activity teaches one important idea:

A container should **not be allowed to use unlimited system resources** on a shared machine.

If one container is not controlled, it may:
- use too much RAM
- use too much CPU
- make the host system slow
- affect other students and other containers

So we will put **resource limits** on the container.

---

## 3. Core Concept Before Starting

Docker containers are isolated, but by default a container can still try to use a lot of CPU and memory.

Docker solves this problem using **cgroups**.

### What are cgroups?
`cgroups` means **control groups**.

A control group is a Linux kernel feature that allows the operating system to:
- measure resource usage
- restrict resource usage
- monitor resource usage

Docker uses cgroups to control:
- memory
- CPU
- I/O (in some cases)
- process limits

So when we write a Docker command like this:

```bash
docker run --memory=256m --cpus=1 myapp:v1
```

Docker tells Linux:

- this container must not use more than **256 MB RAM**
- this container must not use more than **1 CPU core worth of CPU time**

This is how Docker protects a shared machine.

---

## 4. Why This Problem Matters in a Lab

In a shared lab machine:

- many students may run containers at the same time
- some students may accidentally run heavy analytics jobs
- one container may consume most of the RAM
- the system may start swapping or freezing
- other students may not be able to work properly

This is why resource limits are important in:
- classrooms
- labs
- shared servers
- CI/CD runners
- multi-user development systems

---

## 5. Experiment Design

We will design a simple experiment that a beginner can understand.

We will:
1. create a small Python application that continuously uses memory and CPU
2. build a Docker image
3. run it once without limits
4. run it again with memory and CPU limits
5. monitor both using `docker stats`
6. explain what happened

This makes the learning practical.

---

## 6. Project Folder Structure

Create the following folder structure:

```text
resource-control-demo/
│
├── app.py
├── Dockerfile
└── requirements.txt
```

### Why this structure?
This is a clean and simple project layout.

- `app.py` contains the Python program
- `Dockerfile` contains image instructions
- `requirements.txt` lists Python dependencies, even if small

This separation keeps things understandable.

---

## 7. Step 1: Create the Project Folder

Open terminal or command prompt and run:

```bash
mkdir resource-control-demo
cd resource-control-demo
```

### Why are we doing this?
We need one dedicated folder for this experiment.

This helps because:
- all files stay in one place
- Docker build context becomes easy to manage
- beginners do not get confused by mixed files from other projects

---

## 8. Step 2: Create the Python Program

Create a file named `app.py` and put the following code inside it:

```python
import time

memory_hog = []

print("Container started. Simulating CPU and memory usage...")

while True:
    # Increase memory usage gradually
    memory_hog.append("X" * 1024 * 1024)  # roughly 1 MB
    # Create CPU activity
    total = 0
    for i in range(500000):
        total += i * i
    print(f"Allocated about {len(memory_hog)} MB so far")
    time.sleep(1)
```

---

## 9. Detailed Explanation of the Code

Let us understand every tiny part.

### `import time`
This imports the Python time module.

Why needed?
Because we want the program to wait one second between loops using `sleep(1)`.

### `memory_hog = []`
This creates an empty list.

Why needed?
We will keep adding 1 MB strings to this list.
As the list grows, memory usage grows.

### `print("Container started...")`
This prints a startup message.

Why needed?
It confirms the container started successfully.

### `while True:`
This creates an infinite loop.

Why needed?
We want the container to keep running so we can observe resource usage.

### `memory_hog.append("X" * 1024 * 1024)`
This adds a string of about 1 MB.

Why needed?
It slowly increases memory use over time.

### CPU loop
```python
total = 0
for i in range(500000):
    total += i * i
```

Why needed?
This creates CPU work.
If we only increased memory, we would not demonstrate CPU load well.

### `print(f"Allocated about {len(memory_hog)} MB so far")`
This displays approximate memory allocation.

Why needed?
It helps us visually observe growth.

### `time.sleep(1)`
This pauses for one second.

Why needed?
Without it, the program may grow too aggressively and crash too quickly.
This makes the demo easier to observe.

---

## 10. Step 3: Create `requirements.txt`

Create a file named `requirements.txt`.

It can be empty, or you can place a comment:

```text
# No external packages required
```

### Why keep this file?
Even if no extra packages are needed, it is good classroom practice because:
- many real projects use it
- students learn standard structure
- it makes the project look realistic

---

## 11. Step 4: Create the Dockerfile

Create a file named `Dockerfile` with the following content:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app.py .
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
```

---

## 12. Detailed Reasoning for Each Dockerfile Line

### `FROM python:3.12-slim`
This tells Docker to use a Python 3.12 slim base image.

Why this line is needed:
- it provides Python runtime
- slim image is smaller than full image
- smaller image means faster pull and lower storage use

### `WORKDIR /app`
This sets `/app` as the working directory inside the container.

Why needed:
- keeps files organized
- later commands run inside `/app`
- easier for beginners to understand than using root directory

### `COPY app.py .`
This copies the local `app.py` file into the container.

Why needed:
- the container needs the Python script to run the workload

### `COPY requirements.txt .`
This copies the dependency file.

Why needed:
- supports standard installation pattern
- useful for future dependency expansion

### `RUN pip install --no-cache-dir -r requirements.txt`
This installs Python dependencies.

Why needed:
- in this example there are no external packages, but this demonstrates standard Docker build workflow
- `--no-cache-dir` avoids unnecessary pip cache and keeps image smaller

### `CMD ["python", "app.py"]`
This defines the default startup command.

Why needed:
- when container starts, this program should start automatically
- makes the demo easy because the student only runs the container

---

## 13. Step 5: Build the Docker Image

Run:

```bash
docker build -t analytics-limit-demo:v1 .
```

### Explanation
- `docker build` builds an image
- `-t analytics-limit-demo:v1` gives the image a name and version tag
- `.` means use the current folder as build context

### Why this step matters
Before we can run a container, we need an image.
The image is the packaged application.

---

## 14. Step 6: Run the Container Without Limits First

Run this container without any memory or CPU limit:

```bash
docker run --name analytics-unlimited analytics-limit-demo:v1
```

### Why do this first?
We first need a baseline case.

This helps students understand:
- what happens when no limits are applied
- why uncontrolled containers are risky on shared machines

### Expected behavior
The container starts and gradually:
- consumes more and more memory
- keeps using CPU
- continues until manually stopped or killed by the system

Stop it with:

```bash
docker stop analytics-unlimited
```

---

## 15. Step 7: Run the Container With Memory and CPU Limits

Now run the same image with resource control:

```bash
docker run --name analytics-limited --memory=256m --cpus=1 analytics-limit-demo:v1
```

### Meaning of each option

#### `--name analytics-limited`
Gives a readable name to the container.

Why useful?
Because it makes monitoring easier.

#### `--memory=256m`
Limits memory usage to 256 MB.

Why useful?
Prevents the container from consuming too much RAM.

#### `--cpus=1`
Limits CPU usage to one CPU.

Why useful?
Prevents a single container from dominating all CPU resources.

#### `analytics-limit-demo:v1`
This is the image to run.

---

## 16. Important Notes About the Memory Limit

When the program keeps allocating memory, one of these may happen:
- the container slows down within its limit
- the application may be terminated by the kernel or container runtime
- Docker may show exit because memory limit was reached

This is not a failure of the experiment.
This is actually proof that the limit is working.

---

## 17. Step 8: Monitor the Container Using `docker stats`

Open another terminal and run:

```bash
docker stats
```

Or monitor only the limited container:

```bash
docker stats analytics-limited
```

### What does `docker stats` show?
It shows live container usage such as:
- CPU %
- memory usage
- memory limit
- network I/O
- block I/O
- PIDs

### Why this step matters
This is the evidence step.
Students must not only apply limits; they must also observe them.

---

## 18. What Students Should Observe in `docker stats`

For the unlimited container:
- memory may continue increasing
- CPU usage may remain high
- no strict upper limit appears except host capacity

For the limited container:
- memory should stay around the set limit
- CPU should remain constrained near the allowed share
- if limit is crossed, the container may stop

This comparison is the core learning outcome.

---

## 19. Step 9: Inspect the Container Configuration

Run:

```bash
docker inspect analytics-limited
```

To narrow the output:

```bash
docker inspect analytics-limited --format='Memory limit: {{.HostConfig.Memory}} bytes, CPU quota: {{.HostConfig.CpuQuota}}, CPU period: {{.HostConfig.CpuPeriod}}'
```

### Why inspect?
Because monitoring shows live behavior, but inspect shows configured policy.

This is useful to verify:
- Docker really stored the memory limit
- Docker really stored CPU control settings

---

## 20. Understanding CPU Limits More Deeply

When we use:

```bash
--cpus=1
```

Docker translates this into lower-level cgroup settings such as:
- CPU period
- CPU quota

In simple language:
the container is allowed only a fixed share of CPU time.

For beginners:
You can think of it as:
> The container is not allowed to behave like it owns the whole machine.

---

## 21. Role of cgroups in This Experiment

This is one of the most important theory questions.

### Docker itself does not directly control hardware.
Instead, Docker asks the Linux kernel to enforce rules.

That enforcement is done through **cgroups**.

cgroups are responsible for:
- tracking container memory use
- limiting maximum memory
- controlling CPU scheduling quota
- preventing one process group from taking all resources

So if examiner asks:
**How are Docker resource limits actually enforced?**
Answer:
> Docker uses Linux control groups (cgroups) to enforce CPU and memory limits on containers.

---

## 22. Additional Verification Commands

### Show running containers
```bash
docker ps
```

### Show all containers including stopped
```bash
docker ps -a
```

### Show container logs
```bash
docker logs analytics-limited
```

### Stop the limited container
```bash
docker stop analytics-limited
```

### Remove containers
```bash
docker rm analytics-unlimited analytics-limited
```

### Remove image if needed
```bash
docker rmi analytics-limit-demo:v1
```

---

## 23. Optional Stronger Demonstration With Harsher Limit

If you want a more visible demonstration, run:

```bash
docker run --name analytics-tight --memory=64m --cpus=0.5 analytics-limit-demo:v1
```

### Why use this?
This makes the impact of limits easier to observe.
The container may hit memory issues quickly.

This is good for classroom demonstration, but explain to students that:
- smaller limits are for demonstration
- real production limits should be chosen based on application need

---

## 24. Sample Observation Table

Students can record findings in a table like this:

| Test Case | Command | Expected Observation | Reason |
|---|---|---|---|
| No limits | `docker run --name analytics-unlimited analytics-limit-demo:v1` | Memory keeps growing | No cgroup restriction applied |
| Memory + CPU limit | `docker run --name analytics-limited --memory=256m --cpus=1 analytics-limit-demo:v1` | Memory capped, CPU constrained | Docker enforces limits via cgroups |
| Tight limit | `docker run --name analytics-tight --memory=64m --cpus=0.5 analytics-limit-demo:v1` | Container may terminate or struggle | Limit is smaller than application demand |

---

## 25. Why Containers Are Better Than Letting Everything Run Freely

Without resource limits on a shared machine:
- one student's process may degrade the whole system
- other users may face lag
- lab stability becomes poor
- system admin loses control

With Docker resource limits:
- each workload gets controlled boundaries
- fairness improves
- one bad workload does not easily destroy the experience for others
- lab systems become more manageable

---

## 26. Common Mistakes Beginners Make

### Mistake 1: Forgetting units in memory option
Wrong:
```bash
docker run --memory=256 analytics-limit-demo:v1
```

Better:
```bash
docker run --memory=256m analytics-limit-demo:v1
```

### Mistake 2: Assuming `docker stats` changes configuration
`docker stats` only monitors.
It does not apply limits.

### Mistake 3: Forgetting container name
Without a name, monitoring a specific container becomes harder.

### Mistake 4: Thinking Docker alone enforces limits
Actually Linux kernel cgroups enforce the limits.

### Mistake 5: Using unrealistic limits without explanation
Students should explain why a particular limit was chosen.

---

## 27. Full Command Sequence in One Place

```bash
mkdir resource-control-demo
cd resource-control-demo

docker build -t analytics-limit-demo:v1 .

docker run --name analytics-unlimited analytics-limit-demo:v1
docker stop analytics-unlimited

docker run --name analytics-limited --memory=256m --cpus=1 analytics-limit-demo:v1

docker stats analytics-limited

docker inspect analytics-limited
docker inspect analytics-limited --format='Memory limit: {{.HostConfig.Memory}} bytes, CPU quota: {{.HostConfig.CpuQuota}}, CPU period: {{.HostConfig.CpuPeriod}}'

docker logs analytics-limited
docker stop analytics-limited

docker run --name analytics-tight --memory=64m --cpus=0.5 analytics-limit-demo:v1
docker stats analytics-tight
docker stop analytics-tight
```

---

## 28. Viva-Style Questions and Answers

### Q1. Why do we need resource limits in containers?
Because one container may otherwise consume excessive CPU or RAM and affect the whole shared machine.

### Q2. Which Docker options were used here?
`--memory` and `--cpus`.

### Q3. What command monitors live container resource usage?
`docker stats`

### Q4. What Linux feature enforces Docker resource limits?
`cgroups`

### Q5. What happens if a container tries to exceed memory limit?
It may be throttled, slowed, or terminated depending on the situation and kernel behavior.

### Q6. Why is this important in a lab machine?
Because many users share the same hardware and fairness is necessary.

---

## 29. Final Explanation in Simple Words

This experiment shows that a container should not be allowed to use unlimited resources on a shared lab machine. We created a Docker image that intentionally consumes RAM and CPU. Then we ran it with and without limits. By using `--memory` and `--cpus`, Docker applied resource control. Using `docker stats`, we observed that the limited container stayed within allowed boundaries. This works because Docker relies on Linux cgroups to enforce resource restrictions.

---

## 30. Final Conclusion

A container that consumes too much RAM or CPU can slow down every other user on a shared machine. The correct solution is to run the container with explicit memory and CPU limits using Docker CLI options such as `--memory` and `--cpus`, then verify the behavior using `docker stats`. The underlying enforcement is performed by Linux cgroups, which make resource isolation practical and reliable.

---

## 31. Submission-Ready Code and Commands

### `app.py`
```python
import time

memory_hog = []

print("Container started. Simulating CPU and memory usage...")

while True:
    memory_hog.append("X" * 1024 * 1024)  # roughly 1 MB
    total = 0
    for i in range(500000):
        total += i * i
    print(f"Allocated about {len(memory_hog)} MB so far")
    time.sleep(1)
```

### `Dockerfile`
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY app.py .
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
```

### Build and Run
```bash
docker build -t analytics-limit-demo:v1 .

docker run --name analytics-limited --memory=256m --cpus=1 analytics-limit-demo:v1

docker stats analytics-limited
```
