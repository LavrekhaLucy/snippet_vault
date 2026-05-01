# Snippet Vault

Simple fullstack app for storing and managing code snippets.

---

##  What you can do

* Create, edit, and delete snippets
* Search snippets by title or tags
* Browse with pagination
* Use on desktop and mobile

---

##  Tech Stack

**Frontend:**

* Next.js
* TypeScript
* Tailwind CSS

**Backend:**

* NestJS
* Node.js

**Database:**

* MongoDB (local or Atlas)

---

##  Setup

### 1. Clone project

```bash
git clone <your-repository-url>
cd snippet_vault
```

---

### Installation & Setup (Docker)
The easiest way to run the application is using Docker Compose. This will orchestrate the frontend, backend, and MongoDB containers automatically.

**Create .env files:**

Create /backend/.env (based on .env.example).

Create /frontend/.env (based on .env.example).

Note: For Docker, your MONGODB_URI might use the service name, e.g., mongodb://mongodb:27017/snippet-manager.

**Launch the environment:**

```
Bash
docker-compose up --build
```
**Access the App:**

Frontend: http://localhost:3001 (or your configured port).

Backend: http://localhost:3000.

---

## API

* `GET /snippets` — get all snippets (search, filter, pagination)
* `GET /snippets/:id` — get one snippet
* `POST /snippets` — create snippet
* `PATCH /snippets/:id` — update snippet
* `DELETE /snippets/:id` — delete snippet

---


## About

This project was built as a test task.

## Author
Liudmyla Lavrekha — Junior Full-Stack Developer.