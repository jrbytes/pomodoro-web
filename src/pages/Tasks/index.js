import React, { useEffect, useState } from 'react'
import { IoIosAlarm, IoIosList, IoIosCreate } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'
import uuid from 'react-uuid'

import { useToCleanCSSClass } from '../../hooks/toCleanCSSClass'
import { useHandleCloseModal } from '../../hooks/handleCloseModal'

import Header from '../../components/Header'
import ModalTask from '../../components/ModalTask'
import CreateItem from '../../components/CreateItem'
import './styles.css'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const [openModal, setOpenModal] = useState(false)
  const [taskData, setTaskData] = useState({})
  const [question, setQuestion] = useState(false)
  const [colorWhenUpdating, setColorWhenUpdating] = useToCleanCSSClass()
  const [handleEsc] = useHandleCloseModal({ closeModal })

  let { id } = useParams()

  useEffect(() => {
    async function loadTitle() {
      const { data } = await api.get(`projects/${id}`)

      setTitle(data.name)
    }
    loadTitle()

    async function loadTasks() {
      const { data } = await api.get(`tasks?project_id=${id}`)

      setTasks(data)
    }
    loadTasks()
  }, [id])

  const openUpdateTask = result => {
    setOpenModal(true)
    setTaskData(result)
  }

  const updateTask = async result => {
    const { name } = result

    const nameIsEqual = taskData.name === result.name

    if (nameIsEqual) return

    const { data } = await api.patch(`tasks/${taskData.id}`, {
      name,
    })

    const updateStateOfTask = tasks.map(item =>
      item.id === data.id ? { ...item, name: data.name } : item,
    )

    setTasks(updateStateOfTask)
    setColorWhenUpdating(data.id)
  }

  function closeModal() {
    setOpenModal(false)

    setTimeout(() => {
      setQuestion(false)
    }, 300)
  }

  const handleSetQuestion = result => {
    setQuestion(result)
  }

  const createItem = async result => {
    const { name } = result

    const { data } = await api.post('tasks', {
      id: uuid(),
      name,
      realizedPomos: 0,
      project_id: id,
    })

    setTasks([...tasks, data])
    setColorWhenUpdating(data.id)
  }

  const deleteItem = async result => {
    const { data } = await api.delete(`tasks/${result}`)

    if (!data) return

    const deleteItemOfTasks = tasks.filter(item => item.id !== result)

    setTasks(deleteItemOfTasks)

    closeModal()
  }

  return (
    <>
      <Header goBackButton={true} />

      {tasks.length && title.length ? (
        <div className="container" onKeyUp={handleEsc}>
          <h2 className="title-tasks">
            <IoIosList />
            {title && `Tarefas - ${title}`}
          </h2>

          <CreateItem
            createItem={createItem}
            errorMessage="É necessário digitar uma tarefa"
          />

          {tasks.map(item => (
            <div
              className={`task${
                colorWhenUpdating === item.id ? ' updated-element' : ''
              }`}
              key={item.id}
            >
              <Link to={{ pathname: `/pomodoro/${item.id}` }}>
                <p>{item.name}</p>
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
      ) : (
        <div className="loader">Loading...</div>
      )}

      <ModalTask
        openModal={openModal}
        titleModal={`Editar Tarefa de ${title}`}
        taskData={taskData}
        updateTask={updateTask}
        closeModal={closeModal}
        deleteItem={deleteItem}
        handleSetQuestion={handleSetQuestion}
        question={question}
      />
    </>
  )
}

export default Tasks
