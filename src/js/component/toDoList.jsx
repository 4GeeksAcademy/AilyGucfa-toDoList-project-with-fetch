import React, {useEffect, useState } from 'react';
import ToDoFooter from './toDoFooter';
import ToDoItem from './toDoItem';


const ToDoList = () => {
  const [newTask, setNewTask] = useState('');
  const [toDo, setToDo] = useState([]);
  const [id, setId] = useState(1);
  const [hoveredTaskedId, setHoveredTaskId] = useState(null);

  useEffect (() =>{
    if(toDo.length ===0){
        alert('no task, add a task');
    }
},[toDo])

function handleInput() {
  if (newTask === "") {
    alert("input cannot be empty");
  } else {
    const newToDoItem = {
      id: id,
      label: newTask.charAt(0).toUpperCase() + newTask.slice(1),
      done: false
    };
    let newTodos =[...toDo, newToDoItem];
    setToDo(newTodos)
    setNewTask("");
    setId((id) => id + 1);
    assignNewTask(newTodos);
    
  }
}

  function handleMouseEnter(id) {
    setHoveredTaskId(id);
  }

  function handleMouseLeave(id) {
    setHoveredTaskId(id);
  }

 
  function handleDeleteItem(id) {
    const updatedToDo = toDo.filter((task) => task.id !==id)
    setToDo(updatedToDo);
    assignNewTask(updatedToDo);
   
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleInput();
    }
  }

  function deleteAllTask(){
    let sampleList = [{
      "label": "My Task",  // when all task are deleted this will show
      "done": false,
    }]
    setToDo(sampleList)
    assignNewTask(sampleList);
  }
  
  function assignNewTask(toDoList) {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/ailygucfa", {
      method: "PUT",
      body: JSON.stringify(toDoList),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("API error:", response.statusText);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
 
  useEffect(() =>{
    fetch("https://playground.4geeks.com/apis/fake/todos/user/ailygucfa")
    .then(response => response.json())
    .then(data => setToDo(data))
    

}, [])
 

  return (
    <>
      <div className='toDoList'>
        <h1 className='toDoHeader'>todos</h1>

        <div className='container'>
          <div className='toDoBody'>
            <input
              type='text' autoFocus
              className='controlled-input'
              onChange={(event) => setNewTask(event.target.value)}
              onKeyDown={handleKeyDown}
              value={newTask}
              placeholder='What needs to be done?'
            />
            <ul>
              {toDo.map((task) => (
                <ToDoItem
                  key={task.id}
                  task={task}
                  hoveredTaskId={hoveredTaskedId}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </ul>
          </div>
          {toDo.length >=2 && (
            <button
              className='deleteAllTask'
              onClick={deleteAllTask}
            >
              Clear All Task
            </button>
          )}
          <ToDoFooter itemCount={toDo.length} />
        </div>
      </div>
    </>
  );
};



export default ToDoList;