import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [img, setImg] = useState({});
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [taskInput, settaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const history = useHistory();
  const handleLogout = () => {
    history.push("/");
  };

  useEffect(() => {
    const storage = sessionStorage.getItem("loginSession");
    const dashboardData = {
      parsedData: JSON.parse(storage),
    };
    setImg(dashboardData.parsedData.image);
    setName(dashboardData.parsedData.name);
    setToken(dashboardData.parsedData.token);
  }, []);

  const addNewTask = () => {
    const url = "https://dev.teledirectasia.com:3092";
    axios
      .post(
        `${url}/tasks`,
        { name: taskInput },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const taskFromResponse = response.data.task;
        const newTask = [...tasks, taskFromResponse];
        setTasks(newTask);
      });
  };

  const completeTask = (index) => {
    const url = "https://dev.teledirectasia.com:3092";
    axios
      .put(
        `${url}/tasks/${tasks[index]._id}`,
        { name: tasks[index].name, completed: true },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const data = response.data;
        const newArray = tasks;
        setTasks([]);
        newArray[index] = data.task;
        setTasks(newArray);
      });
  };

  const deleteTask = (index) => {
    const url = "https://dev.teledirectasia.com:3092";
    axios
      .delete(`${url}/tasks/${tasks[index]._id}`, {
        data: {
          name: tasks[index].name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const newArray = tasks;
        setTasks([]);
        newArray[index] = data.task;
        newArray.splice(index, 1);
        setTasks(newArray);
      });
  };

  const Tasks = ({ task, index }) => {
    return (
      <div
        className={styles.todos}
        style={{ textDecoration: task.completed ? "line-through" : "" }}
      >
        {task.name}
        <button className={styles.complete} onClick={() => completeTask(index)}>
          Complete
        </button>
        <button className={styles.delete} onClick={() => deleteTask(index)}>
          Delete
        </button>
      </div>
    );
  };

  return (
    <div>
      <img
        className={styles.profilePic}
        src={`https://dev.teledirectasia.com:3092${img}`}
        alt="Profile Pic"
      />
      <button className={styles.logout} onClick={handleLogout}>
        Logout
      </button>
      <h4>Welcome "{name}"</h4>
      <h2>Dashboard</h2>
      <input
        type="text"
        placeholder="Task Name..."
        value={taskInput}
        onChange={(e) => {
          settaskInput(e.target.value);
        }}
      />
      <button onClick={addNewTask}>+ New Task</button>

      <div className={styles.todoList}>
        {tasks.map((element, index) => (
          <Tasks key={index} index={index} task={element} />
        ))}
      </div>
    </div>
  );
}
