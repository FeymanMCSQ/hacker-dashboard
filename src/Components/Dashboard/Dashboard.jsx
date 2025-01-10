import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Dashboard.module.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../Sidebar/Sidebar";
import Repotracker from "../Repotracker/Repotracker";

const Dashboard = ({ currentWorkSpace }) => {
  const [tasks, SetTasks] = useState([]);
  const [task, SetTask] = useState({
    Task: "",
    type: "",
    status: "",
    id: "",
    time: "",
    workSpaceId: "",
  });
  const [takingInput, setTakingInput] = useState(false);
  const [taskAdded, setIsTaskAdded] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const changeTaskInfo = (e) => {
    const { name, value } = e.target;
    SetTask({
      ...task,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Muahahahahahahahah!!!");
    getTasks();
  }, []);

  const getTasks = async () => {
    console.log("You egg my house, I kill what you love!", currentWorkSpace);
    try {
      const response = await fetch(
        `http://localhost:3001/api/taskFetch?workSpace=${encodeURIComponent(
          currentWorkSpace
        )}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        SetTasks(data);
        alert("Task fetch worked");
        console.log("Hakunan Matata! ", data);
      }
    } catch (error) {
      const errorData = response.json();
      alert(`Couldn't fetch workspaces ${errorData.message}`);
    }
  };
  const createTaskBackend = async () => {
    const response = await fetch("http://localhost:3001/api/taskCreate", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      console.log("Ohhhh behave!!!!");
    } else {
      const errorData = await response.json();
      alert(`Couldn't save task ${errorData.message}`);
    }
  };

  useEffect(() => {
    if (task.id !== "") {
      setIsTaskAdded(true);
    }
  }, [task]);

  useEffect(() => {
    if (taskAdded) {
      console.log(task);
      SetTasks((prevItems) => [...prevItems, task]);
      //bitch, this chicken is cold
      createTaskBackend();
      setIsTaskAdded(false);
      SetTask({
        ...task,
        Task: "",
        type: "",
        status: "",
        id: "",
        time: "",
      });
      setTakingInput(false);
    }
  }, [taskAdded, task]);

  const createCard = (e) => {
    e.preventDefault();

    SetTask((prevTask) => ({
      ...prevTask,
      status: "Just Opened",
      id: uuidv4(),
      time: Date.now(),
      workSpaceId: currentWorkSpace,
    }));
  };

  const openSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const createWorkspace = () => {
    setTakingInput(true);
  };

  const removeTaskBackend = async (taskId) => {
    console.log("Babe, check out the taskID: ", taskId);
    const response = await fetch(`http://localhost:3001/api/taskDelete`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ taskId }),
    });

    if (response.ok) {
      console.log("Babe the task is dead");
    } else {
      const errorData = await response.json();
      alert(`Couldn't delete the task ${errorData.message}`);
    }
  };
  const removeTask = (taskId) => {
    SetTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    removeTaskBackend(taskId);
  };

  return (
    <div className={styles.bigbox}>
      {isSidebarOpen && (
        <Sidebar sideBarOpen={isSidebarOpen} openSidebarfunc={openSidebar} />
      )}

      <div>
        <Navbar onCreateWorkspace={createWorkspace} SidebarOpen={openSidebar} />
        <div className={styles.bigContainer}>
          <div className={styles.cardContainer}>
            <div className={styles.cardHeader}>
              <div className={styles.Name}>Task: </div>
              <div className={styles.cardInfo}>
                <div>Type: </div>
                <div>Status: </div>
                <div>Edit:</div>
              </div>
              {/* This is the line */}
            </div>
            {takingInput && (
              <form className={styles.taskForm} onSubmit={createCard}>
                <label htmlFor="Task">Task: </label>
                <input
                  name="Task"
                  id="Task"
                  type="Task"
                  className={styles.taskInput}
                  onChange={changeTaskInfo}
                  required
                ></input>
                <label htmlFor="Type">Type: </label>
                <input
                  name="type"
                  id="type"
                  type="type"
                  className={styles.taskInput}
                  onChange={changeTaskInfo}
                  required
                ></input>
                <button className={styles.formButton} type="submit">
                  Save
                </button>
              </form>
            )}
            <div className={styles.listDiv}>
              {tasks.map((task) => (
                <div key={task.id} className={styles.listitem}>
                  <div className={styles.cardText}>{task.Task}</div>
                  <div className={styles.cardThing}>
                    <div className={styles.cardText}>{task.type}</div>
                    <div className={styles.cardText}>{task.status}</div>
                    <div>
                      <button
                        className={styles.cardButton}
                        onClick={() => removeTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Repotracker />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
