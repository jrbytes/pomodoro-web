import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import './styles.css'

const ListCompletedTasks = ({ project_id }) => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`completed-tasks/${project_id}`)

      setTasks(data)
    }
    loadTasks()
  }, [project_id])

  return (
    <>
      {tasks.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  )
}

export default ListCompletedTasks
