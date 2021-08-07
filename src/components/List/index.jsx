
import React from 'react';
import classNames from 'classnames';
import './List.scss';
import Badge from '../Badge';
import removeSvg from './../../assets/img/remove.svg'
import axios from 'axios';


const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
  const removeList = (item) => {
    if(window.confirm('Вы действительно хотите удалить список ?')) {
      axios.delete('/lists/' + item.id).then(() => {
        onRemove(item.id);
      });      
    }
  }
    return (     
        <ul className="list" onClick={onClick}>
            {
                items.map((item, index) => (
                    <li 
                      key={index}
                      className={classNames(item.className, {
                        active : item.active ? item.active : activeItem && activeItem.id === item.id
                      })}
                      onClick={onClickItem ? () => onClickItem(item) : null}
                      >                     
                    <i>
                      {item.icon ? (
                        item.icon
                      ) : (
                        <Badge color={item.color.name} />
                      )}
                    </i>
                    <span>
                      {item.name}
                      {item.tasks &&  `(${item.tasks.length})`}
                    </span>
                    {isRemovable && <img onClick={() => removeList(item)} className="list__remove-icon" src={removeSvg} alt="removeSvg" />}
                  </li>
                ))
            }
      </ul>
    );
}

export default List;