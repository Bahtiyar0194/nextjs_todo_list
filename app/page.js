"use client"
import { useState, useEffect } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BiDownArrowAlt, BiPencil, BiPlus, BiSave, BiTrashAlt, BiUpArrowAlt, BiX } from "react-icons/bi";

export default function Home() {

  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [edit_item, setEditItem] = useState(null);

  const [animateParent] = useAutoAnimate();

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (value !== '') {
      setItems([...items, {
        value: value,
        completed: false
      }]);
      setValue('');
      setError(false);
    }
    else {
      setError(true);
    }
  }

  const completeItem = (index) => {
    const clonedItems = [...items];
    clonedItems[index].completed === false ? clonedItems[index].completed = true : clonedItems[index].completed = false;
    setItems(clonedItems);
  }

  const deleteItem = (index) => {
    const clonedItems = items.filter((item, i) => i !== index);
    setItems(clonedItems);
  }

  const saveItem = (item) => {
    if (item.value !== '') {
      items[item.index].value = item.value;
      setItems(items);
      setEditItem(null);
      setError(false);
    }
    else {
      setError(true);
    }
  }

  const move = (index, direction) => {
    let temp;
    const clonedItems = [...items];
    if (direction === 'up') {
      temp = clonedItems[index - 1];
      clonedItems[index - 1] = clonedItems[index];
    }

    if (direction === 'down') {
      temp = clonedItems[index + 1];
      clonedItems[index + 1] = clonedItems[index];
    }

    clonedItems[index] = temp;
    setItems(clonedItems);
  };


  return (
    <>
      <div className="card">
        <h2 className="mb-5">To-Do List App</h2>
        <div className="input-wrap">
          <input className={error ? 'error' : ''} value={value} onChange={(e) => { setValue(e.target.value) }} type="text" placeholder="Type something" />
          <button onClick={addItem}><BiPlus /> Add</button>
        </div>
        {items.length > 0 &&
          <ul className="list" ref={animateParent}>
            {
              items.map((item, index) => (
                <li key={index}>
                  <label className="custom-checkbox">
                    <input type="checkbox" name={"item-" + index} checked={item.completed} onChange={(e) => completeItem(index)} />
                    <span className="checkvalue">{item.value}</span>
                    <span className="checkmark"></span>
                  </label>
                  <div className="controls">
                    {index !== 0 && <button title={"Move up"} onClick={() => move(index, 'up')}><BiUpArrowAlt /></button>}
                    {(index !== (items.length - 1)) && <button title={"Move down"} onClick={() => move(index, 'down')}><BiDownArrowAlt /></button>}
                    <button onClick={() => setEditItem({ index: index, value: item.value })}><BiPencil /></button>
                    <button onClick={() => deleteItem(index)}><BiTrashAlt /></button>
                  </div>
                </li>
              ))
            }
          </ul>
        }
      </div>

      <div className={'modal-wrap' + (edit_item !== null ? ' show' : '')}>
        <div className="modal">
          <div className="modal-header">
            <h4>Edit item</h4>
            <button onClick={() => setEditItem(null)}><BiX /></button>
          </div>
          <div className="pt-4">
            <div className="input-wrap">
              {edit_item !== null &&
                <>
                  <input className={error ? 'error' : ''} value={edit_item.value} onChange={(e) => { setEditItem({ index: edit_item.index, value: e.target.value }) }} type="text" placeholder="Type something" />
                  <button onClick={() => saveItem(edit_item)}><BiSave /> Save</button>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}