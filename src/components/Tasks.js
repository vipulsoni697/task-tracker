import React from "react";
import Task from "./Task";
function Tasks({ tasks, deleteTask, onToggle }) {
  return (
    <>
    
      {tasks.length >0
        ? tasks.map((task) => {
            return <Task key={task.id} task={task} deleteTask={deleteTask} onToggle={onToggle} />;
          })
        : "No Tasks To Show"}
    </>
  );
}
export default Tasks;
