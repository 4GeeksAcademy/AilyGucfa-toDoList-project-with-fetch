import React, { useEffect, useState } from 'react';
import ToDoFooter from './toDoFooter';
import ToDoItem from './toDoItem';


const ToDoList = () => {
  const [newTask, setNewTask] = useState('');
  const [toDo, setToDo] = useState([]);
  const [id, setId] = useState(0);
  const [hoveredTaskedId, setHoveredTaskId] = useState(null);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);

  useEffect (() =>{
    if(toDo.length ===0){
        alert('no task, add a task');
        setShowEmptyAlert(false);
    }

},[toDo, showEmptyAlert])

function handleInput (){
    if(newTask === ''){
        alert ('input cannot be empty');
    }else{
        const newToDoItem = {
        id : id,
        content: newTask.charAt(0).toUpperCase() + newTask.slice(1),
      };
      setToDo((previousToDo)=> [...previousToDo, newToDoItem])
      setNewTask("");
      setId((id) => id +1);
    }
}


  function handleMouseEnter(id) {
    setHoveredTaskId(id);
  }

  function handleMouseLeave(id) {
    setHoveredTaskId(id);
  }

  function handleDeleteItem(id) {
    setToDo((previousToDo) => previousToDo.filter((task) => task.id !== id));
  }
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleInput();
    }
  }
  

  return (
    <>
      <div className='toDoList'>
        <h1 className='toDoHeader'>todos</h1>

        <div className='container'>
          <div className='toDoBody'>
            <input
              type='text'
              className='controlled-input'
              onChange={(event) => setNewTask(event.target.value)}
              onKeyDown={handleKeyDown}
              value={newTask}
              placeholder='Enter Your New Task Here'
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

          <ToDoFooter itemCount={toDo.length} />
        </div>
      </div>
    </>
  );
};



export default ToDoList;
