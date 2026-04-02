import { createContext, useState } from "react";
import { backend_API } from "../../utils";

export const TaskContext = createContext();

const Task = ({ children }) => {
  const [taskObj, setTaskObj] = useState({
    taskLoading: false,
    taskError: false,
    taskArray: null,
  });

  const [deleteTaskMsg, setDeleteTaskMsg] = useState("");
  const [addTaskMsg, setAddTaskMsg] = useState("");

  const token = localStorage.getItem("token");
  //  -----------------------   Get Task   --------------------------

  async function getTasks() {
    setTaskObj((previous) => ({
      ...previous,
      taskLoading: true,
      taskError: false,
      taskArray: [],
    }));

    try {
      let response = await fetch(`${backend_API}/task/my-task`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      let data = await response.json();
      // console.log(data.all_tasks)
      setTaskObj((previous) => ({
        ...previous,
        taskLoading: false,
        taskError: false,
        taskArray: data.all_tasks,
      }));
    } catch (err) {
      console.log("I am from Task Context", err.message);
      setTaskObj((previous) => ({
        ...previous,
        taskLoading: false,
        taskError: true,
        taskArray: null,
      }));
    }
  }

  //  -----------------------   Delete Task   --------------------------

  async function deleteTask(id) {
    let response = await fetch(`${backend_API}/task/delete-task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    let data = await response.json();
    console.log(data);
    setDeleteTaskMsg(data);
  }

  //  -----------------------   Update Task   --------------------------

     async function  changeStatus(id) {
        let response = await fetch(`${backend_API}/task/update-task/${id}`, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `bearer ${token}`
            }
        })
     }

  //  -----------------------   Create Task   --------------------------

  async function addNewTask(newTask) {
    let response = await fetch(`${backend_API}/task/add-task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(newTask),
    });

    let data = await response.json();
    console.log(data);

    setAddTaskMsg(data);
  } //  function

  return (
    <TaskContext.Provider
      value={{
        getTasks,
        taskObj,
        deleteTask,
        deleteTaskMsg,
        addNewTask,
        addTaskMsg,
        changeStatus
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default Task;
