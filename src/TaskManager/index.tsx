import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/taskmanagerstore";
import {
  FetchTasks,
  AddTask,
  DeleteTask,
  CompleteTask,
} from "../slice/taskmanager";
import { useEffect } from "react";

export default function TaskList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.Task
  );

  const Add = () => {
    const title = prompt(" Add a task");
    if (title) dispatch(AddTask(title));
  };

  useEffect(() => {
    dispatch(FetchTasks());
  }, [FetchTasks]);

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
      <button onClick={Add}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: "flex", gap: 10 }}>
            <span
              key={task.id}
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
              complete
            </button>
            <button onClick={() => dispatch(DeleteTask(task.id))}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
