# Job Tracker and Node.js Practice

Personal backend practice covering Node.js, Express, MongoDB, authentication, authorization, and CRUD APIs.

## Main Project: Job Tracker API

The API manages job applications with company, position, status, applied date, timestamps, and update versioning.

### Implemented

- REST CRUD operations for job applications.
- Filtering by application status.
- Sorting by applied date.
- Pagination with query parameters.
- Request validation and consistent JSON responses.
- MongoDB persistence with Mongoose schemas and models.
- Centralized 404 and error-handling middleware.
- Separate controllers, services, models, routes, and middleware.

## Authentication

- User registration and login.
- Password hashing with `bcrypt`.
- JWT generation and verification.
- One-hour token expiration.
- Bearer-token authentication middleware.
- Authenticated user attached to `req.user`.

## Authorization and RBAC

- `user` and `admin` roles.
- Reusable role-based authorization middleware.
- Protected application routes.
- Admin-only user listing endpoint.
- `401` responses for missing or invalid authentication.
- `403` responses for insufficient permissions.

## API Routes

Server: `http://localhost:5000`

### Users

| Method | Route | Access |
| --- | --- | --- |
| POST | `/user/register` | Public |
| POST | `/user/login` | Public |
| GET | `/user/listusers` | Admin only |

### Applications

All application routes require:

```text
Authorization: Bearer <jwt-token>
```

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/application` | List applications |
| GET | `/application/:id` | Get one application |
| POST | `/application` | Create an application |
| PATCH | `/application/:id` | Update an application |
| DELETE | `/application/:id` | Delete an application |

Supported query parameters for listing applications:

```text
/application?status=Applied&sort=date&page=1&limit=10
```

## Node.js and Express Practice

- Built HTTP servers with Node.js's `http` module.
- Practiced request methods, URL routing, status codes, and JSON responses.
- Used `fs` and `path` for synchronous and asynchronous file operations.
- Created Express middleware and route handlers.
- Practiced route parameters and query parameters.

## Mini Projects and Files

- `job-tracker.js`: main Express and MongoDB API.
- `express.js`: basic Express server and middleware practice.
- `web-server.js`: basic Node.js HTTP server.
- `fs_index.js`: JSON file writing with the `fs` module.
- `db.json`, `applicationData.json`: data files used during file-based persistence practice.

## Stack

Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, and Nodemon.

## Run Locally

Requirements: Node.js, npm, and MongoDB running at `mongodb://127.0.0.1:27017`.

```bash
npm install
node job-tracker.js
```

API: `http://localhost:5000`

For development with Nodemon:

```bash
npm run dev
```
