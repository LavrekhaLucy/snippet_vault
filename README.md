# Snippet Vault

Simple fullstack app for storing and managing code snippets.

---

##  What you can do

* Create, edit, and delete snippets
* Search snippets by title or tags
* Browse with pagination

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

###  Clone project

bash
```
git clone https://github.com/LavrekhaLucy/snippet_vault
cd snippet_vault
```
---

### Installation & Setup (Docker)
The easiest way to run the application is using Docker Compose. This will orchestrate the frontend, backend, and MongoDB containers automatically.

**Create .env files:**

Create /backend/.env (based on .env.example).

Create /frontend/.env (based on .env.example).

* **Choose your MongoDB source:**
    * **For local Docker setup:** `MONGODB_URI=mongodb://mongodb:27017/Snippet_Vault`
    * **For cloud database (MongoDB Atlas):** `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0...`

**Launch the environment:**

bash
```
docker-compose up --build
```
**Access the App:**

Frontend: http://localhost:3001 (or your configured port).

Backend: http://localhost:3000.

---
### Run Locally (Development Mode)
If you want to modify the code and need features like Hot Reload, you should run the services manually:

**Backend (NestJS)**

Navigate to the backend directory:

bash
```
cd backend
```
Install dependencies:

bash
```
npm install
```
Start the server in watch mode:

bash
```
npm run start:dev
```
The API will be available at http://localhost:3000

**Frontend (Next.js)**

Navigate to the frontend directory:

bash
```
cd frontend
```

Install dependencies:

bash
```
npm install
```
Start the development server:

bash
```
npm run dev
```
The interface will be available at http://localhost:3001

## API

* `GET /snippets` — get all snippets (search, filter, pagination)
* `GET /snippets/:id` — get one snippet
* `POST /snippets` — create snippet
* `PATCH /snippets/:id` — update snippet
* `DELETE /snippets/:id` — delete snippet

---
##  Live Demo

You can check out the live version of the project here:
**[Snippet Vault on Vercel](https://snippet-vault-brown.vercel.app/)**



## Future Improvements & Technical Debt
**Swagger API Documentation:** I didn't have enough time to integrate @nestjs/swagger for automatic documentation. In the future, I would add decorators to controllers 
and DTOs to create an interactive sandbox for testing endpoints directly in the browser.

**Postman Collection:** To improve team collaboration, it would be beneficial to create and export a Postman collection with pre-configured environments 
(Production/Local). This would automate API testing and eliminate the need for manual cURL commands.

**Advanced Validation & Typing:** While basic format checks are implemented, I planned to deepen input validation at the DTO level using class-validator. This would 
catch type-mismatch errors (e.g., for SnippetTypeEnum) at the request initialization stage, before they reach the service logic.

## About

This project was built as a test task.

## Author
Liudmyla Lavrekha — Junior Full-Stack Developer.

GitHub: https://github.com/LavrekhaLucy 

LinkedIn: https://www.linkedin.com/in/liudmyla-lavrekha 