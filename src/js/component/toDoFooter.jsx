import React from 'react';

const ToDoFooter = ({ itemCount }) => {
  return (
    <div className="todoFooter">
      <p>{itemCount <= 1 ? `${itemCount} item left` : `${itemCount} items left`}</p>
    </div>
  );
};

export default ToDoFooter;
