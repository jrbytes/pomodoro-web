import React from 'react'
import { IoIosAlarm, IoIosUndo } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes } from '../../store/modules/completedTasks/types'

import './styles.css'

const ListCompletedTasks = ({ setColorWhenUpdating, searchCompletedTask }) => {
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
  }

  return (
    <>
      {completedTasks.map(item => (
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
