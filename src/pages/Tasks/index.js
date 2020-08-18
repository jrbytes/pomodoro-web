import React, { useEffect, useState } from 'react'
import { IoIosAlarm, IoIosList, IoIosCreate } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'
import ModalTask from '../../components/ModalTask'
import './styles.css'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const [openModal, setOpenModal] = useState(false)
  const [taskData, setTaskData] = useState({})
  const [colorWhenUpdating, setColorWhenUpdating] = useState('')

  let { id } = useParams()

  useEffect(() => {
    async function loadTitle() {
      const { data } = await api.get(`projects/${id}`)

      setTitle(data.name)
    }

    loadTitle()
  }, [id])

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`tasks?project_id=${id}`)

      setTasks(data)
    }

    loadTasks()
  }, [id])

  useEffect(() => {
    let isSubscribed = true

    function toCleanClass() {
      if (colorWhenUpdating.length) {
        setTimeout(() => {
          if (isSubscribed) return setColorWhenUpdating('')
        }, 3000)
      }
    }
    toCleanClass()

    return () => (isSubscribed = false)
  }, [colorWhenUpdating])

  const openUpdateTask = result => {
    setOpenModal(true)
    setTaskData(result)
  }

  const updateTask = async result => {
    const { id, title } = result

    const { data } = await api.patch(`tasks/${id}`, {
      title,
    })

    const updateStateOfTask = tasks.map(item =>
      item.id === data.id ? { ...item, title: data.title } : item,
    )

    setTasks(updateStateOfTask)
    setColorWhenUpdating(data.id)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Header goBackButton={true} />
      <div className="container">
        <h2 className="title-tasks">
          <IoIosList />
          {title && `Tarefas - ${title}`}
        </h2>

        {tasks.map(item => (
          <div
            className={`task${
              colorWhenUpdating === item.id ? ' updated-element' : ''
            }`}
            key={item.id}
          >
            <Link to={{ pathname: `/pomodoro/${item.id}` }}>
              <p>{item.title}</p>
            </Link>

            <div className="task-pomos">
              <span>{item.realizedPomos}</span>
              <IoIosAlarm className="icon" />
            </div>

            <button onClick={() => openUpdateTask(item)}>
              <IoIosCreate className="icon" />
            </button>
          </div>
        ))}
      </div>
      <ModalTask
        openModal={openModal}
        titleModal={`Editar Tarefa de ${title}`}
        taskData={taskData}
        updateTask={updateTask}
        closeModal={closeModal}
      />
    </>
  )
}

export default Tasks
