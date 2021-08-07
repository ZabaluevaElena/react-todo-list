import React, { useState } from "react";
import "./tasks.scss";
import addSvg from "./../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setinputValue] = useState('');
  const [isLoading, setIsLoading] = useState('')

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setinputValue('');
  };

  const addTask = () => {
    const obj = {
        listId : list.id,
        text: inputValue,
        completed: false
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/tasks/', obj).then(({data}) => {
        onAddTask(list.id, data);
        toggleFormVisible();
    }).catch(() => {
        alert('Ошибка при добавлении задачи!')
    })
    .finally(() => {
        setIsLoading(false);
    })
  }

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="addSvg" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input 
            value={inputValue} 
            className="field" 
            type="text" 
            placeholder="текст задачи"
            onChange={e => setinputValue(e.target.value)} />
          <button disabled={isLoading} onClick={addTask} className="button">
              {isLoading ? 'Добавление' : 'Добавить задачу'}
            </button>
          <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
