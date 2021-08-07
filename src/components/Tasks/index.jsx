import React from "react";
import "./tasks.scss";
import editSvg from "./../../assets/img/edit.svg";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import {Link} from 'react-router-dom';

const Tasks = ({ list, onEditTitle, onAddTask, withOutEmpty, onRemoveTask, onEditTask, onComplateTask}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if(newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch('/lists/' + list.id, {
        name: newTitle
      }).catch(() => {
        alert('Не удалось обновить название списка');
      });
    }
  }


  
  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
      <h2 style={{color: list.color.hex}} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="editSvg" />
      </h2>
      </Link>
      <div className="tasks__items">
        {list.tasks && !list.tasks.length && !withOutEmpty && <h2>Задачи отсутствуют</h2>}
        {list.tasks && list.tasks.map((task) => (
          <Task 
            key={task.id}
            onRemove={onRemoveTask} 
            list={list} 
            onEdit={onEditTask}
            onComplate={onComplateTask}
            {...task} />
        ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>     
    </div>
  );
};

export default Tasks;
