
---

# 🚀 Ebani Tech - Full Stack Task Management System

A full-stack application built using the **MERN stack (MongoDB, Express, React, Node.js)** with **JWT Authentication** and **Role-Based Access Control (RBAC)**.

---

## 📦 Tech Stack

### 🔹 Frontend

* React.js
* Redux Toolkit
* CSS (Responsive UI)

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt (Password Hashing)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/amaanpathan2313/Ebani-Tech.git
```

---

### 2️⃣ Backend Setup

```bash
cd Ebani-Tech/Backend

npm install
npm run dev
```

Create `.env` file:

```env
PORT=3000
MONGO_URL=your_mongodb_url
JWT_KEY=your_secret_key
```

---

### 3️⃣ Frontend Setup

```bash
cd ../Frontend

npm install
npm start
```

---

## 🌐 API Base URL

```
http://localhost:3000
```

---

# 🔐 Authentication APIs

## ➤ Sign Up

```
POST /auth/sign-up
```

### Body:

```json
{
  "name": "Amaan",
  "phon": "1234567890",
  "email": "amaan@gmail.com",
  "password": "123456",
  "role": "user"
}
```

### Validations:

* All fields required
* Phone must be 10 digits
* Email must be unique

---

## ➤ Login

```
POST /auth/login
```

### Body:

```json
{
  "email": "amaan@gmail.com",
  "password": "123456"
}
```

### Response:

```json
{
  "msg": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# 📋 Task APIs

> 🔒 All routes require `Authorization: Bearer <token>`

---

## ➤ Add Task

```
POST /task/add-task
```

### Access:

* user
* admin
* s_admin

### Body:

```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

---

## ➤ Update Task

```
PATCH /task/update-task/:id
```

### Access:

* Task owner
* admin
* s_admin

---

## ➤ Get Tasks

```
GET /task/my-task
```

### Behavior:

* `user` → Gets only own tasks
* `admin / s_admin` → Gets all tasks

---

## ➤ Delete Task

```
DELETE /task/delete-task/:id
```

### Access:

* user → own tasks only
* admin / s_admin → all tasks

---

# 👨‍💼 Admin APIs

> 🔒 Only `admin` and `s_admin`

---

## ➤ Update User Info

```
PATCH /admin/update-info/:id
```

### Rules:

* Admin ❌ cannot update Super Admin
* Super Admin ✅ can update anyone

---

## ➤ Delete User

```
DELETE /admin/delete-user/:id
```

### Behavior:

* Deletes user
* Deletes all tasks created by that user

### Restriction:

* Admin ❌ cannot delete Super Admin

---

# 🛡️ Role-Based Access

| Role    | Permissions                               |
| ------- | ----------------------------------------- |
| user    | Manage own tasks                          |
| admin   | Manage all tasks + users (except s_admin) |
| s_admin | Full system control                       |

---

# 📁 Project Structure

```
Ebani-Tech/
│
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── server.js
│
├── Frontend/
│   ├── components/
│   ├── redux/
│   ├── pages/
│   └── App.js
│
└── README.md
```



---

# 🧪 Testing Tools

* Postman

---

 

# 👨‍💻 Author

**Amaan Pathan**

---

# 📄 License

MIT License

---

 