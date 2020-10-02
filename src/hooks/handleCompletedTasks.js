import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosEyeOff } from 'react-icons/io'

import { ActionTypes } from '../store/modules/completedTasks/types'

import { CompletedTasks } from './styles/handleCompletedTasks'

export function useHandleCompletedTasks({ id }) {
  const dispatch = useDispatch()

  const [completedTasks, setCompletedTasks] = useState(false)
  const [
    verifyIfContainTasksCompleted,
    setVerifyIfContainTasksCompleted,
  ] = useState(true)

  useEffect(() => {
    dispatch({
      type: ActionTypes.INITIAL_COMPLETE_TASK_STATE_REQUEST,
      payload: { project_id: id },
    })
  }, [dispatch, id])

  const completedTasksData = useSelector(state => state.completedTasks.items)
  const searchCompletedTask = useCallback(() => {
    const verifyIfTrue = completedTasksData.length > 0 ? false : true
    setVerifyIfContainTasksCompleted(verifyIfTrue)
  }, [completedTasksData])

  const buttonCompletedTasks = useMemo(() => {
    searchCompletedTask()
    return (
      <>
        {!verifyIfContainTasksCompleted && (
          <CompletedTasks>
            <button
              onClick={() => setCompletedTasks(completedTasks ? false : true)}
            >
              <span>{!completedTasks ? `Tarefas concluídas` : `Ocultar`}</span>
              <IoIosEyeOff />
            </button>
          </CompletedTasks>
        )}
      </>
    )
  }, [verifyIfContainTasksCompleted, completedTasks, searchCompletedTask])

  return [
    buttonCompletedTasks,
    searchCompletedTask,
    setCompletedTasks,
    completedTasks,
    setVerifyIfContainTasksCompleted,
  ]
}
