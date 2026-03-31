
---

# `README.md` 

````md
# 🚀 Ebani Tech Backend API

A RESTful backend built using **Node.js, Express, MongoDB (Mongoose)** with **JWT Authentication** and **Role-Based Authorization**.

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt (password hashing)

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/amaanpathan2313/Ebani-Tech.git

cd Ebani-Tech/Backend

npm install

npm run dev
````

---

## 🌐 Base URL

```
http://localhost:<PORT>
```

---

## 🔐 Authentication APIs

### ➤ Sign Up

```
POST /auth/sign-up
```

**Body:**

```json
{
  "name": "Amaan",
  "phon": "1234567890",
  "email": "amaan@gmail.com",
  "password": "123456",
  "role": "user" 
}
```

**Validations:**

* All fields required
* Phone must be 10 digits
* Email must be unique

---

### ➤ Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "amaan@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "msg": "Login successful",
  "token": "JWT_TOKEN"
}
```

**JWT Payload:**

```json
{
  "role": "user | admin | s_admin",
  "id": "userId",
  "name": "username"
}
```

---

## 📋 Task APIs

> 🔒 All routes require `Authorization: Bearer <token>`

---

### ➤ Add Task

```
POST /task/add-task
```

**Access:** user, admin, s_admin

**Body:**

```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

---

### ➤ Update Task

```
PATCH /task/update-task/:id
```

**Access:**

* Owner of task
* Admin
* Super Admin

---

### ➤ Get Tasks

```
GET /task/my-task
```

**Behavior:**

* `user` → Gets only own tasks
* `admin / s_admin` → Gets all tasks

---

### ➤ Delete Task

```
DELETE /task/delete-task/:id
```

**Access:**

* User → Only own task
* Admin / s_admin → Any task

---

## 👨‍💼 Admin APIs

> 🔒 Only `admin` and `s_admin`

---

### ➤ Update User Info

```
PATCH /admin/update-info/:id
```

**Rules:**

* Admin cannot update Super Admin
* Super Admin can update anyone

---

### ➤ Delete User

```
DELETE /admin/delete-user/:id
```

**Behavior:**

* Deletes user
* Deletes all tasks created by that user

**Restriction:**

* Admin cannot delete Super Admin

---

## 🛡️ Role-Based Access Control

Roles:

* `user`
* `admin`
* `s_admin`

Middleware Example:

```js
authMiddleware(["user", "admin", "s_admin"])
```

---

## 📁 Project Structure

```
Backend/
│
├── models/
│   ├── auth.model.js
│   └── task.model.js
│
├── routes/
│   ├── auth.route.js
│   ├── task.route.js
│   └── admin.route.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── config/
├── server.js
└── package.json
```

---

## ⚠️ Important Notes (Code Observations)

### ❗ 1. Role Middleware Bug

```js
["user" || "admin" || "s_admin"]
```

This always becomes:

```js
["user"]
```

✅ Fix:

```js
["user", "admin", "s_admin"]
```

---

### ❗ 2. Ownership Check Bug

```js
userId == targetTask.createdBy
```

✅ Fix:

```js
targetTask.createdBy.toString() === userId
```

---

### ❗ 3. Status Codes

Some responses use:

* `401` (Unauthorized)

Better practice:

* `403` → Forbidden (for permission issues)

---

### ❗ 4. Validation Improvements

* Use centralized validation (Joi / Zod)
* Avoid repeating checks in controllers

---

## 🧪 Testing Tools

* Postman
* Thunder Client

---

## 📌 Future Improvements

* Pagination (GET tasks)
* Search & filtering
* Centralized error handler
* Logging (Winston / Morgan)
* Input validation library
* Refresh tokens

---

## 👨‍💻 Author

**Amaan Pathan**

---

## 📄 License

MIT License

```

---
 