import React, { useEffect, useState } from 'react'
import { IoIosAlarm, IoIosList, IoIosCreate } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes } from '../../store/modules/tasks/types'

import { useToCleanCSSClass } from '../../hooks/toCleanCSSClass'
import { useHandleCloseModal } from '../../hooks/handleCloseModal'
import { useHandleCompletedTasks } from '../../hooks/handleCompletedTasks'

import Header from '../../components/Header'
import ModalTask from '../../components/ModalTask'
import CreateTask from '../../components/CreateTask'
import ListCompletedTasks from '../../components/ListCompletedTasks'

import { Container, Title, Task, TaskPomos } from './styles'

const Tasks = () => {
  let { id } = useParams()

  const dispatch = useDispatch()
  const title = useSelector(state =>
    state.projects.items.find(item => item.id === id),
  )
  const tasks = useSelector(state => state.tasks.items)
  const effectCreateItem = useSelector(state => state.defaultConfig.items)

  const [colorWhenUpdating, setColorWhenUpdating] = useToCleanCSSClass()
  const [handleEsc] = useHandleCloseModal({ closeModal })
  const [
    buttonCompletedTasks,
    searchCompletedTask,
    setCompletedTasks,
    completedTasks,
    setVerifyIfContainTasksCompleted,
  ] = useHandleCompletedTasks({ id })

  const [spinner, setSpinner] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [taskData, setTaskData] = useState({})
  const [question, setQuestion] = useState(false)

  useEffect(() => {
    dispatch({
      type: ActionTypes.INITIAL_TASK_STATE_REQUEST,
      payload: { projectId: id },
    })

    if (effectCreateItem.color_when_updating) {
      setColorWhenUpdating(effectCreateItem.color_when_updating.id)
    }

    setSpinner(true)
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

  return (
    <>
      <Header goBackButton={true} />
      {spinner ? (
        <Container onKeyUp={handleEsc}>
          <Title>
            <IoIosList />
            {title && `Tarefas - ${title.name}`}
          </Title>

          <CreateTask project_id={id} />

          {tasks.map(item => (
            <Task
              colorWhenUpdating={
                colorWhenUpdating === item.id ? 'updated-element' : ''
              }
              key={item.id}
            >
              <Link to={{ pathname: `/pomodoro/${item.id}` }}>
                <p>{item.name}</p>
              </Link>

              <TaskPomos>
                <span>{item.realized_pomos}</span>
                <IoIosAlarm className="icon" />
              </TaskPomos>

              <button onClick={() => openUpdateTask(item)}>
                <IoIosCreate className="icon" />
              </button>
            </Task>
          ))}

          {buttonCompletedTasks}
          {completedTasks && (
            <ListCompletedTasks
              project_id={id}
              setColorWhenUpdating={setColorWhenUpdating}
              searchCompletedTask={searchCompletedTask}
              setVerifyIfContainTasksCompleted={
                setVerifyIfContainTasksCompleted
              }
            />
          )}

          {spinner === true && !tasks.length && (
            <span className="alert-no-items">Nenhuma tarefa cadastrada</span>
          )}
        </Container>
      ) : (
        <div className="loader">Loading...</div>
      )}

      <ModalTask
        openModal={openModal}
        titleModal={`Editar Tarefa de ${title ? title.name : ''}`}
        taskData={taskData}
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
