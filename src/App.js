import './App.css';
import {useState, useEffect} from 'react';
import Header from './components/Header'
import AddTask from './components/AddTask';
import Tasks from './components/Tasks'
// import {v4 as uuidv4} from 'uuid';
function App() {
  const [showAddTask, setShowAddTask] =useState(true);
  const [tasks,setTasks]=useState([])

  useEffect(()=>{
   
  const getTasks = async ()=>{ //this fun calls fetchtasks() which returns a promise;
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  }
  getTasks();

  },[])
//fetch tasks
const fetchTasks = async ()=>{
    const res = await fetch('http://localhost:8000/tasks');
    const data = await res.json()
    console.log(data);
    return data; 
}

//fetch single task
const fetchTask = async (id)=>{
  const res = await fetch(`http://localhost:8000/tasks/${id}`);
  const data = await res.json()
  console.log(data);
  return data; 
}

const deleteTask = async (id)=>{
  await fetch(`http://localhost:8000/tasks/${id}`,{
    method: "DELETE",
  })
setTasks(tasks.filter((task)=>{
  return task.id!==id;
})
)

}

async function toggleReminder(id){
 
  const taskToToggle = await fetchTask(id);
  const updatedTask = {...taskToToggle, reminder:!taskToToggle.reminder};
const res = await fetch(`http://localhost:8000/tasks/${id}`,{
  method:'PUT',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify(updatedTask)
})
const data= await res.json();
setTasks(tasks.map((task) =>
  task.id=== id ? data :task
))
}

async function addTask(data)
{
console.log(data);
 const res = await fetch(`http://localhost:8000/tasks`,{
  method:"POST",
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify({ ...data}) //json server assigns id,so we dont need to give.
})

const newtask = await res.json();
setTasks([...tasks, newtask]);

// setTasks((prevValue)=>{
//   return [...prevValue,{ ...data}]
// })
}

  return (
    <div className="container">
      <Header title="Task Tracker" onClickAdd={()=>setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
     { showAddTask && <AddTask onAdd={addTask}/> }
     <Tasks tasks={tasks} deleteTask={deleteTask} onToggle={toggleReminder}/> 
    </div>
  );
}

export default App;
