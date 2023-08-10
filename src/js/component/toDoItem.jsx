import React from 'react';

const ToDoItem = ({ task, hoveredTaskId, handleMouseEnter, handleMouseLeave, handleDeleteItem }) => {
  const handleDelete = () => {
    handleDeleteItem(task.id);
  };

  return (
    <li
      onMouseEnter={() => handleMouseEnter(task.id)}
      onMouseLeave={() => handleMouseLeave(task.id)}
      className={task.id === hoveredTaskId ? 'toDoItem hovered' : 'toDoItem'}
    >
      <span>{task.label}</span>
      {task.id === hoveredTaskId && (
        <button className='delete-btn' onClick={handleDelete}>
          X
        </button>
      )}
    </li>
  );
};

export default ToDoItem;
