import React, { useEffect, useState } from 'react'
import { IoIosAlarm, IoIosList } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  let { id } = useParams()

  useEffect(() => {
    async function loadTitle() {
      const { data } = await api.get(`projects/${id}`)

      setTitle(data.name)
    }

    loadTitle()
  }, [])

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`tasks?project_id=${id}`)

      setTasks(data)
    }

    loadTasks()
  }, [id])

  return (
    <div className="container">
      <h2 className="title-tasks">
        <IoIosList />
        Tarefas - {title}
      </h2>
      {tasks.map(item => (
        <Link to={{ pathname: `/pomodoro/${item.id}` }} key={item.id}>
          <div className="task">
            <p>{item.title}</p>
            <div className="task-pomos">
              <span>{item.realizedPomos}</span>
              <IoIosAlarm className="icon" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Tasks
