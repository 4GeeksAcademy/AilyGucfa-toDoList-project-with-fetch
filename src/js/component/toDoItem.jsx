import React from 'react';

const ToDoItem = ({ task, hoveredTaskId, handleMouseEnter, handleMouseLeave, handleDeleteItem }) => {
  return (
    <li key={task.id} 
        onMouseOver={() => handleMouseEnter(task.id)} 
        onMouseLeave={handleMouseLeave}>
      {task.content} {hoveredTaskId === task.id &&
    <button 
        className='deleteButton' 
        onClick={() => handleDeleteItem(task.id)}>x</button>}
    </li>
  );
};

export default ToDoItem;

