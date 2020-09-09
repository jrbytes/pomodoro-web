import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { IoIosAlarm, IoIosList, IoIosCreate, IoIosEyeOff } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes } from '../../store/modules/tasks/types'
import api from '../../services/api'

import { useToCleanCSSClass } from '../../hooks/toCleanCSSClass'
import { useHandleCloseModal } from '../../hooks/handleCloseModal'

import Header from '../../components/Header'
import ModalTask from '../../components/ModalTask'
import CreateTask from '../../components/CreateTask'
import ListCompletedTasks from '../../components/ListCompletedTasks'
import './styles.css'

const Tasks = () => {
  let { id } = useParams()

  const dispatch = useDispatch()
  const title = useSelector(state =>
    state.projects.items.find(item => item.id === id),
  )
  const tasks = useSelector(state => state.tasks.items)
  const effectCreateItem = useSelector(state => state.defaultConfig.items)

  const [completedTasks, setCompletedTasks] = useState(false)
  const [
    verifyIfContainTasksCompleted,
    setVerifyIfContainTasksCompleted,
  ] = useState(false)

  const [spinner, setSpinner] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [taskData, setTaskData] = useState({})
  const [question, setQuestion] = useState(false)
  const [colorWhenUpdating, setColorWhenUpdating] = useToCleanCSSClass()
  const [handleEsc] = useHandleCloseModal({ closeModal })

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`tasks/${id}`)

      dispatch({
        type: ActionTypes.INITIAL_TASK_STATE,
        payload: { tasks: data },
      })

      if (effectCreateItem.color_when_updating) {
        setColorWhenUpdating(effectCreateItem.color_when_updating.id)
      }

      setSpinner(true)
    }
    loadTasks()
  }, [dispatch, id, effectCreateItem, setColorWhenUpdating])

  const openUpdateTask = result => {
    setOpenModal(true)
    setTaskData(result)
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

  const searchCompletedTask = useCallback(async () => {
    setTimeout(async () => {
      const { data } = await api.get(`completed-tasks/${id}`)
      const verifyIfTrue = data.length > 0 ? false : true
      setVerifyIfContainTasksCompleted(verifyIfTrue)
    }, 200)
  }, [id])

  const buttonCompletedTasks = useMemo(() => {
    searchCompletedTask()
    return (
      <>
        {!verifyIfContainTasksCompleted && (
          <div className="completed-tasks">
            <button
              onClick={() => setCompletedTasks(completedTasks ? false : true)}
            >
              <span>{!completedTasks ? `Tarefas concluídas` : `Ocultar`}</span>
              <IoIosEyeOff />
            </button>
          </div>
        )}
      </>
    )
  }, [verifyIfContainTasksCompleted, completedTasks, searchCompletedTask])

  return (
    <>
      <Header goBackButton={true} />

      {spinner ? (
        <div className="container" onKeyUp={handleEsc}>
          <h2 className="title-tasks">
            <IoIosList />
            {title && `Tarefas - ${title.name}`}
          </h2>

          <CreateTask project_id={id} />

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
                <span>{item.realized_pomos}</span>
                <IoIosAlarm className="icon" />
              </div>

              <button onClick={() => openUpdateTask(item)}>
                <IoIosCreate className="icon" />
              </button>
            </div>
          ))}

          {buttonCompletedTasks}
          {completedTasks && (
            <ListCompletedTasks
              project_id={id}
              setColorWhenUpdating={setColorWhenUpdating}
              searchCompletedTask={searchCompletedTask}
            />
          )}

          {spinner === true && !tasks.length && (
            <span className="alert-no-items">Nenhuma tarefa cadastrada</span>
          )}
        </div>
      ) : (
        <div className="loader">Loading...</div>
      )}

      <ModalTask
        openModal={openModal}
        titleModal={`Editar Tarefa de ${title ? title.name : ''}`}
        taskData={taskData}
        project_id={id}
        closeModal={closeModal}
        handleSetQuestion={handleSetQuestion}
        question={question}
        setCompletedTasks={setCompletedTasks}
        searchCompletedTask={searchCompletedTask}
      />
    </>
  )
}

export default Tasks
