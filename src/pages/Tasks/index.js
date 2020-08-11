import React, { useEffect, useState } from 'react'
import { IoIosAlarm, IoIosList } from 'react-icons/io'

import './styles.css'
import tasksData from './data.json'

const Tasks = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    function loadTasks() {
      setTasks(tasksData)
    }

    loadTasks()
  }, [])

  return (
    <div className="container">
      <h2>
        <IoIosList />
        Tarefas
      </h2>
      {tasks.map(item => (
        <div className="task" key={item.title}>
          <p>{item.title}</p>
          <div className="task-pomos">
            <span>{item.realizedPomos}</span>
            <IoIosAlarm className="icon" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tasks
