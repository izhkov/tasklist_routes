import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const TaskPage = ({ id, title, completed }) => {
  const [data, setData] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [changeValue, setChangeValue] = useState(title)
  const [changeChecked, setChangeChecked] = useState(false)

  const updateChecked = async (id, changeChecked) => {
    const taskItemIndex = data.findIndex((task) => task.id === id)
    const taskItem = data.find((task) => task.id === id)
    if (taskItemIndex !== -1) {
      const response = await fetch(`http://localhost:3004/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...taskItem, completed: changeChecked }),
      })
      const updatedTask = await response.json()
      const copyData = data.slice()
      copyData[taskItemIndex] = updatedTask
      setData(copyData)
    }
  }

  const removeTask = async (id) => {
    await fetch(`http://localhost:3004/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setData(data.filter((task) => task.id !== id))
  }

  const updateTask = async (id, changeValue) => {
    const taskItemIndex = data.findIndex((task) => task.id === id)
    const taskItem = data.find((task) => task.id === id)
    if (taskItemIndex !== -1) {
      const response = await fetch(`http://localhost:3004/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...taskItem, title: changeValue }),
      })
      const updatedTask = await response.json()
      const copyData = data.slice()
      copyData[taskItemIndex] = updatedTask
      setData(copyData)
    }
  }

  const editPost = (id) => {
    setIsEdit((prevState) => !prevState)
  }

  const editTask = (e) => {
    setChangeValue(e.target.value)
  }

  const updateCheck = () => {
    setChangeChecked((prevState) => !prevState)
  }

  const updateState = () => {
    setIsEdit((prevState) => !prevState)
  }
  return (
    <>
      <Link to="/">Назад</Link>
      <h1>{`Задача №${id}`}</h1>
      <div className="postItem">
        <div className="container">
          <p>
            {id}. {title}
          </p>
          {isEdit ? (
            <input type="text" value={changeValue} onChange={editTask} />
          ) : (
            <></>
          )}
          <div className="buttonBlock">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => updateChecked(id, changeChecked, updateCheck())}
            />
            {isEdit ? (
              <button
                className="editTask"
                onClick={() => updateTask(id, changeValue, updateState())}
              >
                Подтвердить
              </button>
            ) : (
              <button className="editTask" onClick={() => editPost(id)}>
                Редактировать задачу
              </button>
            )}
            <button className="deleteTask" onClick={() => removeTask(id)}>
              Удалить задачу
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
