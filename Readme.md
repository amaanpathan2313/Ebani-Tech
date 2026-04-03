

```md
# 🚀 Ebani Tech – TaskFlow (MERN Stack)

A modern **Task Management Web Application** built using the **MERN Stack** with secure authentication and role-based access control.

🌐 **Live Demo**  
👉 Frontend: https://taskflow23.netlify.app/  
👉 Backend API: https://ebani-tech-1.onrender.com  

---
<!-- DB_LINK =  "mongodb+srv://pamaan44_db_user:v0DUryyjAbjnZKFv@masai-company-assignmen.gqacmbd.mongodb.net/?appName=Masai-Company-Assignment" -->

---

## ✨ Features

- 🔐 JWT Authentication (Login / Signup)
- 👨‍💼 Role-Based Access (User / Admin / Super Admin)
- 📋 Task CRUD Operations
- 🧠 Smart Access Control (users see only their tasks)
- ⚡ Fast & Responsive UI
- 🌍 Fully Deployed (Frontend + Backend)

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- CSS (Responsive Design)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- Bcrypt (Password Hashing)

---

## 🌐 Live Links

| Service   | Link |
|----------|------|
| 🎨 Frontend | https://taskflow23.netlify.app/ |
| ⚙️ Backend API | https://ebani-tech-1.onrender.com |

---

# 🔐 Authentication APIs

## ➤ Signup

```

POST /auth/sign-up

````

### Request Body:
```json
{
  "name": "Amaan",
  "phon": "1234567890",
  "email": "amaan@gmail.com",
  "password": "123456",
  "role": "user"
}
````

---

## ➤ Login

```
POST /auth/login
```

### Request Body:

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

> 🔒 Requires Authorization Token
> `Authorization: Bearer <token>`

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
  "title": "Learn Redux",
  "description": "Complete Redux Toolkit"
}
```

---

## ➤ Get Tasks

```
GET /task/my-task
```

### Behavior:

* `user` → Only own tasks
* `admin / s_admin` → All tasks

---

## ➤ Update Task

```
PATCH /task/update-task/:id
```

### Access:

* Task Owner
* Admin
* Super Admin

---

## ➤ Delete Task

```
DELETE /task/delete-task/:id
```

### Access:

* User → Own tasks only
* Admin / s_admin → Any task

---

# 👨‍💼 Admin APIs

> 🔒 Only Admin & Super Admin

---

## ➤ Update User Info

```
PATCH /admin/update-info/:id
```

### Rules:

* Admin ❌ cannot update Super Admin
* Super Admin ✅ full control

---

## ➤ Delete User

```
DELETE /admin/delete-user/:id
```

### Behavior:

* Deletes user
* Deletes all tasks created by that user

---

# 🛡️ Role-Based Access

| Role        | Permissions          |
| ----------- | -------------------- |
| 👤 user     | Manage own tasks     |
| 🧑‍💼 admin | Manage users + tasks |
| 👑 s_admin  | Full system control  |

---

# 📁 Project Structure

```
Ebani-Tech/
│
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
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

# 🧪 Testing

Use:

* Postman
---

# 🚀 Future Improvements

* Pagination & Filtering
* Search Tasks
* Toast Notifications (Frontend)
* Centralized Error Handling
* Refresh Token System
* Rate Limiting & Security Enhancements

---

# 👨‍💻 Author

**Amaan Pathan**

---

# ⭐ Show Your Support

If you like this project:

👉 Star the repo
👉 Share with others
👉 Fork & contribute

---

# 📄 License

MIT License

```
