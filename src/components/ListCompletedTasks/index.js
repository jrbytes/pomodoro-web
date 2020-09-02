import React, { useState, useEffect } from 'react'
import { IoIosAlarm, IoIosUndo } from 'react-icons/io'

import api from '../../services/api'

import './styles.css'

const ListCompletedTasks = ({ project_id, taskRecovery }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`completed-tasks/${project_id}`)

      setTasks(data)
    }
    loadTasks()
  }, [project_id])

  function handleTaskRecovery(result) {
    const updateStateOfTask = tasks.filter(item => item.id !== result.id)
    setTasks(updateStateOfTask)
    taskRecovery({ id: result.id, completed: false })
  }

  return (
    <>
      {tasks.map(item => (
        <div className="task" key={item.id} style={{ opacity: 0.7 }}>
          <p>
            <strike>{item.name}</strike>
          </p>

          <div className="task-pomos">
            <span>{item.realized_pomos} </span>
            <IoIosAlarm className="icon" />
          </div>

          <button onClick={() => handleTaskRecovery(item)}>
            <IoIosUndo className="icon" />
          </button>
        </div>
      ))}
    </>
  )
}

export default ListCompletedTasks
