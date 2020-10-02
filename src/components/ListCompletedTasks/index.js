import React from 'react'
import { IoIosAlarm, IoIosUndo } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes } from '../../store/modules/completedTasks/types'

import { Task, TaskPomos } from './styles'

const ListCompletedTasks = ({
  setColorWhenUpdating,
  searchCompletedTask,
  setVerifyIfContainTasksCompleted,
}) => {
  const dispatch = useDispatch()
  const completedTasks = useSelector(state => state.completedTasks.items)

  function handleTaskRecovery(result) {
    dispatch({
      type: ActionTypes.TASK_RECOVERY_REQUEST,
      payload: {
        id: result.id,
        project_id: result.project_id,
        completed: false,
      },
    })

    setColorWhenUpdating(result.id)
    searchCompletedTask()
    setVerifyIfContainTasksCompleted(true)
  }

  return (
    <>
      {completedTasks.map(item => (
        <Task key={item.id} style={{ opacity: 0.7 }}>
          <p>
            <strike>{item.name}</strike>
          </p>

          <TaskPomos>
            <span>{item.realized_pomos}</span>
            <IoIosAlarm className="icon" />
          </TaskPomos>

          <button onClick={() => handleTaskRecovery(item)}>
            <IoIosUndo className="icon" />
          </button>
        </Task>
      ))}
    </>
  )
}

export default ListCompletedTasks
