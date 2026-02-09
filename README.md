#  F1 Management System (Backend Final Project)

This is a professional RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing Formula 1 drivers and user profiles. The system implements secure authentication and **Role-Based Access Control (RBAC)**.

---

##  Features
* **User Authentication**: Secure Signup and Signin using **JWT** (JSON Web Tokens) and **Bcrypt** for password hashing.
* **Advanced RBAC**: Access levels for `User`, `Moderator`, and `Admin`.
* **Full Drivers CRUD**: Create, Read, Update, and Delete operations for the F1 database.
* **User Profile Management**: Private endpoints for users to view and update their own profiles.
* **Security**: Environment variables protection via `dotenv` and protected API routes.

---

##  Tech Stack
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Security**: JWT, BcryptJS
* **Tools**: Postman (API Testing), VS Code

---

##  Setup Instructions

### 1. Prerequisites
* Install [Node.js](https://nodejs.org/)
* Install [MongoDB](https://www.mongodb.com/try/download/community)

### 2. Installation
1.  Navigate to the project folder:
    ```bash
    cd F1_FINAL
    ```
2.  Install all required dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    * Create a `.env` file in the **root** directory.
    * Add the following configuration:
        ```env
        PORT=8080
        DB_URL=mongodb://localhost:27017/f1_final_db
        JWT_SECRET=f1-super-secret-key-2024
        ```

4.  Run the Server:
    ```bash
    node server.js
    ```
    The server will start at `http://localhost:8080`.

---

##  API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |

| `POST` | `/api/auth/signup` | Register a new user (with duplicate check) |
| `POST` | `/api/auth/signin` | Login and receive **x-access-token** |

### User Profile (Private - requires token)
| Method | Endpoint | Description |

| `GET` | `/api/users/profile` | View current user profile data |
| `PUT` | `/api/users/profile` | Update current user profile (email/username) |

### Driver Management (Private - requires token)
| Method | Endpoint | Allowed Roles | Description |

| `GET` | `/api/drivers` | All Roles | Fetch all F1 drivers |
| `GET` | `/api/drivers/:id` | All Roles | Fetch a single driver by ID |
| `POST` | `/api/drivers` | **Admin** | Create a new driver |
| `PUT` | `/api/drivers/:id` | **Admin** | Update driver details |
| `DELETE` | `/api/drivers/:id` | **Admin** | Remove a driver from DB |

---

##  Validation & Screenshots

### 1. Security & Validation
* **Duplicate Check**: The system prevents multiple registrations with the same username (returns `400 Bad Request`).
* **Protected Routes**: Private data is only accessible with a valid `x-access-token`.

### 2. System Interface
* **Admin Login**: A custom-designed frontend for administrative access.
* **Database**: Managed via MongoDB Compass / Mongoose.

---
## Project Structure
* **[span_2](start_span)models/**: MongoDB schemas (User, Driver, Role)[span_2](end_span)
* **[span_3](start_span)controllers/**: Business logic for handling requests[span_3](end_span)
* **[span_4](start_span)routes/**: API endpoint definitions[span_4](end_span)
* **[span_5](start_span)middleware/**: JWT verification, RBAC, and validation[span_5](end_span)
* **[span_6](start_span)config/**: Database and environment configurations[span_6](end_span)
---
##  Database Structure
1.  **Users**: Stores hashed passwords, emails, and role references.
2.  **Roles**: Managed roles (`user`, `moderator`, `admin`).
3.  **Drivers**: F1-specific data including Name, Team, and Country.