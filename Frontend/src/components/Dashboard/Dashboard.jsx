 import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../context/Task";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const {
    getTasks,
    taskObj,
    deleteTask,
    deleteTaskMsg,
    addNewTask,
    addTaskMsg,
    changeStatus,
  } = useContext(TaskContext);

  /* 🔐 Auth Guard */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      getTasks();
    }
  }, [navigate]);

  /* 🗑 Delete Task Effect */
  useEffect(() => {
    if (deleteTaskMsg?.msg) {
      alert(deleteTaskMsg.msg);
      getTasks();
    }
  }, [deleteTaskMsg]);

  /* ➕ Add Task Effect */
  useEffect(() => {
    if (addTaskMsg?.msg) {
      alert(addTaskMsg.msg);
      getTasks();

      // reset form after success
      setNewTask({
        title: "",
        description: "",
      });
    }
  }, [addTaskMsg]);

  function handelChange(e) {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* 🔵 Submit Handler */
  async function handelSubmit(e) {
    e.preventDefault();

    if (!newTask.title || !newTask.description) {
      alert("All fields are required!");
      return;
    }

    await addNewTask(newTask);
  }

  async function handleStatus(id) {
    await changeStatus(id);
    getTasks();
  }

  function handelLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard">
      <button onClick={handelLogout}>Logout</button>

      <h1 className="title">Task Dashboard</h1>

      {/* FORM */}
      <form className="task-form" onSubmit={handelSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          placeholder="Enter Title"
          onChange={handelChange}
        />

        <input
          type="text"
          name="description"
          value={newTask.description}
          placeholder="Enter Description"
          onChange={handelChange}
        />

        <button type="submit">Add Task</button>
      </form>

      {/* STATUS */}
      {taskObj.taskLoading && <p className="status">Loading...</p>}
      {taskObj.taskError && (
        <p className="error">Error fetching tasks</p>
      )}

      {/* TASK LIST */}
      <div className="task-container">
        {taskObj.taskArray?.map((task) => (
          <div
            key={task._id}
            className={`task-card ${
              task.status ? "completed" : ""
            }`}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <div className="btn-group">
              <button onClick={() => handleStatus(task._id)}>
                {task.status ? "Undo" : "Complete"}
              </button>

              <button
                className="delete"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
