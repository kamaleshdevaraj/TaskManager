import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/taskmanagerstore";
import {
  FetchTasks,
  AddTask,
  DeleteTask,
  CompleteTask,
} from "../../store/slice/taskmanager";
import { useEffect, useState } from "react";

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.Task
  );

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(FetchTasks());
  }, [dispatch]);

  const Add = () => {
    const title = prompt("Add a task");
    if (title) dispatch(AddTask(title));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "uncompleted") return !task.completed;
    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "bisque",
        height: "95vh",
      }}
    >
      <h1>Task Manager</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <button style={{ marginBottom: "10px" }} onClick={Add}>
        Add Task
      </button>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ display: "flex", gap: 10 }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => dispatch(CompleteTask(task.id))}
              disabled={task.completed}
            >
              Complete
            </button>
            <button onClick={() => dispatch(DeleteTask(task.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
