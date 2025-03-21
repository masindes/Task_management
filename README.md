Got it! Here's the updated **README.md** for your Task Management Application using **Flask** as the backend:

---

# Task Management Application

## Project Overview

The **Task Management Application** is a web application designed to allow users to manage their tasks efficiently. Users can perform CRUD (Create, Read, Update, Delete) operations on tasks, which consist of a title, description, due date, and status (Pending, In Progress, Completed). The app provides a user-friendly interface to manage and track task progress.

🔗 **Deployment:**
- **Backend (Flask)** hosted on Render: [Backend Deployment Link](https://task-managent-backend.onrender.com)
- **Frontend (React)** hosted on Vercel: [Frontend Deployment Link](https://task-management-swart-ten.vercel.app/)

---

## 📌 Features

### 🎓 User Features
- **User Authentication**: Secure sign-up and login using JWT.
- **Task List**: View a list of tasks with title, description, due date, and status.
- **Task Creation**: Add new tasks with a title, description, due date, and status.
- **Task Editing**: Edit existing tasks and update their title, description, due date, and status.
- **Task Deletion**: Delete tasks from the list.
- **Mark as Completed**: Mark tasks as "Completed".
- **Task Filtering**: Filter tasks by status (e.g., Show all, Pending, In Progress, Completed).

---

### 🔧 Admin Features
- **Admin Dashboard**: Manage tasks, view and edit task details.
- **Task Management**: Create, update, or delete tasks.

---

## 🏗 Tech Stack

### 🔹 Backend (Flask)
- **Python** + **Flask** (RESTful API)
- **PostgreSQL** (Database Management)
- **SQLAlchemy** (ORM for database interaction)
- **Flask-JWT-Extended** (Authentication & Authorization)
- **Flask-CORS** (Cross-Origin Resource Sharing)

### 🔹 Frontend
- **React** (UI Development)
- **React Router** (Navigation)
- **Axios** (HTTP Requests)
- **Tailwind CSS** (Styling)

### 🔹 Authentication
- **JWT (JSON Web Token)** for secure user authentication

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repositories

- **Backend**:
    ```bash
    git clone https://github.com/masindes/Task_Managent_Backend
    cd task-manager-backend
    ```

- **Frontend**:
    ```bash
    git clone https://github.com/masindes/Task_management
    cd task-manager-frontend
    ```

### Backend Setup:

1. **Create and Activate Virtual Environment**:
    ```bash
    python -m venv venv
    source venv/bin/activate 
    ```

2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Run Database Migrations**:
    ```bash
    flask db upgrade
    ```

4. **Start the Flask Server**:
    ```bash
    flask run
    ```
   The server will run on `http://localhost:3000`.


---

### Frontend Setup:

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run the React App**:
    ```bash
    npm start
    ```
   The frontend will be available at `http://localhost:3000`.

### API URL Configuration:
In the frontend, make sure to configure the API base URL to the backend URL in `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔒 Authentication & Authorization (JWT)

### User Registration
- **Endpoint**: `POST /register`
```json
{
  "username": "admin",
  "password": "admin123",
  "role": "user"
}
```

### User Login
- **Endpoint**: `POST /login`
```json
{
  "username": "admin",
  "password": "admin123",
}
```

---

## 📌 Frontend Integration

The frontend communicates with the backend using the Axios library. The base API URL is stored in `.env` for easy configuration. Here's an example of an API request to log in a user:

```js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error', error);
  }
};
```

---

## 🤝 Contributing

Want to improve this project? Follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature-branch`
3. **Commit changes**: `git commit -m 'Add new feature'`
4. **Push to the branch**: `git push origin feature-branch`
5. **Open a Pull Request**.

---

## 📜 License

This project is licensed under the MIT License.

---

## 📞 Contact

For any inquiries, reach out via email: [masinde.sylvester@yahoo.com ]


---

This should be a comprehensive and user-friendly **README.md** for your **Flask-based** Task Management Application.